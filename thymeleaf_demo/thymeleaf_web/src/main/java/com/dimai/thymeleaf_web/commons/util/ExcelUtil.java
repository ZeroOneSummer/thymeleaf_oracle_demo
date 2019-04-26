package com.dimai.thymeleaf_web.commons.util;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author jp
 * 通用excel导入/导出
 * TODO 实体不可用shift生成的
 *
 */
public class ExcelUtil {

    public final static String EXCEL_FILE_2003 = ".xls";
    public final static String EXCEL_FILE_2007 = ".xlsx";

    /**
     * 公共的导入excel方法
     *
     * @param file 文件
     * @return
     * @throws IOException
     */
    public static <T> List<T> importExcel(MultipartFile file, Class<T> clazz) throws IOException {

        Workbook workbook = null;

        try {
            //读取文件内容
            workbook = chooseWorkbook(file);

            //获取工作表
            Sheet sheet = workbook.getSheetAt(0);

            //获取sheet中第一行行号
            int firstRowNum = sheet.getFirstRowNum();
            //获取sheet中最后一行行号
            int lastRowNum = sheet.getLastRowNum();

            //获取该实体所有定义的属性 返回Field数组
            Field[] entityName = clazz.getDeclaredFields();

            List<T> list = new ArrayList<T>();

            //循环插入数据
            for (int i = firstRowNum + 1; i <= lastRowNum; i++) {

                Row row = sheet.getRow(i);

                //可以根据该类名生成Java对象
                T pojo = clazz.newInstance();

                //除自增编号外，实体字段匹配sheet列
                for (int j = 0; j < entityName.length; j++) {

                    //获取属性的名字,将属性的首字符大写，方便构造set方法
                    String name = "set" + entityName[j].getName().substring(0, 1).toUpperCase().concat(entityName[j].getName().substring(1).toLowerCase()) + "";
                    //获取属性的类型
                    String type = entityName[j].getGenericType().toString();

                    Method m = null;
                    //getMethod只能调用public声明的方法，而getDeclaredMethod基本可以调用任何类型声明的方法
                    m = clazz.getDeclaredMethod(name, entityName[j].getType());

                    Cell pname = row.getCell(j);
                    //根据属性类型装入值
                    switch (type) {
                        case "int":
                        case "class java.lang.Integer":
                            m.invoke(pojo, Integer.valueOf(getVal(pname)));
                            break;
                        case "short":
                        case "java.lang.Short":
                            m.invoke(pojo, Short.valueOf(getVal(pname)));
                            break;
                        case "long":
                        case "java.lang.Long":
                            m.invoke(pojo, Long.valueOf(getVal(pname)));
                            break;
                        case "float":
                        case "java.lang.Float":
                        case "double":
                        case "java.lang.Double":
                        case "java.math.BigDecimal":
                            m.invoke(pojo, Double.valueOf(getVal(pname)));
                            break;
                        case "char":
                        case "java.lang.Character":
                        case "class java.lang.String":
                            m.invoke(pojo, getVal(pname));
                            break;
                        case "class java.util.Date":
                            m.invoke(pojo, getVal(pname));
                            break;
                        default:
                            break;
                    }
                }
                list.add(pojo);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            workbook.close();
        }
        return null;
    }

    /**
     * 根据文件选择excel版本
     *
     * @return
     * @throws Exception
     */
    public static Workbook chooseWorkbook(MultipartFile file) throws Exception {

        Workbook workbook = null;
        String filename = file.getOriginalFilename();
        String fileType = (filename.substring(filename.lastIndexOf("."), filename.length())).toLowerCase();

        ByteArrayInputStream is = new ByteArrayInputStream(file.getBytes());
        if (EXCEL_FILE_2003.equals(fileType)) {
            workbook = new HSSFWorkbook(is);  //2003-
        } else if (EXCEL_FILE_2007.equals(fileType)) {
            workbook = new XSSFWorkbook(is);  //2007+
        } else {
            throw new Exception("解析的文件格式有误！");
        }
        return workbook;
    }

    /**
     * 字段类型转换
     *
     * @param cell
     * @return
     */
    public static String getVal(Cell cell) {
        if (null != cell) {

            switch (cell.getCellType()) {
                case XSSFCell.CELL_TYPE_NUMERIC: // 数字
                    String val = cell.getNumericCellValue() + "";
                    int index = val.indexOf(".");

                    if (Integer.valueOf(val.substring(index + 1)) == 0) {
                        DecimalFormat df = new DecimalFormat("0");//处理科学计数法，取整数
                        return df.format(cell.getNumericCellValue());
                    }
                    return cell.getNumericCellValue() + "";//double
                case XSSFCell.CELL_TYPE_STRING: // 字符串
                    return cell.getStringCellValue() + "";
                case XSSFCell.CELL_TYPE_BOOLEAN: // Boolean
                    return cell.getBooleanCellValue() + "";
                case XSSFCell.CELL_TYPE_FORMULA: // 公式
                    try {
                        if (HSSFDateUtil.isCellDateFormatted(cell)) {
                            Date date = cell.getDateCellValue();
                            return (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        } else {
                            return String.valueOf((int) cell.getNumericCellValue());
                        }
                    } catch (IllegalStateException e) {
                        return String.valueOf(cell.getRichStringCellValue());
                    }
                case XSSFCell.CELL_TYPE_BLANK: // 空值
                    return "";
                case XSSFCell.CELL_TYPE_ERROR: // 故障
                    return "";
                default:
                    return "未知类型   ";
            }
        } else {
            return "";
        }
    }


    //===================================================================================================================

    /**
     * 导出Excel文件
     * @param sheetName
     * @param headers
     * @param dataset
     * @param out
     */
    public static <T> void exportExcel(String sheetName, String[] headers, Collection<T> dataset, OutputStream out) {
        exportExcel(sheetName, headers, dataset, out, "yyyy-MM-dd", EXCEL_FILE_2007);
    }

    public static <T> void exportExcel(String sheetName, String[] headers, Collection<T> dataset, OutputStream out, String pattern, String version) {

        //根据版本生成对于excel对象
        Workbook workbook = null;
        if (EXCEL_FILE_2003.equals(version.trim())) {
            workbook = new HSSFWorkbook();
        } else {
            workbook = new XSSFWorkbook();
        }

        // 生成一个表格
        Sheet sheet = workbook.createSheet(sheetName);
        //设置宽度
        sheet.setDefaultColumnWidth(18);

        // 生成一个样式1
        CellStyle style = workbook.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER); //内容居中
        // 生成一个字体
        Font font = workbook.createFont();
        font.setFontName("宋体");
        font.setBold(true);//加粗
        font.setFontHeightInPoints((short) 11);
        // 把字体应用到当前的样式
        style.setFont(font);

        //生成一个样式2
        CellStyle style2 = workbook.createCellStyle();
        style2.setAlignment(HorizontalAlignment.CENTER);
        // 生成另一个字体
        Font font2 = workbook.createFont();
        // 把字体应用到当前的样式
        style2.setFont(font2);

        // 产生表格标题行
        Row row = sheet.createRow(0);
        Cell cellHeader;
        for (int i = 0; i < headers.length; i++) {
            cellHeader = row.createCell(i);
            cellHeader.setCellStyle(style);
            cellHeader.setCellValue(headers[i]);
        }

        // 遍历集合数据，产生数据行
        Iterator<T> it = dataset.iterator();
        int index = 0;
        T t;
        Field[] fields;
        Field field;
        Pattern p = Pattern.compile("^//d+(//.//d+)?$");
        Matcher matcher;
        String fieldName;
        String getMethodName;
        Cell cell;
        Class tCls;
        Method getMethod;
        Object value;
        String textValue;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        while (it.hasNext()) {
            index++;
            row = sheet.createRow(index);
            t = (T) it.next();
            // 利用反射，根据JavaBean属性的先后顺序，动态调用getXxx()方法得到属性值
            fields = t.getClass().getDeclaredFields();
            for (int i = 0; i < fields.length; i++) {
                cell = row.createCell(i);
                cell.setCellStyle(style2);
                field = fields[i];
                fieldName = field.getName();
                getMethodName = "get" + fieldName.substring(0, 1).toUpperCase()
                        + fieldName.substring(1);
                try {
                    tCls = t.getClass();
                    getMethod = tCls.getMethod(getMethodName, new Class[]{});
                    value = getMethod.invoke(t, new Object[]{});
                    // 判断值的类型后进行强制类型转换
                    textValue = null;
                    if (value instanceof Integer) {
                        cell.setCellValue((Integer) value);
                    } else if (value instanceof Float) {
                        textValue = String.valueOf((Float) value);
                        cell.setCellValue(textValue);
                    } else if (value instanceof Double) {
                        textValue = String.valueOf((Double) value);
                        cell.setCellValue(textValue);
                    } else if (value instanceof Long) {
                        cell.setCellValue((Long) value);
                    }
                    if (value instanceof Boolean) {
                        textValue = "是";
                        if (!(Boolean) value) {
                            textValue = "否";
                        }
                    } else if (value instanceof Date) {
                        textValue = sdf.format((Date) value);
                    } else {
                        // 其它数据类型都当作字符串简单处理
                        if (value != null) {
                            textValue = value.toString();
                        }
                    }
                    if (textValue != null) {
                        matcher = p.matcher(textValue);
                        if (matcher.matches()) {
                            // 是数字当作double处理
                            cell.setCellValue(Double.parseDouble(textValue));
                        } else {
                            cell.setCellValue(textValue);
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        try {
            workbook.write(out);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                workbook.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
