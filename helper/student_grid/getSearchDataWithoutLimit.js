const con = require("../../db");

async function getSearchDataWithoutLimit(offset, limit, orderByColumnName, ascQuery, year, month, daysOfMonth, id, searchMoreQuery) {
	try {
		let startDate = `${year}-${month}-1`;
		// console.log(month);

		let endDate = `${year}-${month}-${daysOfMonth}`;
		// console.log(startDate,endDate);
		orderByColumnName === "percentage" ? orderByColumnName = "presentDays" : "";
		let getAllUser;
		if (searchMoreQuery.firstname || searchMoreQuery.lastname || searchMoreQuery.percentage || searchMoreQuery.presentdays) {
			getAllUser = ` select s.stMId as id ,
                concat(s.firstname," ", s.lastname) as name,
                count(*) as presentDays ,
                ROUND( (count(*)/${daysOfMonth})*100,2) as percentage from studentMaster as s  
                LEFT JOIN attendanceMaster as a on s.stMId=a.stMId 
                where  present="p" and (date between '${startDate}' and '${endDate} ')
                ${(searchMoreQuery.firstname) ? "and" : ""} 
                ${(searchMoreQuery.firstname && searchMoreQuery.lastname) ? "(" : ""}  
                ${searchMoreQuery.firstname ? 's.firstname like ' + "'%" + searchMoreQuery.firstname + "%'" : ""} 
                ${searchMoreQuery.lastname ? `${searchMoreQuery.andOr}   s.lastname like ` + "'%" + searchMoreQuery.lastname + "%'" : ""} 
                ${(searchMoreQuery.firstname && searchMoreQuery.lastname) ? ")" : ""}
                group by s.stMId ${searchMoreQuery.presentdays ? ' having presentDays=' + searchMoreQuery.presentdays : ""} 
                ${searchMoreQuery.percentage ? `${searchMoreQuery.presentdays == 0 ? 'having' : `${searchMoreQuery.andOr}`}  
                percentage= ` + searchMoreQuery.percentage : ""}  
                order by ${orderByColumnName} ${ascQuery}  `
		}
		// console.log(getAllUser);
		return new Promise((resolve, reject) => {
			con.query(getAllUser, (err, result, fields) => {
				if (err) return reject(err);
				else {
					return resolve(result);
				}
			})
		})
	} catch (error) {
		console.log(error);
	}
}
module.exports = getSearchDataWithoutLimit;
