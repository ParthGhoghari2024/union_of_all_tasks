const con = require("../../db");

async function insertBasicDetails(values) {
	try {
		// console.log(values);
		let query = `insert into basicDetailsMaster(firstName,lastName,designation,address1,address2,email,phoneNumber,city,gender,state,relationshipStatus,dob) values (?)`
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


async function updateBasicDetails(values, id) {
	try {
		let query = `update  basicDetailsMaster set firstName=?,lastName=?,designation=?,address1=?,address2=?,email=?,phoneNumber=?,city=?,gender=?,state=?,relationshipStatus=?,dob=? where bDMId=${id} `
		// console.log(query);
		// console.log([values[11]]);
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


async function selectBasicDetails(id) {
	try {
		let query = `select * from basicDetailsMaster where bDMId=${id}`;
		return new Promise((resolve, reject) => {
			con.query(query, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function gridDataOfBasicDetails() {
	try {
		let query = `select bDMId,firstname,lastname,email from basicDetailsMaster `;
		// console.log(query);
		return new Promise((resolve, reject) => {
			con.query(query, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve({ result, fields });
			})
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = { insertBasicDetails, updateBasicDetails, selectBasicDetails, gridDataOfBasicDetails };