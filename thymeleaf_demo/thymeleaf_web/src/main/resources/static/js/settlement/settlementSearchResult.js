$(document).ready(function () {
    //查询数据填充jqgrid
    $("#jqGrid1").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
             }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager1",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid2").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager2",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid3").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } },
            { label: '操作类型', name: 'operationType', width: 80 },
            { label: '账户主操作类型', name: 'masterAccountType', width: 80 },
            { label: '子客ID', name: 'subAccountId', width: 80 },
            { label: '子客名称', name: 'subAccountName', width: 80 },
            { label: '售卖类型', name: 'buyingTypeName', width: 80 },
            { label: '客户类型', name: 'customerTypeName', width: 80 },
            { label: '渠道管理', name: 'channelManager', width: 80 },
            { label: '销售管理', name: 'salesManager', width: 80 },
            { label: '媒介管理', name: 'mediumManager', width: 80 },
            { label: '片区名称', name: 'regionName', width: 80 },
            { label: '广告id', name: 'adId', width: 80 },
            { label: '排期ID', name: 'planId', width: 80 },
            { label: '资源id', name: 'resourceId', width: 80 }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager3",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid4").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } },
            { label: '操作类型', name: 'operationType', width: 80 },
            { label: '账户主操作类型', name: 'masterAccountType', width: 80 },
            { label: '子客ID', name: 'subAccountId', width: 80 },
            { label: '子客名称', name: 'subAccountName', width: 80 },
            { label: '售卖类型', name: 'buyingTypeName', width: 80 },
            { label: '客户类型', name: 'customerTypeName', width: 80 }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager4",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid5").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } },
            { label: '操作类型', name: 'operationType', width: 80 },
            { label: '账户主操作类型', name: 'masterAccountType', width: 80 },
            { label: '子客ID', name: 'subAccountId', width: 80 },
            { label: '子客名称', name: 'subAccountName', width: 80 },
            { label: '售卖类型', name: 'buyingTypeName', width: 80 },
            { label: '客户类型', name: 'customerTypeName', width: 80 }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager5",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid6").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } },
            { label: '操作类型', name: 'operationType', width: 80 },
            { label: '账户主操作类型', name: 'masterAccountType', width: 80 },
            { label: '子客ID', name: 'subAccountId', width: 80 },
            { label: '子客名称', name: 'subAccountName', width: 80 },
            { label: '售卖类型', name: 'buyingTypeName', width: 80 },
            { label: '客户类型', name: 'customerTypeName', width: 80 }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager6",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid7").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager7",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid8").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager8",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid9").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager9",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid10").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager10",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid11").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager11",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid12").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager12",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid13").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager13",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

    $("#jqGrid14").jqGrid({
        mtype: "GET",
        styleUI : 'Bootstrap',
        datatype: "local",
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        colModel: [
            { label: 'pkId', name: 'pkId',index:'pkId', hidden: true },
            { label: 'bizTypeId', name: 'bizTypeId',index:'bizTypeId', hidden: true },
            { label: '结算单编号', name: 'settlementId',index:'settlementId',frozen:true, width: 160,
                formatter: function (cell, data, r) {
                    return getLink(contextPath+'/Browse', 'settlementId', r.settlementId,'bizTypeId',r.bizTypeId, cell, '_blank');
                }},
            { label: '数据发生日', name: 'settlementDate', width: 150,align: "center", formatter: 'date'},
            { label: '我方主体', name: 'ouName',frozen:true ,width: 180},
            { label: '客户名称', name: 'customerName', width: 230 },
            { label: '业务客户ID', name: 'bossCustomerId', width: 100 },
            { label: '业务客户', name: 'bossCustomerName', width: 100 },
            { label: '结算金额', name: 'balance', align: 'right' ,width: 120, formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '业务大类', name: 'bizTypeName',index:'bizTypeName',frozen:true, width: 160},
            { label: '渠道', name: 'channelName', width: 80},
            { label: '子渠道', name: 'subChannelName', width: 80 },
            { label: '结算纬度', name: 'patternName', align: 'center',width: 80 },
            { label: '客户地址', name: 'customerAddressName'},
            { label: '标准通知单行', name: 'customerDescriptionName'},
            { label: '确认状态', name: 'allAffirmFlag', width: 80,editoptions:{value:'U:未确认;P:部分确认;C:完全确认'}, formatter:"select"},
            { label: '状态', name: 'status',frozen:true, width: 80 },
            { label: '数据来源', name: 'source', width: 180 },
            { label:'服务提供商(SP)',name:'companyName',align: 'center'},
            {
                label:'MDM客户状态标志',name: 'mdmCustStautsFlag', index: 'mdmCustStautsFlag', align: 'center', width: 100,
                formatter: function (status, row, rowData) {
                    var mdmCustStautsFlag = rowData.mdmCustStautsFlag;
                    var aHtml = "";
                    if (mdmCustStautsFlag == '0') {
                        aHtml = "<font style='color:red'>客户未标识</font>";
                    }
                    if (mdmCustStautsFlag == '1') {
                        aHtml = "<font style='color:red'>客户创建中</font>";
                    }
                    if (mdmCustStautsFlag == '2') {
                        aHtml = "<font style='color:green'>客户已标识</font>";
                    }
                    return aHtml;
                }
            },
            { label:'部门',name: 'deptName'},
            { label: '币种', name: 'currencyCode', width: 50 },
            { label: '汇率', name: 'currencyRate', width: 50 },

            { label:'不均衡费',name: 'imbalance',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'劳务费',name: 'workCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label:'坏账',name: 'baddebtCost',width: 80,formatoptions: { thousandsSeparator: ',' }, formatter: 'currency', align: 'right'},
            { label: '合同ID', name: 'contractId',frozen:true, width: 120,
                formatter: function (cell, data, r) {
                    if (cell != "" && cell != null){
                        return getContractLink(r.contractId, cell, '_blank');
                    }else {
                        return "";
                    }
                }},
            { label: '备注', name: 'remark', width: 300 },
            { label:'创建人',name: 'createByName',sortable: false, align: 'center' },
            {label: '创建时间', name: 'createDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.createDate;
                    if(s!=null&&s!='')
                        return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
                }
            },
            { label:'最后操作人',name: 'updateByName', sortable: false, align: 'center' },
            { label:'最后操作时间',name: 'updateDate',  sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.updateDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd hh:mm:ss");}

                }
            },
            { label: '付费类型', name: 'paidType', width: 80,
                formatter: function (status, row, rowData) {
                    var aHtml = "";
                    var paidType = rowData.paidType;
                    if (paidType == 'PrePaid')
                        aHtml = '预付费';
                    else if (paidType == 'PostPaid')
                        aHtml = '赊销';
                    return aHtml;
                }
            },
            { label: '业务订单号', name: 'indentNumber', width: 120 },
            { label: '订单号', name: 'orderNumber', width: 200 },
            { label: '账单号', name: 'billNo', width: 80 },
            { label: '账期数', name: 'financePeriod', width: 80 },
            { label: '账期单位', name: 'financePeriodUnit', width: 80 },
            {label: '应收日期', name: 'adGlDate', sortable: false, align: 'center',
                formatter: function (value,row,rowData) {
                    var s=rowData.adGlDate;
                    if (s==null){
                        return '';
                    }else{return new Date(s).Format("yyyy-MM-dd");}
                }
            },
            { label: '最晚回款日', name: 'dueDate', formatter: function (value,row,rowData) {
                var s=rowData.dueDate;
                if (s==null){
                    return '';
                }else{return new Date(s).Format("yyyy-MM-dd");}
            } }
        ],
        viewrecords: true,
        rowList:[ 5,10,30,50,100 ],
        height: 350,
        rowNum: 30,
        pager: "#jqGridPager14",
        width:$(document.body).width() - 80,
        shrinkToFit:false,
        gridComplete:function(){

        },
        loadComplete:function (data) {
            if(data.status == "401"){
                BootstrapDialog.alert("登录状态过期，请刷新页面！");
            }
        }
    });

});

function getLink(baseUrl, idName, idValue, idName2,idValue2,text, target) {
    return "<a href='" + baseUrl + "?" + idName + "=" + idValue +"&"+idName2+"="+ idValue2+"' target='" + target + "'>" + text + "</a>"
}

function getContractLink(idValue, text, target) {
    var contractUrl = $("#contractUrl").val();
    return "<a href='" + contractUrl + idValue + "' target='" + target + "'>" + text + "</a>"
}
