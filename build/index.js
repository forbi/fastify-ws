"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const wsPlugin = function plugin(fastify, options, next) {
    const lib = options.library || "ws";
    if (lib !== "ws" && lib !== "uws")
        next(new Error('Invalid "library" option'));
    const WebSocketServer = require(lib).Server;
    const wsOpts = {
        server: fastify.server,
    };
    if (options.path !== undefined) {
        wsOpts.path = options.path;
    }
    const webSocketInstance = new WebSocketServer(wsOpts);
    fastify.decorate("ws", webSocketInstance);
    fastify.addHook("onClose", (fastify, done) => fastify.ws.close(done));
    next();
};
exports.default = fastify_plugin_1.default(wsPlugin, {
    fastify: "3",
    name: "fastify-ws",
});
//# sourceMappingURL=index.js.map