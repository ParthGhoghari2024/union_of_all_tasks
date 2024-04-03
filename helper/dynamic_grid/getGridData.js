const con = require("../../db");

async function getGridData(query) {
	try {
		return new Promise((resolve, reject) => {
			con.query(query, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve({ result, fields, len: result.length });
			})
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = getGridData;