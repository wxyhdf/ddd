// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    pic: cc.Node
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
    /**
        * 改变栏杆图片
        * @param  type 种类,true 显示长栏杆,false 显示短栏杆
        * @param  build 生成类型
        * @param  minus 是否反转
        */
    changeRailing(type: boolean, build: number, minus: number) {  //  种类，生成类型，反转

        let self = this;

        let sp = self.pic.getComponent(cc.Sprite);
        if (type) {   //  显示长栏杆
            if (build === 0) {
                let buildType = Math.floor(Math.random() * 3 + 1);  //  随机长栏杆种类
                cc.loader.loadRes("/long_0" + buildType, cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                    sp.spriteFrame = SpriteFrame;
                });
            }

        } else {  //  显示短栏杆
            if (build === 0) {
                let short_arr = ["1", "3"];
                let num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_0" + num, cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                    if (err) {
                        cc.log('加载出错')
                    } else {
                        // cc.log('图片' + SpriteFrame)
                        sp.spriteFrame = SpriteFrame;
                    }

                });
                self.pic.y = (self.pic.y - 52.5) * minus;
            } else {
                let short_arr = ["1", "3"];
                let num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_0" + num, cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                    sp.spriteFrame = SpriteFrame;
                });
                self.pic.y = (self.pic.y - 52.5) * build;
            }

        }
    }
}
