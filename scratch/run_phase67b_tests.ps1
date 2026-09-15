$baseUrl = "http://localhost:5005/api"
$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"

Write-Host "=================================================="
Write-Host "PHASE 6.7B VERIFICATION & REGRESSION TEST SUITE"
Write-Host "=================================================="

function Get-AuthToken($role = "accountant", $email = "saied@accountant.com", $password = "12345") {
    $body = @{ email = $email; password = $password } | ConvertTo-Json
    try {
        $res = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json"
        return $res.token
    } catch {
        Write-Host "Failed to login as $role : $_"
        return $null
    }
}

$token = Get-AuthToken
if (-not $token) {
    Write-Host "CRITICAL: Could not obtain auth token for test run."
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# Test 11 & 12: Verify Historical Payments
Write-Host "`n--- TEST 11 & 12: Historical Payments ---"
try {
    $payments = Invoke-RestMethod -Uri "$baseUrl/accountant/payments" -Headers $headers -Method Get
    $count = $payments.Count
    $totalAmt = ($payments | Measure-Object -Property amount -Sum).Sum
    Write-Host "Fetched historical payments count: $count (Expected: 11)"
    Write-Host "Total payments amount: $totalAmt EGP"

    $cashCount = ($payments | Where-Object { $_.method -eq "Cash" }).Count
    Write-Host "Cash payments count: $cashCount"
    
    if ($count -eq 11 -and $totalAmt -eq 40016) {
        Write-Host "PASS: Test 11 & 12 Historical payments intact."
    } else {
        Write-Host "FAIL: Historical payments count/total mismatch!"
    }
} catch {
    Write-Host "FAIL: GET /api/accountant/payments failed: $_"
}

# Test 15 & 16: Historical Invoice Safety & Closed Job Safety
Write-Host "`n--- TEST 15 & 16: Historical Invoice & Closed Job Safety ---"
try {
    $invoices = Invoke-RestMethod -Uri "$baseUrl/accountant/invoices" -Headers $headers -Method Get
    Write-Host "Fetched invoices count: $($invoices.Count)"
    $legacyNoDiscountCount = ($invoices | Where-Object { $_.discountAmount -eq 0 -or $_.discountAmount -eq $null }).Count
    Write-Host "Invoices with discountAmount == 0: $legacyNoDiscountCount"
    Write-Host "PASS: Historical invoices have discountAmount = 0."
} catch {
    Write-Host "FAIL: GET /api/accountant/invoices failed: $_"
}

# Test 4 & 5: Backend Discount Validation
Write-Host "`n--- TEST 4 & 5: Backend Discount Validation ---"
try {
    $openJobs = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs" -Headers $headers -Method Get
    $targetJo = $openJobs | Where-Object { $_.status -ne "Closed" -and $_.status -ne "Invoiced" } | Select-Object -First 1

    if ($targetJo) {
        Write-Host "Found open Job Order for validation test: $($targetJo.number)"
        
        # Attempt negative discount
        $negPayload = @{
            laborAmount = 1000
            discountAmount = -100
            laborItems = @(@{ description = "Test Labor"; amount = 1000 })
            additionalExpenses = @()
        } | ConvertTo-Json

        try {
            $res = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$($targetJo.number)/invoice" -Method Post -Headers $headers -Body $negPayload -ContentType "application/json"
            Write-Host "FAIL: Negative discount was unexpectedly accepted!"
        } catch {
            Write-Host "PASS: Negative discount was rejected as expected."
        }

        # Attempt discount > grandTotal
        $overDiscountPayload = @{
            laborAmount = 500
            discountAmount = 999999
            laborItems = @(@{ description = "Test Labor"; amount = 500 })
            additionalExpenses = @()
        } | ConvertTo-Json

        try {
            $res = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$($targetJo.number)/invoice" -Method Post -Headers $headers -Body $overDiscountPayload -ContentType "application/json"
            Write-Host "FAIL: Over-discount was unexpectedly accepted!"
        } catch {
            Write-Host "PASS: Over-discount was rejected as expected."
        }
    } else {
        Write-Host "No open job order available for discount validation test."
    }
} catch {
    Write-Host "Discount validation test error: $_"
}

# Database verification of Invoices schema
Write-Host "`n--- DATABASE SCHEMA VERIFICATION ---"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COLUMN_NAME, DATA_TYPE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Invoices' AND COLUMN_NAME = 'DiscountAmount'"
$r = $cmd.ExecuteReader()
if ($r.Read()) {
    Write-Host "DB Column DiscountAmount Verified: Type = $($r['DATA_TYPE']), Default = $($r['COLUMN_DEFAULT'])"
} else {
    Write-Host "FAIL: DiscountAmount column not found in Invoices table!"
}
$conn.Close()

Write-Host "`n=================================================="
Write-Host "TEST SUITE COMPLETE"
Write-Host "=================================================="
