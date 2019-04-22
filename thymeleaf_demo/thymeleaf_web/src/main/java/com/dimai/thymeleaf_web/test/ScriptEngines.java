package com.dimai.thymeleaf_web.test;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

/**
 * Created by pijiang on 2019/4/22.
 * TODO： java6特性 -- Java 和 Js之间的调用
 */
public class ScriptEngines {

    static void greet(){
        ScriptEngineManager manager = new ScriptEngineManager();
        ScriptEngine engine = manager.getEngineByName("JavaScript");

        if (engine == null) throw new RuntimeException("找不到JavaScript语言执行引擎。");

        try {

            String script = "function run() { print('run called'); }";
            engine.eval(script);
            // 从脚本引擎中获取Runnable接口对象（实例）. 该接口方法由具有相匹配名称的脚本函数实现。
            Invocable inv = (Invocable) engine;
            Runnable runnable = inv.getInterface(Runnable.class);
            // 启动一个线程运行上面的实现了runnable接口的script脚本
            Thread thread = new Thread(runnable);
            thread.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        ScriptEngines.greet();
    }
}
