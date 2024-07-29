import { client } from "..";

const run = async () => {
  try {
    await client.connect();

    await client.query(`
      DROP TABLE IF EXISTS tasks CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;

      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log(`table is generated`);
    console.log(`testing... if we can send query`);

    const data = await client.query(`SELECT * FROM projects;`);

    console.log(
      `currently the project in database is ${JSON.stringify(data.rows)}`
    );

    console.log(`Successfully the table is generated and confirmed!`);
  } catch (err) {
    console.error(`Oh no... something has gone wrong see the error: ${err}`);
  }
};

run().then(() => client.end());
