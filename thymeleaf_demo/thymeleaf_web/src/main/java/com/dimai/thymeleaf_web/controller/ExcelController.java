package com.dimai.thymeleaf_web.controller;

import com.dimai.thymeleaf_web.commons.exception.RRException;
import com.dimai.thymeleaf_web.commons.util.ExcelModel;
import com.dimai.thymeleaf_web.commons.util.ExcelUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.thymeleaf.entity.UserEntity;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by pijiang on 2019/4/17.
 */
@Controller
@RequestMapping("/")
@Slf4j
public class ExcelController {

    @GetMapping("downExcel")
    public void downExcel(@RequestParam Map<String, String> params, HttpServletResponse response) throws Exception {
        try {

            //表名
            String title = "ZOS" + "_" + new SimpleDateFormat("yyyyMMdd").format(new Date()) + "_报表.xlsx";

            //表头
            List<ExcelModel.ExcelColumn> columns = new ArrayList<>();
            columns.add(new ExcelModel.ExcelColumn("id", "ID", ExcelModel.ColumnType.STRING));
            columns.add(new ExcelModel.ExcelColumn("name", "姓名", ExcelModel.ColumnType.STRING));
            columns.add(new ExcelModel.ExcelColumn("age", "年龄", ExcelModel.ColumnType.STRING));

            ExcelModel excelModel = new ExcelModel();
            excelModel.setTitle(title);
            excelModel.setColumns(columns);

            //模拟数据
            List<UserEntity> list = new ArrayList<>();
            list.add(new UserEntity(1, "张无忌", (short) 20));
            list.add(new UserEntity(2, "周芷若", (short) 18));
            list.add(new UserEntity(3, "赵敏", (short) 19));
            list.add(new UserEntity(4, "宋青书", (short) 18));

            //输出流
            ServletOutputStream out = response.getOutputStream();
            //响应格式设置
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename="+
                    new String(title.getBytes("UTF-8"), "ISO8859-1"));
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/msexcel");

            //导出
            ExcelUtil.export(excelModel, out, list, UserEntity.class);

            out.flush();
            out.close();
        }catch (Exception e) {
            e.getMessage();
            throw new RRException("401", "download failure", "下载失败");
        }
    }


}
