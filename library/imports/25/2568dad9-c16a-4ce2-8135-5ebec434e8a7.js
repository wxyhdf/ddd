"use strict";
cc._RF.push(module, '2568drZwWpM4oE1Xr7ENOin', 'bgMove');
// Script/bgMove.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BgMove = /** @class */ (function (_super) {
    __extends(BgMove, _super);
    function BgMove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgSprite = [];
        _this.initBg = null;
        _this.roll_speed = 2;
        _this.mobileMaps = false;
        _this.gameScene = null;
        _this.diamondsNode1 = null;
        _this.diamondsNode2 = null;
        _this.init = true;
        return _this;
    }
    //背景移动
    BgMove.prototype.bgMoveFunction = function (bgList, speed) {
        if (this.init) {
            this.gameScene.spawnMission(this.diamondsNode1);
            this.init = false;
        }
        for (var i = 0; i < bgList.length; i++) {
            bgList[i].y += speed;
        }
        if (bgList[0].y >= bgList[0].height) {
            bgList[0].y = -960;
            this.initBg.node.active = false;
            this.gameScene.spawnMission(this.diamondsNode1);
        }
        if (bgList[1].y >= -940 + 2 * bgList[1].height) {
            bgList[1].y = -940;
        }
        if (bgList[1].y % 200 === 0) {
            this.gameScene.spawnMission(this.diamondsNode2);
        }
    };
    BgMove.prototype.onLoad = function () { };
    BgMove.prototype.nodeEvent = function () {
        // this.node.on(GameHelper.NodeEvent.MoveBackground,(bgList:cc.Node[],speed:number)=>{
        //     this.bgMoveFunction(bgList,speed);
        // })
    };
    BgMove.prototype.start = function () {
        this.gameScene = this.node.getComponent("gameScene");
    };
    BgMove.prototype.update = function (dt) {
        if (this.mobileMaps) {
            this.bgMoveFunction(this.bgSprite, this.roll_speed);
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
        }
    };
    __decorate([
        property([cc.Node])
    ], BgMove.prototype, "bgSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], BgMove.prototype, "initBg", void 0);
    __decorate([
        property
    ], BgMove.prototype, "roll_speed", void 0);
    __decorate([
        property(cc.Node)
    ], BgMove.prototype, "diamondsNode1", void 0);
    __decorate([
        property(cc.Node)
    ], BgMove.prototype, "diamondsNode2", void 0);
    BgMove = __decorate([
        ccclass
    ], BgMove);
    return BgMove;
}(cc.Component));
exports.default = BgMove;

cc._RF.pop();