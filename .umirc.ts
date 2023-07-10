import { defineConfig } from "umi";
export default defineConfig({
  npmClient: 'npm',
  archive: [{ source: "./output", destination: "./output/output.zip" }],
  plugins: [ require.resolve("./dist")],
  outputPath:"output"
});
