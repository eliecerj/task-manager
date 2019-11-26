const express = require ('express')
const Task = require('../models/task')  
const router = new express.Router()

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
        
    }
})

router.patch('/tasks/:id',async (req, res) => {

    const updates = Object.keys(req.body) //Return an array of strings
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({ error: 'Invalid Updates'})

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        //no task found by id provided
        if(!task) {
            return res.status(404).send()
        }
        //update went well
        res.send(task)
    } catch (e) {
        //Maybe not connection or validation
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})




module.exports = router