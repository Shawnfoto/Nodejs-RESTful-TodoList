var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//route link
var page = require('./routes/server');

//Port
var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Server listening on '+ PORT);
});

app.use(express.static(__dirname));
app.use(bodyParser.json());


//get put update delete
app.get('/Todos',page.getAjax);

app.post('/Todos',page.addAjax);

app.put('/Todos/:id',page.putAjax);

app.delete('/Todos/:id',page.deleteAjax);






