const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const ArmyList = require('./horus-heresy-army');

router.post('/', async (req, res) => {
    let list = req.body;
    list.userId = req.user._id;
    const listInserted = await new ArmyList(list).save();
    res.status(200).send(listInserted);
});

router.get('/:id?', async (req, res) => {
    if(req.params.id){
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(500).send();
            return;
        }
        const list = await ArmyList.findOne({_id: new mongoose.Types.ObjectId(req.params.id)});
        if(!list){
            res.status(404).send();
        } else {
            res.status(200).send(list);
        }
        return;
    } 
    const lists = await ArmyList.find({ userId: req.user._id });
    res.status(200).send(lists);
});

router.delete('/:id', async (req, res) => {
    await ArmyList.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id)});
    res.status(200).send();
});


module.exports = router;