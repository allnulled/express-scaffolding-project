const fs = require("fs");
const path = require("path");

module.exports = async function(tools) {
    try {
        require("dotenv").config({ path: __dirname + "/.env" });
        require("dotenv").config({ path: __dirname + "/.env." + process.env.NODE_ENV });
        tools.configurations = {};
        tools.configurations.applicationURL = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`;
        const files = fs.readdirSync(__dirname);
        const utils = {};
        for(let index = 0; index < files.length; index++) {
            const file = files[index];
            if(file.endsWith(".js") && file != "index.js") {
                const modulePath = path.resolve(__dirname, file);
                const moduleName = file.replace(/(\.imm)?\.js/g, "").replace(/[-]./g, match => match.substr(1).toUpperCase());
                const moduleCrude = require(modulePath);
                let utilsModule = moduleCrude;
                if(file.endsWith(".imm.js")) {
                    utilsModule = moduleCrude.call(tools);
                } else if (typeof utilsModule === "function") {
                    utilsModule = utilsModule.bind(tools);
                }
                Object.assign(utils, { [moduleName]: utilsModule });
            }
        }
        Object.assign(tools, { utils });
    } catch (error) {
        console.error("Error on batches/utils/index.js:", error);
        throw error;
    }
}