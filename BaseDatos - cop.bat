@echo off
echo Ejecutando archivo .sql...

REM Intentar con el puerto 8080
start /b "" cmd /c "timeout /t 10 /nobreak && taskkill /f /im mysql.exe" & C:\xampp\mysql\bin\mysql.exe -h localhost -P 8080 -u root --password= < archivo.sql
IF %ERRORLEVEL% NEQ 0 (
    REM Si falla, esperar 5 segundos y luego intentar con el puerto 3306
    timeout /t 5 /nobreak >nul
    start /b "" cmd /c "timeout /t 10 /nobreak && taskkill /f /im mysql.exe" & C:\xampp\mysql\bin\mysql.exe -h localhost -P 3306 -u root --password= < archivo.sql
    IF %ERRORLEVEL% NEQ 0 (
        echo Error: No se pudo conectar a MySQL en ninguno de los puertos.
        exit /b 1
    )
)

REM Continuar con el resto del script
cd %~dp0 && npm run inicio 
