package com.dimai.thymeleaf_web.controller;

import cn.afterturn.easypoi.excel.ExcelExportUtil;
import cn.afterturn.easypoi.excel.entity.ExportParams;
import com.dimai.thymeleaf_web.commons.exception.RRException;
import com.dimai.thymeleaf_web.commons.util.ExcelUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.entity.UserEntity;
import org.thymeleaf.service.UserService;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by pijiang on 2019/4/17.
 */
@Controller
@RequestMapping("/")
@Slf4j
public class ExcelController {

    @Autowired
    UserService.Iface userService;


    /**
     * easypoi导出
     * @param response
     */
    @GetMapping("downExcelByEasy")
    public void downExcelByEasy(HttpServletResponse response) {

        try {
            ServletOutputStream out = response.getOutputStream();

            //表名
            String title = "ZOS" + "_" + new SimpleDateFormat("yyyyMMdd").format(new Date()) + "_报表";

            //数据
            List<UserEntity> list = userService.getUsers();
            if (list == null || list.size() <= 0) new ArrayList<>();

            ExportParams params = new ExportParams();
//            params.setTitle("倚天屠龙记");

            Workbook workbook = ExcelExportUtil.exportExcel(params, UserEntity.class, list);

            response.setHeader("content-Type", "application/vnd.ms-excel");
            response.setCharacterEncoding("utf-8");
            response.setHeader("Content-Disposition", "attachment;filename=" + new String((title).getBytes("utf-8"), "iso8859-1") + ".xls");
            workbook.write(response.getOutputStream());

            //关闭资源
            out.flush();
            out.close();
        }catch (Exception e) {
            e.getMessage();
            throw new RRException("401", "download failure", "下载失败");
        }
    }


    /**
     * poi导出导入
     * @param response
     */
    @GetMapping("downExcel")
    public void downExcel(HttpServletResponse response){
        try {

            //表名、表头设置
            String sheetName = "ZOS" + "_" + new SimpleDateFormat("yyyyMMdd").format(new Date()) + "_报表.xlsx";
            String[] headers = new String[]{"ID", "姓名", "年龄"};

            //数据
            List<UserEntity> list = userService.getUsers();
            if (list == null || list.size() <= 0) new ArrayList<>();

            /*list.add(new UserEntity(1, "张无忌", (short) 20));
            list.add(new UserEntity(2, "周芷若", (short) 18));
            list.add(new UserEntity(3, "赵敏", (short) 19));
            list.add(new UserEntity(4, "宋青书", (short) 18));*/

            //响应格式设置(必须放在导出之前)
            ServletOutputStream out = response.getOutputStream();
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename="+new String(sheetName.getBytes("UTF-8"), "ISO8859-1"));
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/msexcel");

            //导出
            ExcelUtil.exportExcel(sheetName, headers, list, out);

            out.flush();
            out.close();
        }catch (Exception e) {
            e.getMessage();
            throw new RRException("401", "download failure", "下载失败");
        }
    }

    @PostMapping("importExcel")
    @ResponseBody
    public Map importExcel(MultipartFile file) throws Exception {

        //响应实体
        Map<String, Object> rs = new HashMap<String, Object>(){{
            put("code", 200);
            put("msg", "success");
            put("rmk", "");
        }};

        try {
            List<UserEntity> list = ExcelUtil.importExcel(file, UserEntity.class);

            log.info("导入文件 ：{} 成功，数据量 {} 条", file.getOriginalFilename(), list.size());
        } catch (Exception e) {
            rs.put("code", 201);
            rs.put("msg", "import failure");
            throw new RuntimeException("import failure：", e);
        }

        return rs;
    }

}
