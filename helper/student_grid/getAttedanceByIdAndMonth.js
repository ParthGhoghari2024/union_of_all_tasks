const con = require("../../db");

async function getAttedanceByIdAndMonth(id) {
	try {
		let getAttedanceByIdAndMonth = `select count(*) as presentDays , (select count(*) from attendanceMaster where stMId=${id})as totalDays  from attendanceMaster where present="p" and stMId=${id}`

		return new Promise((resolve, reject) => {
			con.query(getAttedanceByIdAndMonth, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = getAttedanceByIdAndMonth;