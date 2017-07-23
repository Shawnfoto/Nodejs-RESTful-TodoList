

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
