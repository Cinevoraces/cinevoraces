#!/bin/bash

backup_files=$(ls ./data/backups)
source .env

if [ -z "$backup_files" ]; then
    echo "No backup files found."
    return 0
fi

echo "Please select a backup file to restore:"

select backup_file in $backup_files Cancel; do
    case $backup_file in
        Cancel )
            echo "Operation cancelled."
            exit
            ;;
        * )
            if [ -n "$backup_file" ]; then
                tar -xvf "./data/backups/${backup_file}" -C ./data/backups
                sudo docker exec api "/bin/bash rm -rf /api/public"
                sudo docker cp "./data/backups/${backup_file%.*}/public" api:/api
                sudo docker exec -i postgres pg_restore -c --no-owner -v -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" < "./data/backups/${backup_file%.*}/database_${backup_file%.*}"
                rm -rf "./data/backups/${backup_file%.*}"
                echo "Database restored."
                exit
            else echo "Invalid archive."
            fi
            ;;
    esac
done