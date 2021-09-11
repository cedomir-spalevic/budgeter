/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from "fs";

const env = process.argv[2];
const config = require(`../config/${env}.json`);

const vars = Object.keys(config).map(key => `${key}=${config[key]}`).join("\n");

fs.writeFileSync(".env", vars);/* eslint-disable @typescript-eslint/no-var-requires */