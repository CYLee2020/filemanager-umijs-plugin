"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filemanager_webpack_plugin_1 = __importDefault(require("filemanager-webpack-plugin"));
class FileManagerPlugin extends filemanager_webpack_plugin_1.default {
    context;
    logger;
    setContext(context) {
        this.context = context;
    }
    setLogger(logger) {
        this.logger = { log: logger.info, ...logger };
    }
}
exports.default = (api) => {
    api.describe({
        key: "archive",
        config: {
            schema(joi) {
                return joi
                    .array()
                    .items(joi.object({ source: joi.string(), destination: joi.string() }));
            },
        },
        enableBy: api.EnableBy.config,
    });
    api.onBuildHtmlComplete(async () => {
        const filemanager = new FileManagerPlugin({
            context: api.cwd,
            events: {
                onEnd: {
                    archive: api.config["archive"],
                },
            },
        });
        filemanager.setContext(api.cwd);
        filemanager.setLogger(api.logger);
        await filemanager?.execute("onEnd");
    });
};
