// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class DiamondNum extends cc.Component {
    @property()
    label : cc.Label = null; 
    @property(cc.Sprite)
    star :cc.Sprite = null;
    @property()
    isStart = false; //  是否为星星方块
    @property()
    timer = null;
     /**
     * 
     * @param  value  方块的值
     */
    setValue(value) {
        let self = this;
        self.label.string = value;
    }

    /**
     * 
     * 显示星星
     */
    showStart () {
        let self = this;
        self.star.node.active = true;
        self.isStart = true;
    }
}
