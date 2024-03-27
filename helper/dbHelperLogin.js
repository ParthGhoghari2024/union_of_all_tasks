const con = require("../db");


async function insertLoginData(values) {
    var query = `insert into users_login(firstName,lastName,email,password,passwordSalt,activationToken,activationStatus) values (?)`
        return new Promise((resolve, reject) => {
            con.query(query,[values], (err, result, fields) => {
                if (err) return reject(err);
                else return resolve( result );
            })
        })
}

async function getLoginDataByUserEmail(email) {

    var query = `select  * from users_login where email=?`
    return new Promise((resolve, reject) => {
        con.query(query,email, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
    
}
async function setActivationStatusByEmail(status,email) {

    var query = `update    users_login  set activationStatus=? where email=?`
    return new Promise((resolve, reject) => {
        con.query(query,[status,email], (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
    
}
async function deleteLoginDataByUserEmail(email) {

    var query = `delete from users_login where email=?`
    return new Promise((resolve, reject) => {
        con.query(query,email, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
    
}
async function updateActivationToken(values){
    var query = `update users_login set activationToken=?,tokenGenerationTime=? where email=?`
    return new Promise((resolve, reject) => {
        con.query(query,values, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
}

async function updatePasswordByEmail(values){
    var query = `update users_login set password=? where email=?`
    return new Promise((resolve, reject) => {
        con.query(query,values, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
}

async function getLoginDataByUserId(id) {

    var query = `select  * from users_login where userId=?`
    return new Promise((resolve, reject) => {
        con.query(query,id, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve( result );
        })
    })
    
}


module.exports={insertLoginData,getLoginDataByUserEmail,getLoginDataByUserId,setActivationStatusByEmail,deleteLoginDataByUserEmail,updateActivationToken,updatePasswordByEmail}