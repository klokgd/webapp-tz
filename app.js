const express = require('express');
const db = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const { Umzug, SequelizeStorage } = require('umzug');

// const runMigrationsAndSeeders = require('./utils/migrationsRunner');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRoutes);

const sequelize = db.sequelize;
const migrationUmzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const seedUmzug = new Umzug({
  migrations: { glob: 'seeders/*.js' },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrationsAndSeeders() {
  try {
    console.log('Running migrations...');
    await migrationUmzug.up();
    console.log('Migrations executed successfully.');
    await seedUmzug.up();
    console.log('Seeders executed successfully.');
  } catch (error) {
    console.error('Error during migrations or seeders:', error);
    process.exit(1);
  }
}


async function startServer() {
  try {
    await runMigrationsAndSeeders()
    await db.sequelize.authenticate();
    console.log('Database connected.');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
