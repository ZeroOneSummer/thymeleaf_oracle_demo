package com.dimai.thymeleaf_web.commons.lambda;

import com.google.gson.Gson;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by pijiang on 2019/4/22.
 */
public class HighLamb {

    //分组
    static void grouping(List<Student> list){
        Map<String, Map<String, List<Student>>> groups = list.stream().collect(Collectors.groupingBy(Student::getSchool, Collectors.groupingBy(Student::getMajor)));
        System.out.println("根据学校分组后：" + new Gson().toJson(groups));
    }

    //分区
    static void partition(List<Student> list){
        Map<Boolean, List<Student>> partition = list.stream().collect(Collectors.partitioningBy(student -> "武汉大学".equals(student.getSchool())));
        System.out.println("根据学校分区后：" + new Gson().toJson(partition));
    }

    //格式化
    public static void messageFormat() {
        String msg = "欢迎光临，当前（{0}）等待的业务受理的顾客有{1}位，请排号办理业务！";
        MessageFormat mf = new MessageFormat(msg);
        String fmsg = mf.format(new Object[]{new Date(), 35});
        System.out.println(fmsg);
    }


    public static void main(String[] args) {

        List<Student> students = new ArrayList<Student>() {{
                add(new Student(20160001, "孔明", 20, "土木工程", "武汉大学"));
                add(new Student(20160002, "伯约", 21, "信息安全", "武汉大学"));
                add(new Student(20160003, "玄德", 22,  "经济管理", "武汉大学"));
                add(new Student(20160004, "云长", 21,  "信息安全", "武汉大学"));
                add(new Student(20161001, "翼德", 21, "机械与自动化", "华中科技大学"));
                add(new Student(20161002, "元直", 23, "土木工程", "华中科技大学"));
                add(new Student(20161003, "奉孝", 23, "计算机科学", "华中科技大学"));
                add(new Student(20162001, "仲谋", 22, "土木工程", "浙江大学"));
                add(new Student(20162002, "鲁肃", 23,  "计算机科学", "浙江大学"));
                add(new Student(20163001, "丁奉", 24,  "土木工程", "南京大学"));
            }};

        HighLamb.grouping(students);
        HighLamb.partition(students);
        HighLamb.messageFormat();

    }

    static class Student {
        private Integer id;
        private String name;
        private Integer age;
        private String major;
        private String school;

        public Student(Integer id, String name, Integer age, String major, String school) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.major = major;
            this.school = school;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getAge() {
            return age;
        }

        public void setAge(Integer age) {
            this.age = age;
        }

        public String getMajor() {
            return major;
        }

        public void setMajor(String major) {
            this.major = major;
        }

        public String getSchool() {
            return school;
        }

        public void setSchool(String school) {
            this.school = school;
        }
    }

}
