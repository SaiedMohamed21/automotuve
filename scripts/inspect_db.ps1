$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

function Get-SqlData($query) {
    try {
        $cmd = $conn.CreateCommand()
        $cmd.CommandText = $query
        $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
        $ds = New-Object System.Data.DataSet
        [void]$adapter.Fill($ds)
        return $ds.Tables[0]
    } catch {
        Write-Host "Error running query [$query]: $_"
        return $null
    }
}

$tables = Get-SqlData "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'"

foreach ($t in $tables) {
    $tableName = $t.TABLE_NAME
    Write-Host "`n=========================================="
    Write-Host "TABLE: $tableName"
    Write-Host "=========================================="
    $data = Get-SqlData "SELECT * FROM [$tableName]"
    if ($data -ne $null -and $data.Rows.Count -gt 0) {
        $data | Format-Table -AutoSize
    } else {
        Write-Host "(0 rows or empty table)"
    }
}

$conn.Close()
