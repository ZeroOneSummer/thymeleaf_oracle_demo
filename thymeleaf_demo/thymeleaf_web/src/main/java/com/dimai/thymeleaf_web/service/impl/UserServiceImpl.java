package com.dimai.thymeleaf_web.service.impl;

import com.dimai.thymeleaf_web.mapper.UserMapper;
import org.apache.thrift.TException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.thymeleaf.entity.UserEntity;
import org.thymeleaf.service.UserService;

import java.util.List;

/**
 * Created by pijiang on 2019/4/15.
 */
@CacheConfig(cacheNames = "user")
@Service
public class UserServiceImpl implements UserService.Iface {

    @Autowired
    UserMapper userMapper;

    @Cacheable(value = "getUsers" ,key = "targetClass + methodName + #p0")
    @Override
    public List<UserEntity> getUsers() throws TException {
        return userMapper.getUsers(null);
    }

    @Override
    public void updateUser(UserEntity user) throws TException {
        userMapper.updateUser(user);
    }

    @Override
    public void delUser(int id) throws TException {
        userMapper.delUser(id);
    }

    @Override
    public void addUser(UserEntity user) throws TException {
        userMapper.addUser(user);
    }
}
