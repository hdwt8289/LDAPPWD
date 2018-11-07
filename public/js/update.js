$('input:first').focus();
$('.icon1,.icon2').click(function(){
    $(this).siblings('input').focus();
});
$('input').change(function(){
    if($.trim($(this).val())){
        $(this).parent().removeClass('redColor');
        $('#showInfo').fadeOut().text('');
    }
});

//键盘监听回车提交
$(document).keyup(function(event){
    switch(event.keyCode) {
        case 13:
            $('.submit').css({top:'22px',right:'29px'});
            setTimeout(function(){
                $('.submit').css({top:'20px',right:'30px'});
            },50);
            $('.submit').click();
    }
});
//点击提交
$('.submit').click(function(){
    submit();
});
//点击取消
$('.cancel').click(function(){
   
});
//后台交互验证用户密码
function submit(){
    var name = $.trim($('#loginName').val());
    var oldPwd = $.trim($('#oldPwd').val());
    var newPwd = $.trim($('#newPwd').val());
    console.log(name)
    if(!name){
        $('#loginName').parent().addClass('redColor');
        $('#loginName').parent().addClass('justShake');
        setTimeout(function(){
            $('#loginName').parent().removeClass('justShake');
        },400);
        $('#showInfo').text('请填写用户登陆名！').fadeIn();
        $('#loginName').focus();
        return;
    }
    if(!oldPwd){
        $('#oldPwd').parent().addClass('redColor');
        $('#oldPwd').parent().addClass('justShake');
        setTimeout(function(){
            $('#oldPwd').parent().removeClass('justShake');
        },400);
        $('#showInfo').text('请填写原始密码！').fadeIn();
        $('#oldPwd').focus();
        return;
    }
    if(!newPwd){
        $('#newPwd').parent().addClass('redColor');
        $('#newPwd').parent().addClass('justShake');
        setTimeout(function(){
            $('#newPwd').parent().removeClass('justShake');
        },400);
        $('#showInfo').text('请填写新密码！').fadeIn();
        $('#newPwd').focus();
        return;
    }

    var json = {name: name, oldPwd: oldPwd,newPwd:newPwd};
    var data = {data: JSON.stringify(json)};
    $.ajax({
        type: 'post',
        url: '/update',
        data: data,
        dataType: 'json',
        success: function(result){
            var status = result.status;
            switch(status){
                case 'err':
                    $('#panel').addClass('justShake1');
                    setTimeout(function(){
                        $('#panel').removeClass('justShake1');
                    },400);
                    $('#showInfo').text('修改出错，请联系管理员！').fadeIn();
                    break;
                case 'noUser':
                    $('#panel').addClass('justShake1');
                    setTimeout(function(){
                        $('#panel').removeClass('justShake1');
                    },400);
                    $('#showInfo').hide().text('用户不存在！').fadeIn();
                    break;
                case 'wrongPassword':
                    $('#panel').addClass('justShake1');
                    setTimeout(function(){
                        $('#panel').removeClass('justShake1');
                    },400);
                    $('#showInfo').hide().text('原始密码错误！').fadeIn();
                    break;
                case 'success':
                    window.location.href = '/';
                    break;
            }
        }
    });

}