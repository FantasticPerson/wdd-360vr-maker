@echo off
echo MAKE VTOUR (MULTIRES) droplet

IF "%~1" == "" GOTO ERROR
IF NOT EXIST "%~1" GOTO ERROR

"%~dp0\krpanotools.exe" makepano "%~dp0\templates\vtour-multires.config" %*
GOTO DONE

:ERROR
echo.
echo Drag and drop several panoramic images on this droplet to create 
echo automatically a virtual tour with multires panos.

:DONE
echo.
pause
