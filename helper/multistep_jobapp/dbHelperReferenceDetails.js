const con = require("../../db");


async function insertReferenceDetails(values) {

    var query = `insert into referenceContact(
        bDMId,
        name,
        contactNumber,
        relation) values (?)`
    // console.log(values);
    return new Promise((resolve, reject) => {
        con.query(query, [values], (err, result, fields) => {
            if (err) { console.log(err); return reject(err); }
            else return resolve(result);
        })
    })
}

async function updateReferenceDetails(values,id,refId) {

    var query = `update  referenceContact set name=?,contactNumber=?,relation=? where rCId=${refId}`
    // console.log(values);
    return new Promise((resolve, reject) => {
        con.query(query, values, (err, result, fields) => {
            if (err) { console.log(err); return reject(err); }
            else return resolve(result);
        })
    })
}

async function selectReferenceDetails(id) {

    var query = `select * from referenceContact where bDMId=${id}`;
    // console.log(values);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result, fields) => {
            if (err) { console.log(err); return reject(err); }
            else return resolve(result);
        })
    })
}
async function reducedSelectReferenceDetails(id) {
    var se = await selectReferenceDetails(id);
    // console.log(se);
    se = se.reduce((prev, cur) => {
        // console.log(prev, typeof (prev.name));
        if (typeof (prev.rCId) === "number") {
            prev.rCId = [prev.rCId];
        } else {
            prev.rCId.push(cur.rCId);
        }
        if (typeof (prev.name) === "string") {
            prev.name = [prev.name];
        } else {
            prev.name.push(cur.name);
        }
        if (typeof (prev.contactNumber) === "string") {
            prev.contactNumber = [prev.contactNumber];
        } else {
            prev.contactNumber.push(cur.contactNumber);
        }
        if (typeof (prev.relation) === "string") {
            prev.relation = [prev.relation];
        } else {
            prev.relation.push(cur.relation);
        }
        return prev;
    }, se[0])

    return se;
}
// console.log(se);
module.exports = { insertReferenceDetails, selectReferenceDetails ,reducedSelectReferenceDetails,updateReferenceDetails};