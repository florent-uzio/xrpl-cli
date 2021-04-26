import { RippleAPI } from "ripple-lib";
import figlet from "figlet";
import { CLI } from "./cli";

// const MAINNET_URL_WS = "wss://s1.ripple.com";
const TESTNET_URL_WS = "wss://s.altnet.rippletest.net/";

console.clear();

figlet("XRPL-CLI", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

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
