/**
 * 自定义时间计时器
 */
class TimeOutArray {
    static _array = [];
}
export default class TimeOutLoop {
    private callback: Function; //回调函数
    private timeout: number; //回调函数执行间隔
    private repeat: number; //重复次数 为空则执行回调函数一次 为0则循环执行回调函数
    private immediately: boolean; //立即执行 为真则立即执行回调函数
    public timeId: number = 0;
    private _excuecount: number = 0; //重复次数
    private _finishEvent: Function[] = [];
    private _isback: boolean = false;  //后台定时器

    /**
     * 构造函数
     * @param callback 回调函数
     * @param timeout 回调函数执行间隔
     * @param repeat 重复次数 为空则执行回调函数一次 为0则循环执行回调函数
     * @param delay 立即执行 为真则立即执行回调函数
     */
    constructor(callback: Function, timeout: number, repeat?: number, immediately?: boolean) {
        this.callback = callback;
        this.timeout = timeout * 1000.0;
        this.repeat = repeat;
        this.immediately = immediately;
    }

    start(isback?: boolean): TimeOutLoop {
        if (isback) this._isback = isback;
        this._excuecount = 0;
        if (this.immediately && (this.repeat == 0 || this.repeat > 1)) {
            this._excuecount++; //调用了一次
            this.callback(); //延迟间隔为空 则立即执行回调函数
        }

        if (this.repeat && this.repeat != 0) {
            this.repeatExcue(); //执行repeat次函数
        } else if (this.repeat == 0) {
            this.loop(); //循环执行函数 直到用户主动调用stop停止函数
        } else {
            this.oneceExcue();
        }
        return this;
    }
    //执行一次函数
    private oneceExcue() {
        this.timeId = setTimeout(() => {
            this.remove(this.timeId);
            this.callback();
            this.runFinishEvent();
        }, this.timeout); //执行一次函数
        this.add(this.timeId);
    }
    //执行repeat次函数
    private repeatExcue() {
        let timeOut = () => {
            this.timeId = setTimeout(() => {
                this.remove(this.timeId);
                this._excuecount++;
                this.callback();
                //判断循环次数是否达到
                if (this._excuecount >= this.repeat) {
                    this.stop();
                    this.runFinishEvent();
                } else timeOut();
            }, this.timeout);
            this.add(this.timeId);
        }
        timeOut();
    }
    //循环执行函数
    private loop() {
        let timeOut = () => {
            this.timeId = setTimeout(() => {
                this.remove(this.timeId);
                this.callback();
                timeOut();
            }, this.timeout);
            this.add(this.timeId);
        }
        timeOut();
    }
    //执行用户注册的任务完成回调函数
    private runFinishEvent() {
        for (const item of this._finishEvent) {
            item(); //执行回调
        }
    }
    //停止当前计时器
    stop() {
        clearTimeout(this.timeId);
    }
    /**
     * 注册回调函数 loop循环状态下此方法不生效
     * @param finish 计时器完成任务后的回调函数列表
     */
    then(...finish: Function[]) {
        this._finishEvent.push(...finish);
    }
    static stopAll(isback?: boolean) {
        for (const item of TimeOutArray._array) {
            if (!isback && item.isback) continue; //后台定时器不指定参数默认不清除
            clearTimeout(item.id);
        }
    }

    private add(id: number) {
        TimeOutArray._array.push({ id: id, isback: this._isback });
    }

    private remove(id: number) {
        let i = -1;
        for (const key in TimeOutArray._array) {
            if (TimeOutArray._array.hasOwnProperty(key)) {
                const element = TimeOutArray._array[key];
                if (element == id) {
                    i = Number(key);
                    break
                }
            }
        }
        if (i != -1 && !isNaN(i)) {
            TimeOutArray._array.splice(i, 1);
        }
    }
}