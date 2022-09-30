"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const source_map_support_1 = __importDefault(require("source-map-support"));
const https_1 = require("https");
const fs_1 = require("fs");
const path_1 = require("path");
const standalone_1 = require("@adonisjs/core/build/standalone");
source_map_support_1.default.install({ handleUncaughtExceptions: false });
const privateKey = (0, fs_1.readFileSync)((0, path_1.join)(__dirname + '/ssl/server.key'), 'utf8');
const certificate = (0, fs_1.readFileSync)((0, path_1.join)(__dirname + '/ssl/server.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
new standalone_1.Ignitor(__dirname)
    .httpServer()
    .start((handle) => {
    return (0, https_1.createServer)(credentials, handle);
})
    .catch(console.error);
//# sourceMappingURL=server.js.map