const express = require('express');
const app = express();
const morgan = require(`morgan`);       // Permite ver las Consultas desde la consola

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);

// middleware  ...  lógica de intercambio de información entre aplicaciones 

app.use(morgan(`dev`));                             //app.use(morgan(`combined`));
app.use(express.urlencoded({extended: false}));     // Permite recibir tipos de datos simples desde Formularios
app.use(express.json());                            // permite recibir json e interprtarlo

//router
app.use('/api/usuarios',require('./rutas/usuarios'));
app.use('/api/post',require('./rutas/post'));


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



//REST API  'transferencia de estado representacional' es un estilo de arquitectura software para sistemas hipermedia distribuidos