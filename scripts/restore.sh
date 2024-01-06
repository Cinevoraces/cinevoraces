#!/bin/bash

echo 'Please enter a backup name, without the .tar extension. The tar archive must be placed inside data/backups folder, on host.'
read
source .env && cd data/backups
echo "Unzipping backup archive..."
tar -xvf ./$REPLY.tar 
docker exec api rm -rf public
docker cp ./$REPLY/public api:/api
docker exec postgres pg_restore -c --no-owner -v -U ${POSTGRES_USER} -d ${POSTGRES_DB} data/backups/$REPLY/database_$REPLY
rm -rf $REPLY
echo 'Backup restore achieved.'