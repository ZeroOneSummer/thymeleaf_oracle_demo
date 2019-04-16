$(document).ready(function () {
    var bizTypeId = $("#BizTypeList").val();
    showSearchCondition(bizTypeId);
});

function showSearchCondition(bizTypeId) {
    $("form").addClass("hidden");
    $("#bizTypeIdForm").removeClass("hidden");//业务大类字段
    $("#searchForm" + bizTypeId).removeClass("hidden");//显示查询条件
    $(".searchGrid").addClass("hidden");
    $("#searchGrid" + bizTypeId).removeClass("hidden");//显示查询字段
}

function submitSearch() {
    var bizTypeId = $("#BizTypeList").val();
    var settlement_date_from = $('#settlement_date_from' + bizTypeId).val();
    var settlement_date_to = $("#settlement_date_to" + bizTypeId).val();
    if(settlement_date_from!="" && settlement_date_to!="" && settlement_date_from > settlement_date_to) {
        BootstrapDialog.alert({
            title:'提示',
            message:"日期开始时间不能晚于结束时间！"});
        return;
    }
    var channelId = getSelectValue("channelList" + bizTypeId);
    var ouId = getSelectValue("OUSelectList" + bizTypeId);
    var queryBean = $("#searchForm"  +bizTypeId + " .settlement").serializeObject();
    queryBean.OUId=ouId;
    queryBean.channelId=channelId;
    queryBean.BizTypeList=bizTypeId;
    //var args=$("#searchForm"  +bizTypeId + " .settlement").serialize()+"&OUId="+ouId+"&channelId="+channelId+"&BizTypeList="+bizTypeId;
    var url=contextPath+'/ajaxGetSettlementData';
    $("#jqGrid" + bizTypeId).jqGrid('setGridParam', {datatype: 'json'}).jqGrid('setGridParam',{ page: 1 }).jqGrid('setGridParam', { url: url , postData: queryBean}).trigger("reloadGrid");

    return;
}

function exportExcel() {
    var bizTypeId = $("#BizTypeList").val();
    var settlement_date_from = $('#settlement_date_from' + bizTypeId).val();
    var settlement_date_to = $("#settlement_date_to" + bizTypeId).val();
    if(settlement_date_from!="" && settlement_date_to!="" && settlement_date_from > settlement_date_to) {
        BootstrapDialog.alert({
            title:'提示',
            message:"数据发生开始时间不能晚于结束时间！"});
        return;
    }
    var channelId = getSelectValue("channelList" + bizTypeId);
    var ouId = getSelectValue("OUSelectList" + bizTypeId);
    var args=$("#searchForm"  +bizTypeId + " .settlement").serialize()+"&OUId="+ouId+"&channelId="+channelId+"&BizTypeList="+bizTypeId;
    var url = contextPath+"/downloadSettlementExcel?"+args;

    window.location.href = url;
}

function getSelectValue(id) {
    var str = "";
    $("#" + id + " option:selected").each(function () {
        if (str != "") {
            str += ",";
        }
        str += $(this).val();
    });
    return str;
}

