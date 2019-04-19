
$(function () {
    // alert("are you ok ?");
    // 显示上传文件名
    $('input[id=file]').change(function() {
        var fileName = $(this).val();
        $('#fileName').val(fileName.substring(fileName.lastIndexOf("\\") + 1));
    });
})


function importExcel(event) {
    //验证导入是否为空
    if (!$('#file').val()) return alert("导入不能为空")

    //文件后缀过滤
    var fileName = $('#fileName').val();
    var suffix = fileName.substring(fileName.lastIndexOf("."))
    if (suffix != ".txt" && suffix != ".xlsx" && suffix != ".xls"){
        return alert("请导入.txt文件")
    }

    var form = new FormData($('#uploadForm')[0]);
    $.ajax({
        url: "/admin/" + "importExcel",
        type: "post",
        data: form,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.code === 0) {
                alert("导入成功！")
            } else {
                alert(data.msg)
            }
        },
        error: function (e) {
            alert("网络繁忙，请稍后重试！");
        }
    });

}

