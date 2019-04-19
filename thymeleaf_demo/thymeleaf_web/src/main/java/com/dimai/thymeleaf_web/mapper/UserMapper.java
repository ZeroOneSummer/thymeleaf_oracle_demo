package com.dimai.thymeleaf_web.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;
import org.apache.ibatis.jdbc.SQL;
import org.thymeleaf.entity.UserEntity;

import java.util.List;

/**
 * Created by pijiang on 2019/4/15.
 */
@Mapper
public interface UserMapper {

    /**
     * ibatis注解方式
     */
    @SelectProvider(type = UserMapper.UserSelect.class, method = "selectById")
    List<UserEntity> getUsers(@Param(value="id") Integer id);

    class  UserSelect {
        public String selectById(Integer id){
            return new SQL(){{
                SELECT("*");
                FROM("\"user\"");
                if(id != null){
                    WHERE("id=" + id);
                }
            }}.toString();
        }
    }

    /**
     * xml映射方式
     */
    void updateUser(UserEntity user);

    void delUser(int id);

    void addUser(UserEntity user);

}
