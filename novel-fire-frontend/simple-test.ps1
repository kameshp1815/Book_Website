Write-Host "Starting API Test..." -ForegroundColor Cyan

# Start backend server
Write-Host "Starting backend server..." -ForegroundColor Yellow
$backendPath = "../novel-fire-backend"
cd $backendPath
$job = Start-Job -ScriptBlock { node server.js }
Start-Sleep -Seconds 5

# Test basic connectivity
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -UseBasicParsing
    Write-Host "Server Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Server test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test books endpoint
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/books" -UseBasicParsing
    Write-Host "Books API Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "Books API failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Cleanup
Stop-Job -Job $job
Remove-Job -Job $job
cd ../novel-fire-frontend
Write-Host "Test complete!" -ForegroundColor Green