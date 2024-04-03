const con = require("../../db");

async function dataExistBybDMId(tablename, id) {
	// console.log(values);
	try {
		let query = `select * from ${tablename} where bDMId=${id}`
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

module.exports = { dataExistBybDMId }