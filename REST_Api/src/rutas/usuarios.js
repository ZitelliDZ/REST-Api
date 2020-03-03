const express = require ('express');
const router = express.Router();

const sql = require('../database');

const { check, validationResult } = require('express-validator');

//npm install mssql
//https://www.tutorialsteacher.com/nodejs/access-sql-server-in-nodejs

// routes
router.get('/',(req, res) => { 

    var request = new sql.Request();

    request.query('SELECT * FROM Usuario', (err,rows,field) =>{
        if(err){
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{
            // send records as a response
            res.json(rows.recordset);
        }
    });
});

router.post('/',[
    check('Nombre').isLength({ min: 3 , max: 255 }),
    check('Apellido').isLength({ min: 3 , max: 255 }),
    check('Email').isLength({ min: 3 , max: 50 }),
    check('Estado').isLength({ min: 3 , max: 255 }),
], (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    const {Nombre} = req.body;
    const {Apellido} = req.body;
    const {Email} = req.body;
    const {Estado} = req.body;

    
    // create Request object
    var request = new sql.Request();
            
    // query to the database and get the records
    request.query(`insert into Usuario (nombre,apellido,email,estado) values ('${Nombre}','${Apellido}','${Email}','${Estado}')`, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                      
            // send records as a response
            res.send('Éxito');
        }
    });       
});


router.put('/' ,[
    check('idUsuario').isNumeric(),
    check('Nombre').isLength({ min: 3 , max: 255 }),
    check('Apellido').isLength({ min: 3 , max: 255 }),
    check('Email').isLength({ min: 3 , max: 50 }),
    check('Estado').isLength({ min: 3 , max: 255 }),

],(req,res) => 
{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
   

    const {idUsuario} = req.body;
    const {Nombre} = req.body;
    const {Apellido} = req.body;
    const {Email} = req.body;
    const {Estado} = req.body;
         
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query(`update Usuario set Nombre = '${Nombre}',Apellido = '${Apellido}',Email = '${Email}',Estado = '${Estado}' where idUsuario = ${idUsuario}`, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'En la Consulta.'});
        }else{                      
            // send records as a response
            if(recordset.rowsAffected == 0){
                res.send('No se Actualizo');
            }else{
                res.send('Éxito');
            }
            
        }
    });
        
    
});


router.delete('/:id',[
    check('id').isLength({ min: 1 })
],(req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return (res.status(500).json({error: 'Error en los Datos Enviados.'}))
    }
    
    var { id } = req.params;
    
    // create Request object
    var request = new sql.Request();
    
    // query to the database and get the records
    request.query(`DELETE FROM Usuario WHERE idUsuario = ${id} `, function (err, recordset) {
        if (err) {
            console.log(err);
            res.status(500).json({error: 'Error En la Consulta.'});
        }else{                      
            // send records as a response
            res.send('Éxito');
        }
    });  
    
});






function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

module.exports = router;