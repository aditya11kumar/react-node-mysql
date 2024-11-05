const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()
const port = 5500

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'trainee'
})

db.connect(err => {
  if (err) {
    console.log('Connection Failed')
    return
  }
  console.log('Database Connected')
  return
})

app.post('/saveTrainee', function (req, res) {
  console.log(req.body)
  const {name, email, experience, techstack, phone, empId} = req.body
  console.log(name, email, experience, techstack, phone, empId);
  const sql = `insert into employee (name, email, experience, techstack, phone, empId) values (?,?,?,?,?,?)`
  db.query(sql,[name, email, experience, techstack, phone, empId], (err, result)=>{
    if(err){
        console.log(err);
        
        return res. status(500).send('Error inserting Database')
    }
    res.send('Data Saved successfully')
  })
})

app.get('/employeeData', (req, res)=>{
    const sql = 'select * from employee';
    console.log('wwwww');
    
    db.query(sql, (err, result)=>{
        if(err){
            return res.status(500).send('Error fetching data');
        }
        res.json(result)
    })
})
app.get('/empData/:empId', (req, res)=>{
    const empId = +req.params.empId
    console.log(empId);
    
    const sql = 'select * from employee where empId = ?';
    
    db.query(sql,[empId], (err, result)=>{
        if(err){
            return res.status(500).send('Error fetching data');
        }
        console.log(result);
    
        res.json(result)
    })
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
