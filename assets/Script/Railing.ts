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


    // boxCollider:cc.PhysicsBoxCollider = null;

    @property(cc.Node)
    pic: cc.Node
    // LIFE-CYCLE CALLBACKS:
    @property()
    robot: cc.Node

    @property(cc.Node)
    gt: cc.Node
    onLoad() {
        // this.collide_box()
    }

    start() {

    }











    update(dt) {
        // this.collide_box();
    }
    /**
        * 改变栏杆图片
        * @param  type 种类,true 显示长栏杆,false 显示短栏杆
        * @param  build 生成类型
        * @param  minus 是否反转
        */
    changeRailing(type: number, build: number, minus?: number) {  //  种类，生成类型，反转

        let self = this;
        let boxCollider = self.gt.getComponent(cc.PhysicsBoxCollider);
        let sp = self.pic.getComponent(cc.Sprite);
        if (type === 1) {   //  显示长栏杆
            cc.log('长')
            let buildType = Math.floor(Math.random() * 3 + 1);  //  随机长栏杆种类
            cc.loader.loadRes("/long_01", cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                if(err){
                    cc.log('err' + err)
                }
               
                sp.spriteFrame = SpriteFrame;
            });


        } else {  //  显示短栏杆
            cc.log('短')
            if (build === 0) {
                let short_arr = ["1", "3"];
                let num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_01", cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                    if (err) {
                        cc.log('加载出错')
                    } else {
                        sp.spriteFrame = SpriteFrame;
                    }

                });

                self.pic.y = (self.pic.y) * minus;
                self.node.height = 105
                self.node.y = self.node.y - (105 * minus)
                boxCollider.offset.y = -52.5 * minus;   //  控制碰撞框的偏移量
                boxCollider.size.height = 110;  //  设置碰撞框的高度
            } else {
                let short_arr = ["1", "3"];
                let num = short_arr[Math.floor(Math.random() * short_arr.length)];
                cc.loader.loadRes("/short_01", cc.SpriteFrame, function (err, SpriteFrame) { //  显示图片
                    if(err){
                        cc.log('err' + err)
                    }
                    sp.spriteFrame = SpriteFrame;
                });

                self.pic.y = (self.pic.y) * build;
                self.node.height = 105
                self.node.y = self.node.y - (105 * build)
                boxCollider.offset.y = 52.5 * build;
                boxCollider.size.height = 110;
            }

        }

        // boxCollider.apply();// 调用apply以后才会重新生成box2d的相关对象
    }
}
