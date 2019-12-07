
const { ccclass, property } = cc._decorator;

@ccclass
export default class Lightning extends cc.Component {

    @property(cc.Label)
    energy: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    /**
     * 
     * @param lightningEnergy 能量值
     */
    setEnergy(lightningEnergy) {
        let self = this;
        self.energy.string = lightningEnergy;
    }
    // update (dt) {}
}
