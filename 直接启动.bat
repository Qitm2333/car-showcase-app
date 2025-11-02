@echo off
chcp 65001 >nul
cls
echo ========================================
echo 启动开发服务器
echo ========================================
echo.

REM 直接使用绝对路径
cd /d "%~dp0"

echo 当前目录: %CD%
echo.

if not exist "package.json" (
    echo ✗ 错误：找不到 package.json
    echo 当前目录：%CD%
    pause
    exit /b 1
)

echo ✓ 找到 package.json
echo.
echo 正在启动服务器...
echo 浏览器将自动打开 http://localhost:5173
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

npm run dev

pause

