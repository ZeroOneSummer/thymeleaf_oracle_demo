package com.dimai.thymeleaf_web.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by pijiang on 2019/4/23.
 */
@Slf4j
@Controller
@RequestMapping("/")
public class NacosController {

//    @NacosValue("${spring.datasource.type:none}")
    String dbType;

//    @NacosValue("${user.iname}")
    String name;

//    @NacosValue("${user.info}")
    String info;

//    @NacosValue("${user.age}")
    String age;

    @GetMapping("getConfig")
    @ResponseBody
    public Object getConfig(){
        Map<String, String>  rs = new HashMap<String, String>(){{
            put("dbType", dbType);
            put("name", name);
            put("info", info);
            put("age", age);
        }};

        log.info("获取nacos配置的参数：{}", rs);
        return rs;
    }

}
