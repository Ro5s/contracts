const shell = require("shelljs");

/* The environment variables are loaded in buidler.config.ts */
const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

module.exports = {
  istanbulReporter: ["html", "lcov"],
  onCompileComplete: async function (_config) {
    await run("typechain");
  },
  onIstanbulComplete: async function (_config) {
    /* We need to do this because solcover generates bespoke artifacts. */
    shell.rm("-rf", "./artifacts");
    shell.rm("-rf", "./typechain");
  },
  providerOptions: {
    /* https://github.com/trufflesuite/ganache-core/issues/515 */
    _chainId: 1337,
    /* 100 hundred million ETH */
    default_balance_ether: 100000000,
    mnemonic,
  },
  skipFiles: ["test"],
};
