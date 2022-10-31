const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

let userInput = process.argv

let cohortName = userInput[2];
let limit = userInput[3];
let values = [`%${cohortName}%`, limit];
let queryString = `
  SELECT students.id, students.name, cohorts.name as cohort_name
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;


pool.query(queryString,values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`)
  })
})
.catch(err => console.error('query error', err.stack));