export default {
  'type': 'mysql',
  'synchronize': false,
  'logging': false,
  'seeds': ['dist/data/seeds/**/*.js'],
  'factories': ['dist/data/factories/**/*.js'],
  'entities': [
    'dist/data/models/**/*.js'
  ],
  'migrations': [
    'dist/data/models/**/*.js'
  ],
  'migrationsTableName': 'migrations',
  'subscribers': [
    'dist/data/models/**/*.js'
  ],
  'cli': {
    'migrationsDir': 'src/data/migrations',
    'entitiesDir': 'src/data/models',
    'subscribersDir': 'src/data/subscribers'
  },
  'keepConnectionAlive': true,
  'bigNumberStrings': false,
  'extra': {
    'connectionLimit': 4
  },
  'host': process.env.DB_HOST,
  'username': process.env.DB_USER,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_NAME,
  'port': process.env.DB_PORT
}