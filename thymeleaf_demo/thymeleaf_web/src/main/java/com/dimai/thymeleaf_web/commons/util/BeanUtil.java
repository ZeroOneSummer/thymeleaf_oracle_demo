package com.dimai.thymeleaf_web.commons.util;

import com.google.gson.Gson;
import org.springframework.beans.BeanUtils;

/**
 * Created by pijiang on 2019/4/19.
 *
 * 1.两个bean属性名必须相同才能转换成功
 * 2.属性数量可以不一致，只转换存在的属性值
 * 3.属性名相同但类型不同的需要转换类型
 */
public class BeanUtil {

    public void test(){
        Person person = new Person(1, "狗蛋", 18);
        Dog dog = new Dog();
        System.out.println("人变狗前的狗：" + new Gson().toJson(dog));

        BeanUtils.copyProperties(person, dog);
        //个别类型不同，手动转换
        dog.setId(String.valueOf(person.getId()));

        System.out.println("人变狗后的狗：" + new Gson().toJson(dog));
    }

    public static void main(String[] args) {
        new BeanUtil().test();
    }




    class Person{
        private int id;
        private String name;
        private int age;

        public Person(int id, String name, int age) {
            this.id = id;
            this.name = name;
            this.age = age;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }

    class Dog{
        private String id;
        private String name;
//        private String age;

        public Dog() {
        }

        public Dog(String id, String name, String age) {
            this.id = id;
            this.name = name;
//            this.age = age;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

//        public String getAge() {
//            return age;
//        }
//
//        public void setAge(String age) {
//            this.age = age;
//        }
    }
}
