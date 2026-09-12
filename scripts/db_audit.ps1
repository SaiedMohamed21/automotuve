$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

function Query-Table($sql) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $sql
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $dataset = New-Object System.Data.DataSet
    [void]$adapter.Fill($dataset)
    return $dataset.Tables[0]
}

Write-Host "=================================================="
Write-Host "STAR AUTO CENTER — DATABASE READ-ONLY AUDIT"
Write-Host "==================================================`n"

# 1. Users
Write-Host "--- 1. USERS (AspNetUsers) ---"
$users = Query-Table "SELECT Id, UserName, Email, FullName, Role, CreatedAt FROM AspNetUsers"
$users | Format-Table -AutoSize

# 2. Customers
Write-Host "`n--- 2. CUSTOMERS (Customers) ---"
$customers = Query-Table "SELECT Id, Name, Phone, VehicleModel, LicensePlate FROM Customers"
$customers | Format-Table -AutoSize

# 3. Vehicles
Write-Host "`n--- 3. VEHICLES (Vehicles) ---"
$vehicles = Query-Table "SELECT Id, LicensePlate, Make, Model, Year, CustomerId FROM Vehicles"
$vehicles | Format-Table -AutoSize

# 4. Job Orders
Write-Host "`n--- 4. JOB ORDERS (JobOrders) ---"
$jobOrders = Query-Table "SELECT Id, OrderNumber, CustomerName, VehicleLicensePlate, Status, TotalAmount, CreatedAt FROM JobOrders"
$jobOrders | Format-Table -AutoSize

# 5. Job Order Items (Services & Parts)
Write-Host "`n--- 5. JOB ORDER ITEMS (JobOrderItems) ---"
$jobItems = Query-Table "SELECT Id, JobOrderId, ItemType, Description, Quantity, UnitPrice, TotalPrice FROM JobOrderItems"
$jobItems | Format-Table -AutoSize

# 6. Invoices
Write-Host "`n--- 6. INVOICES (Invoices) ---"
$invoices = Query-Table "SELECT Id, InvoiceNumber, JobOrderId, CustomerName, TotalAmount, PaidAmount, RemainingBalance, Status, IssueDate FROM Invoices"
$invoices | Format-Table -AutoSize

# 7. Payments
Write-Host "`n--- 7. PAYMENTS (Payments) ---"
$payments = Query-Table "SELECT Id, InvoiceId, Amount, Method, PaymentDate, Notes FROM Payments"
$payments | Format-Table -AutoSize

# 8. Suppliers
Write-Host "`n--- 8. SUPPLIERS (Suppliers) ---"
$suppliers = Query-Table "SELECT Id, Name, ContactPerson, Phone, Email, Address, Balance FROM Suppliers"
$suppliers | Format-Table -AutoSize

# 9. Supplier Purchases
Write-Host "`n--- 9. SUPPLIER PURCHASES (SupplierPurchases) ---"
$purchases = Query-Table "SELECT Id, PurchaseNumber, SupplierId, TotalAmount, PaidAmount, Status, OrderDate FROM SupplierPurchases"
$purchases | Format-Table -AutoSize

# 10. Supplier Payments
Write-Host "`n--- 10. SUPPLIER PAYMENTS (SupplierPayments) ---"
$suppPayments = Query-Table "SELECT Id, SupplierId, PurchaseId, Amount, Method, PaymentDate, Notes FROM Suppliers"
$suppPayments | Format-Table -AutoSize

# 11. Expenses
Write-Host "`n--- 11. EXPENSES (Expenses) ---"
$expenses = Query-Table "SELECT Id, Title, Category, Amount, Date, Notes, RecordedBy FROM Expenses"
$expenses | Format-Table -AutoSize

# 12. Technicians
Write-Host "`n--- 12. TECHNICIANS (Technicians) ---"
$techs = Query-Table "SELECT Id, Name, DailyRate, CurrentBalance FROM Technicians"
$techs | Format-Table -AutoSize

# 13. Attendance
Write-Host "`n--- 13. ATTENDANCE (AttendanceRecords) ---"
$attendance = Query-Table "SELECT Id, TechnicianId, Date, Status FROM AttendanceRecords"
$attendance | Format-Table -AutoSize

# 14. Payroll Transactions
Write-Host "`n--- 14. PAYROLL TRANSACTIONS (PayrollTransactions) ---"
$payrollTx = Query-Table "SELECT Id, TechnicianId, Date, Type, Amount, Note FROM PayrollTransactions"
$payrollTx | Format-Table -AutoSize

# 15. Parts / Inventory
Write-Host "`n--- 15. PARTS / INVENTORY (Parts) ---"
$parts = Query-Table "SELECT Id, PartNumber, Name, UnitPrice, CostPrice, QuantityInStock, MinStockLevel FROM Parts"
$parts | Format-Table -AutoSize

$conn.Close()
