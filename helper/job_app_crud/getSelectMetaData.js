const con = require("../../db");

async function getSelectMetaData(selectName) {
	try {
		let query = `select * from select_master as s
        left join option_master as o on s.sMId=o.sMId 
        where selectName='${selectName}' `
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

module.exports = getSelectMetaData;