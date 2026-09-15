$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Invoices' AND COLUMN_NAME = 'DiscountAmount'"
$val = $cmd.ExecuteScalar()

if ($val) {
    Write-Host "Column DiscountAmount already exists in Invoices table."
} else {
    Write-Host "Adding DiscountAmount column to Invoices table..."
    $alterCmd = $conn.CreateCommand()
    $alterCmd.CommandText = "ALTER TABLE [Invoices] ADD [DiscountAmount] decimal(18,2) NOT NULL DEFAULT 0.00;"
    $alterCmd.ExecuteNonQuery()
    Write-Host "Successfully added DiscountAmount column to Invoices table."
}

$conn.Close()
