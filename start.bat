@echo off
echo ========================================
echo   EarthPulse - Starting Application
echo ========================================
echo.

REM Check if backend is already running
netstat -ano | findstr :8000 >nul
if %errorlevel% == 0 (
    echo Backend is already running on port 8000
) else (
    echo Starting Backend Server...
    start "EarthPulse Backend" cmd /k "cd backend && python -m uvicorn app.main:app --host localhost --port 8000 --reload"
    timeout /t 3 /nobreak >nul
)

REM Check if frontend is already running
netstat -ano | findstr :3000 >nul
if %errorlevel% == 0 (
    echo Frontend is already running on port 3000
) else (
    echo Starting Frontend Server...
    start "EarthPulse Frontend" cmd /k "npm run dev"
    timeout /t 5 /nobreak >nul
)

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/api/docs
echo.
echo Press any key to exit...
pause >nul

