package com.dimai.thymeleaf_web.test;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

/**
 * Created by pijiang on 2019/4/22.
 */
public class DateFormat {

    static void format(){
        LocalDate day = LocalDate.now();
        System.out.println("当前时间 yyyy-MM-dd: " + day);

        Date date = new Date();
        System.out.println("当前时间 ww MM dd HH:mm:ss yyyy: " + date);

        String format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
        System.out.println("当前时间 yyyy-MM-dd HH:mm:ss : " + format);

        LocalDate with = day.with(TemporalAdjusters.dayOfWeekInMonth(4, DayOfWeek.MONDAY)); //当前月第4周的周1
        System.out.println("当前时间 : " + with);
    }

    public static void main(String[] args) {
        DateFormat.format();
    }

}
