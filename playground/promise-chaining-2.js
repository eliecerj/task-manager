require('../src/db/mongoose')
const Task = require('../src/models/task')


// Task.findByIdAndDelete('5dd5dde6ed8b950451f83d5c').then((task) => {
//     // return console.log('hola')
//     console.log(task) // its not neccesary 
//     return Task.countDocuments({ completed: false }).then((completed) => {
//         console.log('There are ' + completed + ' tasks!')
//     })
// }).catch((e) => {
//     console.log('There was an error ' + e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5dce00f3b3b19403bc6f4f9d').then((result) => {
    console.log('There are ' + result + ' incompleted tasks')
}).catch((e) => {
    console.log(e)
})