$(function(){
    $('#add_customer form').on('submit',function(event){
        var name = $('input[name="name"]').val();
        var tel = $('input[name="tel"]').val();
        var town = $('select[name="town"]').val();
        var marks = $('textarea[name="marks"]').val();
        if(!name||!tel||!town){
            return false;
        }
        $.ajax({
            url: '/courier/user/add',
            type: 'GET',
            dataType: 'json',
            data: {
                name:name,
                tel:tel,
                town:town,
                marks:marks
            },
            success:function(data){
                console.log(data);
            },
            error:function(err){
                console.log(err);
            }
        })
    });
})