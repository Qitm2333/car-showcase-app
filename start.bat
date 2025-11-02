@echo off
chcp 65001 >nul
echo ========================================
echo 正在启动开发服务器...
echo ========================================
echo.
echo 请稍候，浏览器将自动打开...
echo 如果浏览器没有自动打开，请手动访问：
echo http://localhost:5173
echo.
echo 按 Ctrl+C 可以停止服务器
echo ========================================
echo.

npm run dev

pause

