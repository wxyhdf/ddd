import Config from "./config";

export namespace GameHelper {
    /**
     * 节点事件
     */
    export enum NodeEvent {
        /**
         * 移动背景
         */
        MoveBackground = "MoveBackground",
        /**
        * 笔刷开始事件
        */
        BrushStart = "BrushStart",
        /**
        * 笔刷移动事件
        */
        BrushMove = "BrushMove",
        /**
        * 笔刷完成事件
        */
        BrushEnd = "BrushEnd",
        /**
         * 击中目标事件
         */
        HitBlock = "HitBlock",
        /**
         * 加血事件
         */
        AddBlood = "AddBlood",
    }
    /**
     * 节点可视方向
     */
    export enum Direction {
        Up = "Up",
        Visible = "Visible",
        Down = "Down",
    }

    export class GameInfo {
        /**
         * 初始化血量
         */
        static blood: number = 10;

        static moveSpeed: cc.Vec2 = cc.v2(0, -480);

        static pass = Config.pass_1;

        static gameFlag:boolean=true;
    }
}