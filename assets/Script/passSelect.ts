import Config from "./common/config";
import { GameHelper } from "./common/gameHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /**
     * 关卡的预制体
     */
    @property(cc.Prefab)
    passBtnPre: cc.Prefab = null;

    /**
     * 关卡选择的父节点
     */
    @property(cc.Sprite)
    pass_yellow: cc.Sprite = null;
    /**
     * 关卡按钮的父节点
     */
    @property(cc.Node)
    passFather: cc.Node = null;
    /**
     * 关卡背景
     */
    @property(cc.Sprite)
    pass_bg: cc.Sprite = null;
    /**
     * select节点：选择人物，关卡的父节点
     */
    @property(cc.Node)
    select: cc.Node = null;


    onLoad() {

    }

    start() {

    }
    passStatus = false;
    /**
     * 关卡的按钮函数
     */
    passYellowFunc() {

        this.pass_bg.node.active = true;
        this.select.active = false;
        if (!this.passStatus) {
            for (let i = 0; i < 9; i++) {
                let pass_btn = cc.instantiate(this.passBtnPre);
                pass_btn.parent = this.passFather;
                let pass_btn_str = pass_btn.getChildByName("pass_btn_str").getComponent(cc.Label);
                pass_btn.name = "btn" + (i + 1);
                pass_btn_str.string = (i + 1).toString();
                if (i >= 0) {
                    pass_btn.setPosition(i * 200 - 200, 350);
                }
                if (i >= 3) {
                    pass_btn.setPosition(i * 200 - 800, 180);
                }
                if (i >= 6) {
                    pass_btn.setPosition(i * 200 - 1400, 10);
                }
                pass_btn.on(cc.Node.EventType.TOUCH_START, (ev) => {
                    //console.log(Config.pass_info[ev.target.getSiblingIndex()]);
                    let event = new cc.Event.EventCustom(GameHelper.NodeEvent.UpdatePassInfo, true);
                    event.setUserData({ data: Config.pass_info[ev.target.getSiblingIndex()] })

                    pass_btn.dispatchEvent(event);
                })
            }
            this.passStatus = true;
        }

    }
    /**
     * 退出的按钮
     */
    @property(cc.Sprite)
    pass_exitBtnRob: cc.Sprite = null;
    /**
     * 初始化菜单
     */
    @property(cc.Node)
    muen: cc.Node = null;
    /**
     * 开始文字
     */
    @property(cc.Sprite)
    topstart: cc.Sprite = null;
    /**
     * 滚动视图
     */
    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;

    /**
     * 机器人选择的按钮函数
     */
    robotSelectFunc() {
        this.select.active = false;
        this.pass_exitBtnRob.node.active = true;
        this.muen.active = false;
        this.topstart.node.active = false;
        GameHelper.GameInfo.gameFlag = false;
    }
    /**
     * 取消选择机器人函数
     */
    noRobotSelectFunc() {
        this.select.active = true;
        this.pass_exitBtnRob.node.active = false;
        this.muen.active = true;
        this.topstart.node.active = true;
        var act1 = cc.fadeTo(1, 50);
        var act2 = cc.fadeTo(1, 255);
        var seq = cc.repeatForever(cc.sequence(act1, act2));
        this.topstart.node.runAction(seq);
        setTimeout(() => {
            GameHelper.GameInfo.gameFlag = true;
        }, 1000);
    }



    // update (dt) {}
}
