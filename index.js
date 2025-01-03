import { createServer } from "node:http";
import { grafserv } from "postgraphile/grafserv/node";
import { postgraphile } from "postgraphile";
import preset from "./graphile.config.js";

export const pgl = postgraphile(preset);
const serv = pgl.createServ(grafserv);

const server = createServer();
server.on("error", (e) => {
  console.error(e);
});

serv.addTo(server).catch((e) => {
  console.error(e);
  process.exit(1);
});

server.listen(5678);

console.log("Server listening at http://localhost:5678");

