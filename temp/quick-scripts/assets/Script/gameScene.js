(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/gameScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '65a1bd8hd5HZYUPU+58zDZk', 'gameScene', __filename);
// Script/gameScene.ts

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
var gameHelper_1 = require("./common/gameHelper");
var config_1 = require("./common/config");
var units_1 = require("./common/units");
var assetLoader_1 = require("./common/assetLoader");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 砖头
         */
        _this.robot = null;
        /**
         * 背景节点
         */
        _this.background = null;
        /**
         * 摄像机
         */
        _this.camera = null;
        /**
        * 小方块的颜色
        */
        _this.smallBlock = cc.color(255, 199, 67, 255);
        /**
         * 方块预制体
         */
        _this.block = null;
        /**
        * 方块生成之间的高度距离
        */
        _this.block_Between_Height = 300;
        /**
         * 栏杆
         */
        _this.railingNode = null;
        /**
         * 方块生成的父节点
         */
        _this.blockNode = null;
        /**
         * 画笔
         */
        _this.draw = null;
        _this.railing = null;
        _this.start_touch_one = false;
        /**
         * 加血对象池
         */
        _this.bloodPool = new assetLoader_1.AssetLoader.FactoryPool();
        /**
        * 当前存在的加血buff  用于回收加血节点
        */
        _this.bloodArray = new units_1.Units.List();
        /**
         * 当前关卡方块生成配置数组
         */
        _this.blockConfig = [];
        /**
         * 方块节点池
         */
        _this.blockPool = new assetLoader_1.AssetLoader.FactoryPool();
        /**
         * 当前存在的方块  用于回收方块
         */
        _this.blockArray = new units_1.Units.List();
        /**
         * 第一块方块生成的y轴坐标
         */
        _this.blockCurrentPOSY = 0;
        /**
         * 当前方块生成的配置指向索引 用来读取blockConfig当前关卡方块生成配置数组
         */
        _this.blockCurrentId = 0;
        /**
         * 当前的背景指向索引 用来读取backgroundPool背景节点数组
         */
        _this.currentBackgroundId = 0;
        /**
         * 背景节点数组
         */
        _this.backgroundPool = [];
        /**
         * 画笔开始画画的起点
         */
        _this.draw_Start_PointY = 0;
        return _this;
    }
    /**
     * 触发开始Game
     */
    GameScene.prototype.OnGameStart = function (e) {
        var _this = this;
        if (!this.start_touch_one) {
            this.start_touch_one = true;
            //设置重力加速度
            //cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
            var rigidbody = this.robot.getComponent(cc.RigidBody);
            //施加往上的力
            rigidbody.applyLinearImpulse(cc.v2(0, 3000), rigidbody.getWorldCenter(), true);
            cc.tween(this.robot).to(0.5, { angle: -180 }).call(function () {
                _this.robot.getChildByName("info").active = true;
                _this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = gameHelper_1.GameHelper.GameInfo.blood.toString();
                _this.robot.getComponent("figure").startRun();
            }).start();
        }
    };
    /**
     * 生成背景(第一次生成三张背景图)
     */
    GameScene.prototype.createBackground = function () {
        /**
         * 第一次生成方块的位置在第一张背景图下面的200px位置
         */
        this.blockCurrentPOSY = this.background.y + this.background.height / 2 - 200;
        this.backgroundPool.push(this.background);
        var bg2 = cc.instantiate(this.background);
        bg2.y = this.background.y - bg2.height;
        this.backgroundPool.push(bg2);
        var bg3 = cc.instantiate(this.background);
        bg3.y = bg2.y - bg3.height;
        this.backgroundPool.push(bg3);
        bg2.setParent(this.background.getParent());
        bg3.setParent(this.background.getParent());
    };
    /**
     * 根据配置计算出所有方块生成的坐标
     * @param config 关卡方块配置
     */
    GameScene.prototype.createConfigCoordinate = function (config) {
        var visi = cc.view.getVisibleSize();
        //this.blockConfig = config;
        for (var _i = 0, config_2 = config; _i < config_2.length; _i++) {
            var items = config_2[_i];
            var _item = [];
            for (var key in items) {
                if (items.hasOwnProperty(key)) {
                    var item = items[key];
                    if (item) {
                        var x = visi.width / 10 + visi.width / 5 * Number(key);
                        _item.push(cc.v2(x, this.blockCurrentPOSY));
                    }
                }
            }
            this.blockConfig.push(_item);
            this.blockCurrentPOSY -= this.block_Between_Height;
        }
    };
    /**
     * 生成加血buff
     */
    GameScene.prototype.createBlood = function () {
        var _this = this;
        var ran = Math.floor(Math.random() * 10);
        // 1/2几率生成加血buff
        if (ran < 6) {
            //随机生成1~3个
            var num = Math.floor(Math.random() * 2) + 1;
            //随机通道
            var pip_1 = [];
            while (true) {
                var p = Math.floor(Math.random() * 5);
                if (pip_1.indexOf(p) == -1) {
                    pip_1.push(p);
                }
                if (pip_1.length == num)
                    break;
            }
            var visi_1 = cc.view.getVisibleSize();
            var _loop_1 = function (i) {
                this_1.bloodPool.acyncCreate("prefab/bloodNode", cc.Prefab).then(function (node) {
                    var x = visi_1.width / 10 + visi_1.width / 5 * pip_1[i];
                    var pos = _this.blockNode.convertToNodeSpaceAR(cc.v2(x, _this.blockCurrentPOSY - 450));
                    node.setPosition(pos);
                    var b = Math.floor(Math.random() * 10) + 1;
                    node.getChildByName("label").getComponent(cc.Label).string = b.toString();
                    _this.blockNode.addChild(node);
                });
            };
            var this_1 = this;
            for (var i = 0; i < pip_1.length; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * 生成方块
     */
    GameScene.prototype.createBlock = function () {
        var _this = this;
        var visi = cc.view.getVisibleSize();
        var width = visi.width / 5;
        if (this.blockCurrentId == this.blockConfig.length)
            return false;
        var blockCoordinate = this.blockConfig[this.blockCurrentId];
        var _loop_2 = function (item) {
            //更新方块所指向y轴坐标
            this_2.blockCurrentPOSY = this_2.blockNode.convertToNodeSpaceAR(item).y;
            this_2.blockPool.acyncCreate("prefab/block", cc.Prefab).then(function (node) {
                node.width = width;
                node.height = width;
                var collider = node.getComponent(cc.PhysicsBoxCollider);
                collider.size.width = width;
                collider.size.height = width;
                var star = node.getChildByName("star");
                star.width = width;
                star.height = width;
                var label = node.getChildByName("label");
                label.getComponent(cc.Label).string = Math.floor(Math.random() * 30 + 1).toString();
                node.setPosition(_this.blockNode.convertToNodeSpaceAR(item));
                _this.blockArray.add(node);
                _this.blockNode.addChild(node);
            });
        };
        var this_2 = this;
        for (var _i = 0, blockCoordinate_1 = blockCoordinate; _i < blockCoordinate_1.length; _i++) {
            var item = blockCoordinate_1[_i];
            _loop_2(item);
        }
        this.createBlood();
        //最后一波不生成血量
        //if (this.blockCurrentId == this.blockConfig.length - 1) 
        this.blockCurrentId++;
        return true;
    };
    GameScene.prototype.init = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, this.OnGameStart, this);
        this.node.on(gameHelper_1.GameHelper.NodeEvent.HitBlock, function (ev) {
            var node = ev.getUserData()["target"];
            gameHelper_1.GameHelper.GameInfo.blood--;
            if (gameHelper_1.GameHelper.GameInfo.blood == 0) {
                _this.robot.removeFromParent();
                alert("Game Over");
            }
            _this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = gameHelper_1.GameHelper.GameInfo.blood.toString();
            var label = node.getChildByName("label");
            var blood = Number(label.getComponent(cc.Label).string) - 1;
            if (blood == 0) {
                _this.blockPool.onKilled(node);
            }
            label.getComponent(cc.Label).string = blood.toString();
        });
        this.node.on(gameHelper_1.GameHelper.NodeEvent.AddBlood, function (ev) {
            var node = ev.getUserData()["target"];
            var blood = Number(node.getChildByName("label").getComponent(cc.Label).string);
            //加血
            gameHelper_1.GameHelper.GameInfo.blood += blood;
            //回收节点
            _this.bloodPool.onKilled(node);
            //更新血量
            _this.robot.getChildByName("info").getChildByName("label").getComponent(cc.Label).string = gameHelper_1.GameHelper.GameInfo.blood.toString();
        });
    };
    GameScene.prototype.onLoad = function () {
        //开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //设置重力加速度
        cc.director.getPhysicsManager().gravity = cc.v2(0, 0);
        //cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit;
        //生成背景节点
        this.createBackground();
        //设置画笔起始y轴坐标
        this.draw_Start_PointY = this.robot.y - this.robot.height / 2;
        this.draw.moveTo(0, this.robot.y - this.robot.height / 2);
        //使用第一关的关卡配置;
        this.createConfigCoordinate(config_1.default.pass_1);
        //首先生成一次方块
        this.createBlock();
        //this.spawnNewPlayer();
        this.init();
    };
    /**
    * 判断节点是否可见
    * @param node 节点
    */
    GameScene.prototype.isVisible = function (node) {
        var visi = cc.view.getVisibleSize();
        if (this.camera.y + visi.height / 2 < node.y - node.height / 2)
            return false;
        return true;
    };
    /**
    * 判断节点是否可见
    * @param node 节点
    */
    GameScene.prototype.pointDirectionByVisible = function (node) {
        var visi = cc.view.getVisibleSize();
        if (this.camera.y + visi.height / 2 < node.y - node.height / 2)
            return gameHelper_1.GameHelper.Direction.Up;
        if (this.camera.y - visi.height / 2 > node.y + node.height / 2)
            return gameHelper_1.GameHelper.Direction.Down;
        return gameHelper_1.GameHelper.Direction.Visible;
    };
    /**
     * 移动背景节点
     */
    GameScene.prototype.moveBackground = function () {
        if (!this.isVisible(this.backgroundPool[this.currentBackgroundId])) {
            var back = this.backgroundPool[this.currentBackgroundId];
            var prebackId = this.currentBackgroundId - 1;
            if (prebackId < 0)
                prebackId = this.backgroundPool.length - 1;
            var prebak = this.backgroundPool[prebackId];
            back.y = prebak.y - back.height;
            this.currentBackgroundId++;
            if (this.currentBackgroundId >= this.backgroundPool.length)
                this.currentBackgroundId = 0;
            //console.log(this.backgroundPool)
        }
    };
    /**
     * 是否可以预加载下一批方块和回收方块
     */
    GameScene.prototype.isPreCreateBlock = function () {
        var _this = this;
        //获取当前y轴指向的方块
        var node = this.blockArray.firstOrDefault(function (item) { return item.y == _this.blockCurrentPOSY; });
        //判断当前y轴指向的方块是否可见 可见则生成下一波方块
        if (node && this.pointDirectionByVisible(node) == gameHelper_1.GameHelper.Direction.Visible) {
            this.createBlock();
        }
        //获取回收节点  如果节点在可见屏幕的上方 则回收方块
        var removeItems = this.blockArray.where(function (item) { return _this.pointDirectionByVisible(item) == gameHelper_1.GameHelper.Direction.Up; });
        //移除方块
        this.blockArray.removeRange(removeItems);
        //回收节点
        for (var _i = 0, removeItems_1 = removeItems; _i < removeItems_1.length; _i++) {
            var item = removeItems_1[_i];
            this.blockPool.onKilled(item);
        }
        //获取回收节点  如果节点在可见屏幕的上方 则回收血量
        removeItems = this.bloodArray.where(function (item) { return _this.pointDirectionByVisible(item) == gameHelper_1.GameHelper.Direction.Up; });
        //移除血量buff
        this.bloodArray.removeRange(removeItems);
        //回收血量buff
        for (var _a = 0, removeItems_2 = removeItems; _a < removeItems_2.length; _a++) {
            var item = removeItems_2[_a];
            this.bloodPool.onKilled(item);
        }
    };
    GameScene.prototype.start = function () {
    };
    GameScene.prototype.update = function (dt) {
        this.moveBackground();
        this.isPreCreateBlock();
        if (this.robot.y < this.draw_Start_PointY) {
            this.draw.lineTo(this.robot.x, this.robot.y);
            this.draw.lineWidth = 40;
            this.draw.strokeColor = cc.Color.RED;
            this.draw.stroke();
        }
    };
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "robot", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "background", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "camera", void 0);
    __decorate([
        property(cc.Color)
    ], GameScene.prototype, "smallBlock", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "block", void 0);
    __decorate([
        property(cc.Float)
    ], GameScene.prototype, "block_Between_Height", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "railingNode", void 0);
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "blockNode", void 0);
    __decorate([
        property(cc.Graphics)
    ], GameScene.prototype, "draw", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameScene.prototype, "railing", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(cc.Component));
exports.default = GameScene;

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
        //# sourceMappingURL=gameScene.js.map
        