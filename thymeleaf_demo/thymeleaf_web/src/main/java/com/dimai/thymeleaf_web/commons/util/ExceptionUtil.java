package com.dimai.thymeleaf_web.commons.util;

/**
 * Created by justinhuang on 19/06/2017.
 */
public class ExceptionUtil {
    public static String getFriendlyMessage(Throwable t){
        if(t!=null) {
            String msg = t.getMessage() == null ? t.toString() : t.getMessage();
            String causeStr = null;
            Throwable cause = t.getCause();
            while (cause != null && cause.getCause() != null) {
                cause = cause.getCause();
            }
            if (cause != null) {
                causeStr = cause.getMessage() == null ? cause.toString() : cause.getMessage();
            }
            if (causeStr != null) {
                return msg + "(cause:" + causeStr + ")";
            } else {
                return msg;
            }
        }else {
            return "";
        }
    }
}
