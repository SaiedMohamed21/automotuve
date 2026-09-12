$connStr = "Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;TrustServerCertificate=True"
$conn = New-Object System.Data.SqlClient.SqlConnection($connStr)
$conn.Open()

function Get-TableData($query) {
    $cmd = $conn.CreateCommand()
    $cmd.CommandText = $query
    $adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
    $ds = New-Object System.Data.DataSet
    [void]$adapter.Fill($ds)
    return $ds.Tables[0]
}

$tables = Get-TableData "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' ORDER BY TABLE_NAME"

$outPath = "c:\Users\saied mohamed\Desktop\Saied\project\Engineer Job Order\scripts\full_db_dump.txt"
"==================================================" | Out-File -FilePath $outPath -Encoding ascii
"STAR AUTO CENTER - FULL DATABASE INVENTORY AUDIT" | Out-File -FilePath $outPath -Encoding ascii -Append
"==================================================" | Out-File -FilePath $outPath -Encoding ascii -Append

foreach ($t in $tables) {
    $tableName = $t.TABLE_NAME
    $header1 = "`n=========================================="
    $header2 = "TABLE: $tableName"
    $header3 = "=========================================="
    $header1 | Out-File -FilePath $outPath -Encoding ascii -Append
    $header2 | Out-File -FilePath $outPath -Encoding ascii -Append
    $header3 | Out-File -FilePath $outPath -Encoding ascii -Append
    $data = Get-TableData "SELECT * FROM [$tableName]"
    if ($data -ne $null -and $data.Rows.Count -gt 0) {
        $data | Format-Table -AutoSize | Out-String | Out-File -FilePath $outPath -Encoding ascii -Append
    } else {
        "[0 rows]" | Out-File -FilePath $outPath -Encoding ascii -Append
    }
}

$conn.Close()
Write-Host "Database inventory dumped successfully to $outPath"
