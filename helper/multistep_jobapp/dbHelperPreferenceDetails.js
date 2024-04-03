const con = require("../../db");


async function insertPreferenceDetails(values) {
	try {

		let query = ` insert into preference(
        bDMId,
        preferedLocation,
        preferenceOrder,
        noticePeriod,
        expectedCTC,
        currentCTC,
        department) values (?)`
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

async function updatePreferenceDetails(values, id, prefId) {
	try {

		let query = ` update preference set preferedLocation=?,preferenceOrder=?,noticePeriod=?,expectedCTC=?,currentCTC=?,department=?  where prefId=${prefId}`
		// console.log(values);
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

async function selectPreferenceDetails(id) {
	try {

		let query = ` select * from preference where bDMId=${id}`
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


async function reducedSelectPreferenceDetails(id) {
	try {
		let se = await selectPreferenceDetails(id);
		se = se.reduce((p, c) => {
			if (typeof (p.prefId) === "number") {
				p.prefId = [p.prefId];
			} else {
				p.prefId.push(c.prefId);
			}
			if (typeof (p.preferedLocation) === "string") {
				p.preferedLocation = [p.preferedLocation];
			} else {
				p.preferedLocation.push(c.preferedLocation);
			}
			return p;
		}, se[0])

		return se;
	} catch (error) {
		console.log(error);
	}
}
module.exports = { insertPreferenceDetails, selectPreferenceDetails, reducedSelectPreferenceDetails, updatePreferenceDetails };