"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return `Hello, I am ${this.name}`;
    }
    toPrimitive() {
        return { name: this.name };
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map