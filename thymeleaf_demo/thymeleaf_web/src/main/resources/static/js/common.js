$(function () {


  /*  $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).fadeIn(100);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).fadeOut(100);
    });*/

    /**
     * 提示语
     */
    $("[data-toggle='tooltip']").tooltip();
});

// Bootstrap提示信息中的默认值
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = '提示';
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = '提示';
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = '提示';
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = '成功';
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = '警告';
BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = '严重';
BootstrapDialog.DEFAULT_TEXTS['OK'] = '确定';
BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = '取消';
BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = '确认';

/**
 * 12345格式化为12,345.00
 12345.6格式化为12,345.60
 12345.67格式化为 12,345.67
 只留两位小数。

 回来后写了个格式化函数。可以控制小数位数，自动四舍五入。
 * @param s 数字
 * @param n 小数位
 * @returns {string}
 */
function fmoney(s, n){
    var restr = s;
    if(s=="" || s==null || s=="NaN" || s=="undefined" || parseFloat(s).toString() == "NaN"){
        restr = "";
    }else{
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n);
        var minus = "";
        if(s<0){
            minus="-";
            s = Math.abs(s).toFixed(n)+"";
        }
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        t = "";
        for(i = 0; i < l.length; i ++ )
        {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        restr = minus + t.split("").reverse().join("") + "." + r;
    }

    return restr;
}

/**
 * 还原金额格式化
 * @param s
 * @returns {Number}
 */
function rmoney(s){
    var restr = s;
    if(s=="" || s==null || s=="NaN" || s=="undefined" || parseFloat(s).toString() == "NaN"){
        restr = "";
    }else{
        restr = parseFloat(s.replace(/[^\d\.-]/g, ""));
    }
        return restr;
}

/**
 * 用来给JQgrid增加highLine边框
 * @param tableId
 * @param columeName
 */
function changTdHighLine(tableId,columeName){
    $("#"+ tableId + " [aria-describedby='"+ tableId +"_"+ columeName +"']").css("border", "2px solid #ff7e00");
}

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// util  form 序列化为JSOn对象
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [ o[this.name] ];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};