
export default interface PassInfo {
    pass: any,
    challenge: string,
    demand: string,
    condition: string
}
export default class Config {

    // static pass_1 = [
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 1, 1, 0, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 1, 1, 1]
    // ];
    // static pass_2 = [
    //     [1, 1, 1, 1, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 1, 0, 1],
    //     [1, 1, 1, 0, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 1, 1, 1]
    // ];
    // static pass_3 = [
    //     [1, 1, 1, 1, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 1, 0, 1],
    //     [1, 1, 1, 0, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 1, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 1, 0, 1, 1],
    //     [1, 1, 1, 1, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 1, 1, 1],
    //     [1, 1, 0, 1, 1],
    //     [1, 1, 1, 1, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 1, 0, 1],
    //     [1, 0, 1, 1, 1],
    //     [0, 1, 0, 0, 1],
    //     [0, 0, 1, 1, 0],
    //     [0, 1, 0, 0, 1],
    //     [1, 1, 1, 1, 1],
    // ];
    static pass_info: PassInfo[] = [
        { pass: Config.radomGenBlock(), challenge: "Challenge 01", demand: " Get 50 Points", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 02", demand: "Fill 30 \n Energy", condition: "/30" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 03", demand: "Not To Die \n00:45", condition: "00:45" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 04", demand: "Bang And Die \n00:15", condition: "00:15" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 05", demand: "Get 650 Points \n00;30 \n Invincible", condition: "00:30" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 06", demand: "", condition: "0m/100m" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 07", demand: "", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 08", demand: "", condition: "/50" },
        { pass: Config.radomGenBlock(), challenge: "Challenge 09", demand: "", condition: "/50" },
    ];
    /**
     * 随机生成方块
     */
    static radomGenBlock() {
        //最小的方块数
        const minLen = 30;
        //最大的方块数
        const maxLen = 80;
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
        const oneLineBlocks = 5;
        let lineBlocks = [];
        for (let j = 0; j < oneLineBlocks; j++) {
            //随机生成当前列是否有方块
            const active = Math.round(Math.random());
            lineBlocks.push(active);
        }
        return lineBlocks;
    }
}
