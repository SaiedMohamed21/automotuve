$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

function Get-Scalar($sql) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $sql
    $res = $cmd.ExecuteScalar()
    if ($res -is [DBNull] -or $res -eq $null) { return 0 }
    return [decimal]$res
}

Write-Host "=================================================="
Write-Host "DASHBOARD SQL DIRECT RECONCILIATION"
Write-Host "==================================================`n"

# 1. Total Collected
$totalCollected = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM Payments"
Write-Host "1. Total Collected: $totalCollected EGP"
Write-Host "   SQL Query: SELECT ISNULL(SUM(Amount), 0) FROM Payments"
Write-Host "   Breakdown: Payments (Id 0: 500.00 + Id 1: 50.00 + Id 2: 175.00) = 725.00 EGP`n"

# 2. Operating Expenses
$genExpRaw = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM Expenses WHERE IsVoided = 0 OR IsVoided IS NULL"
$salaryPaidRaw = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM PayrollTransactions WHERE Type = 'SALARY_PAYMENT'"
$salaryPaidAbs = Get-Scalar "SELECT ISNULL(SUM(ABS(Amount)), 0) FROM PayrollTransactions WHERE Type = 'SALARY_PAYMENT'"
$opExpBuggy = $genExpRaw + $salaryPaidRaw
$opExpCorrect = $genExpRaw + $salaryPaidAbs

Write-Host "2. Operating Expenses:"
Write-Host "   Raw Unvoided Expenses SQL: $genExpRaw EGP"
Write-Host "   Raw Payroll Salary Paid SQL (.Sum(Amount)): $salaryPaidRaw EGP (Negative sign in DB!)"
Write-Host "   Absolute Payroll Salary Paid SQL (.Sum(ABS(Amount))): $salaryPaidAbs EGP"
Write-Host "   Dashboard Formula Result in C# code (5400 + (-200)): $opExpBuggy EGP"
Write-Host "   Correct Formula Result (5400 + 200): $opExpCorrect EGP`n"

# 3. Supplier Purchases
$suppPurchases = Get-Scalar "SELECT ISNULL(SUM(TotalAmount), 0) FROM SupplierPurchases"
Write-Host "3. Supplier Purchases: $suppPurchases EGP"
Write-Host "   SQL Query: SELECT ISNULL(SUM(TotalAmount), 0) FROM SupplierPurchases"
Write-Host "   Breakdown: PUR-2026-00001 (50,000) + PUR-2026-00002 (30,000) + PUR-2026-00003 (25,000) = 105,000.00 EGP`n"

# 4. Total Cash Outflow
$outflowBuggy = $opExpBuggy + $suppPurchases
$outflowCorrect = $opExpCorrect + $suppPurchases
Write-Host "4. Total Cash Outflow:"
Write-Host "   Current Dashboard Value (5,200 + 105,000): $outflowBuggy EGP"
Write-Host "   Corrected Formula Value (5,600 + 105,000): $outflowCorrect EGP`n"

# 5. Unpaid Invoices Amount
$unpaidInv = Get-Scalar "SELECT ISNULL(SUM(GrandTotal - PaidAmount), 0) FROM Invoices WHERE PaymentStatus <> 2"
Write-Host "5. Unpaid Invoices Amount: $unpaidInv EGP"
Write-Host "   SQL Query: SELECT ISNULL(SUM(GrandTotal - PaidAmount), 0) FROM Invoices WHERE PaymentStatus <> 2"
Write-Host "   Breakdown: Invoice Id 0 (GrandTotal: 225.00, PaidAmount: 225.00, Status: Paid) -> 0.00 EGP`n"

# 6. Supplier Outstanding Balance
$suppPaid = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM SupplierPayments"
$suppOutstanding = $suppPurchases - $suppPaid
Write-Host "6. Supplier Outstanding Balance: $suppOutstanding EGP"
Write-Host "   SQL Query: SupplierPurchases ($suppPurchases) - SupplierPayments ($suppPaid)"
Write-Host "   Breakdown: 105,000.00 - 85,000.00 = 20,000.00 EGP`n"

# 7. Technician Salary Balance
$earnings = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM PayrollTransactions WHERE Type IN ('DAILY_EARNING', 'TECHNICIAN_TIP')"
$deductions = Get-Scalar "SELECT ISNULL(SUM(Amount), 0) FROM PayrollTransactions WHERE Type IN ('DEDUCTION', 'ADVANCE_REPAYMENT')"
$salaryPaid = Get-Scalar "SELECT ISNULL(SUM(ABS(Amount)), 0) FROM PayrollTransactions WHERE Type = 'SALARY_PAYMENT'"
$advances = Get-Scalar "SELECT ISNULL(SUM(ABS(Amount)), 0) FROM PayrollTransactions WHERE Type = 'ADVANCE'"
Write-Host "7. Technician Salary Balance:"
Write-Host "   Daily Earnings + Tips: $earnings EGP"
Write-Host "   Advances Given: $advances EGP"
Write-Host "   Advance Repayments: $deductions EGP"
Write-Host "   Salary Paid: $salaryPaid EGP"
Write-Host "   Formula Balance: Max(0, Earnings - Net Advances - Salary Paid) = 400.00 EGP`n"

$conn.Close()
