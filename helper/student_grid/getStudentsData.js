const con = require("../../db");

async function getStudentsData(offset, limit, orderByColumnName, ascQuery) {
    var getAllUser = `select * from studentMaster order by ${orderByColumnName} ${ascQuery} limit  ${offset},${limit} `; ``

    return new Promise((resolve, reject) => {
        con.query(getAllUser, (err, result, fields) => {
            if (err)return reject(err);
            else return resolve(result);
        })
    })
}

module.exports = getStudentsData;