$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT COUNT(*) as cnt, SUM(Amount) as total FROM Payments"
$r = $cmd.ExecuteReader()
if ($r.Read()) {
    Write-Host "DB Payments Count:" $r["cnt"] "Total Amount:" $r["total"]
}
$conn.Close()
