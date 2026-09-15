$sql = @"
SELECT 
    j.Id, 
    j.Number, 
    j.Status, 
    j.Date, 
    j.Engineer,
    (SELECT COUNT(*) FROM JobOrderWorkItems wi WHERE wi.JobOrderId = j.Id) AS WorkItemCount,
    (SELECT COUNT(*) FROM IssuedParts ip WHERE ip.JobOrderId = j.Id) AS IssuedPartCount,
    (SELECT COUNT(*) FROM Invoices inv WHERE inv.JobOrderId = j.Id) AS InvoiceCount
FROM JobOrders j
ORDER BY j.Id DESC
"@

$con = New-Object System.Data.SqlClient.SqlConnection("Server=DESKTOP-7SICAF1\SQLEXPRESS;Database=StarAutoCenter;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True")
$con.Open()
$cmd = $con.CreateCommand()
$cmd.CommandText = $sql
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
$dt = New-Object System.Data.DataTable
$adapter.Fill($dt) | Out-Null

Write-Host "=== JOB ORDERS SUMMARY ==="
$dt | Format-Table -AutoSize | Out-String | Write-Host

# Detail of recent job orders
$sqlDetail = @"
SELECT 
    j.Number, 
    j.Status,
    CASE j.Status WHEN 0 THEN 'Open' WHEN 1 THEN 'Complete' WHEN 2 THEN 'Closed' ELSE 'Unknown' END AS StatusName,
    p.Name AS PartIssuedName,
    ip.Qty AS IssuedQty,
    inv.InvoiceNumber
FROM JobOrders j
LEFT JOIN IssuedParts ip ON ip.JobOrderId = j.Id
LEFT JOIN Parts p ON ip.PartId = p.Id
LEFT JOIN Invoices inv ON inv.JobOrderId = j.Id
WHERE j.Id >= (SELECT MAX(Id) - 10 FROM JobOrders)
ORDER BY j.Id DESC
"@

$cmd.CommandText = $sqlDetail
$dtDetail = New-Object System.Data.DataTable
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($cmd)
$adapter.Fill($dtDetail) | Out-Null

Write-Host "=== RECENT JOB ORDERS DETAILED (PARTS & INVOICE) ==="
$dtDetail | Format-Table -AutoSize | Out-String | Write-Host

$con.Close()
