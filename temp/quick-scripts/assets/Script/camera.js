(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/camera.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1264clnfIJFHoaVKlaaLiI1', 'camera', __filename);
// Script/camera.ts

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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.robot = null;
        /**
        * 屏幕监听开始点
        */
        _this.start_Lisence_PointY = 0;
        //屏幕点击起始点
        _this.touch_Start_Point = cc.v2(0, 0);
        _this.robot_Pre_Point = cc.v2(0, 0);
        /**
         * 相机移动flag
         */
        _this.flag = false;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.init = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (ev) {
            var pos = ev.getLocation();
            _this.touch_Start_Point = pos;
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (ev) {
            var pos = ev.getLocation();
            if (_this.touch_Start_Point.x == pos.x)
                return;
            var per = (pos.x - _this.touch_Start_Point.x) * 0.6 + _this.robot.x;
            //this.robot_Pre_Point = this.node.convertToWorldSpaceAR(this.robot.position);
            var visi = cc.view.getVisibleSize();
            if (per >= visi.width / 2 - _this.robot.width / 2)
                per = visi.width / 2 - _this.robot.width / 2;
            if (per <= -visi.width / 2 + _this.robot.width / 2)
                per = -visi.width / 2 + _this.robot.width / 2;
            _this.robot.setPosition(per, _this.robot.y);
            var rigidbody = _this.robot.getComponent(cc.RigidBody);
            //rigidbody.linearVelocity = cc.v2(300, -640);
            _this.touch_Start_Point = pos;
            //console.log(66);
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (ev) {
        });
    };
    NewClass.prototype.start = function () {
        this.start_Lisence_PointY = this.robot.y - this.robot.height / 2;
        //this.init();
    };
    NewClass.prototype.lateUpdate = function () {
        if (this.robot.y > this.node.y) {
            this.flag = true;
            //this.node.setPosition(0, this.robot.y);
        }
        if (this.robot.y < this.node.y && this.flag) {
            this.node.setPosition(0, this.robot.y);
        }
        if (this.robot.y <= this.start_Lisence_PointY) {
            this.init();
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "robot", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=camera.js.map
        