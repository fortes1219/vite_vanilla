const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  base: "./",
  publicPath: process.env.NODE_ENV === "production" ? "/vite_vanilla/" : "./",
  resolve: {
    alias: {
      "/@/": resolve(__dirname, "./src/"),
      "/assets/": resolve(__dirname, "/src/assets/"),
      "/img/": resolve(__dirname, "/src/assets/img"),
      "/styles/": resolve(__dirname, "/src/styles/"),
      "/pages/": resolve(__dirname, "/src/pages/"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        topic: resolve(__dirname, "topic.html"),
        contact: resolve(__dirname, "contact.html"),
      },
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: (info) => {
          let type = info.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(type)) {
            type = "img";
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
