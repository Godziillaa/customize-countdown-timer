# 无图片CSS+Javascript自适应通用倒计时
## CSS+Javascript countdown timer without any pictures

>使用方法: 

*引入style.css和main.js即可*

(```)
const clock = new Clock({
    ele: 'wrap', // 容器ID
    initial: 100, //初始时间，单位秒
    effect: true, //是否使用案例效果，默认不开启
    running(res) { //运行时回调方法
        /*
        res = { 
            raw: number, //当前剩余秒
            HH: '00', //小时
            MM: '00', //分钟
            SS: '00', //秒
            FOO: '00:00:00' //格式化时分秒
        }
        */
    },
    end() { //倒计时结束执行回调方法
        console.log('end');
    }
});
(```)


>开发环境: 
* 编辑器：VS CODE
* 插件：Easy Less