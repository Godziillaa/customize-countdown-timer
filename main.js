const Clock = function (obj) {
    const self = this;
    self.s = obj.initial || 60;
    self.effect = obj.effect || false;
    self.wrap = document.getElementById(obj.ele);
    self.cNode = '<div class="count-wrap"><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div><div class="count-dot"></div><div class="dig-wrap"><div class="dig-item dig-0"></div><div class="dig-item dig-0"></div></div></div>';

    self.effect && (self.wrap.innerHTML = self.cNode) || (self.wrap.innerHTML = '00:00:00');
    self.handle = setInterval(function () {
        if (self.s <= 0) {
            !!obj.end && obj.end();
            clearInterval(self.handle)
        } else {
            self.s--;
            const HH = patz(~~(self.s / 3600)), MM = patz(~~((self.s - HH * 3600) / 60)), SS = patz(self.s - ~~(self.s / 60) * 60);
            const FOO = HH + ':' + MM + ':' + SS;
            if (obj.effect === true) {
                setEffect(HH, MM, SS);
            } else {
                self.wrap.innerHTML = FOO;
            }
            !!obj.running && obj.running({
                raw: self.s,
                HH, MM, SS, FOO
            });
        }
    }, 1000);
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

        // (digsWrap[0].getEle('dig-item'))[0].classList.add('dig-1');
        // console.log(digsWrap[0]);
    }
    function getEle(cls, p) {
        return !!p ? p.getElementsByClassName(cls) : document.getElementsByClassName;
    }
}


const clock1 = new Clock({
    ele: 'wrap1',
    initial: 3500,
    effect: true,
    running(s) {
        // console.log(s);
    },
    end() {
        console.log('end');
    }
});
const clock2 = new Clock({
    ele: 'wrap2',
    initial: 3800,
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
    initial: 13800,
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
    initial: 100,
    running(res) {
        // console.log(res);
        // res = { raw: number, HH: '00', MM: '00', SS: '00', FOO: '00:00:00' }
    },
    end() {
        console.log('end');
    }
});