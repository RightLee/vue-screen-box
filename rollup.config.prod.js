/*==========引入rollup打包插件(生产配置)==========*/
const path = require("path");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs")
const babel = require("rollup-plugin-babel");
const json = require("rollup-plugin-json");
const postcss = require("rollup-plugin-postcss");
const vue = require("rollup-plugin-vue");
const { terser } = require("rollup-plugin-terser");

const inputPath = path.resolve(__dirname, "./src/index.js");
const outpuUmdtPath = path.resolve(__dirname, "./dist/screen.box.min.js");
const outpuEstPath = path.resolve(__dirname, "./dist/screen.box.min.js");


module.exports = {
    input: inputPath,
    output: [
        {
            file: outpuUmdtPath,
            format: "umd",
            name: "screenData",
            globals: {
                vue: "Vue",
            },
        },
        {
            file: outpuEstPath,
            format: "es",
            name: "screenData",
            globals: {
                vue: "Vue",
            },
        },
    ],
    plugins:[
        vue(),
        resolve({ browser: true }),
        babel({ exclude: "node-modules/**" }),
        commonjs(),
        json(),
        terser(),
        postcss({
            plugins:[],
        }),
    ],
    external:["vue"],
}