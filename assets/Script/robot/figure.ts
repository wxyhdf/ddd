import { GameHelper } from "../common/gameHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Figure extends cc.Component {

    rigidbody: cc.RigidBody = null;
    
    onLoad() {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
    }
    start_Run: boolean = false;
    startRun() {
        this.start_Run = true;
    }

    isInvincible: boolean = false;  //  星星状态开关


    maxHitCount: number = 3;
    hitcount: number = 3;
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "block") {
            if (this.isInvincible) {
                let event = new cc.Event.EventCustom(GameHelper.NodeEvent.HitBlock, true);
                event.setUserData({ target: otherCollider.node });
                this.node.dispatchEvent(event);

            }
            
            if (this.hitcount >= this.maxHitCount) {
                this.hitcount = 0;
                let worldManifold = contact.getWorldManifold();
                var vel1 = selfCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var vel2 = otherCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var relativeVelocity = vel1.sub(vel2) as cc.Vec2; //获取到两个碰撞体相互碰撞时在碰撞点上的相对速度 如果速度为(0,0)那么判定为上面碰撞
                if (relativeVelocity.equals(cc.v2(0, 0))) {
                    let event = new cc.Event.EventCustom(GameHelper.NodeEvent.HitBlock, true);
                    event.setUserData({ target: otherCollider.node });
                    this.node.dispatchEvent(event);
                }
            } else this.hitcount++;
        }
        if (otherCollider.node.name == "bloodNode") {
            let event = new cc.Event.EventCustom(GameHelper.NodeEvent.AddBlood, true);
            event.setUserData({ target: otherCollider.node });
            this.node.dispatchEvent(event);
        }

    }
    onEndContact(contact, selfCollider, otherCollider) {
        this.hitcount = 3;
    }

    /**
     * 开启无敌模式
     */
    OpendInvincible() {  // 2019年12月4日
        let self = this;
        self.isInvincible = true;
        GameHelper.GameInfo.moveSpeed = cc.v2(0, -600)
        self.scheduleOnce(() => {
            GameHelper.GameInfo.moveSpeed = cc.v2(0, -480);
            self.isInvincible = false;
        }, 5)
    }


    update() {


        if (this.start_Run) {
            this.rigidbody.linearVelocity = GameHelper.GameInfo.moveSpeed;
        }
    }

    // update (dt) {}
}
