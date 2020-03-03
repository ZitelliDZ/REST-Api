const express = require ('express');
const router = express.Router();


//npm i node-fetch
const fetch = require ('node-fetch');

router.get('/', async (req , res) =>{

    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const users = await response.json();
    console.log(users);
    res.json(users);
});



module.exports = router;