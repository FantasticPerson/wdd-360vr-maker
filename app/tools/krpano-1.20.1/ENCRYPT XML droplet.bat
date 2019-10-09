@echo off
echo ENCRYPT XML droplet
echo.

"%~dp0\krpanotools.exe" encrypt -bk %*

echo.
pause
