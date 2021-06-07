const express = require('express');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

require('./config/connection');

app.use(require('./routes/categoriasRoutes'));
app.use(require('./routes/personasRoutes'));
app.use(require('./routes/ticketsRoutes'));

app.listen(app.get('port'), (error) => {
    if (error) 
        console.log(error);
    else
        console.log(`Servidor en puerto: ${app.get('port')}`);
});