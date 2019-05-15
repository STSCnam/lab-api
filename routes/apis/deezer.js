'use strict'

const router = require('express').Router();
const axios = require('axios');
const DEEZER_API_URL = 'https://api.deezer.com/search/album';

router.get('/albums', async (req, res) => {
    try {
        let response = await axios.get(DEEZER_API_URL, {params: {q: req.query.q}});
        res.send(response.data);
    } catch (err) {
        res.send({error: err});
    }
});

module.exports = router;