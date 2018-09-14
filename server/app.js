const express = require('express')
const cors = require('cors')
const axios = require('axios')
// let PythonShell = require('python-shell')
const spawn = require('child_process').spawn;
const app = express()
const port = 4200

let pyscript_path = 'reddit_pred.py'

var uint8arrayToString = function (data) {
  return String.fromCharCode.apply(null, data);
};


app.use(cors())
app.use(express.json());       // to support JSON-encoded bodies

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.get('/hi', (request, response) => {
  response.send('sup!')
})

app.post('/getsubrs', (req, res)=>{
  console.log(req.body)
  // let subr0 = req.body.subr0
  // let subr1 = req.body.subr1
  // axios.get('http://localhost:5000/')
  // .then(response=> res.send(response.data))
  axios.post('http://localhost:5000/getsubrs', req.body)
  .then(response =>{
    console.log(response.data)
    res.send(response.data)
    
  })
  
})
// app.post('/getsubrs', (req, res) => {
//   let subr0 = req.body.subr0
//   let subr1 = req.body.subr1
//   console.log("Got input: "+ subr0 + " " + subr1)
//   let scriptExecution = spawn('python', [pyscript_path, subr0, subr1]);

//   scriptExecution.stdout.on('data', (data) => {
//     // console.log(data)

//     var str = uint8arrayToString(data);
//     // var obj = 
//     // console.log(str[0])
//     // res.send(JSON.stringify(data))
//     res.json(str)//uint8arrayToString(data))
//   });

//   // Handle error output
//   scriptExecution.stderr.on('data', (data) => {
//     // As said before, convert the Uint8Array to a readable string.
//     console.log(uint8arrayToString(data));
//   });

//   scriptExecution.on('exit', (code) => {
//     console.log("Process quit with code : " + code);
//   });
// })

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})