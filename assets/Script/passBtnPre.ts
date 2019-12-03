
const {ccclass, property} = cc._decorator;
import {
    GameHelper
} from './common/gameHelper';
import Config from "./common/config";
@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onClickFunc,this);
    }

    start () {

    }

    onClickFunc(){
        switch (this.node.name) {
            case "btn1":
                GameHelper.GameInfo.pass = Config.pass_1;
                cc.log("xuanzhongl ")
                break;
            case "btn2":
                GameHelper.GameInfo.pass = Config.pass_2;
                break;
            default:
                break;
        }
    }

    // update (dt) {}
}
