import GameScene from "../gameScene";
import { GameHelper } from "../common/gameHelper";
import localAction from '../common/LocalAction';
/**、
 * 选择关卡时，初始应该做的动作
 */
const { ccclass, property } = cc._decorator;
export default class ActionTable {
    "Challenge 01" = (target: GameScene) => { // 获得50分
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
        }, 1500);
    };
    "Challenge 02" = (target: GameScene) => { //吃的30个能量
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
        }, 1500);
    };
    "Challenge 03" = (target: GameScene) => { //45秒内不死
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
            let time = 45;
            target.condition_label.string = "00:45";
            target.schedule(function () {
                time--;
                target.condition_label.string = "00:" + time;
                if (time < 10) {
                    target.condition_label.string = "00:0" + time;
                }
            }.bind(target), 1, 44, 0);
        }, 1500);
    };
    "Challenge 04" = (target: GameScene) => { //15秒获得100分数点
        GameHelper.GameInfo.blood = 100;
        setTimeout(() => {
            target.condition.active = true;
            target.condition_label.string = "00:15";
            target.condition_score.string = "0/100";
            let time04 = 15;
            target.schedule(function () {
                time04--;
                target.condition_label.string = " 00:" + time04;
                if (time04 < 10) {
                    target.condition_label.string = " 00:0" + time04;
                }
                if (time04 == 0) {
                    target.endAlertFunc(target.rightTop_diaStr);
                }
            }.bind(target), 1, 14, 0);
        }, 1500);
    };
    "Challenge 05" = (target: GameScene) => { //30秒获得650分数点
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.string = "0/650";
            let time = 30;
            target.schedule(function () {
                time--;
                target.condition_label.string = "00:" + time;
                if (time < 10) {
                    target.condition_label.string = "00:0" + time;
                }
                if (time == 0) {
                    target.endAlertFunc(target.block05);
                }
            }.bind(target), 1, 29, 0);
        }, 1500);
    };
    "Challenge 06" = (target: GameScene) => {  //走完100m
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
            target.condition_label.string = "0m/100m";
        }, 1500);
    };
    "Challenge 07" = (target: GameScene) => { //方块值不断递增改变，最大值50，在这个基础上需要获得30分
    
        GameHelper.GameInfo.isAutoNumber = true;
    };
    "Challenge 08" = (target: GameScene) => { // 15秒内走完50米
        setTimeout(() => {
            target.condition.active = true;
            target.condition_label.string = "00:15";
            target.condition_score.string = "50m"
            let time08 = 15;
            target.schedule(function () {
                time08--;
                target.condition_label.string = "00:" + time08;
                if (time08 < 10) {
                    target.condition_label.string = "00:0" + time08;
                }
                if (time08 == 0) {
                    target.endAlertFunc(target.rightTop_diaStr);
                }
            }.bind(target), 1, 14, 0);
        }, 1500);
    };
    "Challenge 09" = (target: GameScene) => { //获得100分

        target.condition.active = true;
        target.condition_score.node.active = false;
        target.condition_label.string = "0/100";
    };
    "Challenge 10" = (target: GameScene) => { //获得50个能量
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
            target.condition_label.string = "10/50"
        }, 1500);
    };
    "Challenge 11" = (target: GameScene) => { //45秒内以1.5倍得速度挖地洞不死
        GameHelper.GameInfo.blood = 300;
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
            target.condition_label.string = "00:45";
            GameHelper.GameInfo.moveSpeed = cc.v2(0, -540);
            let time11 = 45;
            target.schedule(function () {
                time11--;
                target.condition_label.string = "00:" + time11;
                if (time11 < 10) {
                    target.condition_label.string = "00:0" + time11;
                }
                if (time11 == 0) {
                    target.passSuccessFunc();
                }
            }.bind(target), 1, 44, 0);
        }, 1500);
    };
    "Challenge 12" = (target: GameScene) => { //15秒内，robot的能量从125减为0
        GameHelper.GameInfo.blood = 125;
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.string = "Die:125"
            target.condition_label.string = "00:15"
            let time12 = 15;
            target.schedule(function () {
                time12--;
                target.condition_label.string = "00:" + time12;
                if (time12 < 10) {
                    target.condition_label.string = "00:0" + time12;
                }
                if (time12 == 0) {
                    target.boomCirle();
                    target.pass_failBg.active = true;
                    target.pass_failBg.setPosition(0, target.robot.y);
                }
            }.bind(target), 1, 14);
        }, 1500);
    };
    "Challenge 13" = (target: GameScene) => { //30秒内以无敌状态获得850分
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.string = "0/850";
            let time13 = 30;
            target.schedule(function () {
                time13--;
                target.condition_label.string = "00:" + time13;
                if (time13 < 10) {
                    target.condition_label.string = "00:0" + time13;
                }
                if (time13 == 0) {
                    target.boomCirle();
                    // target.fail_bg.node.active = true;
                }
            }.bind(target), 1, 29)
        }, 1500);
    };
    "Challenge 14" = (target: GameScene) => { //走够200m
        setTimeout(() => {
            target.condition.active = true;
            target.condition_score.node.active = false;
            target.condition_label.string = "0m/200m";
        }, 1500);
    };
    "Challenge 15" = (target: GameScene) => { //方块值不断递增改变，最大值50，在这个基础上需要获得50分
        GameHelper.GameInfo.isAutoNumber = true;

        // //游戏结束恢复状态
        // GameHelper.GameInfo.isAutoNumber = false;
    }


    "" = (target: GameScene) => {
        let localData = localAction.readLocalData();
        target.scheduleOnce(function () {
            target.right_topStr.active = true;
            target.progress.active = true;
            if (localData.level === null) {
                target.level_leftProgress.getComponent(cc.Label).string = GameHelper.GameInfo.level_left.toString();
                target.level_rightProgress.getComponent(cc.Label).string = GameHelper.GameInfo.level_right.toString();
            } else {
                target.level_leftProgress.getComponent(cc.Label).string = Number(localData.level).toString();
                target.level_rightProgress.getComponent(cc.Label).string = (Number(localData.level) + 1).toString();
            }

        }.bind(target), 2)
    };


}
