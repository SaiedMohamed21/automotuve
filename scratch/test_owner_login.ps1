$baseUrl = "http://localhost:5000/api"
$loginBody = @{
    email = "saied@owner.com"
    password = "12345"
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -ContentType "application/json" -Body $loginBody
Write-Host "Login Result:"
Write-Host "User Email: $($res.user.email)"
Write-Host "User Name:  $($res.user.fullName)"
Write-Host "Role:       $($res.user.role)"
Write-Host "Token:      $($res.token.Substring(0, 30))..."
