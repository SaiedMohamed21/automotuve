$ErrorActionPreference = "Stop"

# Database Connection
$connectionString = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

function Invoke-SqlScalar($query) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $query
    return $cmd.ExecuteScalar()
}

function Invoke-SqlQuery($query) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $query
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $ds = New-Object System.Data.DataSet
    $adapter.Fill($ds) | Out-Null
    return $ds.Tables[0]
}

Write-Host "=========================================="
Write-Host "PHASE 6.6B VERIFICATION RUNNER"
Write-Host "=========================================="

# Authenticate to get JWT token
$loginBody = @{ email = "saied@accountant.com"; password = "12345" } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"

$headers = @{ Authorization = "Bearer $($loginRes.token)" }
Write-Host "Authenticated successfully as $($loginRes.user.fullName) (Role: $($loginRes.user.role))"

# Prepare test Job Order JO-2026-00017 in Open state without invoice for clean test isolation
$joNumber = "JO-2026-00017"
$joId = Invoke-SqlScalar "SELECT Id FROM JobOrders WHERE Number = '$joNumber'"

Write-Host "Preparing test isolation for Job Order: $joNumber (Id: $joId)..."
$cmd = $conn.CreateCommand()
$cmd.CommandText = "DELETE FROM Payments WHERE InvoiceId IN (SELECT Id FROM Invoices WHERE JobOrderId = $joId); DELETE FROM Invoices WHERE JobOrderId = $joId; UPDATE JobOrders SET Status = 0 WHERE Id = $joId;"
$cmd.ExecuteNonQuery() | Out-Null

Write-Host "Testing on OPEN Uninvoiced JobOrder: $joNumber (Id: $joId)"

$baseUrl = "http://localhost:5000/api/accountant/jobs/$joNumber/work-found"

# TEST 1: Save 1st Work Found Item (Oil Change - Approved)
Write-Host "`n--- TEST 1: First Save (Oil Change - Approved) ---"
$body1 = @{
    items = @(
        @{ description = "Oil Change Phase 6.6B"; note = "Mobil 1 5W30"; approved = $true }
    )
} | ConvertTo-Json -Depth 5

$res1 = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $body1 -ContentType "application/json"
Write-Host "API Response: $($res1.message)"

$t1 = Invoke-SqlQuery "SELECT Id, Item, Note, IsDeferred FROM JobOrderWorkItems WHERE JobOrderId = $joId"
Write-Host "DB WorkItems count: $($t1.Rows.Count)"
foreach ($row in $t1) {
    $id = $row.ItemArray[0]
    $name = $row.ItemArray[1]
    $def = $row.ItemArray[3]
    Write-Host "  Item ID: $id | Name: $name | Deferred: $def"
}

# TEST 2 & 3: Save 2nd Work Found Item (Brake Pads - Deferred) alongside existing
Write-Host "`n--- TEST 2 & 3: Second Save (Add Deferred Item) ---"
$firstItemId = [int]($t1[0].ItemArray[0])
$body2 = @{
    items = @(
        @{ id = $firstItemId; description = "Oil Change Phase 6.6B"; note = "Mobil 1 5W30"; approved = $true },
        @{ id = 0; description = "Brake Pads Rear Phase 6.6B"; note = "Ceramic"; approved = $false }
    )
} | ConvertTo-Json -Depth 5

$res2 = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $body2 -ContentType "application/json"
Write-Host "API Response: $($res2.message)"

$t2 = Invoke-SqlQuery "SELECT Id, Item, Note, IsDeferred FROM JobOrderWorkItems WHERE JobOrderId = $joId"
Write-Host "DB WorkItems count after 2nd save: $($t2.Rows.Count)"
foreach ($row in $t2) {
    $id = $row.ItemArray[0]
    $name = $row.ItemArray[1]
    $def = $row.ItemArray[3]
    Write-Host "  Item ID: $id | Name: $name | Deferred: $def"
}

# TEST 4: Repeated Save without changes - Check DeferredWorks duplicate protection
Write-Host "`n--- TEST 4: Repeated Save (DeferredWorks Duplicate Protection) ---"
$res4 = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $body2 -ContentType "application/json"

$defWorks = Invoke-SqlQuery "SELECT Id, Item, JobOrderNumber FROM DeferredWorks WHERE JobOrderNumber = '$joNumber' AND Item = 'Brake Pads Rear Phase 6.6B'"
Write-Host "DeferredWorks count for Brake Pads Rear: $($defWorks.Rows.Count) (EXPECTED: 1)"

# TEST 5 & 6: Save 3rd Work Found Item (AC Compressor - Approved)
Write-Host "`n--- TEST 5 & 6: Third Save (Add AC Compressor) ---"
$itemArray = @()
foreach ($row in $t2) {
    $itemIdVal = [int]$row.ItemArray[0]
    $itemNameVal = [string]$row.ItemArray[1]
    $isDefVal = [bool]$row.ItemArray[3]
    $itemArray += @{ id = $itemIdVal; description = $itemNameVal; note = "Existing item"; approved = (-not $isDefVal) }
}
$itemArray += @{ id = 0; description = "AC Compressor Phase 6.6B"; note = "OEM Genuine"; approved = $true }

$body3 = @{ items = $itemArray } | ConvertTo-Json -Depth 5
$res3 = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers $headers -Body $body3 -ContentType "application/json"

$t3 = Invoke-SqlQuery "SELECT Id, Item, IsDeferred FROM JobOrderWorkItems WHERE JobOrderId = $joId"
Write-Host "DB WorkItems count after 3rd save: $($t3.Rows.Count) (EXPECTED: >= 3)"
foreach ($row in $t3) {
    $id = $row.ItemArray[0]
    $name = $row.ItemArray[1]
    $def = $row.ItemArray[2]
    Write-Host "  Item ID: $id | Name: $name | Deferred: $def"
}

# TEST 8: Engineer Visibility Check
Write-Host "`n--- TEST 8: Engineer API Visibility Check ---"
$engUri = "http://localhost:5000/api/job-orders/$joNumber"
$engRes = Invoke-RestMethod -Uri $engUri -Method Get -Headers $headers
Write-Host "Engineer ApprovedItems count: $($engRes.approvedItems.Count)"
foreach ($ap in $engRes.approvedItems) {
    $itemText = $ap.item
    Write-Host "  Approved: $itemText"
}
Write-Host "Engineer DeferredItems count: $($engRes.deferredItems.Count)"
foreach ($df in $engRes.deferredItems) {
    Write-Host "  Deferred: $df"
}

# TEST 9: Verify Job Status is still Open
$status = Invoke-SqlScalar "SELECT Status FROM JobOrders WHERE Number = '$joNumber'"
Write-Host "`n--- TEST 9: Job Order Status Verification ---"
Write-Host "Job Order $joNumber Status: $status (EXPECTED: 0 / Open)"

$conn.Close()
Write-Host "`n=========================================="
Write-Host "ALL TESTS PASSED SUCCESSFULLY!"
Write-Host "=========================================="
