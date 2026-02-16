@echo off
REM ═══════════════════════════════════════════════════════════════
REM Advanced Code Review Agent - Quick Start Script (Windows)
REM ═══════════════════════════════════════════════════════════════

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║   Advanced Code Review Agent - Quick Start               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check if .env file exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo.
    echo Please create a .env file with your API keys:
    echo   1. Copy .env.example to .env
    echo   2. Add your DAYTONA_API_KEY
    echo   3. Add your GOOGLE_API_KEY
    echo.
    echo Get API keys from:
    echo   - Daytona: https://daytona.io
    echo   - Google: https://makersuite.google.com/app/apikey
    echo.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://python.org
    pause
    exit /b 1
)

echo [✓] Python found
echo.

REM Check if dependencies are installed
echo [INFO] Checking dependencies...
python -c "import fastapi, uvicorn, daytona, langchain" >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installing dependencies...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [✓] Dependencies installed
) else (
    echo [✓] Dependencies already installed
)

echo.
echo ═══════════════════════════════════════════════════════════
echo Starting Backend Server...
echo ═══════════════════════════════════════════════════════════
echo.
echo API will be available at: http://localhost:8001
echo API docs will be at:       http://localhost:8001/docs
echo Health check at:            http://localhost:8001/health
echo.
echo [INFO] Starting server in 3 seconds...
echo [INFO] Press Ctrl+C to stop the server
timeout /t 3 >nul

echo.
echo ═══════════════════════════════════════════════════════════
echo.

REM Start the server
uvicorn api:app --reload --port 8001
