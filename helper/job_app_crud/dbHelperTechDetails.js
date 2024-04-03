const con = require("../../db");


async function insertTechDetails(values) {
	try {

		let query = `insert into technologiesKnown(
        bDMId,
        technologyName,
        technologyLevel) values (?)`
		// console.log(values);
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


async function updateTechDetails(values, id) {
	try {

		let query = `update  technologiesKnown set technologyName=?,technologyLevel=? where bDMId=${id} and technologyName='${values[2]}'`
		// console.log(values);
		// console.log(query);

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

async function selectTechDetails(id) {
	try {

		let query = `select * from technologiesKnown where bDMId=${id} and technologyLevel!=''`
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
async function reducedSelectTechDetails(id) {
	try {
		let se = await selectTechDetails(id);
		se = se.reduce((prev, cur) => {

			if (typeof (prev.technologyName) === "string") {
				prev.technologyName = [prev.technologyName];
			} else {
				prev.technologyName.push(cur.technologyName);
			}
			if (typeof (prev.technologyLevel) === "string") {
				prev.technologyLevel = [prev.technologyLevel];
			} else {
				prev.technologyLevel.push(cur.technologyLevel);
			}
			return prev;
		}, se[0])

		return se;
	} catch (error) {
		console.log(error);
	}
}
// console.log(se);

module.exports = { insertTechDetails, selectTechDetails, reducedSelectTechDetails, updateTechDetails };