package com.dimai.thymeleaf_web.test;

import java.util.LinkedList;
import java.util.Queue;

/**
 * Created by pijiang on 2019/4/22.
 * TODO: java5特性 FIFO的线性表
 * add          增加一个元索                     如果队列已满，则抛出一个IIIegaISlabEepeplian异常
 * remove       移除并返回队列头部的元素          如果队列为空，则抛出一个NoSuchElementException异常
 * element      返回队列头部的元素               如果队列为空，则抛出一个NoSuchElementException异常
 * offer        添加一个元素并返回true            如果队列已满，则返回false
 * poll         移除并返问队列头部的元素          如果队列为空，则返回null
 * peek         返回队列头部的元素                如果队列为空，则返回null
 * put          添加一个元素                     如果队列满，则阻塞
 * take         移除并返回队列头部的元素    
 */
public class JavaQueue {

    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        //添加（尾部）
        queue.offer("a");
        queue.offer("b");
        queue.offer("c");
        System.out.println("添加后：" + queue);
        //移除（头部）
        String s = queue.poll();
        System.out.println("移除" + s + "后：" + queue);
        //获得头部第一个元素
        String e = queue.peek();
        System.out.println("第一个元素：" + e);
    }
}
