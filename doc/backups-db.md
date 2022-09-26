# Regular db backups : how to make then and export them to an external cloud solution

## 1 - PostgreSQL backups
### A - Create postgreSQL databases backups
```zsh
# Creating a backup
cd ~/cinevoraces && source .env && cd data/backups && today=`date +%Y-%m-%d.%H:%M:%S` &&  docker exec -u ${DB_USER} cinevoraces_postgres_1 pg_dump ${DB_NAME} > backup_$today.gz
```
### B - Full script for local backups managements (crontab)
```zsh
# Deleting the oldest backup in folder
rm "$(ls -t | tail -1)"
```
## 2 - Upload toward Gdrive cloud
### A - Third party Library
[Prasmussen GDrive API](https://github.com/prasmussen/gdrive)
Get the last version
```zsh
wget latest_archive_url
```
At the time this documentation was written, the latest version was 2.1.1 (May 2021).
[2.1.1](https://github.com/prasmussen/gdrive/releases/download/2.1.1/gdrive_2.1.1_linux_386.tar.gz)
Unzip it
```zsh
tar -xvf archive
```
Authentication step
```zsh
./gdrive about
```
Just C/C the auth key shown at the URL pointed out.

Cherry picked documentation items :

- Upload file from directory
```
gdrive [global] upload [options] <path>

global:
  -c, --config <configDir>         Application path, default: /Users/<user>/.gdrive
  --refresh-token <refreshToken>   Oauth refresh token used to get access token (for advanced users)
  --access-token <accessToken>     Oauth access token, only recommended for short-lived requests because of short lifetime (for advanced users)
  --service-account <accountFile>  Oauth service account filename, used for server to server communication without user interaction (file is relative to config dir)
  
options:
  -r, --recursive               Upload directory recursively
  -p, --parent <parent>         Parent id, used to upload file to a specific directory, can be specified multiple times to give many parents
  --name <name>                 Filename
  --description <description>   File description
  --no-progress                 Hide progress
  --mime <mime>                 Force mime type
  --share                       Share file
  --delete                      Delete local file when upload is successful
  --timeout <timeout>           Set timeout in seconds, use 0 for no timeout. Timeout is reached when no data is transferred in set amount of seconds, default: 300
  --chunksize <chunksize>       Set chunk size in bytes, default: 8388608
```

- Sync local directory to drive
```
gdrive [global] sync upload [options] <path> <fileId>

global:
  -c, --config <configDir>         Application path, default: /Users/<user>/.gdrive
  --refresh-token <refreshToken>   Oauth refresh token used to get access token (for advanced users)
  --access-token <accessToken>     Oauth access token, only recommended for short-lived requests because of short lifetime (for advanced users)
  --service-account <accountFile>  Oauth service account filename, used for server to server communication without user interaction (file is relative to config dir)
  
options:
  --keep-remote             Keep remote file when a conflict is encountered
  --keep-local              Keep local file when a conflict is encountered
  --keep-largest            Keep largest file when a conflict is encountered
  --delete-extraneous       Delete extraneous remote files
  --dry-run                 Show what would have been transferred
  --no-progress             Hide progress
  --timeout <timeout>       Set timeout in seconds, use 0 for no timeout. Timeout is reached when no data is transferred in set amount of seconds, default: 300
  --chunksize <chunksize>   Set chunk size in bytes, default: 8388608
```

Syncing option may be ressource consumming and may not be recommended at this time.

In this example, gdrive is installed in debian directory. To use it, you must call it by :
```zsh
./gdrive <command>
```
### B - Getting ID from the storage folder on Google drive

First recover Backups folder ID :
```zsh
./gdrive list
```
### C - Use it to upload backups in it :

```zsh
./gdrive upload -p 1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd cinevoraces/data/backups/backup_name
```
### D - Delete the oldest backup to get some room in drive folder
```zsh
# Save backups ids in a log file
./gdrive list -q "'1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd' in parents" --order "createdTime asc" | sed -rn 's/([0-9A-Za-z_\-]+)\s.*/\1/p' > list.log
# Scrapping the oldest one
oldest_backup_id=$(sed -e '1d' -e '1p' list.log)
# Removing it
./gdrive delete $oldest_backup_id
# Removing the list.log file
rm list.log
```
## 3 - TL:DR - Final script to perform the regular backups with 2 different saving locations
```zsh
cd ~/cinevoraces && source .env && cd data/backups && today=`date +%Y-%m-%d.%H:%M:%S` &&  docker exec -u ${DB_USER} cinevoraces_postgres_1 pg_dump ${DB_NAME} > backup_$today.gz
echo 'Backup done'
rm "$(ls -t | tail -1)"
echo 'Oldest backup deleted'
./gdrive upload -p 1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd cinevoraces/data/backups/`backup_$today.gz`
echo 'Backup uploaded on Google Drive'
./gdrive list -q "'1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd' in parents" --order "createdTime asc" | sed -rn 's/([0-9A-Za-z_\-]+)\s.*/\1/p' > list.log
oldest_backup_id=$(sed -e '1d' -e '1p' list.log)
./gdrive delete $oldest_backup_id
rm list.log
echo 'Oldest backup removed from drive'
```

## 4 - Restore the db from a backup

## (Old) - Restore Database backup for Heroku hosting specifically
### Import from Heroku db

First DL encrypted backups from Heroku.
Pass it into the container (facultative).
Be sure that the OWNER has the same name as the automatically generated owner of Heroku DB. In this particular case, the role is vrrvgmztjptfrg.
Use the command :
```
pg_restore -U vrrvgmztjptfrg -d cinevoraces /data/cinevoraces_backup
```