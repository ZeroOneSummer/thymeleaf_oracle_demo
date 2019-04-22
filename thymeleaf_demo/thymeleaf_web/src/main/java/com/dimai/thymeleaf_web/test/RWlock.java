package com.dimai.thymeleaf_web.test;

import java.util.concurrent.locks.StampedLock;

/**
 * Created by pijiang on 2019/4/22.
 */
public class RWlock {

//    private final ReadWriteLock lock = new ReentrantReadWriteLock();  //读写重入锁
    private final StampedLock lock = new StampedLock();                 //读写非重入锁
    private double money;

    void add(double amount){
        long stamp = lock.writeLock(); //票据, ReadWriteLock不需要
        try {
            money += amount;
        } finally {
            lock.unlockWrite(stamp);
        }
    }

    double get(){
        long stamp = lock.readLock();
        try {
            return money;
        } finally {
            lock.unlockRead(stamp);
        }
    }

    public static void main(String[] args) {
        RWlock rWlock = new RWlock();
        rWlock.add(100);
        System.out.println(rWlock.get());
    }

}
