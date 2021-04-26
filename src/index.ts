import { RippleAPI } from "ripple-lib";
import { CLI } from "./cli";

const TESTNET_URL_WS = "wss://s1.ripple.com";

const api = new RippleAPI({
  server: TESTNET_URL_WS
});

async function start() {
  await api.connect();
}

async function index() {
  await start();

  new CLI(api);
}

index();
