@echo off
setlocal
cd /d %~dp0
FOR /F "tokens=* delims=" %%G IN (../.env) DO SET "%%G"
cd ..\data\backups
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set today=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%.%datetime:~8,2%_%datetime:~10,2%_%datetime:~12,2%
mkdir backup_%today%
docker exec postgres pg_dump -U %POSTGRES_USER% -F c -v -Z 9 %POSTGRES_DB% > backup_%today%\database_backup_%today%
docker cp api:/api/public .\backup_%today%\public
tar -cvf .\backup_%today%.tar .\backup_%today%
rd /s /q .\backup_%today%
echo "Backup completed => data\backups\backup_%today%.tar"
endlocal