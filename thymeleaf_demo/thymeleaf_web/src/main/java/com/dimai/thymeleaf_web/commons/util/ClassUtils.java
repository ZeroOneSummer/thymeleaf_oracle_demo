package com.dimai.thymeleaf_web.commons.util;

import com.google.gson.Gson;
import com.dimai.thymeleaf_web.commons.model.UserEntity2;

import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pijiang on 2019/4/18.
 * todo 通过java反射自动封装数据
 */
public class ClassUtils {


    public static <T> void optEntity(Class<T> entity) throws Exception{

        //属性key
        Map<String, String> keys = new HashMap(){{
            put("1", "id");
            put("2", "name");
            put("3", "age");
        }};

        //获取封装实体
        T et = entity.newInstance();

        //加工
        ClassUtils.process(entity, keys, et);

        //打印结果
        System.out.println("自动封装结果:" + new Gson().toJson(et));
    }

    public static <T> void process(Class<?> entity, Map<String, String> keys, T et) throws Exception{

        //1.获取实体所有属性体集合
        PropertyDescriptor[] propertyDescriptors = Introspector.getBeanInfo(entity).getPropertyDescriptors();

        //2.遍历取出各属性体，存在Map里(key属性名-value属性体)
        Map<String, PropertyDescriptor> propertyDescriptorMap = new HashMap<>();
        for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
            propertyDescriptorMap.put(propertyDescriptor.getName(), propertyDescriptor);
        }

        //3.根据属性key，取出对应属性体
        int i = 1;
        for (String key : keys.keySet()) {
            PropertyDescriptor propertyDescriptor = propertyDescriptorMap.get(keys.get(key));
            Method writeMethod = propertyDescriptor.getWriteMethod();
            //模拟取值封装到对于属性
            if (i == 1){
                writeMethod.invoke(et, 1);
            } else if (i == 2){
                writeMethod.invoke(et, "乔峰");
            } else if (i == 3){
                writeMethod.invoke(et, (short)42);
            }
            i++;
        }

    }


    public static void main(String[] args) throws Exception{
        ClassUtils.optEntity(UserEntity2.class);
    }

}
