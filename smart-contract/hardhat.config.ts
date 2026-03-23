import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// Try to load dotenv, but don't fail if it's not present (e.g. in CI)
try {
  require("dotenv").config();
} catch (e) {}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "cancun",
    },
  },
  networks: {
    hardhat: {
      chainId: 31337
    }
  }
};

export default config;
