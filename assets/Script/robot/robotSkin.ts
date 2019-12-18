

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    /**
     * 皮肤数组
     */
    items: cc.Node[] = [];
    getPositionAndScale(contentX: number, nodeX: number, nodeY: number) {
        let res = Math.abs(Math.abs(contentX) - Math.abs(nodeX));
        let per = res / 100;
        if (per >= 1) per = 1;
        let scale = 1.5 - per * 0.5;
        // let y = nodeY + (50 - per * 50);
        let y = nodeY;
        return { scale: scale, y: y };
    }
    onLoad() {
        // for (const item of this.node.getChildByName("view").getChildByName("content").children) {
        //     this.items.push(item);
        // }
        // this.node.on("scrolling", (ev) => {
        //     for (const item of this.items) {
        //         let res = this.getPositionAndScale(ev.content.x, item.x, item.getParent().y);
        //         item.scale = res.scale;
        //         item.y = res.y;
        //     }
        // })
    }

    start () {

    }

    // update (dt) {}
}
