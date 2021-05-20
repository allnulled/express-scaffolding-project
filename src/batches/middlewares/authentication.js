module.exports = function (tools) {
    return async function (request, response, next) {
        try {
            const sessionToken = request.headers.authorization || request.body.session_token || request.query.session_token;
            const sessionData = await this.utils.authenticate(sessionToken);
            request.$$authentication = { session: sessionData };
            return next();
        } catch (error) {
            return next();
        }
    };
}