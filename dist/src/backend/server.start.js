"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
try {
    new App_1.App().start();
}
catch (e) {
    console.log(e);
    process.exit(1);
}
process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
    process.exit(1);
});
//# sourceMappingURL=server.start.js.map