export default class LocalAction {

    /**
     * 保存数据到本地
     * @param leavel_right 
     * @param blood 
     * @param score 
     */
    static saveLocalData(leavel_right, blood, score) {
        cc.sys.localStorage.setItem("level", leavel_right);
        cc.sys.localStorage.setItem("blood", blood);
        cc.sys.localStorage.setItem('score', score);
    }

    /**
     * 保存数据到本地
     * @param leavel_right 
     * @param blood 
     * @param score 
     */
    static saveMax(maxScore) {
        cc.sys.localStorage.setItem('maxScore', maxScore);
    }

    /**
     * 读取本地数据
     */
    static readLocalData() {
        let level = cc.sys.localStorage.getItem("level")
        let blood = cc.sys.localStorage.getItem("blood")
        let score = cc.sys.localStorage.getItem("score")
        let maxScore = cc.sys.localStorage.getItem("maxScore")
        
        let data = {
            level:level,
            blood:blood,
            score:score,
            maxScore:maxScore,
        };
        return data;
    }
    
    /**
     * 清除本地数据
     */
    static clearLocalData() {
        cc.sys.localStorage.removeItem("blood") 
        cc.sys.localStorage.removeItem("score")
    }

    /**
     * 清除本地所有数据
     */
    static clearAllData(){
        cc.sys.localStorage.clear()
    }

    
}