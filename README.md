## Description

Server for Get-in-touch that based on [Nest](https://github.com/nestjs/nest) framework.

## Before using

1) install mysql server
2) install pm2 globally (not used yet but it will be included to the project later)
   
```bash
$ npm install pm2 -g
```

3) add .env
4) run below code 

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stop server

```bash
$ pm2 stop <name>
```

## Instructions for deploy the server

1) run the server on a production mode

```bash
$ npm run start:prod
```

