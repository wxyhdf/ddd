// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    robot: cc.Node = null;
    /**
    * 屏幕监听开始点
    */
    start_Lisence_PointY: number = 0;

    //屏幕点击起始点
    touch_Start_Point: cc.Vec2 = cc.v2(0, 0);
    robot_Pre_Point: cc.Vec2 = cc.v2(0, 0);
    init() {
        this.node.on(cc.Node.EventType.TOUCH_START, (ev) => {
            let pos = ev.getLocation() as cc.Vec2;
            this.touch_Start_Point = pos;
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (ev) => {
            let pos = ev.getLocation() as cc.Vec2;
            if (this.touch_Start_Point.x == pos.x) return;
            let per = (pos.x - this.touch_Start_Point.x) * 0.6 + this.robot.x;
            //this.robot_Pre_Point = this.node.convertToWorldSpaceAR(this.robot.position);
            let visi = cc.view.getVisibleSize();

            if (per >= visi.width / 2 - this.robot.width / 2) per = visi.width / 2 - this.robot.width / 2;
            if (per <= -visi.width / 2 + this.robot.width / 2) per = -visi.width / 2 + this.robot.width / 2;
            this.robot.setPosition(per, this.robot.y);
            let rigidbody = this.robot.getComponent(cc.RigidBody);
            //rigidbody.linearVelocity = cc.v2(300, -640);
            this.touch_Start_Point = pos;
            //console.log(66);
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (ev) => {

        });
    }
    start() {
        this.start_Lisence_PointY = this.robot.y - this.robot.height / 2;
        //this.init();
    }
    /**
     * 相机移动flag
     */
    flag: boolean = false;
    lateUpdate() {
        if (this.robot.y > this.node.y) {
            this.flag = true;
            //this.node.setPosition(0, this.robot.y);
        }
        if (this.robot.y < this.node.y && this.flag) {
            this.node.setPosition(0, this.robot.y);
        }
        if (this.robot.y <= this.start_Lisence_PointY) {
            this.init();
        }
    }

    // update (dt) {}
}
