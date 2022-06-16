const mongoose = require("mongoose");
module.exports = mongoose.model("ArmyList", mongoose.Schema({
    userId: mongoose.ObjectId,
    name: String,
    total: Number,
    hq: Array,
    troops: Array,
    elites: Array,
    fastAttack: Array,
    heavySupport: Array
}, {timestamps: true}));