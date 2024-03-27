const con = require("../../db");

async function getRowCountOfSelect(query) {
    var query = query;
    return new Promise((resolve, reject) => {
        con.query(query, (err, result, fields) => {
            if (err)return reject(err);
            else return  resolve( result.length);
        })
    })
}

module.exports = getRowCountOfSelect;