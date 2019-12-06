const {
    ccclass,
    property
} = cc._decorator;
import {
    GameHelper
} from "./common/gameHelper"
import GameScene from './gameScene';
@ccclass
export default class BgMove extends cc.Component {

    @property([cc.Node])
    bgSprite: Array < cc.Node > = [];
    @property(cc.Sprite)
    initBg: cc.Sprite = null;
    @property
    roll_speed: number = 2;
    mobileMaps: boolean = false;
    gameScene: GameScene = null;

    @property(cc.Node)
    diamondsNode1: cc.Node = null;

    @property(cc.Node)
    diamondsNode2: cc.Node = null;
    private init = true;


    //背景移动
    // bgMoveFunction(bgList: cc.Node[], speed: number) {
    //     if (this.init) {
    //         this.gameScene.spawnMission(this.diamondsNode1);
    //         this.init = false;
    //     }
    //     for (var i = 0; i < bgList.length; i++) {
    //         bgList[i].y += speed;
    //     }
    //     if (bgList[0].y >= bgList[0].height) {
    //         bgList[0].y = -960;
    //         this.initBg.node.active = false;
    //         this.gameScene.spawnMission(this.diamondsNode1);

    //     }
    //     if (bgList[1].y >= -940 + 2 * bgList[1].height) {
    //         bgList[1].y = -940

    //     }
    //     if (bgList[1].y % 200 === 0) {
    //         this.gameScene.spawnMission(this.diamondsNode2);
    //     }
    // }

    onLoad() {}

    nodeEvent() {
        // this.node.on(GameHelper.NodeEvent.MoveBackground,(bgList:cc.Node[],speed:number)=>{
        //     this.bgMoveFunction(bgList,speed);
        // })
    }
    start() {
        this.gameScene = this.node.getComponent("gameScene") as GameScene;


    }

    update(dt) {

        // if (this.mobileMaps) {
        //     this.bgMoveFunction(this.bgSprite, this.roll_speed);
            // if(this.isCreateDiamind){    //  判断是否需要生成方块,可用于结束后关闭
            // if (this.recordMovebg_Y >= -1) {
            //     // this.gameScene.spawnMission();    //  生成方块
            // }
            // }
            // if(this.isCreateLightning){  //  判断是否需要生成能量,可用于结束后关闭
            // if(this.recordMovebg_Y >= 30){
            //     this.recordMovebg_Y = 0;
            //     this.gameScene.spawnNewStar()
            // }  
            // }
        // }

    }
}