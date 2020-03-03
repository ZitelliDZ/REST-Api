const sql = require('mssql');


const config = {
    user: '@@@@@@',
    password: '@@@@@@@',
    server: '@@@@@@@@@',
    database: 'whatsapp'
}


sql.connect(config, function (err) {
    if (err){
        console.log(err);
        console.log('Error al conectarse a la BD.');
        return; 
    }else{
        console.log('La BD esta conectada.');       
    }        
});

module.exports = sql;