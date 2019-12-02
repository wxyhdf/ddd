import { Units } from "./units";
export namespace AssetLoader {
    export class PreAsset {
        url: string;
        type: typeof cc.Asset;
        asset: any;
        constructor(url?: string, type?: typeof cc.Asset, asset?: any) {
            this.url = url;
            this.type = type;
            this.asset = asset;
        }
    }

    export class PreLoader {
        //缓存资源列表单例
        private preItems: Units.List<PreAsset> = Units.Single.getInstance<Units.List<PreAsset>>(Units.List);
        //当前添加的资源请求项
        private _items: Units.List<PreAsset> = new Units.List<PreAsset>();
        /**
         * 当前进度
         */
        private curprocess: number = 0;
        /**
         * 进度改变回调函数
         */
        private onProcess: (curprocess: number, total: number) => void = null;

        constructor(process?: (curprocess: number, total: number) => void) {
            if (process) this.onProcess = process;
        }
        /**
         * 根据路径获取资源
         * @param url 资源路径
         */
        get<T>(url): T {
            let result = this.preItems.firstOrDefault(item => item.url == url);
            return result ? result.asset : null;
        }
        /**
         * 添加预加载资源项
         * @param url 预加载项的路径
         * @param type 预加载项的类型
         */
        addPreItem(url: string, type: typeof cc.Asset) {
            //查询数组中是否有资源路径的项目
            let result = this._items.firstOrDefault(item => item.url == url);
            //防止添加重复资源
            if (!result) this._items.add(new PreAsset(url, type));
        }
        /**
         * 开始预加载
         */
        async start(): Promise<null> {
            return new Promise((resolve, reject) => {
                this.curprocess = 0;
                let load: Units.List<PreAsset> = new Units.List<PreAsset>();
                for (const item of this._items) {

                    let res = this.preItems.firstOrDefault(i => i.url == item.url);
                    //如果此类资源存在 进度+1
                    if (res && res.asset !== undefined && res.asset !== null) this.curprocess++;
                    else load.add(item);
                }
                //是否有进度改变回调函数
                if (this.onProcess) this.onProcess(this.curprocess, this._items.length);
                if (this.curprocess == this._items.length) resolve();
                else {
                    for (let item of load) {
                        LoaderProxy.get<typeof item.type>(item.url, item.type).then((res) => {
                            //当前进度+1
                            this.curprocess++;
                            //是否有进度改变回调函数
                            if (this.onProcess) this.onProcess(this.curprocess, this._items.length);
                            //当前进度是否等于总请求数  =则执行完成回调函数
                            if (this.curprocess == this._items.length) resolve();
                        })
                    }
                }
            });
        }
    }
    /**
     * 系统资源加载代理
     */
    export class LoaderProxy {
        //缓存资源列表单例
        static preItems = Units.Single.getInstance<Units.List<PreAsset>>(Units.List);
        /**
         * 根据url获取游戏资源
         * @param url 资源URL
         * @param c 资源类型
         */
        static async get<T>(url: string, c: typeof cc.Asset): Promise<T> {
            return new Promise((resolve, reject) => {
                //let preItems = Single.getInstance<List<PreAsset>>(List);

                //根据路径在资源缓存列表中是否能找到资源
                let result = this.preItems.firstOrDefault(item => item.url == url);
                if (result && result.asset != undefined && result.asset != null) {
                    //找到资源直接返回
                    resolve(result.asset);
                } else {
                    //找不到资源 根据路径向服务器获取资源
                    cc.loader.loadRes(url, c, (error, res: T) => {
                        let data = this.preItems.firstOrDefault(item => item.url == url);
                        //如果资源缓存列表中没有此数据
                        if (data) {
                            //有此类资源  替换资源
                            data.asset = res;
                        } else {
                            //无此类资源  添加资源
                            this.preItems.add(new PreAsset(url, c, res));
                        }
                        if (error) {
                            reject(error);
                        } else {
                            resolve(res);
                        }
                    })
                }
            });
        }
    }

    /**
     * 对象池工厂
     */
    export class FactoryPool {
        private _factorypPool: cc.NodePool;

        constructor() {
            this._factorypPool = new cc.NodePool();
        }
        /**
         * 异步创建节点对象
         * @param url 节点资源url
         * @param c 资源类型
         */
        async acyncCreate<T>(url: string, c: typeof cc.Asset): Promise<cc.Node> {
            return new Promise<cc.Node>((resolve, reject) => {
                let tObj = null;
                if (this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                    tObj = this._factorypPool.get();
                    resolve(tObj);
                } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                    LoaderProxy.get<T>(url, c).then((res) => {
                        tObj = cc.instantiate(res);
                        resolve(tObj);
                    }, (error) => {
                        reject(error);
                    })
                }
            });
        }

        createNodeByAsset(c: typeof cc.RenderComponent): cc.Node {
            let tObj: cc.Node = null;
            if (this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                tObj = this._factorypPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                tObj = new cc.Node();
                tObj.addComponent(c);
            }
            return tObj
        }


        clone(node: cc.Node): cc.Node {
            let newnode: cc.Node = null;
            if (this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                newnode = this._factorypPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                newnode = cc.instantiate(node);
            }
            return newnode;
        }

        //回收节点对象
        onKilled(node: cc.Node) {
            // enemy 应该是一个 cc.Node
            this._factorypPool.put(node); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        }
        //清空对象池
        clearPool() {
            this._factorypPool.clear();
        }

    }
}