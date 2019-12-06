export namespace Units {
    /**
     * 单例模式代理器
     */
    export class Single {
        private static _single = [];
        private constructor() { }

        //获取单例对象
        public static getInstance<T>(c: {
            new(): T
        }): T {
            for (const item of this._single) {
                if (item instanceof c) return item;
            }
            let instance = new c();
            this._single.push(instance);
            return instance;
        }

        //移除指定的单例对象 c为空则移除所有单例对象
        public static removeSingle(c?: {
            new()
        }[]) {
            if (c.length > 0) {
                let array = [];
                for (const item of this._single) {
                    let removeflag = false;
                    for (const i of c) {
                        if (item instanceof i) {
                            removeflag = true;
                            break;
                        }
                    }
                    if (!removeflag) array.push(item);
                }
                this._single = array;
            } else {
                this._single = [];
            }
        }
    }

    /**
     * 数组拓展类
     */
    export class List<T> extends Array<T> {
        constructor(_items?: T[]) {
            super();
            //继承拓展Error, Array, Map出现问题的解决方法
            Object.setPrototypeOf(this, List.prototype);
            if (_items && _items.length) {
                for (var i = 0; i < _items.length; i++) {
                    this.push(_items[i]);
                }
            }
        }
        firstOrDefault(predicate: (item: T) => boolean): T {
            for (var i = 0; i < this.length; i++) {
                let item = this[i];
                if (predicate(item)) {
                    return item;
                }
            }
            return null;
        }

        where(predicate: (item: T) => boolean): T[] {
            let result: T[] = [];
            for (var i = 0; i < this.length; i++) {
                let item = this[i];
                if (predicate(item)) {
                    result.push(item);
                }
            }
            return result;
        }
        remove(item: T): boolean {
            let index = this.indexOf(item);
            if (index >= 0) {
                this.splice(index, 1);
                return true;
            }
            return false;
        }
        removeRange(items: T[]): void {
            for (var i = 0; i < items.length; i++) {
                this.remove(items[i]);
            }
        }
        add(item: T): void {
            this.push(item);
        }


        addRange(items: T[]): void {
            for (var i = 0; i < items.length; i++) {
                this.push(items[i]);
            }
        }

        orderBy(propertyExpression: (item: T) => T) {
            let result = [];
            var compareFunction = (item1: T, item2: T): number => {
                if (propertyExpression(item1) > propertyExpression(item2)) return 1;
                if (propertyExpression(item2) > propertyExpression(item1)) return -1;
                return 0;
            }
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);

            }
            return result;
        }


        orderByDescending(propertyExpression: (item: T) => T) {
            let result = [];
            var compareFunction = (item1: T, item2: T): number => {
                if (propertyExpression(item1) > propertyExpression(item2)) return -1;
                if (propertyExpression(item2) > propertyExpression(item1)) return 1;
                return 0;
            }
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        }


        orderByMany(propertyExpressions: [(item: T) => T]) {
            let result = [];
            var compareFunction = (item1: T, item2: T): number => {
                for (var i = 0; i < propertyExpressions.length; i++) {
                    let propertyExpression = propertyExpressions[i];
                    if (propertyExpression(item1) > propertyExpression(item2)) return 1;
                    if (propertyExpression(item2) > propertyExpression(item1)) return -1;
                }
                return 0;
            }
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        }


        orderByManyDescending(propertyExpressions: [(item: T) => T]) {
            let result = [];
            var compareFunction = (item1: T, item2: T): number => {
                for (var i = 0; i < propertyExpressions.length; i++) {
                    let propertyExpression = propertyExpressions[i];
                    if (propertyExpression(item1) > propertyExpression(item2)) return -1;
                    if (propertyExpression(item2) > propertyExpression(item1)) return 1;
                }
                return 0;
            }
            for (var i = 0; i < this.length; i++) {
                return this.sort(compareFunction);
            }
            return result;
        }
    }

    export function getUUID(): string {
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


};