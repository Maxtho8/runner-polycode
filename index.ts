
import express from 'express'
import runPythonCode from "./runners/python_runner.js";
import runJSCode from "./runners/node_runner.js";
import runJavaCode from './runners/java_runner.js';
import runRustCode from './runners/rust_runner.js';

/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

app.post("/python", (req, res) => {
  runPythonCode('').then(result => {
    res.send(result)
  })

})
app.post("/js", (req, res) => {
  runJSCode('').then(result => {
    res.send(result)
  })
})
app.post("/java", (req, res) => {
  runJavaCode('').then(result => {
    res.send(result)
  })
})
app.post("/rust", (req, res) => {
  runRustCode('').then(result => {
    res.send(result)
  })
})
app.listen(3001, () => console.log('############# Server running on port 3001 #############'))
