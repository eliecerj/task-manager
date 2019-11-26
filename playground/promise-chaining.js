require('../src/db/mongoose')
const User = require('../src/models/user')

//5dcf68d845836c073376c464

// User.findByIdAndUpdate('5dce0a0a6a2ec8041d3cc0a4', { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5dce0a0a6a2ec8041d3cc0a4', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})