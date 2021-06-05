const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

require('./config/connection');

app.use(require('./routes/categoriasRoutes'));

app.listen(app.get('port'), (error) => {
    if (error) 
        console.log(error);
    else
        console.log(`Servidor en puerto: ${app.get('port')}`);
});