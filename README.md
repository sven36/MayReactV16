# MayReactV16

一直对ReactV16的实现很好奇,就想自己写一写,分享下对React16设计的理解:

### ReactV15与V16什么区别
    React大概可以分为两个阶段:
        调和阶段(Reconciler):React自顶向下递归,遍历node生成React Tree,Diff阶段找到变更node放入更新队列

        渲染阶段(Renderer):遍历更新队列，通过调用宿主环境的API，实际更新渲染对应元素。宿主环境，比如 DOM、Native、WebGL 等;
    
    V15处理方式:
        简单来说就是递归,所以React15的算法也被称为Stack Reconciler;这种方式有一个特点:一旦任务开始就很难中断,js将一直占用主线程可能会阻塞其它工作,导致掉帧;
    
    鉴于以上问题V16要解决这些问题其目标是:

        pause work and come back to it later(任务可中断)
        assign priority to different types of work(优先级调度)
        reuse previously completed work(任务可复用)
        abort work if it‘s no longer needed(任务可中止)

        一句话：增量渲染,时间分片（任务可拆分，可匀到多帧）那么如何达到这个目的？




