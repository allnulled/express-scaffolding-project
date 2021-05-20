module.exports = function (tools) {
    try {
        Object.assign(tools, {
            middlewares: {
                logRequest: require(__dirname + "/log-request.js")(tools),
                bodyParser: require(__dirname + "/body-parser.js")(tools),
                authentication: require(__dirname + "/authentication.js")(tools),
                authenticationOrFailJson: require(__dirname + "/authentication-or-fail-json.js")(tools),
                authenticationOrFailHtml: require(__dirname + "/authentication-or-fail-html.js")(tools),
            }
        });
    } catch (error) {
        console.error("Error on batches/middlewares/index.js:", error);
        throw error;
    }
}