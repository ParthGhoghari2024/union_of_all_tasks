const con = require("../../db");

async function insertWorkExpDetails(values) {
	try {
		// console.log(values);
		let query = `insert into workExperienceMaster(
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
	} catch (error) {
		console.log(error);
	}
}

async function updateWorkExpDetails(values, id, wEMId) {
	try {
		// console.log(values);
		let query = `update  workExperienceMaster set companyName=?,designation=?,fromDate=?,toDate=?  where  wEMId=${wEMId}`
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
async function selectWorkExpDetails(id) {
	try {
		let query = `select * from workExperienceMaster where bDMId=${id}`
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
async function reducedSelectWorkExpDetails(id) {
	try {
		let se = await selectWorkExpDetails(id);
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
	} catch (error) {
		console.log(error);
	}
}
module.exports = { insertWorkExpDetails, selectWorkExpDetails, reducedSelectWorkExpDetails, updateWorkExpDetails };