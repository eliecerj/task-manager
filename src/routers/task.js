const express = require ('express')
const Task = require('../models/task')
const User = require('../models/user')
const auth = require('../middleware/auth')  
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
                ...req.body, 
                owner: req.user._id
            })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
        
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {        
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()        
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id}) 

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
        
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body) //Return an array of strings
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({ error: 'Invalid Updates'})

    try {

        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        //no task found by id provided
        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        //update went well
        res.send(task)
    } catch (e) {
        //Maybe not connection or validation
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req,res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})




module.exports = router