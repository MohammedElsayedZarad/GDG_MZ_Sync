#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Advanced Code Review Agent - Quick Start Script (Linux/macOS)
# ═══════════════════════════════════════════════════════════════

set -e

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   Advanced Code Review Agent - Quick Start               ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "[ERROR] .env file not found!"
    echo ""
    echo "Please create a .env file with your API keys:"
    echo "  1. Copy .env.example to .env"
    echo "  2. Add your DAYTONA_API_KEY"
    echo "  3. Add your GOOGLE_API_KEY"
    echo ""
    echo "Get API keys from:"
    echo "  - Daytona: https://daytona.io"
    echo "  - Google: https://makersuite.google.com/app/apikey"
    echo ""
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed"
    echo "Please install Python 3.8+ from https://python.org"
    exit 1
fi

echo "[✓] Python found: $(python3 --version)"
echo ""

# Check if dependencies are installed
echo "[INFO] Checking dependencies..."
if ! python3 -c "import fastapi, uvicorn, daytona, langchain" 2>/dev/null; then
    echo "[INFO] Installing dependencies..."
    pip3 install -r requirements.txt
    echo "[✓] Dependencies installed"
else
    echo "[✓] Dependencies already installed"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Starting Backend Server..."
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "API will be available at: http://localhost:8000"
echo "API docs will be at:       http://localhost:8000/docs"
echo "Health check at:            http://localhost:8000/health"
echo ""
echo "[INFO] Starting server..."
echo "[INFO] Press Ctrl+C to stop the server"
echo ""
echo "═══════════════════════════════════════════════════════════"
echo ""

# Start the server
python3 -m uvicorn api:app --reload --port 8000
