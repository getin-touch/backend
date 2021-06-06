import { join } from 'path';

export default () => ({
  node_env: process.env.NODE_ENV,

  logger: {
    output: 'console',
    fileName: 'logs.ts',
  },

  port: parseInt(process.env.PORT, 10) || 4000,

  database: {
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE,
    name: 'default',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // switch to false after adding migrations
    synchronize: true,

    //set true for auto run before everu launch server
    migrationsRun: false,

    logging: false,
    autoLoadEntities: true,
  },

  graphql: {
    debug: true,
    playground: true,
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/graphqlTypes/graphql.schema.ts'),
      outputAs: 'class',
    },
  },

  jwt: {
    secret: process.env.JWT_SECRET,

    /**
      * How many minutes the accessToken will be active
    */
    accessTime: '1m',

    /**
      * How many mounthes the refreshToken will be active
    */
    refreshTime: 1,
  },

  swagger: {
    title: 'GET-IN-TOUCH',
    description: 'GET-IN-TOUCH API',
    version: '1.0',
    tag: 'get-in-touch',
  },
});