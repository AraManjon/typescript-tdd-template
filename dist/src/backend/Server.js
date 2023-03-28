"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor(port) {
        this.express = (0, express_1.default)();
        this.port = port;
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
            console.log('✋ Press CTRL-C to stop\n');
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map