import express from 'express'
import runPythonCode from "./runners/python_runner.js";
import runJSCode from "./runners/node_runner.js";
import runJavaCode from './runners/java_runner.js';
import runRustCode from './runners/rust_runner.js';
import cors from "cors"

const app = express()
app.use(cors())

app.use(express.json())

const PORT = 3001

app.post("/python", (req, res) => {
  runPythonCode(req.body.code).then(result => {
    res.send(result)
  })

})
app.post("/javascript", (req, res) => {
  runJSCode(req.body.code).then(result => {
    res.send(result)
  })
})
app.post("/java", (req, res) => {
  runJavaCode(req.body.code).then(result => {
    res.send(result)
  })
})
app.post("/rust", (req, res) => {
  runRustCode(req.body.code).then(result => {
    res.send(result)
  })
})
app.listen(PORT, () => console.log('############# POLYCODE RUNNER : '+PORT+' #############'))
