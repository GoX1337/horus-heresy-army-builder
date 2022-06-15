const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("req.user", req.user);
    res.status(200).send({msg: "hi"});
});

module.exports = router;