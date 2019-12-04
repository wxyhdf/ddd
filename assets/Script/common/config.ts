
export default interface PassInfo {
    pass: any,
    challenge: string,
    demand: string,
    condition:string
}
export default class Config {

    static pass_1 = [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];
    static pass_2 = [
        [1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [0, 1, 0, 0, 1],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ];
    static pass_info: PassInfo[] = [
        { pass: Config.pass_1, challenge: "Challenge 01", demand: " Get 50 Points" ,condition:"/50"},
        { pass: Config.pass_2, challenge: "Challenge 02", demand: "Fill 30 \n Energy", condition:"/100"},
        { pass: Config.pass_1, challenge: "Challenge 03", demand: "Not To Die \n00:45",condition:"/50" },
        { pass: Config.pass_1, challenge: "Challenge 04", demand: "Bang And Die \n00:15",condition:"/50" },
        { pass: Config.pass_1, challenge: "Challenge 05", demand: "Get 650 Points \n00;30",condition:"/50" },
        { pass: Config.pass_1, challenge: "Challenge 06", demand: "" ,condition:"/50"},
        { pass: Config.pass_1, challenge: "Challenge 07", demand: "" ,condition:"/50"},
        { pass: Config.pass_1, challenge: "Challenge 08", demand: "" ,condition:"/50"},
        { pass: Config.pass_1, challenge: "Challenge 09", demand: "" ,condition:"/50"},
    ];
}
