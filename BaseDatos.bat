
@echo off
echo Ejecutando archivo .sql...
C:\xampp\mysql\bin\mysql.exe -h localhost:8080 -u root --password=  <  archivo.sql || exit
cd %~dp0 && npm run inicio && exit


