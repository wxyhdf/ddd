
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    
    /**
     * 关卡的预制体
     */
    @property(cc.Prefab)
    passBtnPre:cc.Prefab = null;

    /**
     * 关卡选择的父节点
     */
    @property(cc.Sprite)
    pass_yellow:cc.Sprite = null;
    /**
     * 关卡按钮的父节点
     */
    @property(cc.Node)
    passFather:cc.Node = null;
    /**
     * 关卡背景
     */
    @property(cc.Sprite)
    pass_bg:cc.Sprite = null;
    /**
     * select节点：选择人物，关卡的父节点
     */
    @property(cc.Node)
    select:cc.Node = null;
    /**
     * 关卡退出
     */
    @property(cc.Sprite)
    pass_exitBtn:cc.Sprite= null;

    // onLoad () {}

    start () {

    }
    passYellowFunc(){ 
        this.pass_exitBtn.node.active = true;
        this.pass_bg.node.active = true;
        this.select.active = false;
        for(let i = 0 ; i < 9; i++){
            let pass_btn = cc.instantiate(this.passBtnPre);
            pass_btn.parent = this.passFather;
            let pass_btn_str =  pass_btn.getChildByName("pass_btn_str").getComponent(cc.Label);
            pass_btn.name = "btn"+ (i+1);
            pass_btn_str.string = (i + 1).toString();
            if(i >= 0){
                pass_btn.setPosition(i*200 - 200, 350); 
            }
            if(i >= 3){
                pass_btn.setPosition( i*200 - 800, 180);
            }  
            if(i >= 6){
                pass_btn.setPosition( i*200 - 1400, 10);
            }   
        }
        
    }
    passExitBtnFunc(){
        this.pass_exitBtn.node.active = false;
        // this.pass_bg.node.active = false;
    }

    // update (dt) {}
}
