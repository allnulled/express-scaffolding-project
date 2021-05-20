module.exports = async function(sessionToken) {
    try {
        if(typeof sessionToken !== "string") {
            throw new Error("Invalid session token [0000478329678432101]");
        } else if (sessionToken.length !== 200) {
            throw new Error("Invalid session token [0000478329678432102]");
        }
        const sanitizedToken = this.utils.sanitize(sessionToken);
        const [sessionSelection] = await this.db.query(`
            SELECT
                * 
            FROM
                sesiones
            WHERE
                sesiones.token = ${sanitizedToken};
        `);
        if(sessionSelection.length === 0) {
            throw new Error("Invalid session token [0000478329678432103]");
        } else if (sessionSelection.length > 1) {
            throw new Error("Invalid session token due to anomalies [0000478329678432104]");
        }
        const [sessionData] = sessionSelection;
        return sessionData;
    } catch (error) {
        this.utils.error(error);
        throw error;
    }
}