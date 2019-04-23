package com.dimai.thymeleaf_web.controller;

import lombok.extern.slf4j.Slf4j;
import org.databene.contiperf.PerfTest;
import org.databene.contiperf.Required;
import org.databene.contiperf.junit.ContiPerfRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.thymeleaf.entity.UserEntity;
import org.thymeleaf.service.UserService;

import java.util.List;

/**
 * Created by pijiang on 2019/4/15.
 * 1）PerfTest参数
 * @PerfTest(invocations = 300)：执行300次，和线程数量无关，默认值为1，表示执行1次；
 * @PerfTest(threads=30)：并发执行30个线程，默认值为1个线程；
 * @PerfTest(duration = 20000)：重复地执行测试至少执行20s。
 * 2）Required参数
 * @Required(throughput = 20)：要求每秒至少执行20个测试；
 * @Required(average = 50)：要求平均执行时间不超过50ms；
 * @Required(median = 45)：要求所有执行的50%不超过45ms；
 * @Required(max = 2000)：要求没有测试超过2s；
 * @Required(totalTime = 5000)：要求总的执行时间不超过5s；
 * @Required(percentile90 = 3000)：要求90%的测试不超过3s；
 * @Required(percentile95 = 5000)：要求95%的测试不超过5s；
 * @Required(percentile99 = 10000)：要求99%的测试不超过10s;
 * @Required(percentiles = "66:200,96:500")：要求66%的测试不超过200ms，96%的测试不超过500ms。
 *
 * 在测完之后，在本地的target目录下面，有一个文件目录contiperf-report，打开该目录下面唯一的index.html文件
 */
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserController {

    @Autowired
    UserService.Iface userService;

    @Rule
    public ContiPerfRule i = new ContiPerfRule();   //使用@Rule注释激活ContiPerf

    @Test
    @PerfTest(invocations = 1000, threads = 40)     //@PerfTest指定调用次数和线程数量
    @Required(max = 1200, average = 250, totalTime = 60000)     //@Required指定性能要求（每次执行的最长时间，平均时间，总时间等）。
    public void getUsers() throws Exception {
        log.info("getUsers test start ...");

        List<UserEntity> list = userService.getUsers(); //实现类添加缓存
        log.info("getUsers test end !");
    }

}

