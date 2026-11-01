@echo off
cd /d "%~dp0"
start "xiaobu-server" /min python -m http.server 5173 --bind 127.0.0.1
timeout /t 1 >nul
start "" "http://127.0.0.1:5173/"
echo.
echo   xiaobu is running at http://127.0.0.1:5173/
echo   close the minimized console window to stop it.
echo.