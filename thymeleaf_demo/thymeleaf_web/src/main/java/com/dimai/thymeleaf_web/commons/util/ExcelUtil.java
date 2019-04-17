package com.dimai.thymeleaf_web.commons.util;

import com.tencent.oa.fm.jarvis.core.common.StringUtil;
import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.CollectionUtils;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

public class ExcelUtil {
    private final static Logger LOGGER = Logger.getLogger(ExcelUtil.class);

    private static final String PATTERN_TYPE = "yyyy-MM-dd";

    /**
     * 导出Excel文件
     *
     * @param excelModel 导出的Excel相关的信息
     * @param out        输出流
     * @param <T>
     */
    public static <T> void export(ExcelModel excelModel, OutputStream out, List<T> data, Class<? super T> cls) {
        export(excelModel, out, PATTERN_TYPE, data, cls);
    }


    private static Map<String, PropertyDescriptor> getProperties(Class<?> cls) {
        try {
            Map<String, PropertyDescriptor> result = new HashMap<>();
            for (PropertyDescriptor item : Introspector.getBeanInfo(cls).getPropertyDescriptors()) {
                result.put(item.getName(), item);
            }
            return result;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    /**
     * 导出Excel文件
     *
     * @param excelModel 导出的Excel相关的信息
     * @param out        输出流
     * @param pattern    @eg. yyyy-MM-dd
     * @param <T>
     */
    public static <T> void export(ExcelModel excelModel, OutputStream out, String pattern, List<T> data, Class<? super T> cls) {
        // 声明一个工作薄
        Workbook workbook = new XSSFWorkbook();
        // 生成一个表格
        Sheet sheet = workbook.createSheet(excelModel.getTitle());
        // 设置表格默认列宽度为15个字节
        sheet.setDefaultColumnWidth(15);
        // 生成一个样式
        CellStyle headerStyle = workbook.createCellStyle();
        // 设置这些样式
        headerStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        Font font = workbook.createFont();
        font.setFontHeightInPoints((short) 12);
        font.setBold(true);
        font.setColor(HSSFColor.HSSFColorPredefined.RED.getIndex());
        headerStyle.setFont(font);

        CellStyle headerStyle_2 = workbook.createCellStyle();
        // 设置这些样式
        headerStyle_2.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        headerStyle_2.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle_2.setBorderBottom(BorderStyle.THIN);
        headerStyle_2.setBorderLeft(BorderStyle.THIN);
        headerStyle_2.setBorderRight(BorderStyle.THIN);
        headerStyle_2.setBorderTop(BorderStyle.THIN);
        headerStyle_2.setAlignment(HorizontalAlignment.CENTER);
        Font headerFont = workbook.createFont();
        headerFont.setFontHeightInPoints((short) 12);
        headerFont.setBold(true);
        headerFont.setColor(HSSFColor.HSSFColorPredefined.BLACK.getIndex());
        headerStyle_2.setFont(headerFont);

        // 生成并设置另一个样式
        CellStyle stringStyle = workbook.createCellStyle();
        stringStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        stringStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        stringStyle.setBorderBottom(BorderStyle.THIN);
        stringStyle.setBorderLeft(BorderStyle.THIN);
        stringStyle.setBorderRight(BorderStyle.THIN);
        stringStyle.setBorderTop(BorderStyle.THIN);
        stringStyle.setAlignment(HorizontalAlignment.CENTER);
        stringStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        // 生成另一个字体
        Font font2 = workbook.createFont();
        font2.setBold(false);
        // 把字体应用到当前的样式
        stringStyle.setFont(font2);

        CellStyle decimalStyle = workbook.createCellStyle();
        decimalStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        decimalStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        decimalStyle.setBorderBottom(BorderStyle.THIN);
        decimalStyle.setBorderLeft(BorderStyle.THIN);
        decimalStyle.setBorderRight(BorderStyle.THIN);
        decimalStyle.setBorderTop(BorderStyle.THIN);
        decimalStyle.setAlignment(HorizontalAlignment.RIGHT);
        decimalStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        decimalStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
        // 生成另一个字体
        Font font3 = workbook.createFont();
        font3.setBold(false);
        // 把字体应用到当前的样式
        decimalStyle.setFont(font3);

        CellStyle percentStyle = workbook.createCellStyle();
        percentStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
        percentStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        percentStyle.setBorderBottom(BorderStyle.THIN);
        percentStyle.setBorderLeft(BorderStyle.THIN);
        percentStyle.setBorderRight(BorderStyle.THIN);
        percentStyle.setBorderTop(BorderStyle.THIN);
        percentStyle.setAlignment(HorizontalAlignment.RIGHT);
        percentStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        percentStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00%"));
        // 生成另一个字体
        Font font4 = workbook.createFont();
        font4.setBold(false);
        // 把字体应用到当前的样式
        percentStyle.setFont(font4);

        // 产生表格标题行
        Row row = sheet.createRow(0);
        int j = 0;
        for (ExcelModel.ExcelColumn column : excelModel.getColumns()) {
            Cell cell = row.createCell(j);
            //判断是否必填
            if (column.getIsRequired()) {
                cell.setCellStyle(headerStyle);
            } else {
                // 把字体应用到当前的样式
                cell.setCellStyle(headerStyle_2);
            }
            cell.setCellValue(column.getTitle());
            j++;
        }

        // 遍历集合数据，产生数据行
        Map<String, PropertyDescriptor> propertyDescriptorMap = getProperties(cls);
        int index = 0;
        for (T t : data) {
            index++;
            row = sheet.createRow(index);

            int i = 0;
            for (ExcelModel.ExcelColumn column : excelModel.getColumns()) {
                Cell cell = row.createCell(i);
                cell.setCellStyle(stringStyle);
                try {
                    PropertyDescriptor propertyDescriptor = propertyDescriptorMap.get(column.getName());
                    Object value = propertyDescriptor.getReadMethod().invoke(t);
                    Object valueReal = propertyDescriptor.getPropertyType().equals(Date.class) ?
                            new SimpleDateFormat(pattern).format((Date) value) : value;
                    if (value != null) {
                        switch (column.getColumnType()) {
                            case DECIMAL:
                                cell.setCellStyle(decimalStyle);
                                cell.setCellValue((double) valueReal);
                                break;
                            case PERCENT:
                                cell.setCellStyle(percentStyle);
                                cell.setCellValue((double) valueReal);
                                break;
                            case STRING:
                                cell.setCellStyle(stringStyle);
                                cell.setCellValue(valueReal.toString());
                                break;
                        }
                    }
                } catch (Exception e) {
                    LOGGER.error(e.getMessage(), e);
                }
                i++;
            }
        }
        try {
            workbook.write(out);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

    private static Workbook createWorkBook(String fileName, InputStream is) throws Exception {
        if (fileName.toLowerCase().endsWith("xls")) {
            return new HSSFWorkbook(is);
        }
        if (fileName.toLowerCase().endsWith("xlsx")) {
            return WorkbookFactory.create(is);
        }
        return null;
    }

    public static <T> Map<String, Object> excelImport(byte[] byt, ExcelModel excelModel, Class<T> cls) throws Exception {
        return excelImport(byt, excelModel, cls, null);
    }

    public static <T> Map<String, Object> excelImport(byte[] byt, ExcelModel excelModel, Class<T> cls, Integer limit) throws Exception {
        try {
            Map<String, Object> map = new HashMap<>();
            String fileName = excelModel.getTitle();
            Workbook workbook = createWorkBook(fileName, new ByteArrayInputStream(byt));
            //只处理 第一个Sheet
            Sheet sheet = workbook.getSheetAt(0);
            LOGGER.info("导入Excel文件" + fileName + ",共:" + sheet.getLastRowNum() + "行");

            //限制上传条数
            if (limit != null && sheet.getPhysicalNumberOfRows() > limit + 1) {
                map.put("msg", "超出限制行数:" + limit + "行");
                return map;
            }

            Row row_0 = sheet.getRow(0);


            int z = 0;
            int numberOfCells = row_0.getPhysicalNumberOfCells();
            for (ExcelModel.ExcelColumn column : excelModel.getColumns()) {
                Cell cell = row_0.getCell(z);
                if("rowNum".equals(column.getName())){
                    numberOfCells += 1;
                }else if (StringUtil.isNullOrEmpty(column.getTitle()) || !column.getTitle().equals(cell.getStringCellValue())) {
                    map.put("msg", "文件头部属性名称不匹配");
                    return map;
                }
                z++;
            }

            if (excelModel.getColumns().size() == numberOfCells) {
            } else {
                map.put("msg", "文件头部属性长度不匹配");
                return map;
            }
            List<T> list = new ArrayList<>();
            Map<String, PropertyDescriptor> propertyDescriptorMap = getProperties(cls);
            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                int j = 0;
                T resultValue = cls.newInstance();
                for (ExcelModel.ExcelColumn column : excelModel.getColumns()) {
                    Row row = sheet.getRow(i);
                    Cell cell = row.getCell(j);

                    PropertyDescriptor propertyDescriptor = propertyDescriptorMap.get(column.getName());
                    if ("rowNum".equals(column.getName())) {
                        propertyDescriptor.getWriteMethod().invoke(resultValue, row.getRowNum()+1);
                    }

                    if (cell != null) {
                         if (propertyDescriptor.getPropertyType().equals(String.class)) {
                            String textValue = "";
                            if (cell.getCellTypeEnum() == CellType.NUMERIC) {
                                if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                    SimpleDateFormat sdf = new SimpleDateFormat(PATTERN_TYPE);
                                    Date date = HSSFDateUtil.getJavaDate(cell.getNumericCellValue());
                                    textValue = sdf.format(date);
                                } else {
                                    textValue = String.valueOf(cell.getNumericCellValue());
                                }
                            } else {
                                textValue = cell.getStringCellValue();
                            }
                            propertyDescriptor.getWriteMethod().invoke(resultValue, textValue);
                        } else if (propertyDescriptor.getPropertyType().equals(double.class)
                                || propertyDescriptor.getPropertyType().equals(Double.class)
                                || propertyDescriptor.getPropertyType().equals(int.class)
                                || propertyDescriptor.getPropertyType().equals(Integer.class)) {
                            propertyDescriptor.getWriteMethod().invoke(resultValue, cell.getNumericCellValue());
                        }
                    }
                    j++;
                }
                list.add(resultValue);
            }
            if (CollectionUtils.isEmpty(list)) {
                map.put("msg", "文件数据内容为空!");
                return map;
            }
            map.put("data", list);
            return map;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        }
    }
}
