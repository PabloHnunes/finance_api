FROM node:21-alpine3.18

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN chmod +x run_project.sh

RUN cp .env.dev .env
RUN apk upgrade --update-cache --available
RUN apk --no-cache add curl
RUN apk add openssl
RUN openssl genpkey -algorithm RSA -out public.key && openssl rsa -pubout -in public.key -out private.key
RUN openssl genpkey -algorithm RSA -out public_refresh.key && openssl rsa -pubout -in public_refresh.key -out private.refresh.key
RUN rm -rf /var/cache/apk/*
RUN npm install

CMD ["sh", "./run_project.sh"]