export default interface PassInfo {
    pass: any,
    challenge: string,
    demand: string,
    condition: string
}
export default class Config {

    
    static pass_info: PassInfo[] = [
        { pass: Config.radomGenBlock(), challenge: "Challenge 01", demand: " Get 50 Points", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 02", demand: "Fill 30 \n Energy", condition: "/30" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 03", demand: "Not To Die \n00:45", condition: "00:45" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 04", demand: "Bang And Die \n00:15", condition: "00:15" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 05", demand: "Get 650 Points \n00;30 \n Invincible", condition: "00:30" },
        
           /*******************2019-12-16************************* */
        { pass: Config.radomGenBlock(), challenge: "Challenge 06", demand: "Go 100m", condition: "0m/100m" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 07", demand: "Get 30 Points\n Crazy Mode", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 08", demand: "Go 50m \n 00:15 \n Energy = Speed", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 09", demand: "Get 100 Points", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 10", demand: "Fill 50 Energy", condition: "/50" },

        { pass: Config.radomGenBlock(), challenge: "Challenge 11", demand: "Not To Die\n 00:45\n1.5X Speed", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 12", demand: "Bang Anf Die\n00:15", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 13", demand: "Get 850 Points\n00:30\nInvincible", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 14", demand: "Go 200m", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 15", demand: "Get 50 Ponits \n Crazy Mode", condition: "/50" },
        /********************************************************* */
    ];
    /**
     * 随机生成方块
     */
    static radomGenBlock() {
        //最小的方块数
        // const minLen = 30;
        const minLen = 2;
        //最大的方块数
        // const maxLen = 50;
        const maxLen = 4;
        //生成30-80之间的随机数
        const radomLen = Math.random() * (maxLen - minLen) + minLen;
        const blocks = [];
        for (let i = 0; i < radomLen; i++) {
            if (i % 5 === 0) {
                blocks.push([1, 1, 1, 1, 1])
            } else {
                blocks.push(this.radomActive());
            }
        }
        return blocks;
    }
    /**
     * 随机生成一行方块
     */
    static radomActive() {
        //一行最多有多少个方块
        const oneLineBlocks = 2;
        let lineBlocks = [];
        let count = 0;
        for (let j = 0; j < 5; j++) {
            //随机生成当前列是否有方块
            const active = Math.round(Math.random());
            count = count + active;
            if (count > 2) {
                lineBlocks.push(0);
            } else {
                lineBlocks.push(active);
            }
        }
        let sun = 0;

        for (let i = 0; i < lineBlocks.length; i++) {
            sun = sun + lineBlocks[i]
        }
        if (sun == 0) {
            lineBlocks[0] = 1;
        }
        return lineBlocks;
    }
}
