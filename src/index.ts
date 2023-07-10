import { IApi } from "umi";
import FileManagerPluginDefault  from "filemanager-webpack-plugin";
class FileManagerPlugin extends FileManagerPluginDefault {
  context: string | undefined;
  logger: any;
  setContext(context: string) {
    this.context = context;
  }
  setLogger(logger: any) {
    this.logger = { log: logger.info, ...logger };
  }
}
export default (api: IApi) => {
  api.describe({
    key: "archive",
    config: {
      schema(joi) {
        return joi
          .array()
          .items(
            joi.object({ source: joi.string(), destination: joi.string() })
          );
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
    await (filemanager as any)?.execute("onEnd");
  });
};
