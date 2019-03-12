#!/bin/bash

openssl req -x509 -newkey rsa:4096 -keyout private-key.pem -out certificate.pem -days 365 -nodes -subj '/CN=tweek'
chmod go-rwx *.pem
ssh-keygen -y -f private-key.pem > public_ssh
openssl pkcs12 -export -nodes -noiter -in certificate.pem -out certificate.pfx -nokeys -name "Tweek" -passout pass:

mkdir -p ssh
mv private-key.pem ssh/id_rsa # ssh private key
mv public_ssh ssh/id_rsa.pub # ssh public key
rm certificate.pem # use certificate.pfx

echo Basic Authentication password:
cat ssh/id_rsa | base64 -w 0 | md5sum | cut -d " " -f1 \
    | python -c 'import sys;print sys.stdin.read().rstrip("\r\n").decode("hex")' | base64
