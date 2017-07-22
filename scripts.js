$(function(){

    // 讀取
    $('#GetButton').on('click', function(){

        $.ajax({
            url: '/Todos',
            contentType: 'application/json',
            success: function(res){
                
                var tbodyEl =$('tbody');
                tbodyEl.html('');
                res.Todos.forEach(function(Todo){
                    
                    tbodyEl.append('\
                        <tr>\
                            <td class="id" style="display:none">'+ Todo.id +'</td>\
                            <td><input type="text" class="name" value="'+ Todo.name +'"></td>\
                            <td><button class="Update">修改</button></td>\
                            <td><button class="Delete">刪除</button></td>\
                        </tr>\
                        \
                    ');
                });                
            }
        });
    });
    // 新建
    $('#CreateButton').on('click', function(){
        var CreateInputEl = $('#CreateInput');


        $.ajax({
            url: '/Todos',
            method:'POST',
            contentType: 'application/json',
            data: JSON.stringify({name: CreateInputEl.val() }),//回傳JSON物件
            success: function(res){

                CreateInputEl.val();
                $('#GetButton').click();//新建後自動讀取

            }
        });
    });
    //update
    $('table').on('click','.Update', function(){

        var trEl = $(this).closest('tr');
        var id = trEl.find('.id').text();
        var NewName = trEl.find('.name').val();

        $.ajax({
            url: '/Todos/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ NewName: NewName }),
            success: function(res) {

                console.log(res);
                $('#GetButton').click();
            }
        });
    });
    //delete
    $('table').on('click','.Delete', function(){
        var trEl = $(this).closest('tr');
        var id = trEl.find('.id').text();

        $.ajax({
            url: '/Todos/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(res){
                console.log(res);
                $('#GetButton').click();
            }
        });

    });

});