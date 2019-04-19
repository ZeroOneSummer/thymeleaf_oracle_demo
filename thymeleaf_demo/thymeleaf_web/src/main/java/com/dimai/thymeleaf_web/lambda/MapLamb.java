package com.dimai.thymeleaf_web.lambda;

import com.google.gson.Gson;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by pijiang on 2019/4/19.
 */
public class MapLamb {

    static void optLamb(){
        Gson json = new Gson();

        //1.stream -> list or set
        List<String> list = Stream.of("a", "b", "c").map(str -> str.toUpperCase()).collect(Collectors.toList());
        System.out.println("1:" + json.toJson(list));

        //2.stream1 + stream2 = stream
        List<Integer> list1 = Stream.of(Arrays.asList(1, 3, 2), Arrays.asList(6, 4, 5)).flatMap(num -> num.stream()).sorted().collect(Collectors.toList());
        System.out.println("2:" + json.toJson(list1));

        //3.get max num
        Integer num = Arrays.asList(3, 5, 2, 9, 1).stream().max(Integer::compareTo).get();
        System.out.println("3:" + num);

        //4.num sum
        Integer sum = Stream.of(1, 2, 3, 4).reduce(0, (a, e) -> a + e);
        System.out.println("4:" + sum);

        //5.parallel sum
        Integer sumLength = Stream.of("Apple", "Banana").parallel().map(s -> s.length()).reduce(Integer::sum).get();
        System.out.println("5:" + sumLength);
    }

    public static void main(String[] args) {
        MapLamb.optLamb();
    }

}
