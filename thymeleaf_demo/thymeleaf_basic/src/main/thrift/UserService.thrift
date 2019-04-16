namespace java org.thymeleaf.service
include "UserEntity.thrift"

service UserService{
    list<UserEntity.UserEntity> getUsers(),
    void updateUser(1:UserEntity.UserEntity user),
    void delUser(1:i32 id),
    void addUser(1:UserEntity.UserEntity user),
}