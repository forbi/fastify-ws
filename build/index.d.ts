/// <reference types="node" />
import { FastifyPluginCallback } from "fastify";
import ws from "ws";
declare module "fastify" {
    interface FastifyInstance {
        ws: ws.Server;
    }
}
export interface WSOptions {
    library: "ws" | "uws";
    path?: string;
}
declare const _default: FastifyPluginCallback<WSOptions, import("http").Server>;
export default _default;
