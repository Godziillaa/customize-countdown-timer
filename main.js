const Clock = function (obj) {
    const self = this;
    const cNode = '<div class="count-wrap"><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div></div>';
    self.s = obj.initial || 60;
    self.autoStart = (obj.autoStart === 0 || obj.autoStart === false) ? false : true;
    self.handle = null;
    self.effect = obj.effect || false;
    self.wrap = document.getElementById(obj.ele);
    self.effect && (self.wrap.innerHTML = cNode) || (self.wrap.innerHTML = '00:00:00');
    function patz(n) {
        return ~~n > 9 ? n.toString() : '0' + n;
    }
    function setEffect(H, M, S) {
        const HArr = H.split(''), MArr = M.split(''), SArr = S.split('');
        const digsWrap = getEle('dig-wrap', self.wrap);
        getEle('dig-item', digsWrap[0])[0].className = 'dig-item dig-' + HArr[0];
        getEle('dig-item', digsWrap[0])[1].className = 'dig-item dig-' + HArr[1];
        getEle('dig-item', digsWrap[1])[0].className = 'dig-item dig-' + MArr[0];
        getEle('dig-item', digsWrap[1])[1].className = 'dig-item dig-' + MArr[1];
        getEle('dig-item', digsWrap[2])[0].className = 'dig-item dig-' + SArr[0];
        getEle('dig-item', digsWrap[2])[1].className = 'dig-item dig-' + SArr[1];
    }
    function getEle(cls, p) {
        return !!p ? p.getElementsByClassName(cls) : document.getElementsByClassName;
    }
    const init = function () {
        clearInterval(self.handle);
        self.handle = setInterval(function () {
            if (self.s <= 0) {
                !!obj.end && obj.end();
                clearInterval(self.handle)
            }
            const HH = patz(~~(self.s / 3600)), MM = patz(~~((self.s - HH * 3600) / 60)), SS = patz(self.s - ~~(self.s / 60) * 60);
            const FOO = HH + ':' + MM + ':' + SS;

            if (self.effect) {
                setEffect(HH, MM, SS)
            } else { 
                self.wrap.innerHTML = FOO 
            }

            !!obj.running && obj.running({
                raw: self.s,
                HH, MM, SS, FOO
            });

            self.s -= 1;
        }, 1000);
    }
    self.autoStart && init();
    self.pause = function () {
        clearInterval(self.handle);
    }
    self.start = function () {
        init();
    }
    self.restart = function () {
        self.s = obj.initial || 60;
        init();
    }
}


const clock1 = new Clock({
    ele: 'wrap1',
    initial: 3501,
    effect: true,
    autoStart: true,
    running(s) {
        // console.log(s);
    },
    end() {
        console.log('end');
    }
});
document.getElementById('btn1').onclick=function(){
    clock1.start();
}
document.getElementById('btn2').onclick=function(){
    clock1.pause();
}
document.getElementById('btn3').onclick=function(){
    clock1.restart();
}

const clock2 = new Clock({
    ele: 'wrap2',
    initial: 3805,
    effect: true,
    running(s) {
        // console.log(s);
    },
    end() {
        console.log('end');
    }
});
const clock3 = new Clock({
    ele: 'wrap3',
    initial: 13809,
    effect: true,
    running(s) {
        // console.log(s);
    },
    end() {
        console.log('end');
    }
});
const clock4 = new Clock({
    ele: 'wrap4',
    initial: 10,
    // autoStart: false,
    running(res) {
        // console.log(res);
        // res = { raw: number, HH: '00', MM: '00', SS: '00', FOO: '00:00:00' }
    },
    end() {
        console.log('end');
    }
});