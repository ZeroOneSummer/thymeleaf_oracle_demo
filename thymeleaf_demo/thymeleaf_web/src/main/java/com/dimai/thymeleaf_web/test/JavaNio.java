package com.dimai.thymeleaf_web.test;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;

/**
 * Created by pijiang on 2019/4/22.
 */
public class JavaNio {

    /**
     * 读文件
     * @param path
     */
    static void readFile(String path){

        System.out.println("read starting ...");
        FileInputStream file = null;
        try {
            //获取文件
            file = new FileInputStream(path);
            //获取通道
            FileChannel channel = file.getChannel();
            //读入缓冲区
            ByteBuffer bf = ByteBuffer.allocate(1024);
            int lth = -1;
            String str = "";
            while ((lth=channel.read(bf)) != -1){
                //从0开始存储
                bf.clear();
                //转化成byte数组
                byte[] bytes = bf.array();
                str = new String(bytes, 0, lth);
            }
            System.out.println(str);
            //关闭通道
            channel.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(file != null) file.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    /**
     * 写文件
     * @param path
     */
    static void writeFile(String path){

        FileOutputStream file = null;
        try {
            //获取文件
            file = new FileOutputStream(path);
            //获取通道
            FileChannel channel = file.getChannel();
            //读入缓冲区
            ByteBuffer info = Charset.forName("utf8").encode(
                    "姓名：张无忌\n" +
                        "公司：中原武林\n" +
                        "口号：驱除元室，百姓太平\n" +
                        "部门：明教\n" +
                        "职位：教主\n" +
                        "年龄：18岁\n" +
                        "技能：九阳神功、七伤拳、大力金刚指、乾坤大挪移、圣火令心法、太极剑\n" +
                        "配偶：赵敏");
            int lth = 0;
            String str = "";
            while ((lth=channel.write(info)) != 0){

            }
            System.out.println("write success !");
            //关闭通道
            channel.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(file != null) file.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }


    public static void main(String[] args) {
        String path = "E:/iworkspace/thymeleaf_demo/thymeleaf_web/src/main/resources/static/file/test.txt";
        JavaNio.writeFile(path);
        JavaNio.readFile(path);
    }
}
