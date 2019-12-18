const {
    ccclass,
    property
} = cc._decorator;

import {
    GameHelper
} from './common/gameHelper';

import config from './common/config';
import { Units } from './common/units';
import { Audios, AudioType } from './common/Audios';
import { AssetLoader } from './common/assetLoader';
import Camera from './camera';
import Config from './common/config';
import PassInfo from './common/config';
import localAction from './common/LocalAction';
import Figure, { RobotBurrowType } from './robot/figure';
import TimeOutLoop from './common/timeOutLoop';
import AutoNumber from './blocks/autoNumber';




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
     * 界面需要隐藏菜单
     */
    @property(cc.Node)
    muen: cc.Node = null;

    @property(cc.Node)
    info: cc.Node = null;

    /**
     * 摄像机
     */
    @property(cc.Node)
    camera: cc.Node = null;
    /**
    * 右上角分数值
    */
    @property(cc.Node)
    right_topStr: cc.Node = null;
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
    * 栏杆预制体
    */
    @property(cc.Prefab)
    railing: cc.Prefab = null;


    /**
    * 方块生成之间的高度距离
    */
    @property(cc.Float)
    block_Between_Height: number = 300;

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
 * 开始文字的闪烁
 */
    @property(cc.Sprite)
    topstartStr: cc.Sprite = null;

    /**
     * 初始化右上角的分数
     */
    rightScore = 0;
    /**
     * 结算节点
     */
    @property(cc.Sprite)
    scoreboard: cc.Sprite = null;
    /**
     * 结算的分数
     */
    @property(cc.Node)
    score_str: cc.Label = null;
    /**
     * 历史最高分数
     */
    @property(cc.Node)
    histroy_MaxScore: cc.Label = null;
    /**
     * 结束的闪烁文字
     */
    @property(cc.Sprite)
    topTocontinue: cc.Sprite = null;
    /**
     * 蓝色进度条
     */
    @property(cc.Sprite)
    progressBlue: cc.Sprite = null;
    /**
     * 初始化进度条的长度gg
     */
    @property(cc.Sprite)
    progressInit: cc.Sprite = null;
    /**
     * 进度条结束
     */
    @property(cc.Sprite)
    progressEnd: cc.Sprite = null;
    /**
     * 进度条的父节点
     */
    @property(cc.Node)
    progress: cc.Node = null;
    /**
     * 重来一局的按钮
     */
    @property(cc.Button)
    endBtn: cc.Button = null;
    /**
     * 选择关卡，人物的父节点
     */
    @property(cc.Node)
    select: cc.Node = null;

    /**
   *     弹窗父节点
   */
    @property(cc.Node)
    alert: cc.Node = null;

    /**
  *     弹窗父节点
  */
    @property(cc.Node)
    bg: cc.Node = null;
    /**
     * 关卡
     */
    @property(cc.Label)
    challenge: cc.Label = null;
    /**
     * 关卡的要求
     */
    @property(cc.Label)
    demand: cc.Label = null;
    /**
     * 预制体:机器人能量减少
     */
    @property(cc.Prefab)
    reduce: cc.Prefab = null;
    /**
     * 现在处于的关卡label
     */
    @property(cc.Label)
    level: cc.Label = null;


    start_touch_one: boolean = false;
    /**
     * 左边进度条的关数名
     */
    @property(cc.Label)
    level_leftProgress: cc.Label = null;
    /**
   * 右边进度条的关数名
   */
    @property(cc.Label)
    level_rightProgress: cc.Label = null;

    // /**
    //  *  选择关卡的时间限制
    //  */
    // timer_pass = 0;
    /**
    * 第四关血量减少
     */
    blood04 = 100;
    /**
     *  第四关计时
     */
    time04 = 15;
    /**
     * 关卡分数（包含秒数时）
     */
    @property(cc.Label)
    condition_score: cc.Label = null;
    /**
     * 通关的条件：06
     */
    pass06_condition = 0;
    /**
     * 通关的条件：08
     */
    pass08_condition = 0;

    /**
    * 通关的条件：09
    */
    pass14_condition = 0;
    /**
     * 闯关失败的时候的结束背景
     */
    @property(cc.Node)
    pass_failBg: cc.Node = null;
    /**
     * 确认选关之后在开始场景显示Label
     */
    @property(cc.Label)
    confirm_pass: cc.Label = null;
   
    /**
     * 场景显示里面的历史最高分
     */
    @property(cc.Node)
    crown_histroyMaxScore: cc.Label = null;
    public static instance: GameScene = null;
    isDraw: boolean = false;


    @property(cc.Node)
    robotStartPos: cc.Node = null;



    worldPos: cc.Vec2 = null;
    nodePos: cc.Vec2 = null;
    nowPos: cc.Vec2 = null;
    isDown: boolean = false;


    /**
     * 触发开始Game
     */
    OnGameStart() {
        Figure.instance.stopAction();

        if (!this.start_touch_one && GameHelper.GameInfo.gameFlag) {

            this.init();
            this.touch_startGame = true;
            this.topstartStr.node.active = false;
            this.select.active = false;
            this.start_touch_one = true;

            //设置重力加速度
            let rigidbody = this.robot.getComponent(cc.RigidBody);
            Audios.getInstance().playEffect('dig_start', false);
            //施加往上的力
            rigidbody.applyLinearImpulse(cc.v2(0, 1000), rigidbody.getWorldCenter(), true);
            cc.tween(this.robot).to(0.5, { angle: -180 }).call(() => {
                // this.robot.getChildByName("body").getChildByName("info").active = true;
                this.robot.getComponent("figure").startRun();
                this.isDown = true;
            }).start();

            this.node.off(cc.Node.EventType.TOUCH_START, this.cameraTween, this);
        }
    }

    /**
     * 结算时候的弹窗函数
     */
    endAlertFunc(score) {

        this.topTocontinue.node.scale = 1;
        // this.robot.removeFromParent();
        this.alertAccountsFunc(score, GameHelper.GameInfo.historyMaxScore);
        /***********2019-12-17***************** */
        TimeOutLoop.stopAll(); //停止所有的定时器
        GameHelper.GameInfo.isAutoNumber = false; //防止再来一局的时候，其他关卡出现方块值的变换
        /************************************** */
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
            this.blockCurrentPOSY -= this.block_Between_Height;
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
                    this.bloodArray.add(node);
                })
            }
        }
    }


    /** 
     * 生成栏杆
    */
    createRailing(item, width) {
        // let isRailing = Math.floor(Math.random() * 2)   //  2019年12月3日

        //******************************************* */

        let isRailing = 0; //根据关卡来生成栏杆的数字
        //这个判断是为了根据关卡来生成栏杆的多少
        if (GameHelper.GameInfo.level_left >= 1 && GameHelper.GameInfo.level_left < 20) {
            isRailing = Math.floor(Math.random() * 15)   //  2019年12月3日
        } else if (GameHelper.GameInfo.level_left >= 20 && GameHelper.GameInfo.level_left < 40) {
            isRailing = Math.floor(Math.random() * 20)
        } else {
            isRailing = Math.floor(Math.random() * 25)
        }
        //******************************************* */


        if (this.blockNode.convertToNodeSpaceAR(item).x < 200 && isRailing > 12) {  //  生成栏杆
            let pos = this.blockNode.convertToNodeSpaceAR(item)
            let raiType: number = 2 - Math.floor(Math.random() * 3 + 1)  //  类型 -1 0 1

            // raiType = 0
            if (raiType == 0) { //  上下都存在的类型
                let isReversals: number = -1;
                for (let i = 0; i < 2; i++) {
                    let raiVarietye: number = Math.floor(Math.random() * 2) //  种类(长/短)
                    let isCreate = this.isIntersect(pos, width, raiVarietye);
                    if (!isCreate) {
                        this.railingPool.acyncCreate<cc.Prefab>("prefab/railing", cc.Prefab).then((node) => {   //  2019年12月3日
                            node.getComponent("Railing").changeRailing(raiVarietye, raiType, isReversals)
                            if (raiVarietye > 0) {

                                if (isReversals < 0) {
                                    node.setPosition(pos.x + width / 2, (pos.y - width - width / 2) + 20) // 在方块下面生成长栏杆
                                } else {
                                    node.setPosition(pos.x + width / 2, (pos.y + width + width / 2 - 20) * isReversals) // 在方块上面生成长栏杆
                                }
                            } else if (raiVarietye < 1) {

                                if (isReversals < 0) {
                                    node.setPosition(pos.x + width / 2, (pos.y - width) + 10) // 在方块下面生成短栏杆
                                } else {
                                    node.setPosition(pos.x + width / 2, (pos.y + width - 10) * isReversals) // 在方块上面生成短栏杆
                                }
                            }

                            isReversals = isReversals * -1
                            this.railingArray.add(node)
                            this.blockNode.addChild(node)
                        })
                    }
                }
            } else {//  单上 / 单下 类型
                let raiVarietye: number = Math.floor(Math.random() * 2) //  种类(长/短)

                let isCreate = this.isIntersect(pos, width, raiVarietye);
                if (!isCreate) {
                    this.railingPool.acyncCreate<cc.Prefab>("prefab/railing", cc.Prefab).then((node) => {   //  2019年12月3日

                        node.getComponent("Railing").changeRailing(raiVarietye, raiType)
                        if (raiVarietye !== 0) {
                            if (raiType > 0) {
                                node.setPosition(pos.x + width / 2, (pos.y - width - width / 2 + 20) * raiType)  //   在方块下面生成长栏杆
                            } else {
                                node.setPosition(pos.x + width / 2, (pos.y + width + width / 2 - 20)) //   在方块上面生成长栏杆
                            }
                        } else {
                            if (raiType > 0) {
                                node.setPosition(pos.x + width / 2, (pos.y - width + 10) * raiType)  //   在方块下面生成短栏杆
                            } else {
                                node.setPosition(pos.x + width / 2, (pos.y + width - 10)) //   在方块上面生成短栏杆
                            }
                        }
                        this.railingArray.add(node)
                        this.blockNode.addChild(node)
                    })
                }
            }
        }
    }


    /**
     * 检测栏杆是否相交
     * @param pos 
     * @param width 
     * @param raiVarietye 
     */
    isIntersect(pos, width, raiVarietye): boolean {
        let nodeBoxRect;
        if (raiVarietye === 1) {
            nodeBoxRect = cc.rect((pos.x + width / 2) - (15 / 2), ((pos.y + width + width / 2) - 20) - (210 / 2), 15, 210);//  长矩形1
        } else {
            nodeBoxRect = cc.rect((pos.x + width / 2) - (15 / 2), pos.y + (105 / 2) - 10, 15, 105);//   短矩形1
        }
        for (let i = 0; i < this.railingArray.length; i++) {
            let node2 = this.railingArray[i];
            let r2 = cc.rect(node2.x - (node2.width / 2), node2.y - (node2.height / 2), node2.width, node2.height)
            // cc.log('矩形位置' + r2.x)
            // cc.log('相交状态' + nodeBoxRect.intersects(r2))
            if (nodeBoxRect.intersects(r2)) {
                // cc.log('相交了');
                return true
            }
        }
        return false;
    };


    /**
     * 生成方块 /   栏杆
     * 
     */
    async createBlock() {
        let visi = cc.view.getVisibleSize();
        let width = visi.width / 5;

        if (this.blockCurrentId == this.blockConfig.length) return false;
        let blockCoordinate = this.blockConfig[this.blockCurrentId];
        let sun = 0;

        for (let i = 0; i < GameHelper.GameInfo.pass[this.blockCurrentId].length; i++) {
            sun = sun + GameHelper.GameInfo.pass[this.blockCurrentId][i]    //  查看是否生成的是一组方块
        }
        // cc.log('GameHelper.GameInfo.pass' + GameHelper.GameInfo.pass[this.blockCurrentId])
        let createNum = 0;
        let pos_random = Math.floor(Math.random() * 5 + 1);
        for (const item of blockCoordinate) {
            createNum++
            let isStar = Math.floor(Math.random() * 20)
            //更新方块所指向y轴坐标
            this.blockCurrentPOSY = this.blockNode.convertToNodeSpaceAR(item).y;
            await this.blockPool.acyncCreate<cc.Prefab>("prefab/block", cc.Prefab).then((node) => {
                node.width = width;
                node.height = width;
                let collider = node.getComponent(cc.PhysicsBoxCollider);
                collider.size.width = width;
                collider.size.height = width;
                let star = node.getChildByName("star");
                star.width = width;
                star.height = width;
                let label = node.getChildByName("label");
                if (sun === 5) {
                    if (createNum === pos_random) {

                        let robot_blood = Number(this.info.getChildByName("label").getComponent(cc.Label).string);
                        // cc.log('robot_blood' + robot_blood)
                        if (robot_blood < 15) {
                            label.getComponent(cc.Label).string = Math.floor(Math.random() * 10 + 1).toString();
                        } else {
                            let pic = 0;
                            if (robot_blood >= 50) {
                                pic = 50;
                            } else {
                                pic = 15;
                            }
                            label.getComponent(cc.Label).string = Math.floor(Math.random() * (pic) + 1).toString();
                        }
                    } else {
                        label.getComponent(cc.Label).string = Math.floor(Math.random() * 30 + 1).toString();
                    }
                } else {
                    label.getComponent(cc.Label).string = Math.floor(Math.random() * 30 + 1).toString();
                }
                node.setPosition(this.blockNode.convertToNodeSpaceAR(item));
                this.blockArray.add(node);
                this.blockNode.addChild(node);
                if (isStar > 19 && this.blockArray.length > 5) {
                    star.active = true
                }


                //******************************************* */

                if (parseInt(label.getComponent(cc.Label).string) > 10 && parseInt(label.getComponent(cc.Label).string) <= 20) {
                    node.getChildByName("sprite").color = cc.color(228, 159, 120);
                } else if (parseInt(label.getComponent(cc.Label).string) > 20 && parseInt(label.getComponent(cc.Label).string) <= 25) {
                    node.getChildByName("sprite").color = cc.color(238, 115, 84);
                } else if (parseInt(label.getComponent(cc.Label).string) > 25 && parseInt(label.getComponent(cc.Label).string) <= 30) {
                    node.getChildByName("sprite").color = cc.color(241, 71, 87);
                } else if (parseInt(label.getComponent(cc.Label).string) > 30 && parseInt(label.getComponent(cc.Label).string) <= 40) {
                    node.getChildByName("sprite").color = cc.color(219, 36, 83);
                } else if (parseInt(label.getComponent(cc.Label).string) > 40 && parseInt(label.getComponent(cc.Label).string) <= 45) {
                    node.getChildByName("sprite").color = cc.color(195, 11, 81);
                } else if (parseInt(label.getComponent(cc.Label).string) > 45 && parseInt(label.getComponent(cc.Label).string) <= 50) {
                    node.getChildByName("sprite").color = cc.color(181, 7, 85);
                }
                else {
                    node.getChildByName("sprite").color = cc.color(253, 190, 42);
                }
                //******************************************* */

            })

            //  生成栏杆
            if (this.blockArray.length > 5) {
                this.createRailing(item, width);
            }

        }
        createNum = 0
        this.createBlood();
        //最后一波不生成血量
        //if (this.blockCurrentId == this.blockConfig.length - 1) 
        //console.log(this.blockPool, this.bloodPool)
        this.blockCurrentId++;
        //return true;
    }
    /**
     * 关卡方块值
     */
    rightTop_diaStr = 0;
    /**
     * 存储碰撞时的血量
     */
    touch_blood = 0;
    /**
     * 第五关方块值
     */
    block05 = 0;
    /**
     * 第四关的方块值:随着能量减少的变换
     */
    blodAdd04 = 0;
    /**
     * 第9关获得的方块值
     */
    block09 = 0;

    /**
      * 闯关方块值变换的函数
      */
    /**************2019-12-17******************** */
    passBlockChangeFunc(label, node) {
        if (this.pass_label == "Challenge 05") {
            this.block05 += parseInt(label.getComponent(cc.Label).string);
            this.condition_score.string = this.block05 + "/650";
            //移除方块
            this.blockArray.remove(node);
            //回收节点
            this.blockPool.onKilled(node);
            //取历史最高分
            GameHelper.GameInfo.historyMaxScore = Math.max(this.block05, GameHelper.GameInfo.historyMaxScore);
            return;
        }
        if (this.pass_label == "Challenge 13") {
            this.block05 += parseInt(label.getComponent(cc.Label).string);
            this.condition_score.string = this.block05 + "/850";
            //移除方块
            this.blockArray.remove(node);
            //回收节点
            this.blockPool.onKilled(node);
            //取历史最高分
            GameHelper.GameInfo.historyMaxScore = Math.max(this.block05, GameHelper.GameInfo.historyMaxScore);
            return;
        }

    }



    async init() {

        // 这个判断为再来一局打到能量为0时，初始化10能量

        if (GameHelper.GameInfo.blood === 0) {
            GameHelper.GameInfo.blood = 10;
        }


        //使用第一关的关卡配置;
        this.createConfigCoordinate(GameHelper.GameInfo.pass);

        //首先生成一次方块
        await this.createBlock();
        this.blockArray.forEach(item => {
            item.getChildByName("label").getComponent(cc.Label).string = (Math.round(Math.random()) + 1).toString();
            //******************************************* */
            item.getChildByName("sprite").color = cc.color(253, 190, 42);
            //******************************************* */
        });

        this.node.on(GameHelper.NodeEvent.HitBlock, (ev: cc.Event.EventCustom) => {
            let node = ev.getUserData()["target"] as cc.Node;
            let isInvincible = this.robot.getComponent("figure").isInvincible;
            if (!isInvincible) {
                GameHelper.GameInfo.blood--;

                // console.log("GameHelper.GameInfo.blood",GameHelper.GameInfo.blood)
            }
            this.info.getChildByName('label').getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
            /***********2019-12-17***************** */
            (node.getComponent("autoNumber") as AutoNumber).stopGen()
            /************************************** */
            let label = node.getChildByName("label");
            if (isInvincible) {

                this.right_topStr.getComponent(cc.Label).string = (parseInt(this.right_topStr.getComponent(cc.Label).string) + parseInt(label.getComponent(cc.Label).string)).toString();
                GameHelper.GameInfo.block_value = Number(this.right_topStr.getComponent(cc.Label).string);
                this.blockPool.onKilled(node);
                return;
            }

            let blood = Number(label.getComponent(cc.Label).string) - 1;
            let star = node.getChildByName("star");


            this.blood04--;
            this.blodAdd04++;
            this.block09++;
            this.passBlockChangeFunc(label, node); /**************2019-12-17******************** */

            if (blood == 0) {
                Audios.getInstance().playBreakEffect()  //  播放摧毁方块音效
                if (star.active === true) {
                    Audios.getInstance().playEffect(AudioType.revive_feveron, false); //  开启无敌音效
                    this.robot.getComponent("figure").OpendInvincible();    //  开启星星
                }
                this.blockPool.onKilled(node);
            }
            label.getComponent(cc.Label).string = blood.toString();
            GameHelper.GameInfo.block_value++;
            this.rightTop_diaStr++;
            //取历史最高分
            GameHelper.GameInfo.historyMaxScore = this.rightTop_diaStr;
            this.right_topStr.getComponent(cc.Label).string = String(this.rightTop_diaStr);

            if (GameHelper.GameInfo.blood == 0) { //机器人能量变为0时，弹出结束页面
                GameHelper.GameInfo.gameOver = true; //  设置人物死亡，不触发碰撞

                let maxScore = Number(this.right_topStr.getComponent(cc.Label).string)
                let localData = localAction.readLocalData();
                if (localData.maxScore === null) {    //  保存最大分数
                    localAction.saveMax(maxScore);
                } else {
                    if (Number(localData.maxScore) < maxScore) {
                        localAction.saveMax(maxScore);
                    }
                }
                localAction.clearLocalData();

                GameHelper.GameInfo.moveSpeed = cc.v2(0, 0);

                Figure.instance.stopAction();   //  停止所有动画
                Audios.getInstance().stopAudio(AudioType.drill_loop);   //  停止挖掘音效
                Figure.instance.playGameAction(RobotBurrowType.Death);  //  开启死亡动画
                Audios.getInstance().playEffect(AudioType.die, false);   //  播放死亡音效
                // setTimeout(() => {
                this.endAlertFunc(this.rightTop_diaStr);
                this.unscheduleAllCallbacks();
                // }, 2000)
            }
            let sprite = node.getChildByName("sprite");
            let color = sprite.color;
            //******************************************* */
            color.setB(color.getB() - 5);
            color.setG(color.getG() + 5);
            //******************************************* */
            sprite.color = color;
        })
        this.node.on(GameHelper.NodeEvent.AddBlood, (ev: cc.Event.EventCustom) => {
            let node = ev.getUserData()["target"] as cc.Node;
            let blood = Number(node.getChildByName("label").getComponent(cc.Label).string);
            this.touch_blood += blood;
            //加血
            GameHelper.GameInfo.blood += blood;
            //回收节点
            this.bloodPool.onKilled(node);
            //更新血量
            this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
        })
    }
    /**
     * 画笔开始画画的起点
     */

    robotPos: cc.Vec2;
    draw_Start_PointY: number = 0;

    onLoad() {
        GameScene.instance = this;
        GameHelper.GameInfo.gameOver = false;
        this.robotPos = this.robot.position;

        Audios.getInstance().playAudio('AI_2');


        // let windowSize = cc.winSize
        let localData = localAction.readLocalData();
        cc.log("localData => " + JSON.stringify(localData))
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //设置重力加速度
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        // cc.log(GameHelper.GameInfo.moveSpeed)
        //生成背景节点
        this.createBackground();
        //设置画笔起始y轴坐标
        // this.draw_Start_PointY = 800;


        this.worldPos = this.robotStartPos.parent.convertToWorldSpaceAR(this.robotStartPos.position);
        this.nodePos = this.robot.parent.convertToNodeSpaceAR(this.worldPos);
        this.robot.position = cc.v2(0, this.nodePos.y + this.robot.height / 2);


        // cc.log("this.bg.y", this.bg.y - 130 - this.bg.height / 2)
        // this.draw.moveTo(0, this.robot.y);
        this.node.on(cc.Node.EventType.TOUCH_START, this.cameraTween, this);
        this.topstartStrFunc();
        GameHelper.GameInfo.gameFlag = true;
        if (localData.level === null) {
            this.level.string = GameHelper.GameInfo.level_left.toString();  //  当前关卡
        } else {
            this.level.string = localData.level
        }

        if (localData.score === null) {
            this.right_topStr.getComponent(cc.Label).string = GameHelper.GameInfo.block_value.toString();
        } else {
            this.right_topStr.getComponent(cc.Label).string = localData.score;
            this.rightTop_diaStr = Number(localData.score);
        }
        if (localData.maxScore === null) {
            this.crown_histroyMaxScore.getComponent(cc.Label).string = "0";
        } else {
            // cc.log(localData.maxScore)
            this.crown_histroyMaxScore.getComponent(cc.Label).string = localData.maxScore;
        }
        if (localData.blood === null) {
            this.info.getChildByName('label').getComponent(cc.Label).string = GameHelper.GameInfo.blood.toString();
        } else {
            this.info.getChildByName('label').getComponent(cc.Label).string = localData.blood.toString();
        }

        if (!this.animationFlag && this.robot.y < this.draw.node.y) {
            this.animationFlag = true;
            this.robot.getChildByName("body").getChildByName("cap").getComponent(cc.Animation).play();
        }


    }



    cameraTween() {
        
        Audios.getInstance().playEffect('button_click0', false);
        this.muen.active = false
        cc.tween(this.camera.getComponent(cc.Camera))
            .to(0.5, { zoomRatio: 1 })
            .call(() => {
                this.OnGameStart();
            })
            .start()

        cc.tween(this.camera)
            .to(0.4, { position: cc.v2(0, -(this.camera.y - this.robot.y)) })
            .to(0.4, { position: cc.v2(0, 0) })
            .start();
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
        let node = this.blockArray.firstOrDefault(item => parseInt(item.y.toString()) == parseInt(this.blockCurrentPOSY.toString()));

        //判断当前y轴指向的方块是否可见 可见则生成下一波方块
        if (node && this.pointDirectionByVisible(node) == GameHelper.Direction.Visible) {
            if (GameHelper.GameInfo.isAutoNumber) {
                const blockGroup = this.blockArray.where(item => parseInt(item.y.toString()) == parseInt(this.blockCurrentPOSY.toString()));
                blockGroup.forEach(item => {
                    const autoNumInstance = item.getComponent("autoNumber") as AutoNumber;
                    autoNumInstance.genNumber()
                })
            }

            this.createBlock();
        }
        //获取回收节点  如果节点在可见屏幕的上方 则回收方块
        let removeItems = this.blockArray.where(item => this.pointDirectionByVisible(item) == GameHelper.Direction.Up);
        //移除方块
        this.blockArray.removeRange(removeItems);
        //回收节点
        for (const item of removeItems) {
            if (GameHelper.GameInfo.isAutoNumber) {
                const autoNumInstance = item.getComponent("autoNumber") as AutoNumber;
                autoNumInstance.stopGen();
            }

            this.blockPool.onKilled(item);
        }



        //获取回收节点  如果节点在可见屏幕的上方 则回收栏杆
        removeItems = this.railingArray.where(item => this.pointDirectionByVisible(item) == GameHelper.Direction.Up);
        //移除栏杆
        this.railingArray.removeRange(removeItems);
        //回收栏杆
        for (const item of removeItems) {
            this.railingPool.onKilled(item);
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
    /**
     * 开始文字闪烁函数
     */
    topstartStrFunc() {
        this.topstartStr.node.active = true;
        var act1 = cc.fadeTo(1, 50);
        var act2 = cc.fadeTo(1, 255);
        var seq = cc.repeatForever(cc.sequence(act1, act2));
        this.topstartStr.node.runAction(seq);
    }
    /**
     *  弹出结算框
     * @param current_score  当前局的结算获得的方块值
     * @param MaxScore  历史最高分数
     */
    alertAccountsFunc(current_score: number, MaxScore: number) {
        let localData = localAction.readLocalData();
        this.endBtn.node.active = true;
        this.scoreboard.node.active = true;
        this.progress.active = false;   //  隐藏进度条
        this.right_topStr.active = false;   //  隐藏界面获得分数
        this.topTocontinue.node.active = true;
        if (localData.maxScore === null) {
            this.histroy_MaxScore.getComponent(cc.Label).string = "0";
        } else {
            // cc.log('设置历史最高分数')
            this.histroy_MaxScore.getComponent(cc.Label).string = localData.maxScore;
        }
        this.score_str.getComponent(cc.Label).string = current_score.toString();
        var act1 = cc.fadeTo(1, 50);
        var act2 = cc.fadeTo(1, 255);
        var seq = cc.repeatForever(cc.sequence(act1, act2));
        this.topTocontinue.node.runAction(seq);
        GameHelper.GameInfo.block_value = 0; //用来表示当我这局不过关的时候，全局方块值变为0
    }
    /**
     * 重新加载场景，再来一局
     */

    endBtnOnclickFunc() {
        GameHelper.GameInfo.moveSpeed = cc.v2(0, -480);
        cc.director.loadScene("Muen");
    }
    /**
     * 弹窗退出
     */
    alertExitFunc() {
        this.alert.active = false;
    }
    /**
     * 全局选关
     */
    all_selectPass = [];
    /**
     * 确认选了这一关得Label
     */
    pass_label = "";
    /**
     * 确认选了这一关的条件
     */
    condition_str = "";
    /**
     * 确认选关
     */
    confirmPassFunc() {
        GameHelper.GameInfo.pass = this.all_selectPass;
        this.alert.active = false;
        this.pass_label = this.challenge.string;
        cc.log(this.pass_label);

    }
    /**
     * 通关过程钟中标签的显示
     */
    @property(cc.Label)
    condition_label: cc.Label = null;
    @property(cc.Node)
    condition: cc.Node = null;
    start() {
        this.node.on(GameHelper.NodeEvent.UpdatePassInfo, (ev: cc.Event.EventCustom) => {
            let data = ev.getUserData()["data"] as PassInfo;
            this.alert.active = true;
            this.alert.setPosition(this.camera.position);
            this.challenge.string = data.challenge;
            this.demand.string = data.demand;
            this.all_selectPass = data.pass;
            this.condition_str = data.condition;
        })
    }

    /***********2019-12-17***************** */
    endGame() {
        cc.director.loadScene("Muen");
        TimeOutLoop.stopAll();
    }
    /************************************* */

    /**
     * 通关成功调用的函数
     */
    passSuccessFunc() {
        this.gameRunning = false;
        this.robot.removeFromParent();
        /***********2019-12-17***************** */
        setTimeout(() => {
            this.endGame();
        }, 1000)
        /************************************** */
    }
    gameRunning = true;
    /**
     * 检查游戏状态
     */
    checkGameStatus() {
        switch (this.pass_label) {
            case "Challenge 01":
                this.condition_label.string = this.rightTop_diaStr + this.condition_str;
                if (this.rightTop_diaStr === 50) {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 02":
                this.condition_label.string = this.touch_blood + this.condition_str;
                if (GameHelper.GameInfo.blood >= 40) {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 03":
                if (this.condition_label.string == "00:00") {
                    this.gameRunning = false;
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 04":
                this.condition_score.string = this.blodAdd04.toString() + "/100";
                if (this.blood04 == 0) {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 05":
                if (this.block05 >= 650) {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 06":
                if (this.condition_label.string == "100m/100m") {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 07":
                break;
            case "Challenge 08":
                if (this.condition_score.string == "50m/50m") {
                    this.passSuccessFunc();
                }
                break;
            case "Challenge 09":
                this.condition_label.string = this.block09 + "/100";
                if (this.condition_label.string == "100/100") {
                    this.passSuccessFunc();
                }
                break;

            default:
                break;
        }
    }
    update(dt) {
        this.moveBackground();
        this.isPreCreateBlock();  //通关条件
        if (this.gameRunning) {
            this.checkGameStatus();
        }
    }
    /**
     * 金币
     */
    gold = 0;
    animationFlag: boolean = false;
    /**
     * 最后结束的时候的背景图
     */
    @property(cc.Sprite)
    end_bg: cc.Sprite = null;
    /**
     * 结束背景图遮罩
     */
    @property(cc.Sprite)
    gradiant: cc.Sprite = null;




    /**
     * 是否游戏结束
     */
    gameEnd = true;
    /**
     * 游戏是否再来一次，为了恢复原来的robot的移动
     */
    game_again = true;
    /**
     * 通关完成 completed 文字提示
     */
    @property(cc.Node)
    level_pass: cc.Node = null;
    /**
     * 结束时显示当前通过关卡的数
     */
    @property(cc.Node)
    level_passStr: cc.Label = null;

    /**
     * 判断点击的时候生成数组
     */
    touch_startGame = false;
    isSetMoveTo: boolean = true;

    opendEffect = true;
    /**
         * 闯关过程中需要获取相应距离的函数 
         */
    /**************2019-12-17******************** */
    passDistanceFunc() {
        if (this.pass_label == "Challenge 06") {
            this.pass06_condition = Math.floor(Math.abs(this.robot.y) / 150);
            //实时走的距离
            this.condition_label.string = this.pass06_condition + "m/100m";
        } else if (this.pass_label == "Challenge 08") {
            this.pass08_condition = Math.floor(Math.abs(this.robot.y) / 150);
            //实时走的距离
            this.condition_score.string = this.pass08_condition + "m/50m";
        } else if (this.pass_label == "Challenge 14") {
            this.pass14_condition = Math.floor(Math.abs(this.robot.y) / 100);
            //实时走的距离
            this.condition_label.string = this.pass14_condition + "m/200m";
        }
    }




    /**
     * 判断是否出现最后的背景图
     */
    end_show = true;
    lateUpdate() {
        if (GameHelper.GameInfo.gameOver) return;
        if (this.touch_startGame) {


            if (!this.animationFlag && this.robot.y < this.draw.node.y) {
                this.animationFlag = true;
                this.robot.getChildByName("body").getChildByName('all').getChildByName("cap").getComponent(cc.Animation).play();
                Figure.instance.playGameAction(RobotBurrowType.Burrow);
                this.info.parent = this.robot;
                // this.info.position = cc.v2(0,0);
                this.info.angle = 0;
            }

            if (this.robot.y - this.robot.height / 2 < this.nodePos.y && this.isDown) {
                if (this.isSetMoveTo) {
                    Figure.instance.burrowBegin();
                    Audios.getInstance().playEffect('drill_loop', true);
                    this.draw.moveTo(this.robot.x, this.robot.y + this.robot.height + 40);
                    setTimeout(() => {
                        this.draw.lineCap = cc.Graphics.LineCap.ROUND;
                    }, 100);
                    this.isSetMoveTo = false;

                }

                if (this.opendEffect) {
                    this.opendEffect = false
                }

                this.passDistanceFunc(); /**************2019-12-17******************** */
                this.draw.lineWidth = this.robot.width + 20;
                this.draw.strokeColor = cc.color(28, 8, 8);
                this.draw.lineTo(this.robot.x, this.robot.y + this.robot.height + 50);
                this.draw.stroke();
                this.draw.moveTo(this.robot.x, this.robot.y + this.robot.height + 50);


                GameScene.instance.isDraw = true;
                //进度条过程
                this.progressBlue.node.width = Math.abs(this.robot.y) / Math.abs(this.blockConfig[this.blockConfig.length - 1][0].y - 600) * this.progressInit.node.width;
                if (this.robot.y <= (this.blockConfig[this.blockConfig.length - 1][0].y - 865) && this.gameEnd) {
                    GameHelper.GameInfo.gameOver = true; //  设置游戏结束信息
                    //  游戏结束保存数据到本地
                    let saveBlood = Number(this.info.getChildByName("label").getComponent(cc.Label).string);
                    let netLeave = this.level_rightProgress.getComponent(cc.Label).string;


                    localAction.saveLocalData(netLeave, saveBlood, this.rightTop_diaStr)
                    let localData = localAction.readLocalData()
                    if (this.rightTop_diaStr > Number(localData.maxScore)) {
                        localAction.saveMax(this.rightTop_diaStr);
                    }
                    //小于方块的最后一组的Y坐标并且游戏结束
                    this.progressEnd.node.color = cc.color(65, 158, 219);
                    // this.robot.y = this.blockConfig[this.blockConfig.length - 1][0].y - 600;
                    // this.robot.x = 0;
                    // this.end_bg.node.active = true;
                    this.camera.getComponent("camera").flag = false;
                    GameHelper.GameInfo.gameFlag = false;

                    setTimeout(() => {
                        cc.tween(this.camera.getComponent(cc.Camera))
                            .to(0.5, { zoomRatio: 3.1 })
                            .start()
                        cc.tween(this.camera)
                            .to(0.5, { position: cc.v2(this.robot.x, this.robot.y) })
                            .start()

                        /****************2019-12-16*************** */
                        var m = cc.moveTo(0.5, cc.v2(this.robot.x, this.robot.y))
                        this.end_bg.node.runAction(m);
                        /*************************************/

                        this.camera.y = this.camera.y - 150; // 改变摄像机的位置
                        this.gold++;
                        if (this.pass_label == "") {
                            this.level_pass.setPosition(this.robot.x, this.robot.y + 230)
                            this.level_pass.active = true;
                            this.level_passStr.getComponent(cc.Label).string = "Level " + (Number(netLeave) - 1);
                        }

                        GameHelper.GameInfo.level_left++;
                        GameHelper.GameInfo.level_right++;
                        // this.robot.angle = 0
                        this.robot.getChildByName("info").active = false;
                        this.robot.getChildByName("body").getChildByName('all').getChildByName("cap").getComponent(cc.Animation).stop();
                        this.topTocontinue.node.setPosition(this.robot.x, this.robot.y - 100);// 设置 coneinue 位置
                        this.topTocontinue.node.zIndex = 99;
                        this.topTocontinue.node.active = true;
                        var act1 = cc.fadeTo(1, 50);
                        var act2 = cc.fadeTo(1, 255);
                        var seq = cc.repeatForever(cc.sequence(act1, act2));
                        this.topTocontinue.node.runAction(seq);
                        this.gameEnd = false;
                        //**************************************************** */
                        this.endBtn.node.active = true;
                        //**************************************************** */
                    }, 1500);
                    //**************************************************** */
                    setTimeout(() => {
                        GameHelper.GameInfo.moveSpeed = cc.v2(0, 0);
                        this.camera.getComponent("camera").flag = false;
                        GameHelper.GameInfo.gameFlag = false;
                        GameScene.instance.isDraw = false;
                        Figure.instance.stopAction();   //  停止动画
                        Figure.instance.hideTrailing();
                        Audios.getInstance().stopAllAudio();
                        Audios.getInstance().playEffect(AudioType.dig_start_landing, false);
                        Figure.instance.playGameAction(RobotBurrowType.EndJump);
                    }, 800);
                    this.gameEnd = false;
                    this.touch_startGame = false;
                    //**************************************************** */
                    return;
                }
                //**************************************************** */
                if (this.robot.y <= this.blockConfig[this.blockConfig.length - 2][0].y && this.end_show) {
                    this.end_bg.node.zIndex = 1;
                    this.robot.parent.zIndex = 2;
                    this.gradiant.node.zIndex = 3;
                    this.end_bg.node.setPosition(0, this.blockConfig[this.blockConfig.length - 1][0].y - 1103)
                    this.gradiant.node.setPosition(0, this.end_bg.node.y - 430);
                    this.gradiant.node.active = true;
                    this.end_bg.node.active = true;
                    this.end_show = false;
                }
                //**************************************************** */

                // if (this.robot.y <= (this.blockConfig[this.blockConfig.length - 1][0].y - 950) && this.game_again) {
                //     //游戏结束之后，机器人运动-250之后停止
                //     GameHelper.GameInfo.moveSpeed = cc.v2(0, 0);
                //     this.game_again = false;
                // }
            }
        }
    }




}