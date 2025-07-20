@echo off
echo ==========================================
echo  🧠 Girgit AI Research Platform Launcher
echo ==========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js found

echo.
echo [2/4] Installing dependencies...
echo Installing root dependencies...
call npm install concurrently

echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install server dependencies
    pause
    exit /b 1
)

echo Installing client dependencies...
cd ../client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install client dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo [3/4] Setting up database...
echo Seeding database with sample data...
cd server
call npm run seed
if %errorlevel% neq 0 (
    echo ⚠️ Database seeding failed, but continuing...
)
cd ..

echo.
echo [4/4] Starting the application...
echo 🚀 Launching Girgit AI Research Platform...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the application
echo.

call concurrently "cd server && npm run dev" "cd client && npm start"

pause
