$sql = @"
DELETE FROM Payments WHERE Id IN (14, 15, 16, 17);
UPDATE Invoices SET PaidAmount = 0, PaymentStatus = 0 WHERE InvoiceNumber = 'INV-2026-00008';
"@

$con = New-Object System.Data.SqlClient.SqlConnection("Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True")
$con.Open()
$cmd = $con.CreateCommand()
$cmd.CommandText = $sql
$cmd.ExecuteNonQuery() | Out-Null
Write-Host "Reset INV-2026-00008 test invoice back to unpaid state."
$con.Close()
