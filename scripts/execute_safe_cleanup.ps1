$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$tx = $conn.BeginTransaction()

try {
    Write-Host "=================================================="
    Write-Host "STARTING TRANSACTIONAL TEST DATA CLEANUP"
    Write-Host "==================================================`n"

    function Exec-Sql($sql) {
        $cmd = $conn.CreateCommand()
        $cmd.Transaction = $tx
        $cmd.CommandText = $sql
        $affected = $cmd.ExecuteNonQuery()
        return $affected
    }

    function Query-Scalar($sql) {
        $cmd = $conn.CreateCommand()
        $cmd.Transaction = $tx
        $cmd.CommandText = $sql
        return $cmd.ExecuteScalar()
    }

    # STEP A: TEST USERS
    Write-Host "--- STEP A: TEST USERS CLEANUP ---"
    $targetUserIds = "'a2098a6f-c6c1-44e2-bece-7d6bae9aa75e', '5c620ef0-3327-4d68-9b9b-c0141b80dd76', 'd410a6c8-29f7-4800-a1c6-c0a280f98678'"
    $userRolesDeleted = Exec-Sql "DELETE FROM AspNetUserRoles WHERE UserId IN ($targetUserIds)"
    $usersDeleted = Exec-Sql "DELETE FROM AspNetUsers WHERE Id IN ($targetUserIds)"
    Write-Host "Deleted $userRolesDeleted AspNetUserRoles rows and $usersDeleted AspNetUsers rows."

    # STEP B: SUPPLIERS & PURCHASES & PAYMENTS
    Write-Host "`n--- STEP B: SUPPLIERS & PURCHASES & PAYMENTS CLEANUP ---"
    $purItemsDel = Exec-Sql "DELETE FROM SupplierPurchaseItems WHERE PurchaseId IN (1, 2, 3)"
    $suppTxDel = Exec-Sql "DELETE FROM SupplierAccountTransactions WHERE Id IN (1, 2, 3, 4, 5, 6, 7)"
    $suppPayDel = Exec-Sql "DELETE FROM SupplierPayments WHERE Id IN (1, 2, 3, 4)"
    $suppPurDel = Exec-Sql "DELETE FROM SupplierPurchases WHERE Id IN (1, 2, 3)"
    $suppDel = Exec-Sql "DELETE FROM Suppliers WHERE Id IN (1, 2)"
    Write-Host "Deleted $purItemsDel SupplierPurchaseItems, $suppTxDel AccountTx, $suppPayDel Payments, $suppPurDel Purchases, $suppDel Suppliers."

    # STEP C: EXPENSES
    Write-Host "`n--- STEP C: EXPENSES CLEANUP ---"
    $expDel = Exec-Sql "DELETE FROM Expenses WHERE Id IN (1, 2, 3, 4, 5)"
    Write-Host "Deleted $expDel Expenses."

    # STEP D: INVOICES & CUSTOMER PAYMENTS
    Write-Host "`n--- STEP D: INVOICES & CUSTOMER PAYMENTS CLEANUP ---"
    $payDel = Exec-Sql "DELETE FROM Payments WHERE Id IN (0, 1, 2)"
    $invDel = Exec-Sql "DELETE FROM Invoices WHERE Id = 0"
    Write-Host "Deleted $payDel Customer Payments and $invDel Invoices."

    # STEP E: JOB ORDERS & WORK ITEMS & SERVICE HISTORIES
    Write-Host "`n--- STEP E: JOB ORDERS & DEPENDENCIES CLEANUP ---"
    $workItemsDel = Exec-Sql "DELETE FROM JobOrderWorkItems WHERE JobOrderId IN (2, 3, 4)"
    $serviceHistDel = Exec-Sql "DELETE FROM ServiceHistories WHERE JobOrderNumber IN ('JO-2026-00001', 'JO-2026-00002', 'JO-2026-00003')"
    $jobOrdersDel = Exec-Sql "DELETE FROM JobOrders WHERE Id IN (2, 3, 4)"
    Write-Host "Deleted $workItemsDel WorkItems, $serviceHistDel ServiceHistories, $jobOrdersDel JobOrders."

    # STEP F: PAYROLL TRANSACTIONS
    Write-Host "`n--- STEP F: PAYROLL TRANSACTIONS CLEANUP ---"
    $payTxDel = Exec-Sql "DELETE FROM PayrollTransactions WHERE Id IN ('tx-3e4c3f5d', 'tx-ed73baed', 'tx-f320afc1')"
    Write-Host "Deleted $payTxDel PayrollTransactions."

    # STEP G: TEST INVENTORY & STOCK MOVEMENTS
    Write-Host "`n--- STEP G: TEST INVENTORY & STOCK MOVEMENTS CLEANUP ---"
    $smDel = Exec-Sql "DELETE FROM StockMovements WHERE Id IN (3, 4, 5, 6, 7, 8, 9, 10)"
    $partsDel = Exec-Sql "DELETE FROM Parts WHERE Id IN (6, 7)"
    Write-Host "Deleted $smDel StockMovements and $partsDel Parts."

    # VERIFY PRESERVED DATA STILL EXISTS BEFORE COMMITTING
    Write-Host "`n--- VERIFYING PRESERVED DATA INTEGRITY ---"
    $ownerCount = Query-Scalar "SELECT COUNT(*) FROM AspNetUsers WHERE Id = '3b8dc3bb-8679-4fdc-b544-3d929322d7a3'"
    $adminCount = Query-Scalar "SELECT COUNT(*) FROM AspNetUsers WHERE Id = 'b7fc2a77-46cc-481d-882c-c7a79adbe747'"
    $acctCount = Query-Scalar "SELECT COUNT(*) FROM AspNetUsers WHERE Id = 'ecb559ca-72c7-4c23-8652-7bbbbf0ac653'"
    $whCount = Query-Scalar "SELECT COUNT(*) FROM AspNetUsers WHERE Id = '8a46cdce-38b2-4d34-a825-06096fe2a310'"
    $engCount = Query-Scalar "SELECT COUNT(*) FROM AspNetUsers WHERE Id = 'eac0b8f5-aa10-4650-8a0e-ccbdc182bea4'"
    $partsCount = Query-Scalar "SELECT COUNT(*) FROM Parts WHERE Id IN (4, 5)"

    Write-Host "Counts -> Owner: $ownerCount, Admin: $adminCount, Accountant: $acctCount, Warehouse: $whCount, Engineer: $engCount, Parts: $partsCount"

    if ($ownerCount -lt 1 -or $adminCount -lt 1 -or $acctCount -lt 1 -or $whCount -lt 1 -or $engCount -lt 1 -or $partsCount -lt 2) {
        throw "Integrity check failed! Counts: Owner=$ownerCount, Admin=$adminCount, Accountant=$acctCount, Warehouse=$whCount, Engineer=$engCount, Parts=$partsCount"
    }

    # COMMIT TRANSACTION
    $tx.Commit()
    Write-Host "`n=================================================="
    Write-Host "TRANSACTION COMMITTED SUCCESSFULLY!"
    Write-Host "=================================================="
} catch {
    $tx.Rollback()
    Write-Host "`n=================================================="
    Write-Host "TRANSACTION ROLLED BACK DUE TO ERROR: $_"
    Write-Host "=================================================="
    exit 1
} finally {
    $conn.Close()
}
