const express = require("express");
const router = express.Router()
const {User}= require('../models/user')


// get all users data
router.get('/', async(req, res) => {
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        res.send('Error'+error)
    }
})

// create users data
router.post('/', async(req, res) => {
        const data = new User({
        employee_name: req.body.employee_name,
        employee_Mobile: req.body.employee_Mobile,
        employee_Email: req.body.employee_Email,
        employee_Address: req.body.employee_Address,
    })
    try {
        const a1 = await data.save()
        res.json(a1)
    } catch (error) {
        res.send('Error'+error)
    }
})

// Get a user by id
router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch( error ){
        res.status(404).json({ message: error.message })
    }
})

// Update users data
router.patch('/:id', async(req, res) => {
    try {

        const updates = req.body;
        const options = {new:true}
        const rslt = await User.findByIdAndUpdate(req.params.id, updates, options)
        
        res.json(rslt)
    } catch (error) {
        res.send('ERROR'+error)
    }
})

// delete users data
router.delete('/:id', async(req, res) => {
    try {
        const rslt = await User.findByIdAndDelete(req.params.id)
        
        res.json(rslt)
    } catch (error) {
        res.send('ERROR'+error)
    }
})

module.exports = router;