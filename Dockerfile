FROM node:21-alpine3.18

WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN chmod +x run_project.sh

RUN apk upgrade --update-cache --available
RUN apk --no-cache add curl
RUN apk add openssl
RUN openssl genpkey -algorithm RSA -out private.key && openssl rsa -pubout -in private.key -out private.refresh.key
RUN rm -rf /var/cache/apk/*
RUN npm install

ENV DATABASE_URL             "postgresql://postgres:postgres@localhost:5432/finance-db"
ENV PORT                      8085
ENV PRIVATE_KEY_PATH          ../../../private.key
ENV PRIVATE_REFRESH_KEY_PATH  ../../../private.refresh.key

EXPOSE 8085

CMD ["sh", "./run_project.sh"]