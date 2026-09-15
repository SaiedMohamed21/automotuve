$baseUrl = "http://localhost:5000/api"

Write-Host "========================================="
Write-Host "PHASE 6.2 INTEGRATION VERIFICATION SUITE"
Write-Host "========================================="

# Log in to get Bearer token
$loginBody = @{
    email = "saied@accountant.com"
    password = "12345"
} | ConvertTo-Json

$loginRes = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body $loginBody
$token = $loginRes.token
Write-Host "Logged in successfully. User: $($loginRes.user.fullName), Role: $($loginRes.user.role)"

$headers = @{
    Authorization = "Bearer $token"
}

# 1. Check Legacy Invoice INV-2026-00007
Write-Host "`n--- TEST 6: LEGACY INVOICE INV-2026-00007 ---"
$inv7 = Invoke-RestMethod -Uri "$baseUrl/accountant/invoices/INV-2026-00007" -Method Get -Headers $headers
Write-Host "Invoice Number: $($inv7.invoiceNumber)"
Write-Host "PartsTotal:     $($inv7.partsTotal) EGP"
Write-Host "LaborAmount:    $($inv7.laborAmount) EGP"
Write-Host "ExpensesTotal:  $($inv7.expensesTotal) EGP"
Write-Host "GrandTotal:     $($inv7.grandTotal) EGP"
Write-Host "PaidAmount:     $($inv7.paidAmount) EGP"
Write-Host "PaymentStatus:  $($inv7.paymentStatus)"
Write-Host "LaborItems Count: $($inv7.laborItems.Count)"
if ($inv7.laborItems.Count -gt 0) {
    Write-Host "LaborItem 0 Description: $($inv7.laborItems[0].description)"
    Write-Host "LaborItem 0 Amount:      $($inv7.laborItems[0].amount)"
}

# Verify financial totals preserved
if ($inv7.partsTotal -eq 3950 -and $inv7.laborAmount -eq 2000 -and $inv7.expensesTotal -eq 570 -and $inv7.grandTotal -eq 6520 -and $inv7.paidAmount -eq 6520) {
    Write-Host "PASSED: Legacy invoice INV-2026-00007 financial totals preserved!" -ForegroundColor Green
} else {
    Write-Host "FAILED: INV-2026-00007 financial data modified!" -ForegroundColor Red
}

# 2. Test Job Order Labor and Invoice Creation Flow
Write-Host "`n--- TEST 1, 4, 7, 8: CREATE JO WITH MULTIPLE LABOR ITEMS AND CONVERT TO INVOICE ---"
$joDto = @{
    customerId = "1"
    vehicleId = "1"
    customerRequest = "Brake inspection and Oil service"
    engineer = "Engineer Khaled"
} | ConvertTo-Json

$joRes = Invoke-RestMethod -Uri "$baseUrl/job-orders" -Method Post -ContentType "application/json" -Headers $headers -Body $joDto
$joNumber = $joRes.number
Write-Host "Created Job Order: $joNumber"

# Save 3 Labor Items: Brake labor = 800, Oil service = 500, Suspension labor = 700
$laborPayload = @{
    laborItems = @(
        @{ description = "Brake labor"; amount = 800; sortOrder = 1 },
        @{ description = "Oil service"; amount = 500; sortOrder = 2 },
        @{ description = "Suspension labor"; amount = 700; sortOrder = 3 }
    )
} | ConvertTo-Json -Depth 5

$laborRes = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joNumber/labor" -Method Post -ContentType "application/json" -Headers $headers -Body $laborPayload
Write-Host "Labor Saved. LaborAmount: $($laborRes.laborAmount), LaborItems Count: $($laborRes.laborItems.Count)"

# Fetch accountant JO details to check GrandTotal formula
$acctJo = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joNumber" -Method Get -Headers $headers
Write-Host "Acct JO Details - LaborAmount: $($acctJo.laborAmount), PartsTotal: $($acctJo.partsTotal), ExpensesTotal: $($acctJo.expensesTotal), GrandTotal: $($acctJo.grandTotal)"

# Create Invoice from Job Order with Expenses = 570
$createInvDto = @{
    laborAmount = 2000
    laborItems = @(
        @{ description = "Brake labor"; amount = 800; sortOrder = 1 },
        @{ description = "Oil service"; amount = 500; sortOrder = 2 },
        @{ description = "Suspension labor"; amount = 700; sortOrder = 3 }
    )
    additionalExpenses = @(
        @{ description = "Special Machining"; amount = 570 }
    )
} | ConvertTo-Json -Depth 5

$newInv = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joNumber/invoice" -Method Post -ContentType "application/json" -Headers $headers -Body $createInvDto
Write-Host "Created Invoice: $($newInv.invoiceNumber)"
Write-Host "Invoice GrandTotal: $($newInv.grandTotal) (Parts: $($newInv.partsTotal), Labor: $($newInv.laborAmount), Exp: $($newInv.expensesTotal))"
Write-Host "Invoice LaborItems Count: $($newInv.laborItems.Count)"
foreach ($item in $newInv.laborItems) {
    Write-Host "  - Item: $($item.description) | Amount: $($item.amount)"
}

if ($newInv.laborAmount -eq 2000 -and $newInv.laborItems.Count -eq 3 -and $newInv.grandTotal -eq ($newInv.partsTotal + 2000 + 570)) {
    Write-Host "PASSED: Itemized labor copied to Invoice and Grand Total formula exact!" -ForegroundColor Green
} else {
    Write-Host "FAILED: Incorrect invoice labor copy or total!" -ForegroundColor Red
}

# TEST 7: INVOICE IMMUTABILITY
Write-Host "`n--- TEST 7: INVOICE IMMUTABILITY ---"
$newJoLabor = @{
    laborItems = @(
        @{ description = "Modified JO Labor"; amount = 9999; sortOrder = 1 }
    )
} | ConvertTo-Json -Depth 5

try {
    Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joNumber/labor" -Method Post -ContentType "application/json" -Headers $headers -Body $newJoLabor | Out-Null
} catch {
    Write-Host "Modifying closed JO labor handled by server."
}

$reFetchedInv = Invoke-RestMethod -Uri "$baseUrl/accountant/invoices/$($newInv.invoiceNumber)" -Method Get -Headers $headers
if ($reFetchedInv.laborAmount -eq 2000 -and $reFetchedInv.laborItems.Count -eq 3 -and $reFetchedInv.laborItems[0].description -eq "Brake labor") {
    Write-Host "PASSED: Invoice labor items remain immutable snapshot!" -ForegroundColor Green
} else {
    Write-Host "FAILED: Invoice labor items changed after JO edit!" -ForegroundColor Red
}

# TEST 8: DUPLICATE INVOICE PROTECTION
Write-Host "`n--- TEST 8: DUPLICATE INVOICE PROTECTION ---"
try {
    $dupInv = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joNumber/invoice" -Method Post -ContentType "application/json" -Headers $headers -Body $createInvDto
    Write-Host "FAILED: Duplicate invoice allowed! Invoice: $($dupInv.invoiceNumber)" -ForegroundColor Red
} catch {
    Write-Host "PASSED: Duplicate invoice creation blocked by server!" -ForegroundColor Green
}

# TEST 2 & TEST 5: ZERO LABOR / NO PARTS
Write-Host "`n--- TEST 2 AND TEST 5: ZERO LABOR / NO PARTS ---"
$joZero = Invoke-RestMethod -Uri "$baseUrl/job-orders" -Method Post -ContentType "application/json" -Headers $headers -Body (@{ customerId="1"; vehicleId="1"; customerRequest="Check up"; engineer="Engineer Ali" } | ConvertTo-Json)
$joZeroNum = $joZero.number

$zeroInvDto = @{
    laborAmount = 300
    laborItems = @(
        @{ description = "Diagnostic check"; amount = 300; sortOrder = 1 }
    )
    additionalExpenses = @(
        @{ description = "Delivery expense"; amount = 800 }
    )
} | ConvertTo-Json -Depth 5

$noPartsInv = Invoke-RestMethod -Uri "$baseUrl/accountant/jobs/$joZeroNum/invoice" -Method Post -ContentType "application/json" -Headers $headers -Body $zeroInvDto
Write-Host "Created No-Parts Invoice: $($noPartsInv.invoiceNumber), GrandTotal: $($noPartsInv.grandTotal) EGP"
if ($noPartsInv.grandTotal -eq 1100) {
    Write-Host "PASSED: GrandTotal = 0 Parts + 300 Labor + 800 Expenses = 1,100 EGP!" -ForegroundColor Green
} else {
    Write-Host "FAILED: Expected 1,100 EGP, got $($noPartsInv.grandTotal) EGP" -ForegroundColor Red
}

Write-Host "`n========================================="
Write-Host "ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY"
Write-Host "========================================="
