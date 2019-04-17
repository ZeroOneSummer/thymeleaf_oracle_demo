package com.dimai.thymeleaf_web.commons.util;

import java.util.List;

public class ExcelModel {

    public enum ColumnType {
        STRING,
        DECIMAL,
        PERCENT,
    }

    public static class ExcelColumn {
        private String name;
        private String title;
        private ColumnType columnType;
        private Boolean isRequired;

        public ExcelColumn() {
        }

        public ExcelColumn(String name, String title, ColumnType columnType) {
            this.name = name;
            this.title = title;
            this.columnType = columnType;
            this.isRequired = true;
        }

        public ExcelColumn(String name, String title, ColumnType columnType,Boolean isRequired) {
            this.name = name;
            this.title = title;
            this.columnType = columnType;
            this.isRequired = isRequired;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public ColumnType getColumnType() {
            return columnType;
        }

        public void setColumnType(ColumnType columnType) {
            this.columnType = columnType;
        }

        public Boolean getIsRequired() {
            return isRequired;
        }

        public void setIsRequired(Boolean isRequired) {
            isRequired = isRequired;
        }
    }

    private List<ExcelColumn> columns;

    private String title;

    public List<ExcelColumn> getColumns() {
        return columns;
    }

    public void setColumns(List<ExcelColumn> columns) {
        this.columns = columns;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
