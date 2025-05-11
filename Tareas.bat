@echo off
cd /D %~dp0
start "" "C:\xampp\xampp-control.exe"
@echo off
echo Iniciando Apache...
cd C:\xampp
start /B apache_start.bat

echo Iniciando FileZilla...
cd C:\xampp
start /B filezilla_start.bat

echo Iniciando MySQL...
cd C:\xampp\
start /B mysql_start.bat

echo Todos los servicios han sido iniciados.

cd %~dp0
npm run inicio