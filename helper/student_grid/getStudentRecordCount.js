const con = require("../../db");

async function getStudentsRecordsCount(offset, limit, orderByColumnName, ascQuery) {
	try {
		let getAllUser = `select count(*)as count from studentMaster`

		return new Promise((resolve, reject) => {
			con.query(getAllUser, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = getStudentsRecordsCount;