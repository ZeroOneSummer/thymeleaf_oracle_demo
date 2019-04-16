package com.dimai.thymeleaf_web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.thymeleaf.entity.UserEntity;

import java.util.List;

/**
 * Created by pijiang on 2019/4/15.
 */
@Mapper
public interface UserMapper {

    List<UserEntity> getUsers();

    void updateUser(UserEntity user);

    void delUser(int id);

    void addUser(UserEntity user);

}
