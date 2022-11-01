const {Pool} = require('pg');

const pool = new Pool({
  user:'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

let values = [`%${process.argv[2]}%`];
let queryString = `
  SELECT DISTINCT teachers.name as teacher, cohorts.name as cohorts
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;
  `;


pool.query(queryString, values)
.then(res => {
  res.rows.forEach(x => {
    console.log(`${x.cohorts}: ${x.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));