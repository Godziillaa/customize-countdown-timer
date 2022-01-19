const Clock = function (obj) {
    const self = this;
    const cNode = '<div class="count-wrap"><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div></div>';
    self.raw = obj.initial || 60;
    self.HH = null;
    self.MM = null;
    self.SS = null;
    self.formated = null;
    self.autostart = (obj.autostart === 0 || obj.autostart === false) ? false : true;
    self.handle = null;
    self.effect = obj.effect || false;
    self.wrap = document.getElementById(obj.ele);
    self.effect && (self.wrap.innerHTML = cNode) || (self.wrap.innerHTML = '00:00:00');
    function patz(n) {
        return ~~n > 9 ? n.toString() : '0' + n;
    }
    function setEffect() {
        const HArr = self.HH.split(''), MArr = self.MM.split(''), SArr = self.SS.split('');
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
    function cal() {
        self.HH = patz(~~(self.raw / 3600)); self.MM = patz(~~((self.raw - self.HH * 3600) / 60)); self.SS = patz(self.raw - ~~(self.raw / 60) * 60);
        self.formated = self.HH + ':' + self.MM + ':' + self.SS;
        if (self.effect) {
            setEffect()
        } else {
            self.wrap.innerHTML = self.formated
        }
    }
    const init = function () {
        clearInterval(self.handle);
        self.handle = setInterval(function () {
            if (self.raw <= 0) {
                !!obj.end && obj.end();
                clearInterval(self.handle);
            }
            cal();
            !!obj.running && obj.running(self);
            self.raw -= 1;
        }, 1000);
    }

    self.autostart && init() || cal();
    self.pause = function () {
        clearInterval(self.handle);
    }
    self.start = function () {
        init();
    }
    self.restart = function () {
        self.raw = obj.initial || 60;
        init();
    }
}


const clock1 = new Clock({
    ele: 'wrap1',
    initial: 72111,
    effect: true,
    autostart: false,
    running(res) {
        // console.log(res);
    },
    end() {
        console.log('end');
    }
});
document.getElementById('btn1').onclick = function () {
    clock1.start();
}
document.getElementById('btn2').onclick = function () {
    clock1.pause();
}
document.getElementById('btn3').onclick = function () {
    clock1.restart();
}

const clock2 = new Clock({
    ele: 'wrap2',
    initial: 3805,
    effect: true,
    running(res) {
        // console.log(res);
    },
    end() {
        console.log('end');
    }
});
const clock3 = new Clock({
    ele: 'wrap3',
    initial: 13809,
    effect: true,
    running(res) {
        // console.log(res);
    },
    end() {
        console.log('end');
    }
});
const clock4 = new Clock({
    ele: 'wrap4',
    initial: 10,
    // autostart: false,
    running(res) {
        console.log(res);
    },
    end() {
        console.log('end');
    }
});