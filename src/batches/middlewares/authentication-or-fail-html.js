module.exports = function (tools) {
    const { utils } = tools;
    return async function (request, response, next) {
        try {
            const sessionToken = request.headers.authorization || request.body.session_token || request.query.session_token;
            const sessionData = await utils.authenticate(sessionToken);
            request.$$authentication = { session: sessionData };
            return next();
        } catch (error) {
            const errorPage = await utils.renderPage(process.env.PROJECT_SRC + "/batches/templates/pages/error.ejs", {
                request,
                response,
                errorMessage: `(${error.name}) ${error.message}.`,
            });
            return response.send(errorPage);
        }
    };
}