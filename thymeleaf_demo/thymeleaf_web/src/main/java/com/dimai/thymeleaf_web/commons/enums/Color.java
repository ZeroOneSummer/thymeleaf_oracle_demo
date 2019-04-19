package com.dimai.thymeleaf_web.commons.enums;

public enum Color {

    RED("red","红色"), GREEN("green","绿色"), YELLOW("yellow","黄色"), BLUE("blue","蓝色");

    public String code;
    public String name;

    Color(String code, String name) {
        this.code = code;
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}