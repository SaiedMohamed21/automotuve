$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

$cmd = $conn.CreateCommand()
$cmd.CommandText = "SELECT * FROM Invoices"
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
$ds = New-Object System.Data.DataSet
[void]$adapter.Fill($ds)

Write-Host "Invoices Table Count: $($ds.Tables[0].Rows.Count)"
$ds.Tables[0] | Format-Table -AutoSize

$conn.Close()
