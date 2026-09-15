# Login as accountant to get token
$loginBody = @{ email = "saied@accountant.com"; password = "12345" } | ConvertTo-Json
try {
    $loginRes = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $loginRes.token
    Write-Host "Logged in successfully. Token obtained."
} catch {
    Write-Host "Login failed: $_"
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# Test 1: Record invalid payment method (Bitcoin) -> Should fail with 400
Write-Host "`n--- Test 1: Invalid payment method (Bitcoin) ---"
$invalidBody = @{ invoiceNumber = "INV-2026-00008"; amount = 100; method = "Bitcoin"; note = "Test invalid" } | ConvertTo-Json
try {
    $res = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/payments" -Method Post -Headers $headers -Body $invalidBody -ContentType "application/json"
    Write-Host "Unexpected Success: $res"
} catch {
    Write-Host "Expected Validation Failure (400 Bad Request):"
    Write-Host $_.Exception.Message
}

# Test 2: Record split payments for INV-2026-00008
# Cash: 400 EGP
Write-Host "`n--- Test 2: Split Payment 1 - Cash 400 EGP ---"
$pay1 = @{ invoiceNumber = "INV-2026-00008"; amount = 400; method = "Cash"; note = "Ref-Cash-400" } | ConvertTo-Json
$res1 = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/payments" -Method Post -Headers $headers -Body $pay1 -ContentType "application/json"
Write-Host ("Recorded: Id=" + $res1.id + ", Method=" + $res1.method + ", Amount=" + $res1.amount)

# InstaPay: 3000 EGP
Write-Host "`n--- Test 3: Split Payment 2 - InstaPay 3000 EGP ---"
$pay2 = @{ invoiceNumber = "INV-2026-00008"; amount = 3000; method = "InstaPay"; note = "Ref-InstaPay-3000" } | ConvertTo-Json
$res2 = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/payments" -Method Post -Headers $headers -Body $pay2 -ContentType "application/json"
Write-Host ("Recorded: Id=" + $res2.id + ", Method=" + $res2.method + ", Amount=" + $res2.amount)

# Visa: 500 EGP
Write-Host "`n--- Test 4: Split Payment 3 - Visa 500 EGP ---"
$pay3 = @{ invoiceNumber = "INV-2026-00008"; amount = 500; method = "Visa"; note = "Ref-Visa-500" } | ConvertTo-Json
$res3 = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/payments" -Method Post -Headers $headers -Body $pay3 -ContentType "application/json"
Write-Host ("Recorded: Id=" + $res3.id + ", Method=" + $res3.method + ", Amount=" + $res3.amount)

# Wallet: 670 EGP
Write-Host "`n--- Test 5: Split Payment 4 - Wallet 670 EGP ---"
$pay4 = @{ invoiceNumber = "INV-2026-00008"; amount = 670; method = "Wallet"; note = "Ref-Wallet-670" } | ConvertTo-Json
$res4 = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/payments" -Method Post -Headers $headers -Body $pay4 -ContentType "application/json"
Write-Host ("Recorded: Id=" + $res4.id + ", Method=" + $res4.method + ", Amount=" + $res4.amount)

# Fetch Invoice Details from GET endpoint
Write-Host "`n--- Test 6: Fetch Invoice Details (GET /api/accountant/invoices/INV-2026-00008) ---"
$invDetails = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/invoices/INV-2026-00008" -Method Get -Headers $headers
Write-Host ("Invoice: " + $invDetails.invoiceNumber + " | Status: " + $invDetails.paymentStatus + " | Paid: " + $invDetails.paidAmount + " | Remaining: " + $invDetails.remainingAmount)
Write-Host "Payments returned by backend:"
foreach ($p in $invDetails.payments) {
    Write-Host (" - Id: " + $p.id + " | Method: " + $p.method + " | Amount: " + $p.amount + " EGP | Note: " + $p.note)
}

# Direct SQL query to verify Payments table in SQL Server
Write-Host "`n--- Test 7: Query Payments Table in SQL Server ---"
$sql = "SELECT p.Id, p.Amount, p.Method, p.Note, p.InvoiceId, i.InvoiceNumber FROM Payments p JOIN Invoices i ON p.InvoiceId = i.Id WHERE i.InvoiceNumber = 'INV-2026-00008' ORDER BY p.Id ASC"
$con = New-Object System.Data.SqlClient.SqlConnection("Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True")
$con.Open()
$cmd = $con.CreateCommand()
$cmd.CommandText = $sql
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
$dt = New-Object System.Data.DataTable
$adapter.Fill($dt) | Out-Null
$dt | Format-Table -AutoSize | Out-String | Write-Host
$con.Close()
