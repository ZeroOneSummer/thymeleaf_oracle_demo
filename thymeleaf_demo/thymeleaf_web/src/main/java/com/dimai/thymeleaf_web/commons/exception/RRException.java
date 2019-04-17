package com.dimai.thymeleaf_web.commons.exception;

import lombok.Data;

@Data
public class RRException extends RuntimeException{

    private String code;        //异常状态码

    private String msg;         //异常信息

    private String desc;        //描述

    public RRException(String code, String msg, String desc) {
        super();
        this.code = code;
        this.msg = msg;
        this.desc = desc;
    }

}
