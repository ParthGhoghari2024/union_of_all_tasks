const con = require("../../db");

async function getStudentsRecordsCount(offset, limit, orderByColumnName, ascQuery) {
    var getAllUser = `select count(*)as count from studentMaster`

    return new Promise((resolve, reject) => {
        con.query(getAllUser, (err, result, fields) => {
            if (err)return reject(err);
            else return resolve(result);
        })
    })
}

module.exports = getStudentsRecordsCount;