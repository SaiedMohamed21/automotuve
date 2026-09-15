$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True;"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()
$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT Email, UserName, Role FROM AspNetUsers"
$r = $cmd.ExecuteReader()
while ($r.Read()) {
    Write-Host "User:" $r["Email"] "Role:" $r["Role"]
}
$conn.Close()
