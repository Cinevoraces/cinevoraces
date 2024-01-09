@echo off
setlocal
cd /d %~dp0
FOR /F "tokens=* delims=" %%G IN (../.env) DO SET "%%G"
cd ..\\data\\backups

:: Check if there are any .tar files in the directory
dir /b *.tar > nul 2>&1
if errorlevel 1 (
    echo No backup files found to restore.
    goto :eof
)

:: List all .tar files and ask the user to enter a backup name
echo Available backups:
for /R %%i in (*.tar) do echo %%~ni
echo Please enter a backup name, without the .tar extension:
set /p REPLY=

echo Unzipping backup archive...
tar -xvf .\%REPLY%.tar 
docker exec api rm -rf public
docker cp .\%REPLY%\public api:/api
docker cp .\%REPLY%\database_%REPLY% postgres:/database_%REPLY%
docker exec postgres pg_restore -c --no-owner -v -U %POSTGRES_USER% -d %POSTGRES_DB% /database_%REPLY%
rd /s /q .\%REPLY%
echo Backup restore achieved.
endlocal