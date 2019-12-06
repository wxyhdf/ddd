const {
    ccclass,
    property
} = cc._decorator;

import {
    GameHelper
} from './common/gameHelper';

import config from './common/config';
import { Units } from './common/units';
import { AssetLoader } from './common/assetLoader';
@ccclass
export default class GameScene extends cc.Component {

    /**
     * 砖头
     */
    @property(cc.Node)
    robot: cc.Node = null;
    /**
     * 背景节点
     */
    @property(cc.Node)
    background: cc.Node = null;
    /**
     * 摄像机
     */
    @property(cc.Node)
    camera: cc.Node = null;
    /**
    * 小方块的颜色
    */
    @property(cc.Color)
    smallBlock: cc.Color = cc.color(255, 199, 67, 255);
    /**
     * 方块预制体
     */
    @property(cc.Prefab)
    block: cc.Prefab = null;
    /**
    * 方块生成之间的高度距离
    */
    @property(cc.Float)
    block_Between_Height: number = 300;
    /**
     * 栏杆生成的父节点
     */
    @property(cc.Node)
    railingNode: cc.Node = null;
    /**
     * 方块生成的父节点
     */
    @property(cc.Node)
    blockNode: cc.Node = null;
    /**
     * 画笔
     */
    @property(cc.Graphics)
    draw: cc.Graphics = null;

    /**
     * 栏杆预制体
     */
    @property(cc.Prefab)
    railing: cc.Prefab = null;

    start_touch_one: boolean = false;

    /**
     * 触发开始Game
     */
    OnGameStart(e) {
        if (!this.start_touch_one) {
            this.start_touch_one = true;
            //设置重力加速度
            //cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
            let rigidbody = this.robot.getComponent(cc.RigidBody);
            //施加往上的力
            rigidbody.applyLinearImpulse(cc.v2(0, 5000), rigidbody.getWorldCenter(), true);
            cc.tween(this.robot).to(0.5, { angle: -180 }).call(() => {
                this.robot.getChildByName("info").active = true;

                this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
                this.robot.getComponent("figure").startRun();
            }).start();
        }
    }

    /**
     * 加血对象池
     */
    bloodPool: AssetLoader.FactoryPool = new AssetLoader.FactoryPool();
    /**
    * 当前存在的加血buff  用于回收加血节点
    */
    bloodArray: Units.List<cc.Node> = new Units.List<cc.Node>();
    /**
     * 当前关卡方块生成配置数组
     */
    blockConfig: cc.Vec2[][] = [];
    /**
     * 方块节点池
     */
    blockPool: AssetLoader.FactoryPool = new AssetLoader.FactoryPool();
    /**
     * 当前存在的方块  用于回收方块
     */
    blockArray: Units.List<cc.Node> = new Units.List<cc.Node>();


    /**
     * 栏杆节点池 2019年12月3日
     */
    railingPool: AssetLoader.FactoryPool = new AssetLoader.FactoryPool();
    /**
     * 当前存在的栏杆   2019年12月3日
     */
    railingArray: Units.List<cc.Node> = new Units.List<cc.Node>();


    /**
     * 第一块方块生成的y轴坐标
     */
    blockCurrentPOSY: number = 0;
    /**
     * 当前方块生成的配置指向索引 用来读取blockConfig当前关卡方块生成配置数组
     */
    blockCurrentId: number = 0;
    /**
     * 当前的背景指向索引 用来读取backgroundPool背景节点数组
     */
    currentBackgroundId: number = 0;
    /**
     * 背景节点数组
     */
    backgroundPool: cc.Node[] = [];
    /**
     * 生成背景(第一次生成三张背景图)
     */
    createBackground() {
        /**
         * 第一次生成方块的位置在第一张背景图下面的200px位置
         */
        this.blockCurrentPOSY = this.background.y + this.background.height / 2 - 200;
        this.backgroundPool.push(this.background);
        let bg2 = cc.instantiate(this.background);
        bg2.y = this.background.y - bg2.height;
        this.backgroundPool.push(bg2);
        let bg3 = cc.instantiate(this.background);
        bg3.y = bg2.y - bg3.height;
        this.backgroundPool.push(bg3);
        bg2.setParent(this.background.getParent());
        bg3.setParent(this.background.getParent());
    }

    /**
     * 根据配置计算出所有方块生成的坐标
     * @param config 关卡方块配置
     */
    createConfigCoordinate(config: number[][]) {
        let visi = cc.view.getVisibleSize();
        let width = visi.width / 5;
        //this.blockConfig = config;
        for (const items of config) {
            let _item = [];
            for (const key in items) {
                if (items.hasOwnProperty(key)) {
                    const item = items[key];
                    if (item) {
                        let x = visi.width / 10 + visi.width / 5 * Number(key);
                        _item.push(cc.v2(x, this.blockCurrentPOSY));
                    }
                }
            }
            this.blockConfig.push(_item);
            // cc.log('宽'+width)
            this.blockCurrentPOSY -= this.block_Between_Height;    //  2019年12月3日
        }
    }

    /**
     * 生成加血buff
     */
    createBlood() {
        let ran = Math.floor(Math.random() * 10);
        // 1/2几率生成加血buff
        if (ran < 6) {
            //随机生成1~3个
            let num = Math.floor(Math.random() * 2) + 1;
            //随机通道
            let pip = [];
            while (true) {
                let p = Math.floor(Math.random() * 5);
                if (pip.indexOf(p) == -1) {
                    pip.push(p);
                }
                if (pip.length == num) break;
            }
            let visi = cc.view.getVisibleSize();
            for (let i = 0; i < pip.length; i++) {
                this.bloodPool.acyncCreate<cc.Prefab>("prefab/bloodNode", cc.Prefab).then((node) => {
                    let x = visi.width / 10 + visi.width / 5 * pip[i];
                    let pos = this.blockNode.convertToNodeSpaceAR(cc.v2(x, this.blockCurrentPOSY - 300));
                    node.setPosition(pos);
                    let b = Math.floor(Math.random() * 10) + 1;
                    node.getChildByName("label").getComponent(cc.Label).string = b.toString();
                    this.blockNode.addChild(node);
                })
            }
        }
    }





    /**
     * 生成方块 /   栏杆
     */
    createBlock(): boolean {
        let visi = cc.view.getVisibleSize();
        let width = visi.width / 5;
        let isStar = Math.floor(Math.random() * 10)
        if (this.blockCurrentId == this.blockConfig.length) return false;
        let blockCoordinate = this.blockConfig[this.blockCurrentId];
        for (const item of blockCoordinate) {
            //更新方块所指向y轴坐标
            this.blockCurrentPOSY = this.blockNode.convertToNodeSpaceAR(item).y;
            // cc.log('坐标' + this.blockNode.convertToNodeSpaceAR(item));
            this.blockPool.acyncCreate<cc.Prefab>("prefab/block", cc.Prefab).then((node) => {
                node.width = width;
                node.height = width;
                let collider = node.getComponent(cc.PhysicsBoxCollider);
                collider.size.width = width;
                collider.size.height = width;
                let star = node.getChildByName("star");
                star.width = width;
                star.height = width;
                let label = node.getChildByName("label");
                label.getComponent(cc.Label).string = Math.floor(Math.random() * 300000000 + 1).toString();
                node.setPosition(this.blockNode.convertToNodeSpaceAR(item));
                this.blockArray.add(node);
                this.blockNode.addChild(node);
                if (isStar > 4) {
                    star.active = true;
                }
            })


            let isRailing = Math.floor(Math.random() * 2)   //  2019年12月3日
            if (this.blockNode.convertToNodeSpaceAR(item).x < 200 && isRailing) {  //  生成栏杆
                let raiType: number = 2 - Math.floor(Math.random() * 3 + 1)  //  类型 -1 0 1
                let raiVarietye: number = Math.floor(Math.random() * 2) //  种类
                cc.log(raiVarietye);
                let pos = this.blockNode.convertToNodeSpaceAR(item)
                if (raiType == 0) {
                    let isReversals: number = 1;
                    for (let i = 0; i < 2; i++) {
                        this.railingPool.acyncCreate<cc.Prefab>("prefab/railing", cc.Prefab).then((node) => {   //  2019年12月3日

                            node.getComponent("Railing").changeRailing(raiVarietye, raiType, isReversals)
                            if (isReversals < 0) {
                                node.setPosition(pos.x + width / 2, (pos.y - width - width / 2 + 20) * isReversals)
                            } else {
                                node.setPosition(pos.x + width / 2, (pos.y + width + width / 2 - 20) * isReversals)

                            }
                            isReversals = isReversals * -1
                            this.railingArray.add(node)
                            this.blockNode.addChild(node)
                        })

                    }
                } else {
                    this.railingPool.acyncCreate<cc.Prefab>("prefab/railing", cc.Prefab).then((node) => {   //  2019年12月3日
                        node.getComponent("Railing").changeRailing(raiVarietye, raiType)
                        if (raiType > 0) {
                            node.setPosition(pos.x + width / 2, (pos.y - width - width / 2 + 20) * raiType)  //  下
                        } else {
                            node.setPosition(pos.x + width / 2, (pos.y + width + width / 2 - 20) * raiType)
                        }

                        this.railingArray.add(node)
                        this.blockNode.addChild(node)
                    })
                }


            }

        }
        this.createBlood();
        //最后一波不生成血量
        //if (this.blockCurrentId == this.blockConfig.length - 1) 
        //console.log(this.blockPool, this.bloodPool)
        this.blockCurrentId++;
        return true;
    }



    init() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnGameStart, this);
        this.node.on(GameHelper.NodeEvent.HitBlock, (ev: cc.Event.EventCustom) => {
            let node = ev.getUserData()["target"] as cc.Node;
            GameHelper.GameInfo.blood--;
            if (GameHelper.GameInfo.blood == 0) {
                this.robot.removeFromParent();
                //alert("Game Over");
                console.log("Game Over")
            }
            this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
            let label = node.getChildByName("label");
            let star = node.getChildByName("star");
            let isInvincible = this.robot.getComponent("figure").isInvincible;
            let blood = Number(label.getComponent(cc.Label).string) - 1;
            if (isInvincible) {
                this.blockPool.onKilled(node);
                label.getComponent(cc.Label).string = blood.toString();
                return;
            }
            if (blood == 0) {
                if (star.active === true) {
                    this.robot.getComponent("figure").OpendInvincible();
                }
                this.blockPool.onKilled(node);
            }
            label.getComponent(cc.Label).string = blood.toString();
        })
        this.node.on(GameHelper.NodeEvent.AddBlood, (ev: cc.Event.EventCustom) => {
            let node = ev.getUserData()["target"] as cc.Node;
            let blood = Number(node.getChildByName("label").getComponent(cc.Label).string);
            //加血
            GameHelper.GameInfo.blood += blood;
            //回收节点
            this.bloodPool.onKilled(node);
            //更新血量
            this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
        })

        // this.node.on(GameHelper.NodeEvent.HitRailing,(ev : cc.Event.EventCustom) => {
        //     let node = ev.getUserData()["target"] as cc.Node;
        //     let robot_x = this.robot.x;
        //     if(node.x === robot_x){
        //         debugger
        //     }
        // })
    }
    /**
     * 画笔开始画画的起点
     */
    draw_Start_PointY: number = 0;

    onLoad() {
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //设置重力加速度
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        // cc.director.getCollisionManager().enabled = true;

        //生成背景节点
        this.createBackground();
        //设置画笔起始y轴坐标
        this.draw_Start_PointY = this.robot.y - this.robot.height / 2;
        this.draw.moveTo(0, this.robot.y - this.robot.height / 2);
        //使用第一关的关卡配置;
        this.createConfigCoordinate(config.pass_1);
        //首先生成一次方块
        this.createBlock();

        //this.spawnNewPlayer();
        this.init();
    }
    /**
    * 判断节点是否可见
    * @param node 节点
    */
    isVisible(node: cc.Node): boolean {
        let visi = cc.view.getVisibleSize();
        if (this.camera.y + visi.height / 2 < node.y - node.height / 2) return false;
        return true;
    }

    /**
    * 判断节点是否可见
    * @param node 节点
    */
    pointDirectionByVisible(node: cc.Node): GameHelper.Direction {
        let visi = cc.view.getVisibleSize();
        if (this.camera.y + visi.height / 2 < node.y - node.height / 2) return GameHelper.Direction.Up;
        if (this.camera.y - visi.height / 2 > node.y + node.height / 2) return GameHelper.Direction.Down;
        return GameHelper.Direction.Visible;
    }
    /**
     * 移动背景节点
     */
    moveBackground() {
        if (!this.isVisible(this.backgroundPool[this.currentBackgroundId])) {
            let back = this.backgroundPool[this.currentBackgroundId];
            let prebackId = this.currentBackgroundId - 1;
            if (prebackId < 0) prebackId = this.backgroundPool.length - 1;
            let prebak = this.backgroundPool[prebackId];
            back.y = prebak.y - back.height;
            this.currentBackgroundId++;
            if (this.currentBackgroundId >= this.backgroundPool.length) this.currentBackgroundId = 0;
            //console.log(this.backgroundPool)
        }
    }

    /**
     * 是否可以预加载下一批方块和回收方块
     */
    isPreCreateBlock() {
        //获取当前y轴指向的方块
        let node = this.blockArray.firstOrDefault(item => item.y == this.blockCurrentPOSY);
        //判断当前y轴指向的方块是否可见 可见则生成下一波方块
        if (node && this.pointDirectionByVisible(node) == GameHelper.Direction.Visible) {
            this.createBlock();
        }
        //获取回收节点  如果节点在可见屏幕的上方 则回收方块
        let removeItems = this.blockArray.where(item => this.pointDirectionByVisible(item) == GameHelper.Direction.Up);
        //移除方块
        this.blockArray.removeRange(removeItems);
        //回收节点
        for (const item of removeItems) {
            this.blockPool.onKilled(item);
        }
        //获取回收节点  如果节点在可见屏幕的上方 则回收血量
        removeItems = this.bloodArray.where(item => this.pointDirectionByVisible(item) == GameHelper.Direction.Up);
        //移除血量buff
        this.bloodArray.removeRange(removeItems);
        //回收血量buff
        for (const item of removeItems) {
            this.bloodPool.onKilled(item);
        }

    }



    start() {

    }

    update(dt) {
        this.moveBackground();
        this.isPreCreateBlock();

    }

    lateUpdate() {

        if (this.robot.y < this.draw_Start_PointY) {
            this.draw.lineTo(this.robot.x, this.robot.y);
            this.draw.lineCap = cc.Graphics.LineCap.ROUND;
            this.draw.lineWidth = this.robot.width;
            this.draw.strokeColor = cc.Color.RED;
            this.draw.stroke();
            this.draw.close();
            this.draw.moveTo(this.robot.x, this.robot.y);
        }
    }
}