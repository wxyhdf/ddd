(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/common/assetLoader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f20672QvRNE36Yo/Dytr8MN', 'assetLoader', __filename);
// Script/common/assetLoader.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("./units");
var AssetLoader;
(function (AssetLoader) {
    var PreAsset = /** @class */ (function () {
        function PreAsset(url, type, asset) {
            this.url = url;
            this.type = type;
            this.asset = asset;
        }
        return PreAsset;
    }());
    AssetLoader.PreAsset = PreAsset;
    var PreLoader = /** @class */ (function () {
        function PreLoader(process) {
            //缓存资源列表单例
            this.preItems = units_1.Units.Single.getInstance(units_1.Units.List);
            //当前添加的资源请求项
            this._items = new units_1.Units.List();
            /**
             * 当前进度
             */
            this.curprocess = 0;
            /**
             * 进度改变回调函数
             */
            this.onProcess = null;
            if (process)
                this.onProcess = process;
        }
        /**
         * 根据路径获取资源
         * @param url 资源路径
         */
        PreLoader.prototype.get = function (url) {
            var result = this.preItems.firstOrDefault(function (item) { return item.url == url; });
            return result ? result.asset : null;
        };
        /**
         * 添加预加载资源项
         * @param url 预加载项的路径
         * @param type 预加载项的类型
         */
        PreLoader.prototype.addPreItem = function (url, type) {
            //查询数组中是否有资源路径的项目
            var result = this._items.firstOrDefault(function (item) { return item.url == url; });
            //防止添加重复资源
            if (!result)
                this._items.add(new PreAsset(url, type));
        };
        /**
         * 开始预加载
         */
        PreLoader.prototype.start = function () {
            return __awaiter(this, void 0, Promise, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.curprocess = 0;
                            var load = new units_1.Units.List();
                            var _loop_1 = function (item) {
                                var res = _this.preItems.firstOrDefault(function (i) { return i.url == item.url; });
                                //如果此类资源存在 进度+1
                                if (res && res.asset !== undefined && res.asset !== null)
                                    _this.curprocess++;
                                else
                                    load.add(item);
                            };
                            for (var _i = 0, _a = _this._items; _i < _a.length; _i++) {
                                var item = _a[_i];
                                _loop_1(item);
                            }
                            //是否有进度改变回调函数
                            if (_this.onProcess)
                                _this.onProcess(_this.curprocess, _this._items.length);
                            if (_this.curprocess == _this._items.length)
                                resolve();
                            else {
                                for (var _b = 0, load_1 = load; _b < load_1.length; _b++) {
                                    var item = load_1[_b];
                                    LoaderProxy.get(item.url, item.type).then(function (res) {
                                        //当前进度+1
                                        _this.curprocess++;
                                        //是否有进度改变回调函数
                                        if (_this.onProcess)
                                            _this.onProcess(_this.curprocess, _this._items.length);
                                        //当前进度是否等于总请求数  =则执行完成回调函数
                                        if (_this.curprocess == _this._items.length)
                                            resolve();
                                    });
                                }
                            }
                        })];
                });
            });
        };
        return PreLoader;
    }());
    AssetLoader.PreLoader = PreLoader;
    /**
     * 系统资源加载代理
     */
    var LoaderProxy = /** @class */ (function () {
        function LoaderProxy() {
        }
        /**
         * 根据url获取游戏资源
         * @param url 资源URL
         * @param c 资源类型
         */
        LoaderProxy.get = function (url, c) {
            return __awaiter(this, void 0, Promise, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            //let preItems = Single.getInstance<List<PreAsset>>(List);
                            //根据路径在资源缓存列表中是否能找到资源
                            var result = _this.preItems.firstOrDefault(function (item) { return item.url == url; });
                            if (result && result.asset != undefined && result.asset != null) {
                                //找到资源直接返回
                                resolve(result.asset);
                            }
                            else {
                                //找不到资源 根据路径向服务器获取资源
                                cc.loader.loadRes(url, c, function (error, res) {
                                    var data = _this.preItems.firstOrDefault(function (item) { return item.url == url; });
                                    //如果资源缓存列表中没有此数据
                                    if (data) {
                                        //有此类资源  替换资源
                                        data.asset = res;
                                    }
                                    else {
                                        //无此类资源  添加资源
                                        _this.preItems.add(new PreAsset(url, c, res));
                                    }
                                    if (error) {
                                        reject(error);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                });
                            }
                        })];
                });
            });
        };
        //缓存资源列表单例
        LoaderProxy.preItems = units_1.Units.Single.getInstance(units_1.Units.List);
        return LoaderProxy;
    }());
    AssetLoader.LoaderProxy = LoaderProxy;
    /**
     * 对象池工厂
     */
    var FactoryPool = /** @class */ (function () {
        function FactoryPool() {
            this._factorypPool = new cc.NodePool();
        }
        /**
         * 异步创建节点对象
         * @param url 节点资源url
         * @param c 资源类型
         */
        FactoryPool.prototype.acyncCreate = function (url, c) {
            return __awaiter(this, void 0, Promise, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var tObj = null;
                            if (_this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                                tObj = _this._factorypPool.get();
                                resolve(tObj);
                            }
                            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                                LoaderProxy.get(url, c).then(function (res) {
                                    tObj = cc.instantiate(res);
                                    resolve(tObj);
                                }, function (error) {
                                    reject(error);
                                });
                            }
                        })];
                });
            });
        };
        FactoryPool.prototype.createNodeByAsset = function (c) {
            var tObj = null;
            if (this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                tObj = this._factorypPool.get();
            }
            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                tObj = new cc.Node();
                tObj.addComponent(c);
            }
            return tObj;
        };
        FactoryPool.prototype.clone = function (node) {
            var newnode = null;
            if (this._factorypPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                newnode = this._factorypPool.get();
            }
            else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                newnode = cc.instantiate(node);
            }
            return newnode;
        };
        //回收节点对象
        FactoryPool.prototype.onKilled = function (node) {
            // enemy 应该是一个 cc.Node
            this._factorypPool.put(node); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        };
        //清空对象池
        FactoryPool.prototype.clearPool = function () {
            this._factorypPool.clear();
        };
        return FactoryPool;
    }());
    AssetLoader.FactoryPool = FactoryPool;
})(AssetLoader = exports.AssetLoader || (exports.AssetLoader = {}));

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=assetLoader.js.map
        