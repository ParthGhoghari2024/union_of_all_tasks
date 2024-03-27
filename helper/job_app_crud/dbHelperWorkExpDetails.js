const con = require("../../db");

async function insertWorkExpDetails(values) {
    console.log(values);
    var query = `insert into workExperienceMaster(
        bDMId,
        companyName,
        designation,
        fromDate,
        toDate) values (?)`
    return new Promise((resolve, reject) => {
        con.query(query, [values], (err, result, fields) => {
            if (err) return reject(err);
            else return resolve(result);
        })
    })
}

async function updateWorkExpDetails(values, id, wEMId) {
    console.log(values);
    var query = `update  workExperienceMaster set companyName=?,designation=?,fromDate=?,toDate=?  where  wEMId=${wEMId}`
    return new Promise((resolve, reject) => {
        con.query(query, values, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve(result);
        })
    })
}
async function selectWorkExpDetails(id) {
    var query = `select * from workExperienceMaster where bDMId=${id}`
    return new Promise((resolve, reject) => {
        con.query(query, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve(result);
        })
    })
}
async function reducedSelectWorkExpDetails(id) {
    var se = await selectWorkExpDetails(id);
    se = se.reduce((prev, cur) => {
        if (typeof (prev.wEMId) === "number") {
            prev.wEMId = [prev.wEMId];
        } else {
            prev.wEMId.push(cur.wEMId);
        }
        if (typeof (prev.companyName) === "string") {
            prev.companyName = [prev.companyName];
        } else {
            prev.companyName.push(cur.companyName);
        }
        if (typeof (prev.designation) === "string") {
            prev.designation = [prev.designation];
        } else {
            prev.designation.push(cur.designation);
        }
        if (!prev.fromDate.length) {
            prev.fromDate = [new Date(prev.fromDate).toLocaleDateString()];
        } else {
            prev.fromDate.push(new Date(cur.fromDate).toLocaleDateString());
        }
        if (!prev.toDate.length) {
            prev.toDate = [new Date(prev.toDate).toLocaleDateString()];
        } else {
            prev.toDate.push(new Date(cur.toDate).toLocaleDateString());
        }

        return prev;
    }, se[0])

    return se;
}
module.exports = { insertWorkExpDetails, selectWorkExpDetails, reducedSelectWorkExpDetails, updateWorkExpDetails };