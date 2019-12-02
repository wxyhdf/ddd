(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/robot/figure.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd15908dCkpNaq4bMoCMalTq', 'figure', __filename);
// Script/robot/figure.ts

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
var gameHelper_1 = require("../common/gameHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Figure = /** @class */ (function (_super) {
    __extends(Figure, _super);
    function Figure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rigidbody = null;
        _this.start_Run = false;
        _this.maxHitCount = 5;
        _this.hitcount = 5;
        return _this;
        // update (dt) {}
    }
    Figure.prototype.onLoad = function () {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
    };
    Figure.prototype.startRun = function () {
        this.start_Run = true;
    };
    // 每次处理完碰撞体接触逻辑时被调用
    Figure.prototype.onPostSolve = function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.name == "block") {
            if (this.hitcount >= this.maxHitCount) {
                this.hitcount = 0;
                var worldManifold = contact.getWorldManifold();
                var vel1 = selfCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var vel2 = otherCollider.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(worldManifold.points[0]);
                var relativeVelocity = vel1.sub(vel2); //获取到两个碰撞体相互碰撞时在碰撞点上的相对速度 如果速度为(0,0)那么判定为上面碰撞
                //console.log(relativeVelocity);
                // let points = contact.getWorldManifold().points;
                // let p = otherCollider.node.position;
                if (relativeVelocity.equals(cc.v2(0, 0))) {
                    var event = new cc.Event.EventCustom(gameHelper_1.GameHelper.NodeEvent.HitBlock, true);
                    event.setUserData({ target: otherCollider.node });
                    this.node.dispatchEvent(event);
                }
            }
            else
                this.hitcount++;
        }
        if (otherCollider.node.name == "bloodNode") {
            var event = new cc.Event.EventCustom(gameHelper_1.GameHelper.NodeEvent.AddBlood, true);
            event.setUserData({ target: otherCollider.node });
            this.node.dispatchEvent(event);
        }
    };
    Figure.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
        this.hitcount = 5;
    };
    Figure.prototype.update = function () {
        // if (this.start_Run) {
        //     if (this.rigidbody.linearVelocity.y <= -640) {
        //         this.rigidbody.linearDamping = 1;
        //     } else {
        //         //this.rigidbody.applyLinearImpulse(cc.v2(0, -640), this.rigidbody.getWorldCenter(), true);
        //         this.rigidbody.linearDamping = 0;
        //     }
        // }
        if (this.start_Run) {
            this.rigidbody.linearVelocity = cc.v2(0, -540);
        }
    };
    Figure = __decorate([
        ccclass
    ], Figure);
    return Figure;
}(cc.Component));
exports.default = Figure;

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
        //# sourceMappingURL=figure.js.map
        