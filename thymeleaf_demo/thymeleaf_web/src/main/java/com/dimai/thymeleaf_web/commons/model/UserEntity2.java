
package com.dimai.thymeleaf_web.commons.model;

import cn.afterturn.easypoi.excel.annotation.Excel;
import lombok.Data;

@Data
public class UserEntity2 {

    @Excel(name = "ID", isImportField = "id", width=25, numFormat = "0")
    public String id;

    @Excel(name = "姓名", isImportField = "name", width=25)
    public String name;

    @Excel(name = "年龄", isImportField = "age", width=25, numFormat = "0")
    public String age;

}

