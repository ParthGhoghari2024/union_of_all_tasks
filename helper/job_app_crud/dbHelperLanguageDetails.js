const con = require("../../db");

async function getOptionIdByname(name) {
	try {
		let query = `
    select oMId as id from option_master where optionVal='${name}'; `
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

async function insertLanguageDetails(values) {
	try {

		let langId = await getOptionIdByname(values[2]);
		let langLevel = await getOptionIdByname(values[4]);


		values[1] = langId[0].id;
		values[3] = langLevel[0].id;
		// console.log(values);

		let query = `insert into languageKnown(
        bDMId,
        langId,
        langName,
        langLevelId,
        langLevel) values (?)`
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


async function updateLanguageDetails(values, id) {
	try {

		let langId = await getOptionIdByname(values[4]);
		let langLevel = await getOptionIdByname(values[5]);


		values[0] = langId[0].id;
		values[2] = langLevel[0].id;

		let query = `update languageKnown set langId=?,langName=?,langLevelId=?,langLevel=? where bDMId=${id} and langId='${values[0]}' and langLevelId='${values[2]}'`;

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



async function selectLanguageDetails(id) {
	try {
		let query = `select * from languageKnown where bDMId=${id}`
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

async function reducedSelectLanguage(id) {
	try {

		let se = await selectLanguageDetails(id);
		se = se.reduce((prev, cur) => {
			if (typeof (prev.langId) === "number") {
				prev.langId = [prev.langId];
			} else {
				prev.langId.push(cur.langId);
			}
			if (typeof (prev.langName) === "string") {
				prev.langName = [prev.langName];
			} else {
				prev.langName.push(cur.langName);
			}
			if (typeof (prev.langLevelId) === "number") {
				prev.langLevelId = [prev.langLevelId];
			} else {
				prev.langLevelId.push(cur.langLevelId);
			}
			if (typeof (prev.langLevel) === "string") {
				prev.langLevel = [prev.langLevel];
			} else {
				prev.langLevel.push(cur.langLevel);
			}
			return prev;
		}, se[0])

		return se;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { insertLanguageDetails, selectLanguageDetails, reducedSelectLanguage, updateLanguageDetails };