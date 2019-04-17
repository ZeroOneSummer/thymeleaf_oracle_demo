package com.dimai.thymeleaf_web.commons.Aspect;


import com.dimai.thymeleaf_web.commons.annotion.SysLog;
import com.dimai.thymeleaf_web.commons.util.IpUtil;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by pijiang on 2019/4/17.
 */
@Slf4j
@Component
@Aspect
public class SysLogAspet {

    @Pointcut("@annotation(com.dimai.thymeleaf_web.commons.annotion.SysLog)")
    public void logPointCut() {}

    @Around("logPointCut()")
    public Object around(ProceedingJoinPoint point) throws Throwable {

        long beginTime = System.currentTimeMillis();
        Object result = point.proceed();
        long time = System.currentTimeMillis() - beginTime;
        log.info("请求执行时间：{} ms", time);
        //save日志。。。。


        //参数
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String method = request.getMethod();
        String queryString = request.getQueryString();

        Object[] args = point.getArgs();
        String params = "";
        try {
            if (args.length > 0) {
                if ("POST".equals(method)) {
                    Object object = args[0];
                    params = new Gson().toJson(object);
                } else if ("GET".equals(method)) {
                    params = queryString;
                }
                params = URLDecoder.decode(params,"UTF-8");
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        log.info("请求IP：{} | 请求URL：{} | 请求参数：{}", request.getRemoteHost()+":"+request.getRemotePort(), request.getRequestURI(), params);

        return result;
    }

    @Before("logPointCut()")
    public void Before(JoinPoint joinPoint) {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        SysLog syslog = method.getAnnotation(SysLog.class);
        if(syslog != null){
            //注解上的描述
            log.info("注解描述：{}", syslog.value());
        }

    }

    @AfterReturning(pointcut = "logPointCut()",returning = "rvt")
    public void AfterReturning(JoinPoint joinPoint, String rvt) {

        //请求的方法名
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        String className = joinPoint.getTarget().getClass().getName();
        String methodName = signature.getName();
        //请求的参数
        Object[] args = joinPoint.getArgs();
        Map<String,Object> params = new HashMap<>();
        for(int i =0; i<args.length; i++){
            params.put("param"+i, args[i]);
        }

        log.info("请求方法名：{} | 返回结果：{} ", className+"."+methodName, new Gson().toJson(params));
    }

}
