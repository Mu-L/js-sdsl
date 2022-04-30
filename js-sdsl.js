(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sdsl = {}));
})(this, (function (exports) { 'use strict';

    var __generator$6 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var __read = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    var __values$4 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var VectorIterator = function (index, size, getElementByPos, setElementByPos, iteratorType) {
        if (iteratorType === void 0) { iteratorType = 'normal'; }
        Object.defineProperties(this, {
            iteratorType: {
                value: iteratorType
            },
            node: {
                value: index,
            },
            pointer: {
                get: function () {
                    if (index < 0 || index >= size()) {
                        throw new Error("Deque iterator access denied!");
                    }
                    return getElementByPos(index);
                },
                set: function (newValue) {
                    setElementByPos(index, newValue);
                },
                enumerable: true
            }
        });
        this.equals = function (obj) {
            if (obj.constructor.name !== this.constructor.name) {
                throw new Error("obj's constructor is not ".concat(this.constructor.name, "!"));
            }
            if (this.iteratorType !== obj.iteratorType) {
                throw new Error("iterator type error!");
            }
            // @ts-ignore
            return this.node === obj.node;
        };
        this.pre = function () {
            if (this.iteratorType === 'reverse') {
                if (index === size() - 1)
                    throw new Error("Deque iterator access denied!");
                return new VectorIterator(index + 1, size, getElementByPos, setElementByPos, this.iteratorType);
            }
            if (index === 0)
                throw new Error("Deque iterator access denied!");
            return new VectorIterator(index - 1, size, getElementByPos, setElementByPos);
        };
        this.next = function () {
            if (this.iteratorType === 'reverse') {
                if (index === -1)
                    throw new Error("Deque iterator access denied!");
                return new VectorIterator(index - 1, size, getElementByPos, setElementByPos, this.iteratorType);
            }
            if (index === size())
                throw new Error("Iterator access denied!");
            return new VectorIterator(index + 1, size, getElementByPos, setElementByPos);
        };
    };
    function Vector(container) {
        var _this = this;
        if (container === void 0) { container = []; }
        var len = 0;
        var vector = [];
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            vector.length = 0;
        };
        this.begin = function () {
            return new VectorIterator(0, this.size, this.getElementByPos, this.setElementByPos);
        };
        this.end = function () {
            return new VectorIterator(len, this.size, this.getElementByPos, this.setElementByPos);
        };
        this.rBegin = function () {
            return new VectorIterator(len - 1, this.size, this.getElementByPos, this.setElementByPos, 'reverse');
        };
        this.rEnd = function () {
            return new VectorIterator(-1, this.size, this.getElementByPos, this.setElementByPos, 'reverse');
        };
        this.front = function () {
            if (this.empty())
                return undefined;
            return vector[0];
        };
        this.back = function () {
            if (this.empty())
                return undefined;
            return vector[len - 1];
        };
        this.forEach = function (callback) {
            vector.forEach(callback);
        };
        this.getElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("pos must more than 0 and less than vector's size");
            return vector[pos];
        };
        this.eraseElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("pos must more than 0 and less than vector's size");
            for (var i = pos; i < len - 1; ++i)
                vector[i] = vector[i + 1];
            this.popBack();
        };
        this.eraseElementByValue = function (value) {
            var newArr = [];
            this.forEach(function (element) {
                if (element !== value)
                    newArr.push(element);
            });
            newArr.forEach(function (element, index) {
                vector[index] = element;
            });
            var newLen = newArr.length;
            while (len > newLen)
                this.popBack();
        };
        this.pushBack = function (element) {
            vector.push(element);
            ++len;
        };
        this.popBack = function () {
            vector.pop();
            if (len > 0)
                --len;
        };
        this.setElementByPos = function (pos, element) {
            if (element === undefined || element === null) {
                this.eraseElementByPos(pos);
                return;
            }
            if (pos < 0 || pos >= len)
                throw new Error("pos must more than 0 and less than vector's size");
            vector[pos] = element;
        };
        this.insert = function (pos, element, num) {
            if (num === void 0) { num = 1; }
            if (element === undefined || element === null) {
                throw new Error("you can't push undefined or null here");
            }
            if (pos < 0 || pos > len)
                throw new Error("pos must more than 0 and less than or equal to vector's size");
            vector.splice.apply(vector, __spreadArray([pos, 0], __read(new Array(num).fill(element)), false));
            len += num;
        };
        this.find = function (element) {
            for (var i = 0; i < len; ++i) {
                if (vector[i] === element)
                    return new VectorIterator(i, this.size, this.getElementByPos, this.getElementByPos);
            }
            return this.end();
        };
        this.reverse = function () {
            vector.reverse();
        };
        this.unique = function () {
            var pre;
            var newArr = [];
            this.forEach(function (element, index) {
                if (index === 0 || element !== pre) {
                    newArr.push(element);
                    pre = element;
                }
            });
            newArr.forEach(function (element, index) {
                vector[index] = element;
            });
            var newLen = newArr.length;
            while (len > newLen)
                this.popBack();
        };
        this.sort = function (cmp) {
            vector.sort(cmp);
        };
        if (typeof Symbol.iterator === 'symbol') {
            this[Symbol.iterator] = function () {
                return (function () {
                    return __generator$6(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [5 /*yield**/, __values$4(vector)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                })();
            };
        }
        container.forEach(function (element) { return _this.pushBack(element); });
    }

    function Stack(container) {
        var _this = this;
        if (container === void 0) { container = []; }
        var len = 0;
        var stack = [];
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            stack.length = 0;
        };
        this.push = function (element) {
            stack.push(element);
            ++len;
        };
        this.pop = function () {
            stack.pop();
            if (len > 0)
                --len;
        };
        this.top = function () {
            return stack[len - 1];
        };
        container.forEach(function (element) { return _this.push(element); });
    }

    var __generator$5 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var LinkNode = /** @class */ (function () {
        function LinkNode(element) {
            this.value = undefined;
            this.pre = undefined;
            this.next = undefined;
            this.value = element;
        }
        return LinkNode;
    }());
    var LinkListIterator = function (_node, head, tail, iteratorType) {
        if (iteratorType === void 0) { iteratorType = 'normal'; }
        Object.defineProperties(this, {
            iteratorType: {
                value: iteratorType
            },
            node: {
                value: _node
            },
            pointer: {
                get: function () {
                    return _node.value;
                },
                set: function (newValue) {
                    if (_node.value === undefined) {
                        throw new Error("LinkList iterator access denied!");
                    }
                    if (newValue === null || newValue === undefined) {
                        throw new Error("you can't push undefined or null here");
                    }
                    _node.value = newValue;
                },
                enumerable: true
            }
        });
        this.equals = function (obj) {
            if (obj.constructor.name !== this.constructor.name) {
                throw new Error("obj's constructor is not ".concat(this.constructor.name, "!"));
            }
            if (this.iteratorType !== obj.iteratorType) {
                throw new Error("iterator type error!");
            }
            // @ts-ignore
            return this.node === obj.node;
        };
        this.pre = function () {
            if (this.iteratorType === 'reverse') {
                if (_node === tail)
                    throw new Error("LinkList iterator access denied!");
                return new LinkListIterator(_node.next || _node, head, tail, this.iteratorType);
            }
            if (_node === head)
                throw new Error("LinkList iterator access denied!");
            return new LinkListIterator(_node.pre || _node, head, tail);
        };
        this.next = function () {
            if (this.iteratorType === 'reverse') {
                if (_node.value === undefined)
                    throw new Error("LinkList iterator access denied!");
                return new LinkListIterator(_node.pre || _node, head, tail, this.iteratorType);
            }
            if (_node.value === undefined)
                throw new Error("LinkList iterator access denied!");
            return new LinkListIterator(_node.next || _node, head, tail);
        };
    };
    function LinkList(container) {
        var _this = this;
        if (container === void 0) { container = []; }
        var len = 0;
        var head = undefined;
        var tail = undefined;
        var header = new LinkNode();
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            head = tail = undefined;
            header.pre = header.next = undefined;
        };
        this.begin = function () {
            return new LinkListIterator(head || header, head || header, tail || header);
        };
        this.end = function () {
            return new LinkListIterator(header, head || header, tail || header);
        };
        this.rBegin = function () {
            return new LinkListIterator(tail || header, head || header, tail || header);
        };
        this.rEnd = function () {
            return new LinkListIterator(header, head || header, tail || header);
        };
        this.front = function () {
            return head === null || head === void 0 ? void 0 : head.value;
        };
        this.back = function () {
            return tail === null || tail === void 0 ? void 0 : tail.value;
        };
        this.forEach = function (callback) {
            var curNode = head;
            var index = 0;
            while (curNode && curNode !== header) {
                if (curNode.value === undefined)
                    throw new Error("unknown error");
                callback(curNode.value, index++);
                curNode = curNode.next;
            }
        };
        this.getElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("pos must more then 0 and less then the list length");
            var curNode = head;
            while (pos--) {
                if (!curNode)
                    break;
                curNode = curNode.next;
            }
            if (!curNode || curNode.value === undefined)
                throw new Error("unknown error");
            return curNode.value;
        };
        this.eraseElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("erase pos must more then 0 and less then the list length");
            if (pos === 0)
                this.popFront();
            else if (pos === len - 1)
                this.popBack();
            else {
                var curNode = head;
                while (pos--) {
                    if (!(curNode === null || curNode === void 0 ? void 0 : curNode.next))
                        throw new Error("unknown error");
                    curNode = curNode.next;
                }
                if (!curNode || !curNode.pre || !curNode.next) {
                    throw new Error("unknown error");
                }
                var pre = curNode.pre;
                var next = curNode.next;
                next.pre = pre;
                pre.next = next;
                if (len > 0)
                    --len;
            }
        };
        this.eraseElementByValue = function (value) {
            while (head && head.value === value)
                this.popFront();
            while (tail && tail.value === value)
                this.popBack();
            if (!head)
                return;
            var curNode = head;
            while (curNode && curNode !== header) {
                if (curNode.value === value) {
                    var pre = curNode.pre;
                    var next = curNode.next;
                    if (next)
                        next.pre = pre;
                    if (pre)
                        pre.next = next;
                    if (len > 0)
                        --len;
                }
                curNode = curNode.next;
            }
        };
        this.pushBack = function (element) {
            if (element === null || element === undefined) {
                throw new Error("you can't push null or undefined here");
            }
            ++len;
            var newTail = new LinkNode(element);
            if (!tail) {
                head = tail = newTail;
                header.next = head;
                head.pre = header;
            }
            else {
                tail.next = newTail;
                newTail.pre = tail;
                tail = newTail;
            }
            tail.next = header;
            header.pre = tail;
        };
        this.popBack = function () {
            if (!tail)
                return;
            if (len > 0)
                --len;
            if (head === tail) {
                head = tail = undefined;
                header.next = undefined;
            }
            else {
                tail = tail.pre;
                if (tail)
                    tail.next = undefined;
            }
            header.pre = tail;
            if (tail)
                tail.next = header;
        };
        this.setElementByPos = function (pos, element) {
            if (element === null || element === undefined) {
                throw new Error("you can't set null or undefined here");
            }
            if (pos < 0 || pos >= len)
                throw new Error("pos must more then 0 and less then the list length");
            var curNode = head;
            while (pos--) {
                if (!curNode)
                    throw new Error("unknown error");
                curNode = curNode.next;
            }
            if (curNode)
                curNode.value = element;
        };
        this.insert = function (pos, element, num) {
            if (num === void 0) { num = 1; }
            if (element === null || element === undefined) {
                throw new Error("you can't insert null or undefined here");
            }
            if (pos < 0 || pos > len)
                throw new Error("insert pos must more then 0 and less then or equal to the list length");
            if (num < 0)
                throw new Error("insert size must more than 0");
            if (pos === 0) {
                while (num--)
                    this.pushFront(element);
            }
            else if (pos === len) {
                while (num--)
                    this.pushBack(element);
            }
            else {
                var curNode = head;
                for (var i = 1; i < pos; ++i) {
                    if (!(curNode === null || curNode === void 0 ? void 0 : curNode.next))
                        throw new Error("unknown error");
                    curNode = curNode === null || curNode === void 0 ? void 0 : curNode.next;
                }
                if (!curNode) {
                    throw new Error("unknown error");
                }
                var next = curNode.next;
                len += num;
                while (num--) {
                    curNode.next = new LinkNode(element);
                    curNode.next.pre = curNode;
                    curNode = curNode.next;
                }
                curNode.next = next;
                if (next)
                    next.pre = curNode;
            }
        };
        this.find = function (element) {
            var curNode = head;
            while (curNode && curNode !== header) {
                if (curNode.value === element)
                    return new LinkListIterator(curNode, head || header, tail || header);
                curNode = curNode.next;
            }
            return this.end();
        };
        this.reverse = function () {
            var pHead = head;
            var pTail = tail;
            var cnt = 0;
            while (pHead && pTail && cnt * 2 < len) {
                var tmp = pHead.value;
                pHead.value = pTail.value;
                pTail.value = tmp;
                pHead = pHead.next;
                pTail = pTail.pre;
                ++cnt;
            }
        };
        this.unique = function () {
            var curNode = head;
            while (curNode && curNode !== header) {
                var tmpNode = curNode;
                while (tmpNode && tmpNode.next && tmpNode.value === tmpNode.next.value) {
                    tmpNode = tmpNode.next;
                    if (len > 0)
                        --len;
                }
                curNode.next = tmpNode.next;
                if (curNode.next)
                    curNode.next.pre = curNode;
                curNode = curNode.next;
            }
        };
        this.sort = function (cmp) {
            var arr = [];
            this.forEach(function (element) {
                arr.push(element);
            });
            arr.sort(cmp);
            var curNode = head;
            arr.forEach(function (element) {
                if (curNode) {
                    curNode.value = element;
                    curNode = curNode.next;
                }
            });
        };
        this.pushFront = function (element) {
            if (element === null || element === undefined) {
                throw new Error("you can't push null or undefined here");
            }
            ++len;
            var newHead = new LinkNode(element);
            if (!head) {
                head = tail = newHead;
                tail.next = header;
                header.pre = tail;
            }
            else {
                newHead.next = head;
                head.pre = newHead;
                head = newHead;
            }
            header.next = head;
            head.pre = header;
        };
        this.popFront = function () {
            if (!head)
                return;
            if (len > 0)
                --len;
            if (head === tail) {
                head = tail = undefined;
                header.pre = tail;
            }
            else {
                head = head.next;
                if (head)
                    head.pre = header;
            }
            header.next = head;
        };
        this.merge = function (list) {
            var _this = this;
            var curNode = head;
            list.forEach(function (element) {
                while (curNode && curNode !== header && curNode.value !== undefined && curNode.value <= element) {
                    curNode = curNode.next;
                }
                if (curNode === header) {
                    _this.pushBack(element);
                    curNode = tail;
                }
                else if (curNode === head) {
                    _this.pushFront(element);
                    curNode = head;
                }
                else {
                    if (!curNode)
                        throw new Error("unknown error");
                    ++len;
                    var pre = curNode.pre;
                    if (pre) {
                        pre.next = new LinkNode(element);
                        pre.next.pre = pre;
                        pre.next.next = curNode;
                        if (curNode)
                            curNode.pre = pre.next;
                    }
                }
            });
        };
        if (typeof Symbol.iterator === 'symbol') {
            this[Symbol.iterator] = function () {
                return (function () {
                    var curNode;
                    return __generator$5(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                curNode = head;
                                _a.label = 1;
                            case 1:
                                if (!(curNode && curNode !== header)) return [3 /*break*/, 3];
                                if (!curNode.value)
                                    throw new Error("unknown error");
                                return [4 /*yield*/, curNode.value];
                            case 2:
                                _a.sent();
                                curNode = curNode.next;
                                return [3 /*break*/, 1];
                            case 3: return [2 /*return*/];
                        }
                    });
                })();
            };
        }
        container.forEach(function (element) { return _this.pushBack(element); });
    }

    function Queue(container) {
        if (container === void 0) { container = []; }
        var queue = new LinkList(container);
        this.size = function () {
            return queue.size();
        };
        this.empty = function () {
            return queue.empty();
        };
        this.clear = function () {
            queue.clear();
        };
        this.push = function (element) {
            queue.pushBack(element);
        };
        this.pop = function () {
            queue.popFront();
        };
        this.front = function () {
            return queue.front();
        };
    }

    var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var DequeIterator = function (index, size, getElementByPos, setElementByPos, iteratorType) {
        if (iteratorType === void 0) { iteratorType = 'normal'; }
        Object.defineProperties(this, {
            iteratorType: {
                value: iteratorType
            },
            node: {
                value: index,
            },
            pointer: {
                get: function () {
                    if (index < 0 || index >= size()) {
                        throw new Error("Deque iterator access denied!");
                    }
                    return getElementByPos(index);
                },
                set: function (newValue) {
                    setElementByPos(index, newValue);
                },
                enumerable: true
            }
        });
        this.equals = function (obj) {
            if (obj.constructor.name !== this.constructor.name) {
                throw new Error("obj's constructor is not ".concat(this.constructor.name, "!"));
            }
            if (this.iteratorType !== obj.iteratorType) {
                throw new Error("iterator type error!");
            }
            // @ts-ignore
            return this.node === obj.node;
        };
        this.pre = function () {
            if (this.iteratorType === 'reverse') {
                if (index === size() - 1)
                    throw new Error("Deque iterator access denied!");
                return new DequeIterator(index + 1, size, getElementByPos, setElementByPos, this.iteratorType);
            }
            if (index === 0)
                throw new Error("Deque iterator access denied!");
            return new DequeIterator(index - 1, size, getElementByPos, setElementByPos);
        };
        this.next = function () {
            if (this.iteratorType === 'reverse') {
                if (index === -1)
                    throw new Error("Deque iterator access denied!");
                return new DequeIterator(index - 1, size, getElementByPos, setElementByPos, this.iteratorType);
            }
            if (index === size())
                throw new Error("Iterator access denied!");
            return new DequeIterator(index + 1, size, getElementByPos, setElementByPos);
        };
    };
    Deque.sigma = 3; // growth factor
    Deque.bucketSize = (1 << 12);
    function Deque(container) {
        var _this = this;
        if (container === void 0) { container = []; }
        var map = [];
        var first = 0;
        var curFirst = 0;
        var last = 0;
        var curLast = 0;
        var bucketNum = 0;
        var len = 0;
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            first = last = curFirst = curLast = bucketNum = len = 0;
            reAllocate.call(this, Deque.bucketSize);
            len = 0;
        };
        this.begin = function () {
            return new DequeIterator(0, this.size, this.getElementByPos, this.setElementByPos);
        };
        this.end = function () {
            return new DequeIterator(len, this.size, this.getElementByPos, this.setElementByPos);
        };
        this.rBegin = function () {
            return new DequeIterator(len - 1, this.size, this.getElementByPos, this.setElementByPos, 'reverse');
        };
        this.rEnd = function () {
            return new DequeIterator(-1, this.size, this.getElementByPos, this.setElementByPos, 'reverse');
        };
        this.front = function () {
            return map[first][curFirst];
        };
        this.back = function () {
            return map[last][curLast];
        };
        this.forEach = function (callback) {
            if (this.empty())
                return;
            var index = 0;
            if (first === last) {
                for (var i = curFirst; i <= curLast; ++i) {
                    callback(map[first][i], index++);
                }
                return;
            }
            for (var i = curFirst; i < Deque.bucketSize; ++i) {
                callback(map[first][i], index++);
            }
            for (var i = first + 1; i < last; ++i) {
                for (var j = 0; j < Deque.bucketSize; ++j) {
                    callback(map[i][j], index++);
                }
            }
            for (var i = 0; i <= curLast; ++i) {
                callback(map[last][i], index++);
            }
        };
        var getElementIndex = function (pos) {
            var curFirstIndex = first * Deque.bucketSize + curFirst;
            var curNodeIndex = curFirstIndex + pos;
            var curLastIndex = last * Deque.bucketSize + curLast;
            if (curNodeIndex < curFirstIndex || curNodeIndex > curLastIndex)
                throw new Error("pos should more than 0 and less than queue's size");
            var curNodeBucketIndex = Math.floor(curNodeIndex / Deque.bucketSize);
            var curNodePointerIndex = curNodeIndex % Deque.bucketSize;
            return { curNodeBucketIndex: curNodeBucketIndex, curNodePointerIndex: curNodePointerIndex };
        };
        this.getElementByPos = function (pos) {
            var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
            return map[curNodeBucketIndex][curNodePointerIndex];
        };
        this.eraseElementByPos = function (pos) {
            var _this = this;
            if (pos < 0 || pos > len)
                throw new Error("pos should more than 0 and less than queue's size");
            if (pos === 0)
                this.popFront();
            else if (pos === this.size())
                this.popBack();
            else {
                var arr = [];
                for (var i = pos + 1; i < len; ++i) {
                    arr.push(this.getElementByPos(i));
                }
                this.cut(pos);
                this.popBack();
                arr.forEach(function (element) { return _this.pushBack(element); });
            }
        };
        this.eraseElementByValue = function (value) {
            if (this.empty())
                return;
            var arr = [];
            this.forEach(function (element) {
                if (element !== value) {
                    arr.push(element);
                }
            });
            var _len = arr.length;
            for (var i = 0; i < _len; ++i)
                this.setElementByPos(i, arr[i]);
            this.cut(_len - 1);
        };
        this.eraseElementByIterator = function (iter) {
            var nextIter = iter.next();
            // @ts-ignore
            this.eraseElementByPos(iter.node);
            iter = nextIter;
            return iter;
        };
        var reAllocate = function (originalSize) {
            var newMap = [];
            var needSize = originalSize * Deque.sigma;
            var newBucketNum = Math.max(Math.ceil(needSize / Deque.bucketSize), 2);
            for (var i = 0; i < newBucketNum; ++i) {
                newMap.push(new Array(Deque.bucketSize));
            }
            var needBucketNum = Math.ceil(originalSize / Deque.bucketSize);
            var newFirst = Math.floor(newBucketNum / 2) - Math.floor(needBucketNum / 2);
            var newLast = newFirst, newCurLast = 0;
            if (this.size()) {
                for (var i = 0; i < needBucketNum; ++i) {
                    for (var j = 0; j < Deque.bucketSize; ++j) {
                        newMap[newFirst + i][j] = this.front();
                        this.popFront();
                        if (this.empty()) {
                            newLast = newFirst + i;
                            newCurLast = j;
                            break;
                        }
                    }
                    if (this.empty())
                        break;
                }
            }
            map = newMap;
            first = newFirst;
            curFirst = 0;
            last = newLast;
            curLast = newCurLast;
            bucketNum = newBucketNum;
            len = originalSize;
        };
        this.pushBack = function (element) {
            if (!this.empty()) {
                if (last === bucketNum - 1 && curLast === Deque.bucketSize - 1) {
                    reAllocate.call(this, this.size());
                }
                if (curLast < Deque.bucketSize - 1) {
                    ++curLast;
                }
                else if (last < bucketNum - 1) {
                    ++last;
                    curLast = 0;
                }
            }
            ++len;
            map[last][curLast] = element;
        };
        this.popBack = function () {
            if (this.empty())
                return;
            if (this.size() !== 1) {
                if (curLast > 0) {
                    --curLast;
                }
                else if (first < last) {
                    --last;
                    curLast = Deque.bucketSize - 1;
                }
            }
            if (len > 0)
                --len;
        };
        this.setElementByPos = function (pos, element) {
            if (element === undefined || element === null) {
                this.eraseElementByPos(pos);
                return;
            }
            var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
            map[curNodeBucketIndex][curNodePointerIndex] = element;
        };
        this.insert = function (pos, element, num) {
            var _this = this;
            if (num === void 0) { num = 1; }
            if (element === undefined || element === null) {
                throw new Error("you can't push undefined or null here");
            }
            if (pos === 0) {
                while (num--)
                    this.pushFront(element);
            }
            else if (pos === this.size()) {
                while (num--)
                    this.pushBack(element);
            }
            else {
                var arr = [];
                for (var i = pos; i < len; ++i) {
                    arr.push(this.getElementByPos(i));
                }
                this.cut(pos - 1);
                for (var i = 0; i < num; ++i)
                    this.pushBack(element);
                arr.forEach(function (element) { return _this.pushBack(element); });
            }
        };
        this.find = function (element) {
            function getIndex(curNodeBucketIndex, curNodePointerIndex) {
                if (curNodeBucketIndex === first)
                    return curNodePointerIndex - curFirst;
                if (curNodeBucketIndex === last)
                    return len - (curLast - curNodePointerIndex) - 1;
                return (Deque.bucketSize - first) + (curNodeBucketIndex - 2) * Deque.bucketSize + curNodePointerIndex;
            }
            var resIndex = undefined;
            if (first === last) {
                for (var i = curFirst; i <= curLast; ++i) {
                    if (map[first][i] === element)
                        resIndex = getIndex(first, i);
                }
                return this.end();
            }
            for (var i = curFirst; i < Deque.bucketSize; ++i) {
                if (map[first][i] === element)
                    resIndex = getIndex(first, i);
            }
            if (resIndex === undefined) {
                for (var i = first + 1; i < last; ++i) {
                    for (var j = 0; j < Deque.bucketSize; ++j) {
                        if (map[i][j] === element)
                            resIndex = getIndex(first, i);
                    }
                }
            }
            if (resIndex === undefined) {
                for (var i = 0; i <= curLast; ++i) {
                    if (map[last][i] === element)
                        resIndex = getIndex(first, i);
                }
            }
            if (resIndex === undefined)
                return this.end();
            if (resIndex === 0)
                return this.begin();
            return new DequeIterator(resIndex, this.size, this.getElementByPos, this.setElementByPos);
        };
        this.reverse = function () {
            var l = 0, r = len - 1;
            while (l < r) {
                var tmp = this.getElementByPos(l);
                this.setElementByPos(l, this.getElementByPos(r));
                this.setElementByPos(r, tmp);
                ++l;
                --r;
            }
        };
        this.unique = function () {
            if (this.empty())
                return;
            var arr = [];
            var pre = this.front();
            this.forEach(function (element, index) {
                if (index === 0 || element !== pre) {
                    arr.push(element);
                    pre = element;
                }
            });
            for (var i = 0; i < len; ++i) {
                this.setElementByPos(i, arr[i]);
            }
            this.cut(arr.length - 1);
        };
        this.sort = function (cmp) {
            var arr = [];
            this.forEach(function (element) {
                arr.push(element);
            });
            arr.sort(cmp);
            for (var i = 0; i < len; ++i)
                this.setElementByPos(i, arr[i]);
        };
        this.pushFront = function (element) {
            if (element === undefined || element === null) {
                throw new Error("you can't push undefined or null here");
            }
            if (!this.empty()) {
                if (first === 0 && curFirst === 0) {
                    reAllocate.call(this, this.size());
                }
                if (curFirst > 0) {
                    --curFirst;
                }
                else if (first > 0) {
                    --first;
                    curFirst = Deque.bucketSize - 1;
                }
            }
            ++len;
            map[first][curFirst] = element;
        };
        this.popFront = function () {
            if (this.empty())
                return;
            if (this.size() !== 1) {
                if (curFirst < Deque.bucketSize - 1) {
                    ++curFirst;
                }
                else if (first < last) {
                    ++first;
                    curFirst = 0;
                }
            }
            if (len > 0)
                --len;
        };
        this.shrinkToFit = function () {
            var _this = this;
            var arr = [];
            this.forEach(function (element) {
                arr.push(element);
            });
            var _len = arr.length;
            map = [];
            var bucketNum = Math.ceil(_len / Deque.bucketSize);
            for (var i = 0; i < bucketNum; ++i) {
                map.push(new Array(Deque.bucketSize));
            }
            this.clear();
            arr.forEach(function (element) { return _this.pushBack(element); });
        };
        this.cut = function (pos) {
            if (pos < 0) {
                this.clear();
                return;
            }
            var _a = getElementIndex(pos), curNodeBucketIndex = _a.curNodeBucketIndex, curNodePointerIndex = _a.curNodePointerIndex;
            last = curNodeBucketIndex;
            curLast = curNodePointerIndex;
            len = pos + 1;
        };
        if (typeof Symbol.iterator === 'symbol') {
            this[Symbol.iterator] = function () {
                return (function () {
                    var i, i, i, j, i;
                    return __generator$4(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (len === 0)
                                    return [2 /*return*/];
                                if (!(first === last)) return [3 /*break*/, 5];
                                i = curFirst;
                                _a.label = 1;
                            case 1:
                                if (!(i <= curLast)) return [3 /*break*/, 4];
                                return [4 /*yield*/, map[first][i]];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                ++i;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                            case 5:
                                i = curFirst;
                                _a.label = 6;
                            case 6:
                                if (!(i < Deque.bucketSize)) return [3 /*break*/, 9];
                                return [4 /*yield*/, map[first][i]];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8:
                                ++i;
                                return [3 /*break*/, 6];
                            case 9:
                                i = first + 1;
                                _a.label = 10;
                            case 10:
                                if (!(i < last)) return [3 /*break*/, 15];
                                j = 0;
                                _a.label = 11;
                            case 11:
                                if (!(j < Deque.bucketSize)) return [3 /*break*/, 14];
                                return [4 /*yield*/, map[i][j]];
                            case 12:
                                _a.sent();
                                _a.label = 13;
                            case 13:
                                ++j;
                                return [3 /*break*/, 11];
                            case 14:
                                ++i;
                                return [3 /*break*/, 10];
                            case 15:
                                i = 0;
                                _a.label = 16;
                            case 16:
                                if (!(i <= curLast)) return [3 /*break*/, 19];
                                return [4 /*yield*/, map[last][i]];
                            case 17:
                                _a.sent();
                                _a.label = 18;
                            case 18:
                                ++i;
                                return [3 /*break*/, 16];
                            case 19: return [2 /*return*/];
                        }
                    });
                })();
            };
        }
        (function () {
            var _len = Deque.bucketSize;
            if (container.size) {
                _len = container.size();
            }
            else if (container.length) {
                _len = container.length;
            }
            var needSize = _len * Deque.sigma;
            bucketNum = Math.ceil(needSize / Deque.bucketSize);
            bucketNum = Math.max(bucketNum, 3);
            for (var i = 0; i < bucketNum; ++i) {
                map.push(new Array(Deque.bucketSize));
            }
            var needBucketNum = Math.ceil(_len / Deque.bucketSize);
            first = Math.floor(bucketNum / 2) - Math.floor(needBucketNum / 2);
            last = first;
            container.forEach(function (element) { return _this.pushBack(element); });
        })();
    }

    function PriorityQueue(container, cmp) {
        if (container === void 0) { container = []; }
        cmp = cmp || (function (x, y) {
            if (x > y)
                return -1;
            if (x < y)
                return 1;
            return 0;
        });
        var priorityQueue = [];
        container.forEach(function (element) { return priorityQueue.push(element); });
        var len = priorityQueue.length;
        var swap = function (x, y) {
            if (x < 0 || x >= len)
                throw new Error("unknown error");
            if (y < 0 || y >= len)
                throw new Error("unknown error");
            var tmp = priorityQueue[x];
            priorityQueue[x] = priorityQueue[y];
            priorityQueue[y] = tmp;
        };
        var adjust = function (parent) {
            if (parent < 0 || parent >= len)
                throw new Error("unknown error");
            var leftChild = parent * 2 + 1;
            var rightChild = parent * 2 + 2;
            if (leftChild < len && cmp(priorityQueue[parent], priorityQueue[leftChild]) > 0)
                swap(parent, leftChild);
            if (rightChild < len && cmp(priorityQueue[parent], priorityQueue[rightChild]) > 0)
                swap(parent, rightChild);
        };
        (function () {
            for (var parent_1 = Math.floor((len - 1) / 2); parent_1 >= 0; --parent_1) {
                var curParent = parent_1;
                var curChild = curParent * 2 + 1;
                while (curChild < len) {
                    var leftChild = curChild;
                    var rightChild = leftChild + 1;
                    var minChild = leftChild;
                    if (rightChild < len && cmp(priorityQueue[leftChild], priorityQueue[rightChild]) > 0)
                        minChild = rightChild;
                    if (cmp(priorityQueue[curParent], priorityQueue[minChild]) <= 0)
                        break;
                    swap(curParent, minChild);
                    curParent = minChild;
                    curChild = curParent * 2 + 1;
                }
            }
        })();
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            priorityQueue.length = 0;
        };
        this.push = function (element) {
            priorityQueue.push(element);
            ++len;
            if (len === 1)
                return;
            var curNode = len - 1;
            while (curNode > 0) {
                var parent_2 = Math.floor((curNode - 1) / 2);
                if (cmp(priorityQueue[parent_2], element) <= 0)
                    break;
                adjust(parent_2);
                curNode = parent_2;
            }
        };
        this.pop = function () {
            if (this.empty())
                return;
            if (this.size() === 1) {
                --len;
                return;
            }
            var last = priorityQueue[len - 1];
            --len;
            var parent = 0;
            while (parent < this.size()) {
                var leftChild = parent * 2 + 1;
                var rightChild = parent * 2 + 2;
                if (leftChild >= this.size())
                    break;
                var minChild = leftChild;
                if (rightChild < this.size() && cmp(priorityQueue[leftChild], priorityQueue[rightChild]) > 0)
                    minChild = rightChild;
                if (cmp(priorityQueue[minChild], last) >= 0)
                    break;
                priorityQueue[parent] = priorityQueue[minChild];
                parent = minChild;
            }
            priorityQueue[parent] = last;
        };
        this.top = function () {
            return priorityQueue[0];
        };
    }

    var TreeNode = /** @class */ (function () {
        function TreeNode(key, value) {
            this.color = true;
            this.key = undefined;
            this.value = undefined;
            this.parent = undefined;
            this.brother = undefined;
            this.leftChild = undefined;
            this.rightChild = undefined;
            if (key !== undefined && value !== undefined) {
                this.key = key;
                this.value = value;
            }
        }
        TreeNode.prototype.rotateLeft = function () {
            var PP = this.parent;
            var PB = this.brother;
            var F = this.leftChild;
            var V = this.rightChild;
            if (!V)
                throw new Error("unknown error");
            var R = V.leftChild;
            var X = V.rightChild;
            if (PP && PP.key !== undefined) {
                if (PP.leftChild === this)
                    PP.leftChild = V;
                else if (PP.rightChild === this)
                    PP.rightChild = V;
            }
            V.parent = PP;
            V.brother = PB;
            V.leftChild = this;
            V.rightChild = X;
            if (PB)
                PB.brother = V;
            this.parent = V;
            this.brother = X;
            this.leftChild = F;
            this.rightChild = R;
            if (X) {
                X.parent = V;
                X.brother = this;
            }
            if (F) {
                F.parent = this;
                F.brother = R;
            }
            if (R) {
                R.parent = this;
                R.brother = F;
            }
            return V;
        };
        TreeNode.prototype.rotateRight = function () {
            var PP = this.parent;
            var PB = this.brother;
            var F = this.leftChild;
            if (!F)
                throw new Error("unknown error");
            var V = this.rightChild;
            var D = F.leftChild;
            var K = F.rightChild;
            if (PP && PP.key !== undefined) {
                if (PP.leftChild === this)
                    PP.leftChild = F;
                else if (PP.rightChild === this)
                    PP.rightChild = F;
            }
            F.parent = PP;
            F.brother = PB;
            F.leftChild = D;
            F.rightChild = this;
            if (PB)
                PB.brother = F;
            if (D) {
                D.parent = F;
                D.brother = this;
            }
            this.parent = F;
            this.brother = D;
            this.leftChild = K;
            this.rightChild = V;
            if (K) {
                K.parent = this;
                K.brother = V;
            }
            if (V) {
                V.parent = this;
                V.brother = K;
            }
            return F;
        };
        TreeNode.prototype.remove = function () {
            if (this.leftChild || this.rightChild)
                throw new Error("can only remove leaf node");
            if (this.parent) {
                if (this === this.parent.leftChild)
                    this.parent.leftChild = undefined;
                else if (this === this.parent.rightChild)
                    this.parent.rightChild = undefined;
            }
            if (this.brother)
                this.brother.brother = undefined;
            this.key = undefined;
            this.value = undefined;
            this.parent = undefined;
            this.brother = undefined;
        };
        TreeNode.TreeNodeColorType = {
            red: true,
            black: false
        };
        return TreeNode;
    }());
    function _TreeIterator(_node, header, iteratorType) {
        if (iteratorType === void 0) { iteratorType = 'normal'; }
        Object.defineProperties(this, {
            iteratorType: {
                value: iteratorType
            },
            node: {
                value: _node
            },
            pointer: {
                get: function () {
                    if (_node.key === undefined) {
                        throw new Error("Tree iterator access denied!");
                    }
                    if (_node.value === undefined) {
                        return _node.key;
                    }
                    var obj = {};
                    Object.defineProperties(obj, {
                        key: {
                            get: function () {
                                return _node.key;
                            },
                            enumerable: true,
                        },
                        value: {
                            get: function () {
                                return _node.value;
                            },
                            set: function (newValue) {
                                _node.value = newValue;
                            },
                            enumerable: true,
                        }
                    });
                    return obj;
                },
                enumerable: true
            }
        });
        this.equals = function (obj) {
            if (obj.constructor.name !== this.constructor.name) {
                throw new Error("obj's constructor is not ".concat(this.constructor.name, "!"));
            }
            if (this.iteratorType !== obj.iteratorType) {
                throw new Error("iterator type error!");
            }
            // @ts-ignore
            return _node === obj.node;
        };
        var _pre = function () {
            var _a;
            var preNode = _node;
            if (preNode.color === TreeNode.TreeNodeColorType.red && ((_a = preNode.parent) === null || _a === void 0 ? void 0 : _a.parent) === preNode) {
                preNode = preNode.rightChild;
            }
            else if (preNode.leftChild) {
                preNode = preNode.leftChild;
                while (preNode.rightChild)
                    preNode = preNode === null || preNode === void 0 ? void 0 : preNode.rightChild;
            }
            else {
                var pre = (preNode === null || preNode === void 0 ? void 0 : preNode.parent) || undefined;
                while ((pre === null || pre === void 0 ? void 0 : pre.leftChild) === preNode) {
                    preNode = pre;
                    pre = (preNode === null || preNode === void 0 ? void 0 : preNode.parent) || undefined;
                }
                preNode = pre;
            }
            if (preNode === undefined)
                throw new Error("unknown error");
            return preNode;
        };
        var _next = function () {
            var nextNode = _node;
            if (nextNode === null || nextNode === void 0 ? void 0 : nextNode.rightChild) {
                nextNode = nextNode.rightChild;
                while (nextNode.leftChild)
                    nextNode = nextNode === null || nextNode === void 0 ? void 0 : nextNode.leftChild;
            }
            else {
                var pre = (nextNode === null || nextNode === void 0 ? void 0 : nextNode.parent) || undefined;
                while ((pre === null || pre === void 0 ? void 0 : pre.rightChild) === nextNode) {
                    nextNode = pre;
                    pre = (nextNode === null || nextNode === void 0 ? void 0 : nextNode.parent) || undefined;
                }
                if (nextNode.rightChild !== pre) {
                    nextNode = pre;
                }
            }
            if (nextNode === undefined)
                throw new Error("unknown error");
            return nextNode;
        };
        this.pre = function () {
            if (this.iteratorType === 'reverse') {
                if (_node === header.rightChild)
                    throw new Error("Tree iterator access denied!");
                var preNode_1 = _next();
                return new TreeIterator(preNode_1, header, this.iteratorType);
            }
            if (_node === header.leftChild)
                throw new Error("Tree iterator access denied!");
            var preNode = _pre();
            return new TreeIterator(preNode, header);
        };
        this.next = function () {
            if (this.iteratorType === 'reverse') {
                if (_node === header)
                    throw new Error("Tree iterator access denied!");
                var nextNode_1 = _pre();
                return new TreeIterator(nextNode_1, header, this.iteratorType);
            }
            if (_node === header)
                throw new Error("Tree iterator access denied!");
            var nextNode = _next();
            return new TreeIterator(nextNode, header);
        };
    }
    var TreeIterator = _TreeIterator;

    var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var __values$3 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function Set(container, cmp) {
        var _this = this;
        if (container === void 0) { container = []; }
        cmp = cmp || (function (x, y) {
            if (x < y)
                return -1;
            if (x > y)
                return 1;
            return 0;
        });
        var len = 0;
        var root = new TreeNode();
        root.color = TreeNode.TreeNodeColorType.black;
        var header = new TreeNode();
        header.parent = root;
        root.parent = header;
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            root.key = undefined;
            root.leftChild = root.rightChild = root.brother = undefined;
            header.leftChild = header.rightChild = undefined;
        };
        this.begin = function () {
            return new TreeIterator(header.leftChild || header, header);
        };
        this.end = function () {
            return new TreeIterator(header, header);
        };
        this.rBegin = function () {
            return new TreeIterator(header.rightChild || header, header);
        };
        this.rEnd = function () {
            return new TreeIterator(header, header);
        };
        var findSubTreeMinNode = function (curNode) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            return curNode.leftChild ? findSubTreeMinNode(curNode.leftChild) : curNode;
        };
        var findSubTreeMaxNode = function (curNode) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            return curNode.rightChild ? findSubTreeMaxNode(curNode.rightChild) : curNode;
        };
        this.front = function () {
            var _a;
            return (_a = header.leftChild) === null || _a === void 0 ? void 0 : _a.key;
        };
        this.back = function () {
            var _a;
            return (_a = header.rightChild) === null || _a === void 0 ? void 0 : _a.key;
        };
        this.forEach = function (callback) {
            var e_1, _a;
            var index = 0;
            try {
                for (var _b = __values$3(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var element = _c.value;
                    callback(element, index++);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.getElementByPos = function (pos) {
            var e_2, _a;
            if (pos < 0 || pos >= this.size())
                throw new Error("pos must more than 0 and less than set's size");
            var index = 0;
            try {
                for (var _b = __values$3(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var element = _c.value;
                    if (index === pos)
                        return element;
                    ++index;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            throw new Error("unknown error");
        };
        var eraseNodeSelfBalance = function (curNode) {
            var parentNode = curNode.parent;
            if (!parentNode || parentNode === header) {
                if (curNode === root)
                    return;
                throw new Error("unknown error");
            }
            if (curNode.color === TreeNode.TreeNodeColorType.red) {
                curNode.color = TreeNode.TreeNodeColorType.black;
                return;
            }
            var brotherNode = curNode.brother;
            if (!brotherNode)
                throw new Error("unknown error");
            if (curNode === parentNode.leftChild) {
                if (brotherNode.color === TreeNode.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode.TreeNodeColorType.black;
                    parentNode.color = TreeNode.TreeNodeColorType.red;
                    var newRoot = parentNode.rotateLeft();
                    if (root === parentNode) {
                        root = newRoot;
                        header.parent = root;
                        root.parent = header;
                    }
                    eraseNodeSelfBalance(curNode);
                }
                else if (brotherNode.color === TreeNode.TreeNodeColorType.black) {
                    if (brotherNode.rightChild && brotherNode.rightChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = parentNode.color;
                        parentNode.color = TreeNode.TreeNodeColorType.black;
                        if (brotherNode.rightChild)
                            brotherNode.rightChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = parentNode.rotateLeft();
                        if (root === parentNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        curNode.color = TreeNode.TreeNodeColorType.black;
                    }
                    else if ((!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black) && brotherNode.leftChild && brotherNode.leftChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        if (brotherNode.leftChild)
                            brotherNode.leftChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = brotherNode.rotateRight();
                        if (root === brotherNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        eraseNodeSelfBalance(curNode);
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black)) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        eraseNodeSelfBalance(parentNode);
                    }
                }
            }
            else if (curNode === parentNode.rightChild) {
                if (brotherNode.color === TreeNode.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode.TreeNodeColorType.black;
                    parentNode.color = TreeNode.TreeNodeColorType.red;
                    var newRoot = parentNode.rotateRight();
                    if (root === parentNode) {
                        root = newRoot;
                        header.parent = root;
                        root.parent = header;
                    }
                    eraseNodeSelfBalance(curNode);
                }
                else if (brotherNode.color === TreeNode.TreeNodeColorType.black) {
                    if (brotherNode.leftChild && brotherNode.leftChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = parentNode.color;
                        parentNode.color = TreeNode.TreeNodeColorType.black;
                        if (brotherNode.leftChild)
                            brotherNode.leftChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = parentNode.rotateRight();
                        if (root === parentNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        curNode.color = TreeNode.TreeNodeColorType.black;
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && brotherNode.rightChild && brotherNode.rightChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        if (brotherNode.rightChild)
                            brotherNode.rightChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = brotherNode.rotateLeft();
                        if (root === brotherNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        eraseNodeSelfBalance(curNode);
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black)) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        eraseNodeSelfBalance(parentNode);
                    }
                }
            }
        };
        var eraseNode = function (curNode) {
            var _a, _b, _c, _d, _e, _f;
            var swapNode = curNode;
            while (swapNode.leftChild || swapNode.rightChild) {
                if (swapNode.rightChild) {
                    swapNode = findSubTreeMinNode(swapNode.rightChild);
                    var tmpKey = curNode.key;
                    curNode.key = swapNode.key;
                    swapNode.key = tmpKey;
                    curNode = swapNode;
                }
                if (swapNode.leftChild) {
                    swapNode = findSubTreeMaxNode(swapNode.leftChild);
                    var tmpKey = curNode.key;
                    curNode.key = swapNode.key;
                    swapNode.key = tmpKey;
                    curNode = swapNode;
                }
            }
            if (swapNode.key === undefined)
                throw new Error("unknown error");
            if (header.leftChild && header.leftChild.key !== undefined && cmp(header.leftChild.key, swapNode.key) === 0) {
                if (header.leftChild !== root)
                    header.leftChild = (_a = header.leftChild) === null || _a === void 0 ? void 0 : _a.parent;
                else if ((_b = header.leftChild) === null || _b === void 0 ? void 0 : _b.rightChild)
                    header.leftChild = (_c = header.leftChild) === null || _c === void 0 ? void 0 : _c.rightChild;
                else
                    header.leftChild = undefined;
            }
            if (header.rightChild && header.rightChild.key !== undefined && cmp(header.rightChild.key, swapNode.key) === 0) {
                if (header.rightChild !== root)
                    header.rightChild = (_d = header.rightChild) === null || _d === void 0 ? void 0 : _d.parent;
                else if ((_e = header.rightChild) === null || _e === void 0 ? void 0 : _e.leftChild)
                    header.rightChild = (_f = header.rightChild) === null || _f === void 0 ? void 0 : _f.leftChild;
                else
                    header.rightChild = undefined;
            }
            eraseNodeSelfBalance(swapNode);
            if (swapNode)
                swapNode.remove();
            --len;
            root.color = TreeNode.TreeNodeColorType.black;
        };
        var inOrderTraversal = function (curNode, callback) {
            if (!curNode || curNode.key === undefined)
                return false;
            var ifReturn = inOrderTraversal(curNode.leftChild, callback);
            if (ifReturn)
                return true;
            if (callback(curNode))
                return true;
            return inOrderTraversal(curNode.rightChild, callback);
        };
        this.eraseElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("pos must more than 0 and less than set's size");
            var index = 0;
            inOrderTraversal(root, function (curNode) {
                if (pos === index) {
                    eraseNode(curNode);
                    return true;
                }
                ++index;
                return false;
            });
        };
        this.eraseElementByValue = function (value) {
            if (this.empty())
                return;
            var curNode = findElementPos(root, value);
            if (curNode === undefined || curNode.key === undefined || cmp(curNode.key, value) !== 0)
                return;
            eraseNode(curNode);
        };
        var findInsertPos = function (curNode, element) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            var cmpResult = cmp(element, curNode.key);
            if (cmpResult < 0) {
                if (!curNode.leftChild) {
                    curNode.leftChild = new TreeNode();
                    curNode.leftChild.parent = curNode;
                    curNode.leftChild.brother = curNode.rightChild;
                    if (curNode.rightChild)
                        curNode.rightChild.brother = curNode.leftChild;
                    return curNode.leftChild;
                }
                return findInsertPos(curNode.leftChild, element);
            }
            else if (cmpResult > 0) {
                if (!curNode.rightChild) {
                    curNode.rightChild = new TreeNode();
                    curNode.rightChild.parent = curNode;
                    curNode.rightChild.brother = curNode.leftChild;
                    if (curNode.leftChild)
                        curNode.leftChild.brother = curNode.rightChild;
                    return curNode.rightChild;
                }
                return findInsertPos(curNode.rightChild, element);
            }
            return curNode;
        };
        var insertNodeSelfBalance = function (curNode) {
            var parentNode = curNode.parent;
            if (!parentNode || parentNode === header) {
                if (curNode === root)
                    return;
                throw new Error("unknown error");
            }
            if (parentNode.color === TreeNode.TreeNodeColorType.black)
                return;
            if (parentNode.color === TreeNode.TreeNodeColorType.red) {
                var uncleNode = parentNode.brother;
                var grandParent = parentNode.parent;
                if (!grandParent)
                    throw new Error("unknown error");
                if (uncleNode && uncleNode.color === TreeNode.TreeNodeColorType.red) {
                    uncleNode.color = parentNode.color = TreeNode.TreeNodeColorType.black;
                    grandParent.color = TreeNode.TreeNodeColorType.red;
                    insertNodeSelfBalance(grandParent);
                }
                else if (!uncleNode || uncleNode.color === TreeNode.TreeNodeColorType.black) {
                    if (parentNode === grandParent.leftChild) {
                        if (curNode === parentNode.leftChild) {
                            parentNode.color = TreeNode.TreeNodeColorType.black;
                            grandParent.color = TreeNode.TreeNodeColorType.red;
                            var newRoot = grandParent.rotateRight();
                            if (grandParent === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                        }
                        else if (curNode === parentNode.rightChild) {
                            var newRoot = parentNode.rotateLeft();
                            if (parentNode === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                            insertNodeSelfBalance(parentNode);
                        }
                    }
                    else if (parentNode === grandParent.rightChild) {
                        if (curNode === parentNode.leftChild) {
                            var newRoot = parentNode.rotateRight();
                            if (parentNode === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                            insertNodeSelfBalance(parentNode);
                        }
                        else if (curNode === parentNode.rightChild) {
                            parentNode.color = TreeNode.TreeNodeColorType.black;
                            grandParent.color = TreeNode.TreeNodeColorType.red;
                            var newRoot = grandParent.rotateLeft();
                            if (grandParent === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                        }
                    }
                }
            }
        };
        this.insert = function (element) {
            if (element === null || element === undefined) {
                throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            }
            if (this.empty()) {
                ++len;
                root.key = element;
                root.color = TreeNode.TreeNodeColorType.black;
                header.leftChild = root;
                header.rightChild = root;
                return;
            }
            var curNode = findInsertPos(root, element);
            if (curNode.key !== undefined && cmp(curNode.key, element) === 0)
                return;
            ++len;
            curNode.key = element;
            if (header.leftChild === undefined || header.leftChild.key === undefined || cmp(header.leftChild.key, element) > 0) {
                header.leftChild = curNode;
            }
            if (header.rightChild === undefined || header.rightChild.key === undefined || cmp(header.rightChild.key, element) < 0) {
                header.rightChild = curNode;
            }
            insertNodeSelfBalance(curNode);
            root.color = TreeNode.TreeNodeColorType.black;
        };
        var findElementPos = function (curNode, element) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(element, curNode.key);
            if (cmpResult < 0)
                return findElementPos(curNode.leftChild, element);
            else if (cmpResult > 0)
                return findElementPos(curNode.rightChild, element);
            return curNode;
        };
        this.find = function (element) {
            var curNode = findElementPos(root, element);
            if (curNode !== undefined && curNode.key !== undefined)
                return new TreeIterator(curNode, header);
            return this.end();
        };
        var _lowerBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult === 0)
                return curNode;
            if (cmpResult < 0)
                return _lowerBound(curNode.rightChild, key);
            var resNode = _lowerBound(curNode.leftChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.lowerBound = function (key) {
            var resNode = _lowerBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _upperBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult <= 0)
                return _upperBound(curNode.rightChild, key);
            var resNode = _upperBound(curNode.leftChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.upperBound = function (key) {
            var resNode = _upperBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _reverseLowerBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult === 0)
                return curNode;
            if (cmpResult > 0)
                return _reverseLowerBound(curNode.leftChild, key);
            var resNode = _reverseLowerBound(curNode.rightChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.reverseLowerBound = function (key) {
            var resNode = _reverseLowerBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _reverseUpperBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult >= 0)
                return _reverseUpperBound(curNode.leftChild, key);
            var resNode = _reverseUpperBound(curNode.rightChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.reverseUpperBound = function (key) {
            var resNode = _reverseUpperBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        // waiting for optimization, this is O(mlog(n+m)) algorithm now, but we expect it to be O(mlog(n/m+1)).
        // (https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Set_operations_and_bulk_operations)
        this.union = function (other) {
            var _this = this;
            other.forEach(function (element) { return _this.insert(element); });
        };
        this.getHeight = function () {
            if (this.empty())
                return 0;
            var traversal = function (curNode) {
                if (!curNode)
                    return 1;
                return Math.max(traversal(curNode.leftChild), traversal(curNode.rightChild)) + 1;
            };
            return traversal(root);
        };
        if (typeof Symbol.iterator === 'symbol') {
            var iterationFunc_1 = function (curNode) {
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!curNode || curNode.key === undefined)
                                return [2 /*return*/];
                            return [5 /*yield**/, __values$3(iterationFunc_1(curNode.leftChild))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, curNode.key];
                        case 2:
                            _a.sent();
                            return [5 /*yield**/, __values$3(iterationFunc_1(curNode.rightChild))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            };
            this[Symbol.iterator] = function () {
                return iterationFunc_1(root);
            };
        }
        container.forEach(function (element) { return _this.insert(element); });
    }

    var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var __values$2 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    function Map(container, cmp) {
        var _this = this;
        if (container === void 0) { container = []; }
        cmp = cmp || (function (x, y) {
            if (x < y)
                return -1;
            if (x > y)
                return 1;
            return 0;
        });
        var len = 0;
        var root = new TreeNode();
        root.color = TreeNode.TreeNodeColorType.black;
        var header = new TreeNode();
        header.parent = root;
        root.parent = header;
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            root.key = root.value = undefined;
            root.leftChild = root.rightChild = root.brother = undefined;
            header.leftChild = header.rightChild = undefined;
        };
        this.begin = function () {
            return new TreeIterator(header.leftChild || header, header);
        };
        this.end = function () {
            return new TreeIterator(header, header);
        };
        this.rBegin = function () {
            return new TreeIterator(header.rightChild || header, header);
        };
        this.rEnd = function () {
            return new TreeIterator(header, header);
        };
        var findSubTreeMinNode = function (curNode) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            return curNode.leftChild ? findSubTreeMinNode(curNode.leftChild) : curNode;
        };
        var findSubTreeMaxNode = function (curNode) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            return curNode.rightChild ? findSubTreeMaxNode(curNode.rightChild) : curNode;
        };
        this.front = function () {
            if (this.empty())
                return undefined;
            var minNode = header.leftChild;
            if (!minNode || minNode.key === undefined || minNode.value === undefined)
                throw new Error("unknown error");
            return {
                key: minNode.key,
                value: minNode.value
            };
        };
        this.back = function () {
            if (this.empty())
                return undefined;
            var maxNode = header.rightChild;
            if (!maxNode || maxNode.key === undefined || maxNode.value === undefined)
                throw new Error("unknown error");
            return {
                key: maxNode.key,
                value: maxNode.value
            };
        };
        this.forEach = function (callback) {
            var e_1, _a;
            var index = 0;
            try {
                for (var _b = __values$2(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pair = _c.value;
                    callback(pair, index++);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.getElementByPos = function (pos) {
            var e_2, _a;
            if (pos < 0 || pos >= this.size())
                throw new Error("pos must more than 0 and less than set's size");
            var index = 0;
            try {
                for (var _b = __values$2(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pair = _c.value;
                    if (index === pos)
                        return pair;
                    ++index;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            throw new Error("unknown Error");
        };
        var _lowerBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult === 0)
                return curNode;
            if (cmpResult < 0)
                return _lowerBound(curNode.rightChild, key);
            var resNode = _lowerBound(curNode.leftChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.lowerBound = function (key) {
            var resNode = _lowerBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _upperBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult <= 0)
                return _upperBound(curNode.rightChild, key);
            var resNode = _upperBound(curNode.leftChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.upperBound = function (key) {
            var resNode = _upperBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _reverseLowerBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult === 0)
                return curNode;
            if (cmpResult > 0)
                return _reverseLowerBound(curNode.leftChild, key);
            var resNode = _reverseLowerBound(curNode.rightChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.reverseLowerBound = function (key) {
            var resNode = _reverseLowerBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var _reverseUpperBound = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(curNode.key, key);
            if (cmpResult >= 0)
                return _reverseUpperBound(curNode.leftChild, key);
            var resNode = _reverseUpperBound(curNode.rightChild, key);
            if (resNode === undefined)
                return curNode;
            return resNode;
        };
        this.reverseUpperBound = function (key) {
            var resNode = _reverseUpperBound(root, key);
            return resNode === undefined ? this.end() : new TreeIterator(resNode, header);
        };
        var eraseNodeSelfBalance = function (curNode) {
            var parentNode = curNode.parent;
            if (!parentNode || parentNode === header) {
                if (curNode === root)
                    return;
                throw new Error("unknown error");
            }
            if (curNode.color === TreeNode.TreeNodeColorType.red) {
                curNode.color = TreeNode.TreeNodeColorType.black;
                return;
            }
            var brotherNode = curNode.brother;
            if (!brotherNode)
                throw new Error("unknown error");
            if (curNode === parentNode.leftChild) {
                if (brotherNode.color === TreeNode.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode.TreeNodeColorType.black;
                    parentNode.color = TreeNode.TreeNodeColorType.red;
                    var newRoot = parentNode.rotateLeft();
                    if (root === parentNode) {
                        root = newRoot;
                        header.parent = root;
                        root.parent = header;
                    }
                    eraseNodeSelfBalance(curNode);
                }
                else if (brotherNode.color === TreeNode.TreeNodeColorType.black) {
                    if (brotherNode.rightChild && brotherNode.rightChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = parentNode.color;
                        parentNode.color = TreeNode.TreeNodeColorType.black;
                        if (brotherNode.rightChild)
                            brotherNode.rightChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = parentNode.rotateLeft();
                        if (root === parentNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        curNode.color = TreeNode.TreeNodeColorType.black;
                    }
                    else if ((!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black) && brotherNode.leftChild && brotherNode.leftChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        if (brotherNode.leftChild)
                            brotherNode.leftChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = brotherNode.rotateRight();
                        if (root === brotherNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        eraseNodeSelfBalance(curNode);
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black)) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        eraseNodeSelfBalance(parentNode);
                    }
                }
            }
            else if (curNode === parentNode.rightChild) {
                if (brotherNode.color === TreeNode.TreeNodeColorType.red) {
                    brotherNode.color = TreeNode.TreeNodeColorType.black;
                    parentNode.color = TreeNode.TreeNodeColorType.red;
                    var newRoot = parentNode.rotateRight();
                    if (root === parentNode) {
                        root = newRoot;
                        header.parent = root;
                        root.parent = header;
                    }
                    eraseNodeSelfBalance(curNode);
                }
                else if (brotherNode.color === TreeNode.TreeNodeColorType.black) {
                    if (brotherNode.leftChild && brotherNode.leftChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = parentNode.color;
                        parentNode.color = TreeNode.TreeNodeColorType.black;
                        if (brotherNode.leftChild)
                            brotherNode.leftChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = parentNode.rotateRight();
                        if (root === parentNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        curNode.color = TreeNode.TreeNodeColorType.black;
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && brotherNode.rightChild && brotherNode.rightChild.color === TreeNode.TreeNodeColorType.red) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        if (brotherNode.rightChild)
                            brotherNode.rightChild.color = TreeNode.TreeNodeColorType.black;
                        var newRoot = brotherNode.rotateLeft();
                        if (root === brotherNode) {
                            root = newRoot;
                            header.parent = root;
                            root.parent = header;
                        }
                        eraseNodeSelfBalance(curNode);
                    }
                    else if ((!brotherNode.leftChild || brotherNode.leftChild.color === TreeNode.TreeNodeColorType.black) && (!brotherNode.rightChild || brotherNode.rightChild.color === TreeNode.TreeNodeColorType.black)) {
                        brotherNode.color = TreeNode.TreeNodeColorType.red;
                        eraseNodeSelfBalance(parentNode);
                    }
                }
            }
        };
        var eraseNode = function (curNode) {
            var _a, _b, _c, _d, _e, _f;
            var swapNode = curNode;
            while (swapNode.leftChild || swapNode.rightChild) {
                if (swapNode.rightChild) {
                    swapNode = findSubTreeMinNode(swapNode.rightChild);
                    var tmpKey = curNode.key;
                    curNode.key = swapNode.key;
                    swapNode.key = tmpKey;
                    var tmpValue = curNode.value;
                    curNode.value = swapNode.value;
                    swapNode.value = tmpValue;
                    curNode = swapNode;
                }
                if (swapNode.leftChild) {
                    swapNode = findSubTreeMaxNode(swapNode.leftChild);
                    var tmpKey = curNode.key;
                    curNode.key = swapNode.key;
                    swapNode.key = tmpKey;
                    var tmpValue = curNode.value;
                    curNode.value = swapNode.value;
                    swapNode.value = tmpValue;
                    curNode = swapNode;
                }
            }
            if (swapNode.key === undefined)
                throw new Error("unknown error");
            if (header.leftChild && header.leftChild.key !== undefined && cmp(header.leftChild.key, swapNode.key) === 0) {
                if (header.leftChild !== root)
                    header.leftChild = (_a = header.leftChild) === null || _a === void 0 ? void 0 : _a.parent;
                else if ((_b = header.leftChild) === null || _b === void 0 ? void 0 : _b.rightChild)
                    header.leftChild = (_c = header.leftChild) === null || _c === void 0 ? void 0 : _c.rightChild;
                else
                    header.leftChild = undefined;
            }
            if (header.rightChild && header.rightChild.key !== undefined && cmp(header.rightChild.key, swapNode.key) === 0) {
                if (header.rightChild !== root)
                    header.rightChild = (_d = header.rightChild) === null || _d === void 0 ? void 0 : _d.parent;
                else if ((_e = header.rightChild) === null || _e === void 0 ? void 0 : _e.leftChild)
                    header.rightChild = (_f = header.rightChild) === null || _f === void 0 ? void 0 : _f.leftChild;
                else
                    header.rightChild = undefined;
            }
            eraseNodeSelfBalance(swapNode);
            if (swapNode)
                swapNode.remove();
            --len;
            root.color = TreeNode.TreeNodeColorType.black;
        };
        var inOrderTraversal = function (curNode, callback) {
            if (!curNode || curNode.key === undefined)
                return false;
            var ifReturn = inOrderTraversal(curNode.leftChild, callback);
            if (ifReturn)
                return true;
            if (callback(curNode))
                return true;
            return inOrderTraversal(curNode.rightChild, callback);
        };
        this.eraseElementByPos = function (pos) {
            if (pos < 0 || pos >= len)
                throw new Error("pos must more than 0 and less than set's size");
            var index = 0;
            inOrderTraversal(root, function (curNode) {
                if (pos === index) {
                    eraseNode(curNode);
                    return true;
                }
                ++index;
                return false;
            });
        };
        this.eraseElementByKey = function (key) {
            if (this.empty())
                return;
            var curNode = findElementPos(root, key);
            if (curNode === undefined || curNode.key === undefined || cmp(curNode.key, key) !== 0)
                return;
            eraseNode(curNode);
        };
        var findInsertPos = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                throw new Error("unknown error");
            var cmpResult = cmp(key, curNode.key);
            if (cmpResult < 0) {
                if (!curNode.leftChild) {
                    curNode.leftChild = new TreeNode();
                    curNode.leftChild.parent = curNode;
                    curNode.leftChild.brother = curNode.rightChild;
                    if (curNode.rightChild)
                        curNode.rightChild.brother = curNode.leftChild;
                    return curNode.leftChild;
                }
                return findInsertPos(curNode.leftChild, key);
            }
            else if (cmpResult > 0) {
                if (!curNode.rightChild) {
                    curNode.rightChild = new TreeNode();
                    curNode.rightChild.parent = curNode;
                    curNode.rightChild.brother = curNode.leftChild;
                    if (curNode.leftChild)
                        curNode.leftChild.brother = curNode.rightChild;
                    return curNode.rightChild;
                }
                return findInsertPos(curNode.rightChild, key);
            }
            return curNode;
        };
        var insertNodeSelfBalance = function (curNode) {
            var parentNode = curNode.parent;
            if (!parentNode || parentNode === header) {
                if (curNode === root)
                    return;
                throw new Error("unknown error");
            }
            if (parentNode.color === TreeNode.TreeNodeColorType.black)
                return;
            if (parentNode.color === TreeNode.TreeNodeColorType.red) {
                var uncleNode = parentNode.brother;
                var grandParent = parentNode.parent;
                if (!grandParent)
                    throw new Error("unknown error");
                if (uncleNode && uncleNode.color === TreeNode.TreeNodeColorType.red) {
                    uncleNode.color = parentNode.color = TreeNode.TreeNodeColorType.black;
                    grandParent.color = TreeNode.TreeNodeColorType.red;
                    insertNodeSelfBalance(grandParent);
                }
                else if (!uncleNode || uncleNode.color === TreeNode.TreeNodeColorType.black) {
                    if (parentNode === grandParent.leftChild) {
                        if (curNode === parentNode.leftChild) {
                            parentNode.color = TreeNode.TreeNodeColorType.black;
                            grandParent.color = TreeNode.TreeNodeColorType.red;
                            var newRoot = grandParent.rotateRight();
                            if (grandParent === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                        }
                        else if (curNode === parentNode.rightChild) {
                            var newRoot = parentNode.rotateLeft();
                            if (parentNode === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                            insertNodeSelfBalance(parentNode);
                        }
                    }
                    else if (parentNode === grandParent.rightChild) {
                        if (curNode === parentNode.leftChild) {
                            var newRoot = parentNode.rotateRight();
                            if (parentNode === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                            insertNodeSelfBalance(parentNode);
                        }
                        else if (curNode === parentNode.rightChild) {
                            parentNode.color = TreeNode.TreeNodeColorType.black;
                            grandParent.color = TreeNode.TreeNodeColorType.red;
                            var newRoot = grandParent.rotateLeft();
                            if (grandParent === root) {
                                root = newRoot;
                                header.parent = root;
                                root.parent = header;
                            }
                        }
                    }
                }
            }
        };
        this.setElement = function (key, value) {
            if (key === null || key === undefined) {
                throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            }
            if (value === null || value === undefined) {
                this.eraseElementByKey(key);
                return;
            }
            if (this.empty()) {
                ++len;
                root.key = key;
                root.value = value;
                root.color = TreeNode.TreeNodeColorType.black;
                header.leftChild = root;
                header.rightChild = root;
                return;
            }
            var curNode = findInsertPos(root, key);
            if (curNode.key !== undefined && cmp(curNode.key, key) === 0) {
                curNode.value = value;
                return;
            }
            ++len;
            curNode.key = key;
            curNode.value = value;
            if (header.leftChild === undefined || header.leftChild.key === undefined || cmp(header.leftChild.key, key) > 0) {
                header.leftChild = curNode;
            }
            if (header.rightChild === undefined || header.rightChild.key === undefined || cmp(header.rightChild.key, key) < 0) {
                header.rightChild = curNode;
            }
            insertNodeSelfBalance(curNode);
            root.color = TreeNode.TreeNodeColorType.black;
        };
        var findElementPos = function (curNode, key) {
            if (!curNode || curNode.key === undefined)
                return undefined;
            var cmpResult = cmp(key, curNode.key);
            if (cmpResult < 0)
                return findElementPos(curNode.leftChild, key);
            else if (cmpResult > 0)
                return findElementPos(curNode.rightChild, key);
            return curNode;
        };
        this.find = function (key) {
            var curNode = findElementPos(root, key);
            if (curNode === undefined || curNode.key === undefined)
                return this.end();
            return new TreeIterator(curNode, header);
        };
        this.getElementByKey = function (key) {
            var curNode = findElementPos(root, key);
            if ((curNode === null || curNode === void 0 ? void 0 : curNode.key) === undefined || (curNode === null || curNode === void 0 ? void 0 : curNode.value) === undefined)
                throw new Error("unknown error");
            return curNode.value;
        };
        // waiting for optimization, this is O(mlog(n+m)) algorithm now, but we expect it to be O(mlog(n/m+1)).
        // (https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Set_operations_and_bulk_operations)
        this.union = function (other) {
            var _this = this;
            other.forEach(function (_a) {
                var key = _a.key, value = _a.value;
                return _this.setElement(key, value);
            });
        };
        this.getHeight = function () {
            if (this.empty())
                return 0;
            var traversal = function (curNode) {
                if (!curNode)
                    return 1;
                return Math.max(traversal(curNode.leftChild), traversal(curNode.rightChild)) + 1;
            };
            return traversal(root);
        };
        if (typeof Symbol.iterator === 'symbol') {
            var iterationFunc_1 = function (curNode) {
                return __generator$2(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!curNode || curNode.key === undefined || curNode.value === undefined)
                                return [2 /*return*/];
                            return [5 /*yield**/, __values$2(iterationFunc_1(curNode.leftChild))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, { key: curNode.key, value: curNode.value }];
                        case 2:
                            _a.sent();
                            return [5 /*yield**/, __values$2(iterationFunc_1(curNode.rightChild))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            };
            this[Symbol.iterator] = function () {
                return iterationFunc_1(root);
            };
        }
        container.forEach(function (_a) {
            var key = _a.key, value = _a.value;
            return _this.setElement(key, value);
        });
    }

    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var __values$1 = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    HashSet.initSize = (1 << 4);
    HashSet.maxSize = (1 << 30);
    HashSet.sigma = 0.75; // default load factor
    HashSet.treeifyThreshold = 8;
    HashSet.untreeifyThreshold = 6;
    HashSet.minTreeifySize = 64;
    function HashSet(container, initBucketNum, hashFunc) {
        var _this = this;
        if (container === void 0) { container = []; }
        if (initBucketNum === void 0) { initBucketNum = HashSet.initSize; }
        hashFunc = hashFunc || (function (x) {
            var hashCode = 0;
            var str = '';
            if (typeof x === "number") {
                hashCode = Math.floor(x);
                hashCode = ((hashCode << 5) - hashCode);
                hashCode = hashCode & hashCode;
            }
            else {
                if (typeof x !== "string") {
                    str = JSON.stringify(x);
                }
                else
                    str = x;
                for (var i = 0; i < str.length; i++) {
                    var character = str.charCodeAt(i);
                    hashCode = ((hashCode << 5) - hashCode) + character;
                    hashCode = hashCode & hashCode;
                }
            }
            hashCode ^= (hashCode >>> 16);
            return hashCode;
        });
        if ((initBucketNum & (initBucketNum - 1)) !== 0) {
            throw new Error("initBucketNum must be 2 to the power of n");
        }
        var len = 0;
        var hashTable = [];
        var bucketNum = Math.max(HashSet.initSize, Math.min(HashSet.maxSize, initBucketNum));
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            bucketNum = initBucketNum;
            hashTable = [];
        };
        this.forEach = function (callback) {
            var index = 0;
            hashTable.forEach(function (container) {
                container.forEach(function (element) {
                    callback(element, index++);
                });
            });
        };
        var reAllocate = function (originalBucketNum) {
            if (originalBucketNum >= HashSet.maxSize)
                return;
            bucketNum = originalBucketNum * 2;
            var newHashTable = [];
            hashTable.forEach(function (container, index) {
                if (container.empty())
                    return;
                if (container instanceof LinkList && container.size() === 1) {
                    var element = container.front();
                    if (element === undefined)
                        throw new Error("unknown error");
                    newHashTable[hashFunc(element) & (bucketNum - 1)] = new LinkList([element]);
                }
                else if (container instanceof Set) {
                    var lowList_1 = new LinkList();
                    var highList_1 = new LinkList();
                    container.forEach(function (element) {
                        var hashCode = hashFunc(element);
                        if ((hashCode & originalBucketNum) === 0) {
                            lowList_1.pushBack(element);
                        }
                        else
                            highList_1.pushBack(element);
                    });
                    if (lowList_1.size() > HashSet.untreeifyThreshold)
                        newHashTable[index] = new Set(lowList_1);
                    else if (lowList_1.size())
                        newHashTable[index] = lowList_1;
                    if (highList_1.size() > HashSet.untreeifyThreshold)
                        newHashTable[index + originalBucketNum] = new Set(highList_1);
                    else if (highList_1.size())
                        newHashTable[index + originalBucketNum] = highList_1;
                }
                else {
                    var lowList_2 = new LinkList();
                    var highList_2 = new LinkList();
                    container.forEach(function (element) {
                        var hashCode = hashFunc(element);
                        if ((hashCode & originalBucketNum) === 0) {
                            lowList_2.pushBack(element);
                        }
                        else
                            highList_2.pushBack(element);
                    });
                    if (lowList_2.size())
                        newHashTable[index] = lowList_2;
                    if (highList_2.size())
                        newHashTable[index + originalBucketNum] = highList_2;
                }
                hashTable[index].clear();
            });
            hashTable = newHashTable;
        };
        this.insert = function (element) {
            if (element === null || element === undefined) {
                throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            }
            var index = hashFunc(element) & (bucketNum - 1);
            if (!hashTable[index]) {
                hashTable[index] = new LinkList([element]);
                ++len;
            }
            else {
                var preSize = hashTable[index].size();
                if (hashTable[index] instanceof LinkList) {
                    if (!hashTable[index].find(element).equals(hashTable[index].end()))
                        return;
                    hashTable[index].pushBack(element);
                    if (hashTable[index].size() >= HashSet.treeifyThreshold) {
                        hashTable[index] = new Set(hashTable[index]);
                    }
                }
                else
                    hashTable[index].insert(element);
                var curSize = hashTable[index].size();
                len += curSize - preSize;
            }
            if (len > bucketNum * HashSet.sigma) {
                reAllocate.call(this, bucketNum);
            }
        };
        this.eraseElementByValue = function (element) {
            var index = hashFunc(element) & (bucketNum - 1);
            if (!hashTable[index])
                return;
            var preSize = hashTable[index].size();
            hashTable[index].eraseElementByValue(element);
            if (hashTable[index] instanceof Set) {
                if (hashTable[index].size() <= HashSet.untreeifyThreshold) {
                    hashTable[index] = new LinkList(hashTable[index]);
                }
            }
            var curSize = hashTable[index].size();
            len += curSize - preSize;
        };
        this.find = function (element) {
            var index = hashFunc(element) & (bucketNum - 1);
            if (!hashTable[index])
                return false;
            return !hashTable[index].find(element).equals(hashTable[index].end());
        };
        if (typeof Symbol.iterator === 'symbol') {
            this[Symbol.iterator] = function () {
                return (function () {
                    var index, _a, _b, element, e_1_1;
                    var e_1, _c;
                    return __generator$1(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                index = 0;
                                _d.label = 1;
                            case 1:
                                if (!(index < bucketNum)) return [3 /*break*/, 10];
                                while (index < bucketNum && !hashTable[index])
                                    ++index;
                                if (index >= bucketNum)
                                    return [3 /*break*/, 10];
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 7, 8, 9]);
                                _a = (e_1 = void 0, __values$1(hashTable[index])), _b = _a.next();
                                _d.label = 3;
                            case 3:
                                if (!!_b.done) return [3 /*break*/, 6];
                                element = _b.value;
                                return [4 /*yield*/, element];
                            case 4:
                                _d.sent();
                                _d.label = 5;
                            case 5:
                                _b = _a.next();
                                return [3 /*break*/, 3];
                            case 6: return [3 /*break*/, 9];
                            case 7:
                                e_1_1 = _d.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 9];
                            case 8:
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_1) throw e_1.error; }
                                return [7 /*endfinally*/];
                            case 9:
                                ++index;
                                return [3 /*break*/, 1];
                            case 10: return [2 /*return*/];
                        }
                    });
                })();
            };
        }
        container.forEach(function (element) { return _this.insert(element); });
    }

    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
    var __values = (undefined && undefined.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    HashMap.initSize = (1 << 4);
    HashMap.maxSize = (1 << 30);
    HashMap.sigma = 0.75; // default load factor
    HashMap.treeifyThreshold = 8;
    HashMap.untreeifyThreshold = 6;
    HashMap.minTreeifySize = 64;
    function HashMap(container, initBucketNum, hashFunc) {
        var _this = this;
        if (container === void 0) { container = []; }
        if (initBucketNum === void 0) { initBucketNum = HashMap.initSize; }
        hashFunc = hashFunc || (function (x) {
            var e_1, _a;
            var hashCode = 0;
            var str = '';
            if (typeof x === "number") {
                hashCode = Math.floor(x);
                hashCode = ((hashCode << 5) - hashCode);
                hashCode = hashCode & hashCode;
            }
            else {
                if (typeof x !== "string") {
                    str = JSON.stringify(x);
                }
                else
                    str = x;
                try {
                    for (var str_1 = __values(str), str_1_1 = str_1.next(); !str_1_1.done; str_1_1 = str_1.next()) {
                        var ch = str_1_1.value;
                        var character = ch.charCodeAt(0);
                        hashCode = ((hashCode << 5) - hashCode) + character;
                        hashCode = hashCode & hashCode;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (str_1_1 && !str_1_1.done && (_a = str_1.return)) _a.call(str_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            hashCode ^= (hashCode >>> 16);
            return hashCode;
        });
        if ((initBucketNum & (initBucketNum - 1)) !== 0) {
            throw new Error("initBucketNum must be 2 to the power of n");
        }
        var len = 0;
        var hashTable = [];
        var bucketNum = Math.max(HashMap.initSize, Math.min(HashMap.maxSize, initBucketNum));
        this.size = function () {
            return len;
        };
        this.empty = function () {
            return len === 0;
        };
        this.clear = function () {
            len = 0;
            bucketNum = initBucketNum;
            hashTable = [];
        };
        this.forEach = function (callback) {
            var index = 0;
            hashTable.forEach(function (container) {
                container.forEach(function (element) {
                    callback(element, index++);
                });
            });
        };
        var reAllocate = function (originalBucketNum) {
            if (originalBucketNum >= HashMap.maxSize)
                return;
            bucketNum = originalBucketNum * 2;
            var newHashTable = [];
            hashTable.forEach(function (container, index) {
                if (container.empty())
                    return;
                if (container instanceof LinkList && container.size() === 1) {
                    var pair = container.front();
                    if (pair !== undefined) {
                        var key = pair.key, value = pair.value;
                        newHashTable[hashFunc(key) & (bucketNum - 1)] = new LinkList([{
                                key: key,
                                value: value
                            }]);
                    }
                }
                else if (container instanceof Map) {
                    var lowList_1 = new LinkList();
                    var highList_1 = new LinkList();
                    container.forEach(function (pair) {
                        var hashCode = hashFunc(pair.key);
                        if ((hashCode & originalBucketNum) === 0) {
                            lowList_1.pushBack(pair);
                        }
                        else
                            highList_1.pushBack(pair);
                    });
                    if (lowList_1.size() > HashMap.untreeifyThreshold)
                        newHashTable[index] = new Map(lowList_1);
                    else if (lowList_1.size())
                        newHashTable[index] = lowList_1;
                    if (highList_1.size() > HashMap.untreeifyThreshold)
                        newHashTable[index + originalBucketNum] = new Map(highList_1);
                    else if (highList_1.size())
                        newHashTable[index + originalBucketNum] = highList_1;
                }
                else {
                    var lowList_2 = new LinkList();
                    var highList_2 = new LinkList();
                    container.forEach(function (pair) {
                        var hashCode = hashFunc(pair.key);
                        if ((hashCode & originalBucketNum) === 0) {
                            lowList_2.pushBack(pair);
                        }
                        else
                            highList_2.pushBack(pair);
                    });
                    if (lowList_2.size())
                        newHashTable[index] = lowList_2;
                    if (highList_2.size())
                        newHashTable[index + originalBucketNum] = highList_2;
                }
                hashTable[index].clear();
            });
            hashTable = newHashTable;
        };
        this.setElement = function (key, value) {
            var e_2, _a;
            if (key === null || key === undefined) {
                throw new Error("to avoid some unnecessary errors, we don't suggest you insert null or undefined here");
            }
            if (value === null || value === undefined) {
                this.eraseElementByKey(key);
                return;
            }
            var index = hashFunc(key) & (bucketNum - 1);
            if (!hashTable[index]) {
                ++len;
                hashTable[index] = new LinkList([{ key: key, value: value }]);
            }
            else {
                var preSize = hashTable[index].size();
                if (hashTable[index] instanceof LinkList) {
                    try {
                        for (var _b = __values(hashTable[index]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var pair = _c.value;
                            if (pair.key === key) {
                                pair.value = value;
                                return;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    hashTable[index].pushBack({
                        key: key,
                        value: value,
                    });
                    if (hashTable[index].size() >= HashMap.treeifyThreshold) {
                        hashTable[index] = new Map(hashTable[index]);
                    }
                }
                else
                    hashTable[index].setElement(key, value);
                var curSize = hashTable[index].size();
                len += curSize - preSize;
            }
            if (len > bucketNum * HashMap.sigma) {
                reAllocate.call(this, bucketNum);
            }
        };
        this.getElementByKey = function (key) {
            var e_3, _a;
            var index = hashFunc(key) & (bucketNum - 1);
            if (!hashTable[index])
                return undefined;
            if (hashTable[index] instanceof Map)
                return hashTable[index].getElementByKey(key);
            else {
                try {
                    for (var _b = __values(hashTable[index]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var pair = _c.value;
                        if (pair.key === key)
                            return pair.value;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return undefined;
            }
        };
        this.eraseElementByKey = function (key) {
            var e_4, _a;
            var index = hashFunc(key) & (bucketNum - 1);
            if (!hashTable[index])
                return;
            var preSize = hashTable[index].size();
            if (hashTable[index] instanceof Map) {
                hashTable[index].eraseElementByKey(key);
                if (hashTable[index].size() <= HashMap.untreeifyThreshold) {
                    hashTable[index] = new LinkList(hashTable[index]);
                }
            }
            else {
                var pos = -1;
                try {
                    for (var _b = __values(hashTable[index]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var pair = _c.value;
                        ++pos;
                        if (pair.key === key) {
                            hashTable[index].eraseElementByPos(pos);
                            break;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            var curSize = hashTable[index].size();
            len += curSize - preSize;
        };
        this.find = function (key) {
            var e_5, _a;
            var index = hashFunc(key) & (bucketNum - 1);
            if (!hashTable[index])
                return false;
            if (hashTable[index] instanceof Map)
                return !hashTable[index].find(key).equals(hashTable[index].end());
            try {
                for (var _b = __values(hashTable[index]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var pair = _c.value;
                    if (pair.key === key)
                        return true;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return false;
        };
        if (typeof Symbol.iterator === 'symbol') {
            this[Symbol.iterator] = function () {
                return (function () {
                    var index, _a, _b, pair, e_6_1;
                    var e_6, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                index = 0;
                                _d.label = 1;
                            case 1:
                                if (!(index < bucketNum)) return [3 /*break*/, 10];
                                while (index < bucketNum && !hashTable[index])
                                    ++index;
                                if (index >= bucketNum)
                                    return [3 /*break*/, 10];
                                _d.label = 2;
                            case 2:
                                _d.trys.push([2, 7, 8, 9]);
                                _a = (e_6 = void 0, __values(hashTable[index])), _b = _a.next();
                                _d.label = 3;
                            case 3:
                                if (!!_b.done) return [3 /*break*/, 6];
                                pair = _b.value;
                                return [4 /*yield*/, pair];
                            case 4:
                                _d.sent();
                                _d.label = 5;
                            case 5:
                                _b = _a.next();
                                return [3 /*break*/, 3];
                            case 6: return [3 /*break*/, 9];
                            case 7:
                                e_6_1 = _d.sent();
                                e_6 = { error: e_6_1 };
                                return [3 /*break*/, 9];
                            case 8:
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_6) throw e_6.error; }
                                return [7 /*endfinally*/];
                            case 9:
                                ++index;
                                return [3 /*break*/, 1];
                            case 10: return [2 /*return*/];
                        }
                    });
                })();
            };
        }
        container.forEach(function (_a) {
            var key = _a.key, value = _a.value;
            return _this.setElement(key, value);
        });
    }

    if (typeof Symbol.iterator !== 'symbol') {
        console.warn("Your running environment does not support symbol type, you may can not use the 'for...of' syntax.");
    }

    exports.Deque = Deque;
    exports.HashMap = HashMap;
    exports.HashSet = HashSet;
    exports.LinkList = LinkList;
    exports.Map = Map;
    exports.PriorityQueue = PriorityQueue;
    exports.Queue = Queue;
    exports.Set = Set;
    exports.Stack = Stack;
    exports.Vector = Vector;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
