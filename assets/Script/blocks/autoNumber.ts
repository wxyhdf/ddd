import { GameHelper } from "../common/gameHelper";
import TimeOutLoop from "../common/timeOutLoop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoNumber extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.numberLabel = this.node.getChildByName("label").getComponent(cc.Label);
    }
    start() {
    }
    update(dt) {
    }
    /**
     * 方块内数字的label对象
     */
    @property(cc.Label)
    numberLabel: cc.Label;

    timeOut:TimeOutLoop=null;

    /**
     * 生成方块内的值,瞬时变换的那种
     */
    genNumber() {
        if (this.numberLabel) {
            if(this.timeOut!=null) this.timeOut.stop();
            this.timeOut=new TimeOutLoop(()=>{
                let initVal = parseInt(this.numberLabel.string);
                const maxVal = 50;
                let newVal = initVal + 1;
                if (initVal >= maxVal) {
                    this.numberLabel.string = "0";
                } else {
                    this.numberLabel.string = newVal.toString();
                }
            },0.1,0,true);
            this.timeOut.start();
        }
    }

    stopGen() {
        if (this.timeOut !== null) {
            this.timeOut.stop();
            this.timeOut = null;
        }

    }

}
