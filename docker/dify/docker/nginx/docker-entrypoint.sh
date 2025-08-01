#!/bin/bash

HTTPS_CONFIG=''

if [ "${NGINX_HTTPS_ENABLED***REMOVED***" = "true" ]; then
    # Check if the certificate and key files for the specified domain exist
    if [ -n "${CERTBOT_DOMAIN***REMOVED***" ] && \
       [ -f "/etc/letsencrypt/live/${CERTBOT_DOMAIN***REMOVED***/${NGINX_SSL_CERT_FILENAME***REMOVED***" ] && \
       [ -f "/etc/letsencrypt/live/${CERTBOT_DOMAIN***REMOVED***/${NGINX_SSL_CERT_KEY_FILENAME***REMOVED***" ]; then
        SSL_CERTIFICATE_PATH="/etc/letsencrypt/live/${CERTBOT_DOMAIN***REMOVED***/${NGINX_SSL_CERT_FILENAME***REMOVED***"
        SSL_CERTIFICATE_KEY_PATH="/etc/letsencrypt/live/${CERTBOT_DOMAIN***REMOVED***/${NGINX_SSL_CERT_KEY_FILENAME***REMOVED***"
    else
        SSL_CERTIFICATE_PATH="/etc/ssl/${NGINX_SSL_CERT_FILENAME***REMOVED***"
        SSL_CERTIFICATE_KEY_PATH="/etc/ssl/${NGINX_SSL_CERT_KEY_FILENAME***REMOVED***"
    fi
    export SSL_CERTIFICATE_PATH
    export SSL_CERTIFICATE_KEY_PATH

    # set the HTTPS_CONFIG environment variable to the content of the https.conf.template
    HTTPS_CONFIG=$(envsubst < /etc/nginx/https.conf.template***REMOVED***
    export HTTPS_CONFIG
    # Substitute the HTTPS_CONFIG in the default.conf.template with content from https.conf.template
    envsubst '${HTTPS_CONFIG***REMOVED***' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
fi
export HTTPS_CONFIG

if [ "${NGINX_ENABLE_CERTBOT_CHALLENGE***REMOVED***" = "true" ]; then
    ACME_CHALLENGE_LOCATION='location /.well-known/acme-challenge/ { root /var/www/html; ***REMOVED***'
else
    ACME_CHALLENGE_LOCATION=''
fi
export ACME_CHALLENGE_LOCATION

env_vars=$(printenv | cut -d= -f1 | sed 's/^/$/g' | paste -sd, -***REMOVED***

envsubst "$env_vars" < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
envsubst "$env_vars" < /etc/nginx/proxy.conf.template > /etc/nginx/proxy.conf

envsubst "$env_vars" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx using the default entrypoint
exec nginx -g 'daemon off;'
