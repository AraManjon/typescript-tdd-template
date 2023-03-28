"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../../src/user/domain/entities/User"));
describe('User', () => {
    test('given a User with a name passed by contructor, when its called to sayHello method, should return a greeting message', () => {
        const name = 'Pepito';
        const user = new User_1.default(name);
        const expectedGreeting = 'Hello, I am Pepito';
        const greeting = user.sayHello();
        expect(greeting).toBe(expectedGreeting);
    });
});
//# sourceMappingURL=User.test.js.map