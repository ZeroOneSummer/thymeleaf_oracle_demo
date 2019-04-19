package com.dimai.thymeleaf_web.commons.lambda;

/**
 * Created by pijiang on 2019/4/19.
 */
public class OneThread{

    /**
     * 匿名内部类
     */
    public static void runThread1(){
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Runnable计时开始");
                int i = 0;
                while (true){
                    i++;
                    try {
                        if (i == 60) break;
                        Thread.sleep(1000);
                        System.out.println("【Runnable】第" + i + "秒");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Runnable计时结束");
            }
        }).start();
    }

    /**
     * lambda表达式
     */
    public static void runThread2(){
       new Thread(() -> {
           System.out.println("lambda计时开始");
           int i = 0;
           while (true){
               i++;
               try {
                   if (i == 30) break;
                   Thread.sleep(1000);
                   System.out.println("【lambda】第" + i + "秒");
               } catch (InterruptedException e) {
                   e.printStackTrace();
               }
           }
           System.out.println("lambda计时结束");
       }).start();
    }


    public static void main(String[] args) {
        OneThread.runThread1();
        OneThread.runThread2();
    }

}
