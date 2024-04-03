const con = require("../db");


async function insertLoginData(values) {
	try {
		var query = `insert into users_login(firstName,lastName,email,password,passwordSalt,activationToken,activationStatus) values (?)`
		return new Promise((resolve, reject) => {
			con.query(query, [values], (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function getLoginDataByUserEmail(email) {
	try {

		var query = `select  * from users_login where email=?`
		return new Promise((resolve, reject) => {
			con.query(query, email, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}

}
async function setActivationStatusByEmail(status, email) {
	try {

		var query = `update    users_login  set activationStatus=? where email=?`
		return new Promise((resolve, reject) => {
			con.query(query, [status, email], (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}

}
async function deleteLoginDataByUserEmail(email) {
	try {

		var query = `delete from users_login where email=?`
		return new Promise((resolve, reject) => {
			con.query(query, email, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}

}
async function updateActivationToken(values) {
	try {
		var query = `update users_login set activationToken=?,tokenGenerationTime=? where email=?`
		return new Promise((resolve, reject) => {
			con.query(query, values, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function updatePasswordByEmail(values) {
	try {
		var query = `update users_login set password=? where email=?`
		return new Promise((resolve, reject) => {
			con.query(query, values, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function getLoginDataByUserId(id) {
	try {

		var query = `select  * from users_login where userId=?`
		return new Promise((resolve, reject) => {
			con.query(query, id, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}

}


module.exports = { insertLoginData, getLoginDataByUserEmail, getLoginDataByUserId, setActivationStatusByEmail, deleteLoginDataByUserEmail, updateActivationToken, updatePasswordByEmail }