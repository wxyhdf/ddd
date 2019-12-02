"use strict";
cc._RF.push(module, '7b7b2fWVPlKQY02JQGQrNIJ', 'Railing');
// Script/Railing.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    NewClass.prototype.start = function () {
    };
    // update (dt) {}
    /**
        * 改变栏杆图片
        * @param  type 种类,true 显示长栏杆,false 显示短栏杆
        * @param  build 生成类型
        * @param  minus 是否反转
        */
    NewClass.prototype.changeRailing = function (type, build, minus) {
        var self = this;
        var sp = self.pic.getComponent(cc.Sprite);
        if (type) { //  显示长栏杆
            if (build === 0) {
                var buildType = Math.floor(Math.random() * 3 + 1); //  随机长栏杆种类
                cc.loader.loadRes("/long_0" + buildType, cc.SpriteFrame, function (err, SpriteFrame) {
                    sp.spriteFrame = SpriteFrame;
                });
            }
        }
        else { //  显示短栏杆
            if (build === 0) {
                var short_arr = ["1", "3"];
                var num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_0" + num, cc.SpriteFrame, function (err, SpriteFrame) {
                    if (err) {
                        cc.log('加载出错');
                    }
                    else {
                        // cc.log('图片' + SpriteFrame)
                        sp.spriteFrame = SpriteFrame;
                    }
                });
                self.pic.y = (self.pic.y - 52.5) * minus;
            }
            else {
                var short_arr = ["1", "3"];
                var num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_0" + num, cc.SpriteFrame, function (err, SpriteFrame) {
                    sp.spriteFrame = SpriteFrame;
                });
                self.pic.y = (self.pic.y - 52.5) * build;
            }
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();