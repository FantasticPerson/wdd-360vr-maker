@echo off
echo MAKE PANO (FLAT) droplet

IF "%~1" == "" GOTO ERROR
IF NOT EXIST "%~1" GOTO ERROR

"%~dp0\krpanotools.exe" makepano "%~dp0\templates\flat.config" %*
GOTO DONE

:ERROR
echo.
echo Drag and drop panoramic images on this droplet to create 
echo automatically flat multiresolution panoramas from it.

:DONE
echo.
pause
