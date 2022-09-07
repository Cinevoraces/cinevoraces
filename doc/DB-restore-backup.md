# Restore Database backup

## Import from Heroku db

First DL encrypted backups from Heroku.
Pass it into the container (facultative).
Be sure that the OWNER has the same name as the automatically generated owner of Heroku DB. In this particular case, the role is vrrvgmztjptfrg.
Use the command :
```
pg_restore -U vrrvgmztjptfrg -d cinevoraces /data/cinevoraces_backup
```