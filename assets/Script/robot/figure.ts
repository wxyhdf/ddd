import { GameHelper } from "../common/gameHelper";
import { Audios, AudioType } from "../common/Audios";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Figure extends cc.Component {

    @property(cc.Prefab)
    firePre: cc.Prefab = null;

    @property(cc.ParticleSystem)
    trailing: cc.ParticleSystem = null;

    public static instance: Figure = null;
    rigidbody: cc.RigidBody = null;
    start_Run: boolean = false;
    robotBurrowType: RobotBurrowType = RobotBurrowType.Idle;
    robotActionType: RobotActionType = RobotActionType.Idle;
    isInvincible: boolean = false;  //  星星状态开关

    anim: cc.Animation = null;
    playActionNum: any = 0;
    playRepeatCount: number = 10;


    onLoad() {
        Figure.instance = this;
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        this.anim = this.node.getComponent(cc.Animation);
        this.playAction();
    }
    startRun() {
        this.start_Run = true;
    }

    burrowBegin() {
        Figure.instance.robotBurrowType = RobotBurrowType.Burrow;
        this.showTrailing();
    }
    playAction() {
        this.anim.play("action_" + this.playActionNum).repeatCount = this.setPlayActionRepeatCount(0);
        this.anim.on("finished", () => {
            if (this.robotActionType == RobotActionType.Action_0) {
                this.robotActionType = this.setPlayActionOrder();
            } else {
                this.robotActionType = RobotActionType.Action_0;
            }
            this.anim.play("action_" + this.robotActionType).repeatCount = this.setPlayActionRepeatCount(this.robotActionType);
        });
    }

    setPlayActionOrder(): number {
        this.playActionNum = this.playActionNum >= 2 ? 1 : this.playActionNum + 1;
        return this.playActionNum;
    }

    setPlayActionRepeatCount(num: number): number {
        let count;

        switch (num) {
            case 0:
                count = 10;
                break;
            case 1:
                count = 3;
                break;
            case 2:
                count = 1;
                break;

            default:
                break;
        }

        return count;
    }

    stopAction() {
        this.anim.stop();
    }

    playGameAction(type: RobotBurrowType) {
        if (type == RobotBurrowType.Burrow) {
            this.anim.playAdditive('burrow');
        } else if (type == RobotBurrowType.EndJump) {
            this.anim.play("end_jump");
            this.anim.on("finished", () => {
                Audios.getInstance().playEffect('Fireworks', true);
                this.anim.play('end_dance').wrapMode = cc.WrapMode.Loop;
            });
        } else if (type == RobotBurrowType.Death) {
            this.anim.play('end_jump');
            var animation = this.node.getComponent(cc.Animation);
            animation.on('lastframe',(() => {
                this.anim.stop();
            }),this)
        }
    }


    maxHitCount: number = 3;
    hitcount: number = 3;
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {

        if (GameHelper.GameInfo.gameOver) return;


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
                    this.createFire();
                    Audios.getInstance().playEffect('attack01',false);
                    this.robotBurrowType = RobotBurrowType.Collision;
                } else {
                    this.showTrailing();
                }
            } else this.hitcount++;
        }
        if (otherCollider.node.name == "bloodNode") {
            let event = new cc.Event.EventCustom(GameHelper.NodeEvent.AddBlood, true);
            event.setUserData({ target: otherCollider.node });
            Audios.getInstance().playEffect('get_energy',false);
            this.node.dispatchEvent(event);
        }

    }
    onEndContact(contact, selfCollider, otherCollider) {
        this.hitcount = 3;
        this.robotBurrowType = RobotBurrowType.Collided;
    }

    createFire() {
        let fire = cc.instantiate(this.firePre);
        let firePar = fire.getComponent(cc.ParticleSystem);
        fire.parent = this.node;
        fire.position = cc.v2(0, this.node.height / 2);
        firePar.resetSystem();
    }

    showTrailing() {
        this.trailing.resetSystem();
    }

    hideTrailing() {
        this.trailing.stopSystem();
    }


   
    /**
     * 开启无敌模式
     */
    OpendInvincible() {  // 2019年12月4日
        let self = this;
        self.isInvincible = true;
        GameHelper.GameInfo.moveSpeed = cc.v2(0, -600)
        self.scheduleOnce(() => {
            Audios.getInstance().playEffect(AudioType.fever_end,false);//   播放无敌结束音效
            GameHelper.GameInfo.moveSpeed = cc.v2(0, -480);
            self.isInvincible = false;
        }, 5)
    }


    update() {

        if (this.start_Run) {
            this.rigidbody.linearVelocity = GameHelper.GameInfo.moveSpeed;

            if (this.robotBurrowType == RobotBurrowType.Collision) {
                this.hideTrailing();
            } else if (this.robotBurrowType == RobotBurrowType.Collided) {
                this.showTrailing();
                this.robotBurrowType = RobotBurrowType.Burrow;
            }
        }
    }


}

export enum RobotActionType {
    Idle,
    Action_0,
    Action_1,
    Action_2,
    Action_3,
}

export enum RobotBurrowType {
    Idle,
    Burrow,
    Collision,
    Collided,
    EndJump,
    Death,
}