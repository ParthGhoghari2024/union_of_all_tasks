const con = require("../../db");

async function insertEducationDetails(values) {
	try {
		// console.log(values);
		let query = `insert into eduDetailsMaster(
    bDMId,
    eduType,
    boardOrCourseName,
    university,
    passingYear,
    percentage,
    name) values (?)`
		return new Promise((resolve, reject) => {
			// console.log(2);
			con.query(query, [values], (err, result, fields) => {
				if (err) { console.log(err); return reject(err) }
				else {
					// console.log(result);
					return resolve(result);
				}
			})
		})
	} catch (error) {
		console.log(error);
	}
}


async function updateEducationDetails(values, id, name) {
	try {
		// console.log(values);
		let query = `update  eduDetailsMaster set eduType=?,boardOrCourseName=?,university=?,passingYear=?,percentage=?,name=? where bDMId=${id} and name='${name}' `
		return new Promise((resolve, reject) => {
			// console.log(2);
			con.query(query, values, (err, result, fields) => {
				if (err) { console.log(err); return reject(err) }
				else {
					// console.log(result);
					return resolve(result);
				}
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function selectEducationDetails(id) {
	try {
		let query = `select * from eduDetailsMaster where bDMId=${id} `
		return new Promise((resolve, reject) => {
			con.query(query, (err, result, fields) => {
				if (err) { console.log(err); return reject(err) }
				else {
					// console.log(result);
					return resolve(result);
				}
			})
		})
	} catch (error) {
		console.log(error);
	}
}

async function reducedSelectEducationDetails(id) {
	try {
		let se = await selectEducationDetails(id);
		se = se.reduce((prev, cur) => {

			if (typeof (prev.eduType) === "string") {
				prev.eduType = [prev.eduType];
			} else {
				prev.eduType.push(cur.eduType);
			}
			if (typeof (prev.boardOrCourseName) === "string") {
				prev.boardOrCourseName = [prev.boardOrCourseName];
			} else {
				prev.boardOrCourseName.push(cur.boardOrCourseName);
			}
			if (typeof (prev.university) === "string") {
				prev.university = [prev.university];
			} else {
				prev.university.push(cur.university);
			}
			if (typeof (prev.passingYear) === "number") {
				prev.passingYear = [prev.passingYear];
			} else {
				prev.passingYear.push(cur.passingYear);
			}
			if (typeof (prev.percentage) === "number") {
				prev.percentage = [prev.percentage];
			} else {
				prev.percentage.push(cur.percentage);
			}
			if (typeof (prev.name) === "string") {
				prev.name = [prev.name];
			} else {
				prev.name.push(cur.name);
			}
			return prev;
		}, se[0])

		return se;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { insertEducationDetails, selectEducationDetails, reducedSelectEducationDetails, updateEducationDetails };