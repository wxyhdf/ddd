"use strict";
cc._RF.push(module, '24cfekk9O1FT7Z8HMhO/72l', 'gameHelper');
// Script/common/gameHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameHelper;
(function (GameHelper) {
    /**
     * 节点事件
     */
    var NodeEvent;
    (function (NodeEvent) {
        /**
         * 移动背景
         */
        NodeEvent["MoveBackground"] = "MoveBackground";
        /**
        * 笔刷开始事件
        */
        NodeEvent["BrushStart"] = "BrushStart";
        /**
        * 笔刷移动事件
        */
        NodeEvent["BrushMove"] = "BrushMove";
        /**
        * 笔刷完成事件
        */
        NodeEvent["BrushEnd"] = "BrushEnd";
        /**
         * 击中目标事件
         */
        NodeEvent["HitBlock"] = "HitBlock";
        /**
         * 加血事件
         */
        NodeEvent["AddBlood"] = "AddBlood";
    })(NodeEvent = GameHelper.NodeEvent || (GameHelper.NodeEvent = {}));
    /**
     * 节点可视方向
     */
    var Direction;
    (function (Direction) {
        Direction["Up"] = "Up";
        Direction["Visible"] = "Visible";
        Direction["Down"] = "Down";
    })(Direction = GameHelper.Direction || (GameHelper.Direction = {}));
    var GameInfo = /** @class */ (function () {
        function GameInfo() {
        }
        /**
         * 初始化血量
         */
        GameInfo.blood = 10;
        return GameInfo;
    }());
    GameHelper.GameInfo = GameInfo;
})(GameHelper = exports.GameHelper || (exports.GameHelper = {}));

cc._RF.pop();