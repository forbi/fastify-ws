import { FastifyPluginCallback, RawServerDefault } from "fastify";
import fastifyPlugin from "fastify-plugin";
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

const wsPlugin: FastifyPluginCallback<WSOptions> = function plugin(
  fastify,
  options,
  next
) {
  const lib = options.library || "ws";

  if (lib !== "ws" && lib !== "uws")
    next(new Error('Invalid "library" option'));

  const WebSocketServer: typeof ws.Server = require(lib).Server;

  type WsOptions = {
    server: RawServerDefault;
    path?: string;
  };

  const wsOpts: WsOptions = {
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

export default fastifyPlugin(wsPlugin, {
  fastify: "3",
  name: "fastify-ws",
});
