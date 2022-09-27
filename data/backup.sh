#!/bin/bash
# -*- ENCODING: UTF-8 -*-

source cinevoraces/.env && cd cinevoraces/data/backups && today=`date +%Y-%m-%d.%H:%M:%S` &&  docker exec -u ${DB_USER} cinevoraces_postgres_1 pg_dump ${DB_NAME} > backup_$today.gz
echo 'Backup done'
path=cinevoraces/data/backups/backup_$today.gz
echo 'The path for the backup is stored in $path variable'
cd ~ && ./gdrive upload -p 1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd $path
echo 'Backup uploaded on Google Drive'
./gdrive list --query " '1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd' in parents" > backups_list.out
echo 'List of backups saved in backups_list.out'
echo 'Number of remote backups: '$(wc -l backups_list.out | cut -d " " -f1)
if [ $(wc -l backups_list.out | cut -d " " -f1) -lt 11 ]
  then
    echo 'Less than 10 backups saved, keeping previous backups.'
  else
    echo '10 backups already saved, deletion needed.'
    rm "cinevoraces/data/backups/$(ls -t cinevoraces/data/backups | tail -1)"
    echo 'Oldest backup deleted locally'
    ./gdrive list -q "'1hsYajdLcGhAHKx0qNb-2FGvAwD978Zzd' in parents" --order "createdTime asc" | sed -rn 's/([0-9A-Za-z_\-]+)\s.*/\1/p' > list.log
    oldest_backup_id=$(sed -n '2p' list.log)
    echo $oldest_backup_id
    ./gdrive delete $oldest_backup_id
    rm list.log
    echo 'Oldest backup removed from drive'
fi
rm backups_list.out