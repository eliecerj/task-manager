const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are dsisabled')
//     }else{
//         next()
//     }
// })

app.use((req, res, next) => {
        res.status(503).send('Maintenance, so fuck off')
})
//Automaticly parse json from requests
app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const jwt = require('jsonwebtoken')

const equis = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse', { expiresIn: '1 day'})
    console.log(token)
    
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}


equis()