const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('students page');
});

module.exports = router;
