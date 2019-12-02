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

    maxHitCount: number = 5;
    hitcount: number = 5;
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "block") {
            if (this.hitcount >= this.maxHitCount) {
                this.hitcount = 0;
                let worldManifold = contact.getWorldManifold();
                var vel1 = selfCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var vel2 = otherCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var relativeVelocity = vel1.sub(vel2) as cc.Vec2; //获取到两个碰撞体相互碰撞时在碰撞点上的相对速度 如果速度为(0,0)那么判定为上面碰撞
                //console.log(relativeVelocity);
                // let points = contact.getWorldManifold().points;
                // let p = otherCollider.node.position;
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
        this.hitcount = 5;
    }

    update() {
        // if (this.start_Run) {
        //     if (this.rigidbody.linearVelocity.y <= -640) {
        //         this.rigidbody.linearDamping = 1;
        //     } else {
        //         //this.rigidbody.applyLinearImpulse(cc.v2(0, -640), this.rigidbody.getWorldCenter(), true);
        //         this.rigidbody.linearDamping = 0;
        //     }
        // }

        if (this.start_Run) {
            this.rigidbody.linearVelocity = cc.v2(0, -540);
        }
    }

    // update (dt) {}
}
