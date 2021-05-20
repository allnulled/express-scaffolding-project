const fs = require("fs");
const mysql = require("mysql");

module.exports = async function (tools) {
    try {
        const connection = await mysql.createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            multipleStatements: true,
        });
        if(process.env.NODE_ENV === "development") {
            await tools.utils.connectionQuery(connection, `DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME};`);
            await tools.utils.connectionQuery(connection, `CREATE DATABASE ${process.env.DATABASE_NAME};`);
            await tools.utils.connectionQuery(connection, `USE ${process.env.DATABASE_NAME};`);
            const initialScript = fs.readFileSync(__dirname + "/database.sql").toString();
            await tools.utils.connectionQuery(connection, initialScript);
        }
        const db = {};
        Object.assign(db, {
            connection,
            query(q) {
                console.log("[SQL:QUERY]");
                console.log(q);
                console.log("");
                return tools.utils.connectionQuery(connection, q);
            }
        });
        Object.assign(tools, { db });
    } catch (error) {
        console.error("Error on batches/database/index.js:", error);
        throw error;
    }
}