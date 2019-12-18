export enum AudioType {
    /**
     * 背景音效
     */
    BG = "AI_2",
    attack01 = "attack01",
    attack03 = "attack03",
    dig_start = "dig_start",
    dig_start_landing = "dig_start_landing",
    drill_loop = "drill_loop",
    Fireworks = "Fireworks",
    get_energy = "get_energy",
    button_click0 ="button_click0",
    button_click1 ="button_click1",
    button_click2 ="button_click2",
    button_click3 ="button_click3",
    break_0 = "break_0",
    break_1 = "break_1",
    break_2 = "break_2",
    die = "die",

    revive_feveron = "revive_feveron",  //  无敌音效
    fever_end = "fever_end",    //  取消无敌
    enter_goal = "enter_goal",  //  钻通地底音效
}

export class Audios {

    _AUDIO = {};

    /**
     * 保存所有AudioID
     */
    _palyerID = {};



    public static instance: Audios = null;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Audios();
        }

        return this.instance;
    }

    constructor() {
        this.saveAudio();
    }



    /**
     * 保存音乐
     */
    saveAudio() {
        for (let key in AudioType) {
            let audioSource = new cc.AudioSource();
            this._AUDIO[AudioType[key]] = audioSource
            this._palyerID[AudioType[key]] = null
        }
    }

    /**
     * 播放音乐
     * @param audioType 
     */
    playAudio(audioType: string) {
        cc.loader.loadRes('music/' + audioType + '.MP3', cc.AudioClip, (err, clip) => {
            if (!err) {
                cc.log('播放背景音乐')
                this._AUDIO[audioType].clip = clip
                var audioID = cc.audioEngine.play(clip, true,0.5)
                this._palyerID[audioType] = audioID;
            } else {
                cc.log("err", err)
            }
        })
    }
    
    playOnclickEffect(){
        let num = Math.floor(Math.random() * 4 ) 
        // cc.log('button_click'+ num)
        this.playEffect('button_click' + num, false);
    }


    playBreakEffect(){
        let num =Math.floor(Math.random() * 3 +1)
        this.playEffect('break_'+num,false);

    }


    /**
     * 播放音效
     * @param audioType 
     * @param isLoop 
     */

    playEffect(audioType: string,isLoop:boolean) {
 
        cc.loader.loadRes('music/' + audioType + '.MP3', cc.AudioClip, (err, clip) => {
            if (!err) {
                this._AUDIO[audioType].clip = clip
                
                let audioID = cc.audioEngine.playEffect(clip,isLoop)
                this._palyerID[audioType] = audioID;

            } else {
                cc.log("err", err)
            }
        })
    }


    isPlay(audio: string) {
        for (let key in this._palyerID) {
            if (key === audio) {
                if (cc.audioEngine.isMusicPlaying()) {
                    cc.log('背景音乐加载了')
                } else {
                    cc.log('背景音乐没有加载')
                }
            }
        }
    }


    /**
     * 暂停音效
     * @param audio 
     */
    stopEffect(audio) {
        for (let key in this._palyerID) {
            if (key === audio) {
                cc.audioEngine.pauseEffect(this._palyerID[key])
            }
        }
    }

    /**
     * 暂停音乐
     * @param audio  
     */
    stopAudio(audio: string) {

        for (let key in this._palyerID) {
            if (key === audio) {
                cc.audioEngine.stop(this._palyerID[key])
            }
        }
    }

    /**
     * 
     * 暂停所有音乐
     */
    stopAllAudio(){
        cc.audioEngine.stopAll();
    }


}
