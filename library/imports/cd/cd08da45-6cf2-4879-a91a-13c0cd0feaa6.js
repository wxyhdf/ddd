"use strict";
cc._RF.push(module, 'cd08dpFbPJIeakaE8DND+qm', 'DiamondNum');
// Script/DiamondNum.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DiamondNum = /** @class */ (function (_super) {
    __extends(DiamondNum, _super);
    function DiamondNum() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.star = null;
        _this.isStart = false; //  是否为星星方块
        _this.timer = null;
        return _this;
    }
    /**
    *
    * @param  value  方块的值
    */
    DiamondNum.prototype.setValue = function (value) {
        var self = this;
        self.label.string = value;
    };
    /**
     *
     * 显示星星
     */
    DiamondNum.prototype.showStart = function () {
        var self = this;
        self.star.node.active = true;
        self.isStart = true;
    };
    __decorate([
        property()
    ], DiamondNum.prototype, "label", void 0);
    __decorate([
        property(cc.Sprite)
    ], DiamondNum.prototype, "star", void 0);
    __decorate([
        property()
    ], DiamondNum.prototype, "isStart", void 0);
    __decorate([
        property()
    ], DiamondNum.prototype, "timer", void 0);
    DiamondNum = __decorate([
        ccclass
    ], DiamondNum);
    return DiamondNum;
}(cc.Component));
exports.default = DiamondNum;

cc._RF.pop();