const con = require("../../db");

async function insertBasicDetails(values) {
    // console.log(values);
    var query = `insert into basicDetailsMaster(firstName,lastName,designation,address1,address2,email,phoneNumber,city,gender,state,relationshipStatus,dob) values (?)`
    return new Promise((resolve, reject) => {
        con.query(query,[values], (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
}


async function updateBasicDetails(values,id) {
    var query = `update  basicDetailsMaster set firstName=?,lastName=?,designation=?,address1=?,address2=?,email=?,phoneNumber=?,city=?,gender=?,state=?,relationshipStatus=?,dob=? where bDMId=${id} `
    // console.log(query);
    // console.log([values[11]]);
    return new Promise((resolve, reject) => {
        con.query(query,values, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
}


async function selectBasicDetails(id) {
    var query = `select * from basicDetailsMaster where bDMId=${id}`;
    // console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
}

async function gridDataOfBasicDetails() {
    var query = `select bDMId,firstname,lastname,email from basicDetailsMaster `;
    // console.log(query);
    return new Promise((resolve, reject) => {
        con.query(query, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( {result,fields} );
        })
    })
}

module.exports = {insertBasicDetails,updateBasicDetails,selectBasicDetails,gridDataOfBasicDetails};