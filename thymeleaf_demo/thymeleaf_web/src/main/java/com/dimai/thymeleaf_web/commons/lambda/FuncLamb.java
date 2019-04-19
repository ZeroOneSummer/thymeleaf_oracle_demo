package com.dimai.thymeleaf_web.commons.lambda;

import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

/**
 * Created by pijiang on 2019/4/19.
 */
public class FuncLamb {

    //函数式接口，里面只能有一个抽象方法，default、static方法必须有具体的实现
    @FunctionalInterface
    interface FuncLambIface{
        //抽象方法
        int calc(int num1, int num2);
        //非抽象方法
        default int calc2(int num1, int num2){
            return num1 - num2;
        }
        static int calc3(int num1, int num2){
            return num1 / num2;
        }
    }

    //lambda表达式重写接口抽象方法(唯一)实现实例化
    static void calcByLamb(int num1, int num2){
        FuncLambIface funcLambIface = (n1, n2) -> n1 + n2;
        System.out.println("非抽象方法:" + funcLambIface.calc2(num1, num2));
        System.out.println("抽象方法:" + funcLambIface.calc(num1, num2));
    }

    //***************************************************************************
    //条件函数的使用
    static void filter(Predicate condition){
        List list = Arrays.asList("Java", "Scala", "C++", "Haskell", "Lisp");
        list.stream().filter(e -> condition.test(e)).forEach(System.out::println);
    }


    public static void main(String[] args) {
        calcByLamb(4, 5);
        System.out.println("打印集合所有值：");
        filter((str)-> true);
    }

}
