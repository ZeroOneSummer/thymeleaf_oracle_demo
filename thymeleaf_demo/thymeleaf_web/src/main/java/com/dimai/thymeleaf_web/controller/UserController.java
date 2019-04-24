package com.dimai.thymeleaf_web.controller;

import com.dimai.thymeleaf_web.commons.annotion.SysLog;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.entity.UserEntity;
import org.thymeleaf.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by pijiang on 2019/4/15.
 */
@Controller
@RequestMapping("/")
@Slf4j
public class UserController {

    @Autowired
    UserService.Iface userService;

    @GetMapping("index.html")
    public String index() {
        return "index";
    }

    @SysLog("切面测试")
    @GetMapping("getUsers")
    public String getUsers(@RequestParam(name = "page") Integer page,
                           @RequestParam(name = "limit") Integer limit, Model model) throws Exception {
        Map<String, Object> pages = new HashMap<>();

        PageHelper.startPage(page, limit);
        List<UserEntity> list = userService.getUsers();
        PageInfo<UserEntity> pageInfo = new PageInfo<>(list);
        pageInfo.getTotal();

        pages.put("currPage", pageInfo.getPageNum());
        pages.put("pageSize", pageInfo.getPageSize());
        pages.put("pageCount", pageInfo.getPages());
        pages.put("count", pageInfo.getTotal());
        pages.put("data", list);

        model.addAttribute("pages", pages);
        log.info("getUsers数据返回：{}", model);

        return "index";
    }

    @GetMapping("getUsers2")
    public String getUsers2(Map map) throws Exception {
        log.info("进入getUsers2方法");

        List<UserEntity> list = userService.getUsers();
        map.put("users", list);

        return "index";
    }

    @GetMapping("addUser")
    @ResponseBody
    public void addUser() throws Exception {

        UserEntity userEntity = new UserEntity();
        userEntity.setName("王建");
        userEntity.setAge((short) 23);

        log.info("插入用户：{}", userEntity);
        userService.addUser(userEntity);
    }

    @GetMapping("delUser")
    @ResponseBody //防止thymeleaf报错
    public void delUser() throws Exception {

        log.info("删除用户id: ", 3);
        userService.delUser(3);
    }

}

