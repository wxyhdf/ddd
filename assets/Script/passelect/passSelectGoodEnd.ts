import GameScene from "../gameScene";
import { GameHelper } from "../common/gameHelper";

const { ccclass, property } = cc._decorator;
/**
 * 闯关过程中的判断
 */
export default class ActionTableEnd {
    "Challenge 01" = (target: GameScene) => {
        target.condition_label.string = target.rightTop_diaStr + "/50";
        if (target.rightTop_diaStr === 50) {
            target.passSuccessFunc();
        }
    };
    "Challenge 02" = (target: GameScene) =>{
        target.condition_label.string = target.touch_blood + "/30";
        if (GameHelper.GameInfo.blood >= 40) {
            target.passSuccessFunc();
        }
    };
    "Challenge 03" = (target: GameScene) =>{
        if (target.condition_label.string == "00:00") {
            target.gameRunning = false;
            target.passSuccessFunc();
        }
    };
    "Challenge 04" = (target: GameScene) =>{
        target.condition_score.string = target.blodAdd04.toString() + "/100";
        if (target.blood04 == 0) {
            target.passSuccessFunc();
        }
    };
    "Challenge 05" = (target: GameScene) =>{
        if (target.block05 >= 650) {
            target.passSuccessFunc();
        }
    };
    "Challenge 06" = (target: GameScene) =>{
        if (target.condition_label.string == "100m/100m") {
            target.passSuccessFunc();
        }
    };
    "Challenge 07" = (target: GameScene) =>{

    };
    "Challenge 08" = (target: GameScene) =>{
        if (target.condition_score.string == "50m/50m") {
            target.passSuccessFunc();
        }
    };
    "Challenge 09" = (target: GameScene) =>{
        target.condition_label.string = target.block09 + "/100";
        if (target.condition_label.string == "100/100") {
            target.passSuccessFunc();
        }
    };
    "Challenge 10" = (target: GameScene) =>{
        target.condition_label.string = target.touch_blood + "/50";
        if(target.touch_blood >= 50){
            target.passSuccessFunc();
        }
    };
    "Challenge 11" = (target: GameScene) =>{

    };
    "Challenge 12" = (target: GameScene) =>{
        target.condition_score.string = "Die:" + GameHelper.GameInfo.blood;
        if(target.condition_score.string == "Die:0"){
            target.passSuccessFunc();
        }
    };
    "Challenge 13" = (target: GameScene) =>{
        if (target.block05 >= 850) {
            target.passSuccessFunc();
        }
    };
    "Challenge 14" = (target: GameScene) => {
        if (target.condition_label.string == "200m/200m") {
            target.passSuccessFunc();
        }
    };
    "Challenge 15" = (target: GameScene) =>{

    };

    "" = (target: GameScene) => { 
        return;
    }
}