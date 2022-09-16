# Obtention et renouvellement des certificats HTTPS

## Documentation
[Documentation certbot](https://certbot.eff.org/instructions?ws=nginx&os=osx)
[Tuto Mindser Blog](https://mindsers.blog/post/https-using-nginx-certbot-docker/)
[Repos GitHub distribution Nginx avec certbot](https://github.com/JonasAlfredsson/docker-nginx-certbot)

## Pour établir le certificat à la main sur un terminal quelconque :
```
openssl genrsa -out ./cinevoraces-key.pem 2048`
openssl req -new -sha256 -key ./cinevoraces-key.pem -out ./cinevoraces-csr.pem`
openssl x509 -days 7300 -req -in ./cinevoraces-csr.pem -signkey ./cinevoraces-key.pem -out ./cinevoraces-cert.pem`
```

## Pour établir le certificat initial dans un environnement docker :
```
docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d cinevoraces.fr
```

## Renouveler le certificat :
```
docker-compose run --rm certbot renew
```

À utiliser avec un crontab pour automatiser le renouvellement.
