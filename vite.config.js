const { resolve } = require("path");
const { defineConfig } = require("vite");

import path from "path"

module.exports = defineConfig({
  base: "./",
  publicPath: process.env.NODE_ENV === "production" ? "/vite_vanilla/" : "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "assets": path.resolve(__dirname, "src/assets/"),
      "img": path.resolve(__dirname, "src/img"),
      "styles": path.resolve(__dirname, "src/styles/"),
      "pages": path.resolve(__dirname, "src/pages/"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        topic: resolve(__dirname, "topic.html"),
        cover: resolve(__dirname, "cover.html"),
        contact: resolve(__dirname, "contact.html"),
      },
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: (info) => {
          let type = info.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(type)) {
            type = "img";
          } else if (/ttf|eot|woff|woff2/i.test(type)) {
            type = "fonts"
          } else if (/mp4|webm|ogg/i.test(type)) {
            type = "video"
          } else if (/mp3|wav/i.test(type)) {
            type = "sound"
          }
          return `${type}/[name]-[hash].[ext]`;
        },
      },
    },
    cssCodeSplit: false,
  },
  cssPreprocessOptions: {
    scss: {
      // additionalData: '@import "./styles/variable.scss";',
    },
  },
  css: {
    devSourceMap: true,
  },
});
