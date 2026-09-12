$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

function Get-SqlDataTable($query) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $query
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $ds = New-Object System.Data.DataSet
    [void]$adapter.Fill($ds)
    return $ds.Tables[0]
}

Write-Host "=================================================="
Write-Host "DEEP FINANCIAL RECONCILIATION & DISCREPANCY AUDIT"
Write-Host "==================================================`n"

# 1. EXPENSES TABLE DETAILS
Write-Host "--- 1. RAW EXPENSES TABLE ---"
$expenses = Get-SqlDataTable "SELECT Id, ExpenseNumber, Category, Description, Amount, IsVoided, PaymentMethod, ExpenseDate FROM Expenses"
$expenses | Format-Table -AutoSize

$expUnvoidedSum = Get-SqlDataTable "SELECT SUM(Amount) AS UnvoidedTotal FROM Expenses WHERE IsVoided = 0 OR IsVoided IS NULL"
Write-Host "RAW SQL SUM of unvoided Expenses: $($expUnvoidedSum.UnvoidedTotal)`n"

# 2. PAYROLL TRANSACTIONS DETAILS
Write-Host "--- 2. RAW PAYROLL TRANSACTIONS TABLE ---"
$payroll = Get-SqlDataTable "SELECT Id, TechnicianId, Date, Type, Amount, Notes, Status, Reason FROM PayrollTransactions"
$payroll | Format-Table -AutoSize

$salaryPaidSum = Get-SqlDataTable "SELECT SUM(Amount) AS SalaryPaidTotal FROM PayrollTransactions WHERE Type = 'SALARY_PAYMENT'"
Write-Host "RAW SQL SUM of SALARY_PAYMENT PayrollTransactions: $($salaryPaidSum.SalaryPaidTotal)`n"

# 3. PAYMENTS TABLE DETAILS
Write-Host "--- 3. RAW PAYMENTS TABLE ---"
$payments = Get-SqlDataTable "SELECT Id, InvoiceId, Amount, PaymentDate, Method, Notes FROM Payments"
$payments | Format-Table -AutoSize

$paymentsSum = Get-SqlDataTable "SELECT SUM(Amount) AS TotalCollected FROM Payments"
Write-Host "RAW SQL SUM of Payments (Total Collected): $($paymentsSum.TotalCollected)`n"

# 4. INVOICES TABLE DETAILS
Write-Host "--- 4. RAW INVOICES TABLE ---"
$invoices = Get-SqlDataTable "SELECT Id, InvoiceNumber, JobOrderId, CustomerName, GrandTotal, TotalAmount, PaidAmount, RemainingBalance, PaymentStatus FROM Invoices"
$invoices | Format-Table -AutoSize

# 5. SUPPLIER PURCHASES & PAYMENTS
Write-Host "--- 5. RAW SUPPLIER PURCHASES TABLE ---"
$purchases = Get-SqlDataTable "SELECT Id, PurchaseNumber, SupplierId, TotalAmount, PaidAmount, Status FROM SupplierPurchases"
$purchases | Format-Table -AutoSize
$purchasesSum = Get-SqlDataTable "SELECT SUM(TotalAmount) AS SupplierPurchasesTotal FROM SupplierPurchases"
Write-Host "RAW SQL SUM of Supplier Purchases: $($purchasesSum.SupplierPurchasesTotal)`n"

Write-Host "--- 6. RAW SUPPLIER PAYMENTS TABLE ---"
$suppPayments = Get-SqlDataTable "SELECT Id, PaymentNumber, SupplierId, PurchaseId, Amount, PaymentMethod FROM SupplierPayments"
$suppPayments | Format-Table -AutoSize
$suppPaymentsSum = Get-SqlDataTable "SELECT SUM(Amount) AS SupplierPaymentsTotal FROM SupplierPayments"
Write-Host "RAW SQL SUM of Supplier Payments: $($suppPaymentsSum.SupplierPaymentsTotal)`n"

$conn.Close()
