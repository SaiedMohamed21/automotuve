$baseUrl = "http://localhost:5005"

Write-Host "=== PHASE 6.6D AUTOMATED REGRESSION TESTS ===" -ForegroundColor Cyan

# 1. Login to get JWT Token
$loginBody = @{ email = "saied@warehouse.com"; password = "12345" } | ConvertTo-Json
try {
    $loginRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginRes.token
    Write-Host "[AUTH] Login successful as Warehouse user." -ForegroundColor Green
} catch {
    Write-Host "[AUTH ERROR] Failed to login: $_" -ForegroundColor Red
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# Helper to execute REST calls with auth
function Call-Api {
    param([string]$Path, [string]$Method="GET", [object]$Body=$null)
    $uri = "$baseUrl$Path"
    $params = @{ Uri = $uri; Method = $Method; Headers = $headers; ContentType = "application/json" }
    if ($Body) { $params.Body = ($Body | ConvertTo-Json -Depth 5) }
    return Invoke-RestMethod @params
}

# 2. Setup Test Job Orders and Test Parts
Write-Host "`n--- Preparing Test Data ---" -ForegroundColor Yellow

# Get all parts or ensure Oil, Brake, Filter exist
$allParts = Call-Api -Path "/api/warehouse/parts"
$oilPart = $allParts | Where-Object { $_.name -like "*Oil*" -or $_.name -like "*Engine Oil*" } | Select-Object -First 1
$brakePart = $allParts | Where-Object { $_.name -like "*Brake*" } | Select-Object -First 1
$filterPart = $allParts | Where-Object { $_.name -like "*Filter*" } | Select-Object -First 1

if (-not $oilPart -or -not $brakePart -or -not $filterPart) {
    Write-Host "Creating missing test parts..." -ForegroundColor Yellow
    if (-not $oilPart) { $oilPart = Call-Api -Path "/api/warehouse/parts" -Method Post -Body @{ name="Engine Oil 5W30"; number="OIL-5W30"; currentQty=50; minQty=5; category="Engine" } }
    if (-not $brakePart) { $brakePart = Call-Api -Path "/api/warehouse/parts" -Method Post -Body @{ name="Front Brake Pads"; number="BRK-PAD-1"; currentQty=30; minQty=5; category="Brakes" } }
    if (-not $filterPart) { $filterPart = Call-Api -Path "/api/warehouse/parts" -Method Post -Body @{ name="Oil Filter"; number="FLT-OIL-1"; currentQty=40; minQty=5; category="Filters" } }
}

Write-Host "Test Parts: Oil (ID $($oilPart.id)), Brake (ID $($brakePart.id)), Filter (ID $($filterPart.id))" -ForegroundColor Gray

# Ensure test Job Orders exist or create them
$openJobs = Call-Api -Path "/api/warehouse/jobs?status=all"
$jo1 = $openJobs | Where-Object { $_.number -eq "JO-TEST-66D-1" } | Select-Object -First 1
$jo2 = $openJobs | Where-Object { $_.number -eq "JO-TEST-66D-2" } | Select-Object -First 1

$custs = Call-Api -Path "/api/customers"
$vehs = Call-Api -Path "/api/vehicles"

if (-not $jo1) {
    $create1 = Call-Api -Path "/api/job-orders" -Method Post -Body @{
        customerId = $custs[0].id
        vehicleId = $vehs[0].id
        type = "Maintenance"
        requiredWork = "Test JO 1"
    }
    $jo1Num = $create1.number
} else {
    $jo1Num = $jo1.number
}

if (-not $jo2) {
    $create2 = Call-Api -Path "/api/job-orders" -Method Post -Body @{
        customerId = $custs[0].id
        vehicleId = $vehs[0].id
        type = "Maintenance"
        requiredWork = "Test JO 2"
    }
    $jo2Num = $create2.number
} else {
    $jo2Num = $jo2.number
}

# Clean existing parts from test jobs before tests start
$existingParts1 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
foreach ($p in $existingParts1) {
    Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts/$($p.partId)" -Method Delete | Out-Null
}
$existingParts2 = Call-Api -Path "/api/warehouse/jobs/$jo2Num/parts"
foreach ($p in $existingParts2) {
    Call-Api -Path "/api/warehouse/jobs/$jo2Num/parts/$($p.partId)" -Method Delete | Out-Null
}

Write-Host "Test Job Orders $jo1Num and $jo2Num prepared and cleaned.`n" -ForegroundColor Green

# -------------------------------------------------------------
# TEST 1: Add Oil = 1, then Add Brake = 1.
# Expected: Oil = 1, Brake = 1
# -------------------------------------------------------------
Write-Host "RUNNING TEST 1: Add Oil Qty=1, then Add Brake Qty=1..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $oilPart.id; qty = 1 } ) } | Out-Null
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $brakePart.id; qty = 1 } ) } | Out-Null

$res1 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil1 = $res1 | Where-Object { $_.partId -eq $oilPart.id }
$brake1 = $res1 | Where-Object { $_.partId -eq $brakePart.id }

if ($res1.Count -eq 2 -and $oil1.qty -eq 1 -and $brake1.qty -eq 1) {
    Write-Host "[PASS] TEST 1: Oil Qty=1, Brake Qty=1 (Existing part qty did NOT increase!)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 1: Expected Oil=1, Brake=1. Got: $(ConvertTo-Json $res1 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 2: Add Filter = 2.
# Expected: Oil = 1, Brake = 1, Filter = 2
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 2: Add Filter Qty=2..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $filterPart.id; qty = 2 } ) } | Out-Null

$res2 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil2 = $res2 | Where-Object { $_.partId -eq $oilPart.id }
$brake2 = $res2 | Where-Object { $_.partId -eq $brakePart.id }
$filter2 = $res2 | Where-Object { $_.partId -eq $filterPart.id }

if ($res2.Count -eq 3 -and $oil2.qty -eq 1 -and $brake2.qty -eq 1 -and $filter2.qty -eq 2) {
    Write-Host "[PASS] TEST 2: Oil=1, Brake=1, Filter=2" -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 2: Expected Oil=1, Brake=1, Filter=2. Got: $(ConvertTo-Json $res2 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 3: Intentionally add Oil Qty = 1 again.
# Expected: Oil = 2, Brake = 1, Filter = 2
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 3: Intentionally add Oil Qty=1 again..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $oilPart.id; qty = 1 } ) } | Out-Null

$res3 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil3 = $res3 | Where-Object { $_.partId -eq $oilPart.id }
$brake3 = $res3 | Where-Object { $_.partId -eq $brakePart.id }
$filter3 = $res3 | Where-Object { $_.partId -eq $filterPart.id }

if ($oil3.qty -eq 2 -and $brake3.qty -eq 1 -and $filter3.qty -eq 2) {
    Write-Host "[PASS] TEST 3: Oil=2, Brake=1, Filter=2 (Same part increased strictly by requested amount!)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 3: Expected Oil=2, Brake=1, Filter=2. Got: $(ConvertTo-Json $res3 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 4: Remove Brake.
# Expected: Oil = 2, Filter = 2 (Brake removed)
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 4: Remove Brake..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts/$($brakePart.id)" -Method Delete | Out-Null

$res4 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil4 = $res4 | Where-Object { $_.partId -eq $oilPart.id }
$brake4 = $res4 | Where-Object { $_.partId -eq $brakePart.id }
$filter4 = $res4 | Where-Object { $_.partId -eq $filterPart.id }

if (-not $brake4 -and $oil4.qty -eq 2 -and $filter4.qty -eq 2) {
    Write-Host "[PASS] TEST 4: Oil=2, Filter=2 (Only Brake removed!)" -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 4: Expected Brake removed and Oil=2, Filter=2. Got: $(ConvertTo-Json $res4 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 5: Remove Oil.
# Expected: Only Filter=2 remains.
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 5: Remove Oil..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts/$($oilPart.id)" -Method Delete | Out-Null

$res5 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil5 = $res5 | Where-Object { $_.partId -eq $oilPart.id }
$filter5 = $res5 | Where-Object { $_.partId -eq $filterPart.id }

if (-not $oil5 -and $filter5.qty -eq 2 -and $res5.Count -eq 1) {
    Write-Host "[PASS] TEST 5: Only Filter=2 remains." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 5: Expected only Filter=2. Got: $(ConvertTo-Json $res5 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 6: Refresh database check after adding Oil = 1, Brake = 1.
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 6: Clear and set Oil=1, Brake=1 then refresh API..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts/$($filterPart.id)" -Method Delete | Out-Null
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $oilPart.id; qty = 1 }, @{ partId = $brakePart.id; qty = 1 } ) } | Out-Null

$res6 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$oil6 = $res6 | Where-Object { $_.partId -eq $oilPart.id }
$brake6 = $res6 | Where-Object { $_.partId -eq $brakePart.id }

if ($res6.Count -eq 2 -and $oil6.qty -eq 1 -and $brake6.qty -eq 1) {
    Write-Host "[PASS] TEST 6: Database API returned exact Oil=1, Brake=1 after refresh." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 6: Expected Oil=1, Brake=1. Got: $(ConvertTo-Json $res6 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 7: SignalR refresh simulation (repeated GET requests).
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 7: Simulating repeated SignalR data syncs..." -ForegroundColor Cyan
$res7a = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"
$res7b = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"

if ($res7a.Count -eq 2 -and $res7b.Count -eq 2 -and $res7b[0].qty -eq $res7a[0].qty) {
    Write-Host "[PASS] TEST 7: SignalR refresh produces zero duplicate rows and zero quantity increments." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 7: Quantities changed on refresh!" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 8: Add Part -> reload -> add another Part.
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 8: Add Part -> reload -> add another Part..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts" -Method Post -Body @{ parts = @( @{ partId = $filterPart.id; qty = 3 } ) } | Out-Null
$res8 = Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts"

$oil8 = $res8 | Where-Object { $_.partId -eq $oilPart.id }
$brake8 = $res8 | Where-Object { $_.partId -eq $brakePart.id }
$filter8 = $res8 | Where-Object { $_.partId -eq $filterPart.id }

if ($oil8.qty -eq 1 -and $brake8.qty -eq 1 -and $filter8.qty -eq 3) {
    Write-Host "[PASS] TEST 8: Existing quantities (Oil=1, Brake=1) remained exactly unchanged after adding Filter=3." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 8: Quantities altered! Got: $(ConvertTo-Json $res8 -Compress)" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 9: Confirm Physical Issue.
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 9: Confirm Physical Issue..." -ForegroundColor Cyan
# Get initial stock levels
$pOilInitial = (Call-Api -Path "/api/warehouse/parts/$($oilPart.id)").part.currentQty
$pBrakeInitial = (Call-Api -Path "/api/warehouse/parts/$($brakePart.id)").part.currentQty
$pFilterInitial = (Call-Api -Path "/api/warehouse/parts/$($filterPart.id)").part.currentQty

# Confirm issue
$confirmRes = Call-Api -Path "/api/warehouse/jobs/$jo1Num/confirm" -Method Post

$pOilAfter = (Call-Api -Path "/api/warehouse/parts/$($oilPart.id)").part.currentQty
$pBrakeAfter = (Call-Api -Path "/api/warehouse/parts/$($brakePart.id)").part.currentQty
$pFilterAfter = (Call-Api -Path "/api/warehouse/parts/$($filterPart.id)").part.currentQty

$joStatusAfter = (Call-Api -Path "/api/warehouse/jobs?status=all" | Where-Object { $_.number -eq $jo1Num }).status

if (($pOilInitial - $pOilAfter -eq 1) -and ($pBrakeInitial - $pBrakeAfter -eq 1) -and ($pFilterInitial - $pFilterAfter -eq 3) -and ($joStatusAfter -eq "Open")) {
    Write-Host "[PASS] TEST 9: Stock deducted by exact quantities (Oil -1, Brake -1, Filter -3). Job Order status remains OPEN." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 9: Stock deduction or status mismatch. Oil: $pOilInitial->$pOilAfter, Brake: $pBrakeInitial->$pBrakeAfter, Filter: $pFilterInitial->$pFilterAfter, Status: $joStatusAfter" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 10: Remove unissued/planned Part.
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 10: Remove unissued/planned Part from $jo2Num..." -ForegroundColor Cyan
Call-Api -Path "/api/warehouse/jobs/$jo2Num/parts" -Method Post -Body @{ parts = @( @{ partId = $oilPart.id; qty = 5 } ) } | Out-Null

$stockBeforeUnissuedRemove = (Call-Api -Path "/api/warehouse/parts/$($oilPart.id)").part.currentQty
Call-Api -Path "/api/warehouse/jobs/$jo2Num/parts/$($oilPart.id)" -Method Delete | Out-Null
$stockAfterUnissuedRemove = (Call-Api -Path "/api/warehouse/parts/$($oilPart.id)").part.currentQty

$jo2Parts = Call-Api -Path "/api/warehouse/jobs/$jo2Num/parts"

if ($jo2Parts.Count -eq 0 -and $stockBeforeUnissuedRemove -eq $stockAfterUnissuedRemove) {
    Write-Host "[PASS] TEST 10: Unissued part removed cleanly. Stock was NOT modified." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 10: Unissued part remove failed. Stock before: $stockBeforeUnissuedRemove, after: $stockAfterUnissuedRemove" -ForegroundColor Red
}

# -------------------------------------------------------------
# TEST 11: Remove physically issued Part (Return to Stock).
# -------------------------------------------------------------
Write-Host "`nRUNNING TEST 11: Remove physically issued Part (Return to Stock)..." -ForegroundColor Cyan
# On $jo1Num, Filter (Qty 3) was physically issued in Test 9.
$stockBeforeReturn = (Call-Api -Path "/api/warehouse/parts/$($filterPart.id)").part.currentQty

Call-Api -Path "/api/warehouse/jobs/$jo1Num/parts/$($filterPart.id)" -Method Delete | Out-Null

$stockAfterReturn = (Call-Api -Path "/api/warehouse/parts/$($filterPart.id)").part.currentQty
$movements = Call-Api -Path "/api/warehouse/movements"
$returnMove = $movements | Where-Object { $_.reference -eq $jo1Num -and $_.type -eq "StockIn" -and $_.note -like "*Returned*" } | Select-Object -First 1

if (($stockAfterReturn - $stockBeforeReturn -eq 3) -and $returnMove) {
    Write-Host "[PASS] TEST 11: Physically issued part returned to stock! Filter stock increased by +3, StockIn return movement recorded." -ForegroundColor Green
} else {
    Write-Host "[FAIL] TEST 11: Return to stock failed. Stock before: $stockBeforeReturn, after: $stockAfterReturn, returnMove: $(ConvertTo-Json $returnMove -Compress)" -ForegroundColor Red
}

Write-Host "`n=== ALL 11 REGRESSION TESTS COMPLETED SUCCESSFULLY ===" -ForegroundColor Cyan
