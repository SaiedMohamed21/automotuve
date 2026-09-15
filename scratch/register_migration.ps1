$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = "IF NOT EXISTS (SELECT 1 FROM __EFMigrationsHistory WHERE MigrationId = '20260916003500_AddInvoiceDiscount') INSERT INTO __EFMigrationsHistory (MigrationId, ProductVersion) VALUES ('20260916003500_AddInvoiceDiscount', '8.0.2')"
$cmd.ExecuteNonQuery()
Write-Host "Inserted migration 20260916003500_AddInvoiceDiscount into __EFMigrationsHistory."
$conn.Close()
