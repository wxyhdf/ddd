import Config from "../common/config";
import { GameHelper } from "../common/gameHelper";

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
            for (let i = 0; i < 20; i++) {
                let pass_btn = cc.instantiate(this.passBtnPre);
                pass_btn.parent = this.passFather;
                let pass_btn_str = pass_btn.getChildByName("pass_btn_str").getComponent(cc.Label);
                pass_btn.name = "btn" + (i + 1);
                pass_btn_str.string = (i + 1).toString();
                if (pass_btn.name == "btn1" || pass_btn.name == "btn2" || pass_btn.name == "btn4") {
                    pass_btn.color = cc.color(177, 128, 56);
                } else if (pass_btn.name == "btn3" || pass_btn.name == "btn5" || pass_btn.name == "btn6") {
                    pass_btn.color = cc.color(254, 184, 81);
                } else if (pass_btn.name == "btn7" || pass_btn.name == "btn10" || pass_btn.name == "btn12") {
                    pass_btn.color = cc.color(243, 123, 93);
                } else if (pass_btn.name == "btn8" || pass_btn.name == "btn9" || pass_btn.name == "btn11") {
                    pass_btn.color = cc.color(170, 86, 65);
                } else {
                    pass_btn.color = cc.color(149, 196, 123);
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
     * 人物视图的滚动
     */
    @property(cc.ScrollView)
    robotList_Scroll: cc.ScrollView = null;
    /**
     * robot的预制体
     */
    @property(cc.Prefab)
    robot: cc.Prefab = null;
    /**
     * 生成机器人皮肤的父节点content
     */
    @property(cc.Node)
    contentRob: cc.Node = null;

    /**
     * 机器人选择的按钮函数
     */
    robotSelectFunc() {
        this.select.active = false;
        this.pass_exitBtnRob.node.active = true;
        this.muen.active = false;
        this.topstart.node.active = false;
        GameHelper.GameInfo.gameFlag = false;
        this.robotList_Scroll.node.active = true;
        for (let i = 0; i < 6; i++) {
            let robots = cc.instantiate(this.robot);
            robots.parent = this.contentRob;
            cc.log(robots.y)
        }
        this.contentRob.y = 100;
    }
    /**
     * 取消选择机器人函数
     */
    noRobotSelectFunc() {
        this.select.active = true;
        this.pass_exitBtnRob.node.active = false;
        this.muen.active = true;
        this.topstart.node.active = true;
        this.robotList_Scroll.node.active = false;

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
