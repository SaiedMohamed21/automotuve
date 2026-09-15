$ErrorActionPreference = "Stop"

$connectionString = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT p.Id, p.Amount, p.Method, p.Date, p.Note, i.InvoiceNumber, j.Number, cust.Name FROM Payments p LEFT JOIN Invoices i ON p.InvoiceId = i.Id LEFT JOIN JobOrders j ON i.JobOrderId = j.Id LEFT JOIN Customers cust ON j.CustomerId = cust.Id ORDER BY p.Id DESC"

$reader = $cmd.ExecuteReader()
Write-Host "=== PAYMENTS TABLE DUMP ==="
$count = 0
while ($reader.Read()) {
    $count++
    $id = $reader.GetValue(0)
    $amount = $reader.GetValue(1)
    $method = $reader.GetValue(2)
    $date = $reader.GetValue(3)
    $note = if ($reader.IsDBNull(4)) { "" } else { $reader.GetValue(4) }
    $invNum = if ($reader.IsDBNull(5)) { "" } else { $reader.GetValue(5) }
    $joNum = if ($reader.IsDBNull(6)) { "" } else { $reader.GetValue(6) }
    $cust = if ($reader.IsDBNull(7)) { "" } else { $reader.GetValue(7) }

    Write-Host "Payment #$id | Amount: $amount | Method (enum int): $method | Date: $date | Inv#: $invNum | JO#: $joNum | Customer: $cust | Note: $note"
}
$reader.Close()
Write-Host "Total Payments found: $count"

Write-Host "`n=== INVOICES TABLE DUMP ==="
$cmd2 = $conn.CreateCommand()
$cmd2.CommandText = "SELECT i.Id, i.InvoiceNumber, i.GrandTotal, i.PaidAmount, i.PaymentStatus, j.Number FROM Invoices i LEFT JOIN JobOrders j ON i.JobOrderId = j.Id ORDER BY i.Id DESC"
$reader2 = $cmd2.ExecuteReader()
$invCount = 0
while ($reader2.Read()) {
    $invCount++
    $id = $reader2.GetValue(0)
    $invNum = $reader2.GetValue(1)
    $gt = $reader2.GetValue(2)
    $paid = $reader2.GetValue(3)
    $st = $reader2.GetValue(4)
    $joNum = if ($reader2.IsDBNull(5)) { "" } else { $reader2.GetValue(5) }
    Write-Host "Invoice #$id | Inv#: $invNum | GrandTotal: $gt | PaidAmount: $paid | PaymentStatus: $st | JO#: $joNum"
}
$reader2.Close()
Write-Host "Total Invoices found: $invCount"

$conn.Close()
