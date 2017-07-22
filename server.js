var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Server listening on '+ PORT);
});

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



app.use(express.static(__dirname));
app.use(bodyParser.json());

//get
app.get('/Todos', function(req, res){
res.send({Todos: Todos});
})

//create
app.post('/Todos', function(req, res){
    // JSON物件解析
    var TodoName = req.body.name;

    
    InitID ++;



    //清單增加
    Todos.push({
        id: InitID,
        name: TodoName
    });

    
    
res.send('Create');
});

//update
app.put('/Todos/:id', function(req,res){
    
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
});

//delete
app.delete('/Todos/:id', function(req, res){
    var id = req.params.id;
    var FoundReturn = false;//判斷是否進入if

    Todos.forEach(function(Todo, index){
        if ( !FoundReturn && Todo.id === Number(id) ) 
        {

            Todos.splice(index, 1);//(1)刪除一項
        }
    });


    res.send('Delete');
});