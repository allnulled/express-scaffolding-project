const express = require("express");
const app = express();

process.env.PROJECT_SRC = __dirname;

const runtime = async function(tools) {
    try {
        await require(__dirname + "/batches/utils/index.js")(tools);
        await require(__dirname + "/batches/setup/index.js")(tools);
        await require(__dirname + "/batches/database/index.js")(tools);
        await require(__dirname + "/batches/middlewares/index.js")(tools);
        await require(__dirname + "/batches/controllers/index.js")(tools);
        await require(__dirname + "/batches/run/index.js")(tools);
        return tools;
    } catch (error) {
        console.error("Error on index.js: ", error);
    }
}

module.exports = runtime({ app }).then(all => {
    console.log(`     ✓ App «${process.env.APP_ID}» successfully running!`);
    return all;
});





