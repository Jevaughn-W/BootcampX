SELECT cohorts.name, avg(completed_at - started_at) as average_assitance_time
  FROM assistance_requests
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  GROUP BY cohorts.name
  ORDER BY average_assitance_time ASC;