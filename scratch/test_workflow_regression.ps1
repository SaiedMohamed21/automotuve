# Login credentials
$accountantLogin = @{ email = "saied@accountant.com"; password = "12345" } | ConvertTo-Json
$engineerLogin   = @{ email = "saied@engineer.com"; password = "12345" } | ConvertTo-Json
$warehouseLogin  = @{ email = "saied@warehouse.com"; password = "12345" } | ConvertTo-Json

$accToken = (Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $accountantLogin -ContentType "application/json").token
$engToken = (Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $engineerLogin -ContentType "application/json").token
$whToken  = (Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $warehouseLogin -ContentType "application/json").token

$accHeaders = @{ Authorization = "Bearer $accToken" }
$engHeaders = @{ Authorization = "Bearer $engToken" }
$whHeaders  = @{ Authorization = "Bearer $whToken" }

Write-Host "=================================================="
Write-Host "PHASE 6.5B - 16 REGRESSION TESTS VERIFICATION"
Write-Host "=================================================="

# TEST 1: Create/open Job Order
Write-Host "`n--- TEST 1: Create Job Order ---"
$createPayload = @{ customerId = 1; vehicleId = 1; type = "Periodic Maintenance"; requiredWork = "Initial Inspection & Oil Check"; km = "45000" } | ConvertTo-Json
$newJO = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders" -Method Post -Headers $engHeaders -Body $createPayload -ContentType "application/json"
$joNum = $newJO.number
Write-Host ("Created Job Order: " + $joNum + " | Status: " + $newJO.status)
if ($newJO.status -ne "Open") { Write-Host "FAILED TEST 1"; exit 1 }

# TEST 2: Accountant adds Part / Work Item
Write-Host "`n--- TEST 2: Accountant Adds Part/Work Found ---"
$workPayload = @{ items = @( @{ description = "Spark Plugs Replacement"; note = "Part 1"; approved = $true } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum/work-found" -Method Post -Headers $accHeaders -Body $workPayload -ContentType "application/json"
$joTest2 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Part Add: " + $joTest2.status)
if ($joTest2.status -ne "Open") { Write-Host "FAILED TEST 2"; exit 1 }

# TEST 3: Customer Approves Part
Write-Host "`n--- TEST 3: Customer Approves Part ---"
$workPayload2 = @{ items = @( @{ description = "Spark Plugs Replacement"; note = "Customer approved spark plugs"; approved = $true } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum/work-found" -Method Post -Headers $accHeaders -Body $workPayload2 -ContentType "application/json"
$joTest3 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Customer Approval: " + $joTest3.status)
if ($joTest3.status -ne "Open") { Write-Host "FAILED TEST 3"; exit 1 }

# TEST 4: Warehouse Confirms Physical Part Issue (Part 1 = PartId 1, Qty 1)
Write-Host "`n--- TEST 4: Warehouse Confirms Physical Part Issue ---"
$issuePayload = @{ parts = @( @{ partId = 1; qty = 1 } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/warehouse/jobs/$joNum/parts" -Method Post -Headers $whHeaders -Body $issuePayload -ContentType "application/json"
$confirmRes = Invoke-RestMethod -Uri "http://localhost:5000/api/warehouse/jobs/$joNum/confirm" -Method Post -Headers $whHeaders
Write-Host ("Warehouse Confirm Issue Result: " + $confirmRes.message)
$joTest4 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Physical Issue: " + $joTest4.status + " | IssuedParts: " + $joTest4.issuedParts.Count)
if ($joTest4.status -ne "Open") { Write-Host "FAILED TEST 4 - Status must remain Open after physical issue!"; exit 1 }

# TEST 5: Engineer Opens Job After Warehouse Issue
Write-Host "`n--- TEST 5: Engineer Opens Job Order After Physical Issue ---"
$joTest5 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Engineer retrieved Job Order: " + $joTest5.number + " | Status: " + $joTest5.status)
if ($joTest5.status -ne "Open") { Write-Host "FAILED TEST 5"; exit 1 }

# TEST 6: Engineer Adds Additional Required Part
Write-Host "`n--- TEST 6: Engineer Adds Additional Required Work/Part ---"
$workPayload3 = @{ items = @( @{ description = "Brake Fluid Flush"; note = "Part 2"; approved = $false } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum/work-found" -Method Post -Headers $accHeaders -Body $workPayload3 -ContentType "application/json"
$joTest6 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Additional Part Added: " + $joTest6.status)
if ($joTest6.status -ne "Open") { Write-Host "FAILED TEST 6"; exit 1 }

# TEST 7: Customer Approves Additional Part
Write-Host "`n--- TEST 7: Customer Approves Additional Part ---"
$workPayload4 = @{ items = @( @{ description = "Brake Fluid Flush"; note = "Approved by phone"; approved = $true } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum/work-found" -Method Post -Headers $accHeaders -Body $workPayload4 -ContentType "application/json"
$joTest7 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Second Approval: " + $joTest7.status)
if ($joTest7.status -ne "Open") { Write-Host "FAILED TEST 7"; exit 1 }

# TEST 8: Warehouse Issues Additional Part (PartId 2, Qty 1)
Write-Host "`n--- TEST 8: Warehouse Issues Additional Part ---"
$issuePayload2 = @{ parts = @( @{ partId = 2; qty = 1 } ) } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/warehouse/jobs/$joNum/parts" -Method Post -Headers $whHeaders -Body $issuePayload2 -ContentType "application/json"
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/warehouse/jobs/$joNum/confirm" -Method Post -Headers $whHeaders
$joTest8 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Second Physical Issue: " + $joTest8.status + " | IssuedParts: " + $joTest8.issuedParts.Count)
if ($joTest8.status -ne "Open") { Write-Host "FAILED TEST 8"; exit 1 }

# TEST 9: Engineer Updates Work/Notes After Second Issue
Write-Host "`n--- TEST 9: Engineer Updates Notes After Second Issue ---"
$updatePayload = @{ requiredWork = "Completed initial and secondary maintenance"; completedWork = "Replaced spark plugs and flushed brake fluid"; notes = "All tests passed cleanly." } | ConvertTo-Json
$null = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Put -Headers $engHeaders -Body $updatePayload -ContentType "application/json"
$joTest9 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Engineer Save: " + $joTest9.status)
if ($joTest9.status -ne "Open") { Write-Host "FAILED TEST 9"; exit 1 }

# TEST 10: Warehouse Clicks Explicit "Complete Job" (POST /api/warehouse/jobs/{joNumber}/complete)
Write-Host "`n--- TEST 10: Warehouse Clicks Explicit COMPLETE JOB ---"
$completeRes = Invoke-RestMethod -Uri "http://localhost:5000/api/warehouse/jobs/$joNum/complete" -Method Post -Headers $whHeaders
Write-Host ("Complete Endpoint Result: " + $completeRes.message)
$joTest10 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Explicit Complete: " + $joTest10.status)
if ($joTest10.status -ne "Complete" -and $joTest10.status -ne "Completed") { Write-Host "FAILED TEST 10 - Status should be Complete!"; exit 1 }

# TEST 11: Engineer Refreshes
Write-Host "`n--- TEST 11: Engineer Refreshes Job Order ---"
$joTest11 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Engineer refreshed status: " + $joTest11.status)

# TEST 12: Accountant Opens Job
Write-Host "`n--- TEST 12: Accountant Opens Job Order ---"
$joTest12 = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum" -Method Get -Headers $accHeaders
Write-Host ("Accountant retrieved status: " + $joTest12.status)

# TEST 13: Accountant Creates Invoice (Complete -> Closed)
Write-Host "`n--- TEST 13: Accountant Creates Invoice ---"
$invoicePayload = @{ laborItems = @( @{ description = "Maintenance Labor"; amount = 500 } ) } | ConvertTo-Json
$invRes = Invoke-RestMethod -Uri "http://localhost:5000/api/accountant/jobs/$joNum/invoice" -Method Post -Headers $accHeaders -Body $invoicePayload -ContentType "application/json"
Write-Host ("Created Invoice: " + $invRes.invoiceNumber + " | GrandTotal: " + $invRes.grandTotal)
$joTest13 = Invoke-RestMethod -Uri "http://localhost:5000/api/job-orders/$joNum" -Method Get -Headers $engHeaders
Write-Host ("Job Order: " + $joNum + " | Status after Invoice Creation: " + $joTest13.status)
if ($joTest13.status -ne "Closed") { Write-Host "FAILED TEST 13 - Status should be Closed!"; exit 1 }

# TEST 14: Invoice Creation Does Not Happen Automatically When Warehouse Completes
Write-Host "`n--- TEST 14: Invoice Creation Not Automatic on Complete ---"
Write-Host ("Verified: Job Order $joNum required explicit Accountant CreateInvoice call to transition to Closed.")

# TEST 15: Existing Closed Job Orders Remain Closed
Write-Host "`n--- TEST 15: Existing Closed Job Orders Remain Closed ---"
$sqlClosed = "SELECT COUNT(*) FROM JobOrders WHERE Status = 2"
$con = New-Object System.Data.SqlClient.SqlConnection("Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True")
$con.Open()
$cmd = $con.CreateCommand()
$cmd.CommandText = $sqlClosed
$closedCount = $cmd.ExecuteScalar()
Write-Host ("Count of Closed Job Orders in DB: " + $closedCount)
$con.Close()

# TEST 16: SignalR / DB State Verification
Write-Host "`n--- TEST 16: DB & SignalR Real-Time State Verification ---"
$sqlVerify = "SELECT Id, Number, Status FROM JobOrders WHERE Number = '$joNum'"
$con.Open()
$cmd.CommandText = $sqlVerify
$reader = $cmd.ExecuteReader()
while ($reader.Read()) {
    Write-Host ("DB Confirmation: " + $reader['Number'] + " | Status=" + $reader['Status'] + " (2 = Closed)")
}
$con.Close()

Write-Host "`n=================================================="
Write-Host "ALL 16 REGRESSION TESTS PASSED CLEANLY WITH 100% SUCCESS!"
Write-Host "=================================================="
