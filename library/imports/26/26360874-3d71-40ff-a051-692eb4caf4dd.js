"use strict";
cc._RF.push(module, '26360h0PXFA/6BRaS60yvTd', 'units');
// Script/common/units.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Units;
(function (Units) {
    /**
     * 单例模式代理器
     */
    var Single = /** @class */ (function () {
        function Single() {
        }
        //获取单例对象
        Single.getInstance = function (c) {
            for (var _i = 0, _a = this._single; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item instanceof c)
                    return item;
            }
            var instance = new c();
            this._single.push(instance);
            return instance;
        };
        //移除指定的单例对象 c为空则移除所有单例对象
        Single.removeSingle = function (c) {
            if (c.length > 0) {
                var array = [];
                for (var _i = 0, _a = this._single; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var removeflag = false;
                    for (var _b = 0, c_1 = c; _b < c_1.length; _b++) {
                        var i = c_1[_b];
                        if (item instanceof i) {
                            removeflag = true;
                            break;
                        }
                    }
                    if (!removeflag)
                        array.push(item);
                }
                this._single = array;
            }
            else {
                this._single = [];
            }
        };
        Single._single = [];
        return Single;
    }());
    Units.Single = Single;
    /**
     * 数组拓展类
     */
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        function List(_items) {
            var _this = _super.call(this) || this;
            //继承拓展Error, Array, Map出现问题的解决方法
            Object.setPrototypeOf(_this, List.prototype);
            if (_items && _items.length) {
                for (var i = 0; i < _items.length; i++) {
                    _this.push(_items[i]);
                }
            }
            return _this;
        }
        List.prototype.firstOrDefault = function (predicate) {
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (predicate(item)) {
                    return item;
                }
            }
            return null;
        };
        List.prototype.where = function (predicate) {
            var result = [];
            for (var i = 0; i < this.length; i++) {
                var item = this[i];
                if (predicate(item)) {
                    result.push(item);
                }
            }
            return result;
        };
        List.prototype.remove = function (item) {
            var index = this.indexOf(item);
            if (index >= 0) {
                this.splice(index, 1);
                return true;
            }
            return false;
        };
        List.prototype.removeRange = function (items) {
            for (var i = 0; i < items.length; i++) {
                this.remove(items[i]);
            }
        };
        List.prototype.add = function (item) {
            this.push(item);
        };
        List.prototype.addRange = function (items) {
            for (var i = 0; i < items.length; i++) {
                this.push(items[i]);
            }
        };
        List.prototype.orderBy = function (propertyExpression) {
            var result = [];
            var compareFunction = function (item1, item2) {
                if (propertyExpression(item1) > propertyExpression(item2))
                    return 1;
                if (propertyExpression(item2) > propertyExpression(item1))
                    return -1;
                return 0;
            };
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        };
        List.prototype.orderByDescending = function (propertyExpression) {
            var result = [];
            var compareFunction = function (item1, item2) {
                if (propertyExpression(item1) > propertyExpression(item2))
                    return -1;
                if (propertyExpression(item2) > propertyExpression(item1))
                    return 1;
                return 0;
            };
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        };
        List.prototype.orderByMany = function (propertyExpressions) {
            var result = [];
            var compareFunction = function (item1, item2) {
                for (var i = 0; i < propertyExpressions.length; i++) {
                    var propertyExpression = propertyExpressions[i];
                    if (propertyExpression(item1) > propertyExpression(item2))
                        return 1;
                    if (propertyExpression(item2) > propertyExpression(item1))
                        return -1;
                }
                return 0;
            };
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        };
        List.prototype.orderByManyDescending = function (propertyExpressions) {
            var result = [];
            var compareFunction = function (item1, item2) {
                for (var i = 0; i < propertyExpressions.length; i++) {
                    var propertyExpression = propertyExpressions[i];
                    if (propertyExpression(item1) > propertyExpression(item2))
                        return -1;
                    if (propertyExpression(item2) > propertyExpression(item1))
                        return 1;
                }
                return 0;
            };
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        };
        return List;
    }(Array));
    Units.List = List;
    function getUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
    Units.getUUID = getUUID;
})(Units = exports.Units || (exports.Units = {}));
;

cc._RF.pop();