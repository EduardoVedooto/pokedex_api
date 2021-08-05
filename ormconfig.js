require('dotenv').config();

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/entities/*.*`],
  migrations: ['./dist/migrations/*.js'],
  cli: {
    entitiesDir: './dist/entities',
    migrationsDir: './src/migrations',
  },
};