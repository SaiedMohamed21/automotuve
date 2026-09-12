$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$tx = $conn.BeginTransaction()

try {
    Write-Host "=================================================="
    Write-Host "CLEANING UP FINAL E2E SMOKE TEST RECORDS"
    Write-Host "==================================================`n"

    function Exec-Sql($sql) {
        $cmd = $conn.CreateCommand()
        $cmd.Transaction = $tx
        $cmd.CommandText = $sql
        $affected = $cmd.ExecuteNonQuery()
        return $affected
    }

    # 1. Customer Payments
    $payDel = Exec-Sql "DELETE FROM Payments WHERE Id IN (7, 8)"
    Write-Host "Deleted $payDel Payments."

    # 2. Additional Expenses
    $addExpDel = Exec-Sql "DELETE FROM AdditionalExpenses WHERE JobOrderId = 7"
    Write-Host "Deleted $addExpDel AdditionalExpenses."

    # 3. Invoices
    $invDel = Exec-Sql "DELETE FROM Invoices WHERE JobOrderId = 7"
    Write-Host "Deleted $invDel Invoices."

    # 4. Issued Parts & Stock Movements
    $issuedPartsDel = Exec-Sql "DELETE FROM IssuedParts WHERE JobOrderId = 7"
    $smDel = Exec-Sql "DELETE FROM StockMovements WHERE Reference = 'JO-2026-00001'"
    Write-Host "Deleted $issuedPartsDel IssuedParts and $smDel StockMovements."

    # 5. Restore Part 4 Quantity to 118
    $partRestore = Exec-Sql "UPDATE Parts SET CurrentQty = 118 WHERE Id = 4"
    Write-Host "Restored Part 4 stock quantity to 118."

    # 6. Work Items & Service Histories
    $workItemsDel = Exec-Sql "DELETE FROM JobOrderWorkItems WHERE JobOrderId = 7"
    $serviceHistDel = Exec-Sql "DELETE FROM ServiceHistories WHERE JobOrderNumber = 'JO-2026-00001'"
    Write-Host "Deleted $workItemsDel JobOrderWorkItems and $serviceHistDel ServiceHistories."

    # 7. Job Orders
    $joDel = Exec-Sql "DELETE FROM JobOrders WHERE Id = 7"
    Write-Host "Deleted $joDel JobOrders."

    # 8. Vehicles & Customers
    $vehDel = Exec-Sql "DELETE FROM Vehicles WHERE Id = 5"
    $custDel = Exec-Sql "DELETE FROM Customers WHERE Id = 6"
    Write-Host "Deleted $vehDel Vehicles and $custDel Customers."

    # COMMIT TRANSACTION
    $tx.Commit()
    Write-Host "`n=================================================="
    Write-Host "FINAL SMOKE TEST CLEANUP COMMITTED SUCCESSFULLY!"
    Write-Host "=================================================="
} catch {
    $tx.Rollback()
    Write-Host "`n=================================================="
    Write-Host "FINAL SMOKE TEST CLEANUP ROLLED BACK DUE TO ERROR: $_"
    Write-Host "=================================================="
    exit 1
} finally {
    $conn.Close()
}
