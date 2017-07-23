# Nodejs-RESTful-TodoList
![image](https://github.com/Shawnfoto/Nodejs-RESTful-TodoList/blob/master/Image%202.png)


Nodejs Server
```javascript
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
```


Nodejs route處理JSON 


```javascript
//Modal
var Todos = [
    {
        id: 1,
        name: 'pen'

    },
    {
        id: 2,
        name: 'card'

    }
];

// 起始ID
var InitID = 2;

exports.getAjax = function(req, res) {
    res.send({Todos: Todos});
};

exports.addAjax = function(req, res) {
    // JSON物件解析
    var TodoName = req.body.name;
    InitID ++;

     //清單增加
    Todos.push({
        id: InitID,
        name: TodoName
    });
    
    res.send('Create');
};

exports.putAjax = function(req, res) {
    var id = req.params.id;
    var NewName = req.body.NewName;
    var FoundReturn = false;//判斷是否進入if

    Todos.forEach(function(Todo, index){
        if( !FoundReturn && Todo.id === Number(id) )
        {
            Todo.name = NewName;
        }
    });

    res.send('Update');
};

exports.deleteAjax = function(req, res) {
    var id = req.params.id;
    var FoundReturn = false;//判斷是否進入if

    Todos.forEach(function(Todo, index){
        if ( !FoundReturn && Todo.id === Number(id) ) 
        {

            Todos.splice(index, 1);//(1)刪除一項
        }
    });

    res.send('Delete');
};
```
