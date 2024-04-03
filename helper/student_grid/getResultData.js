const con = require("../../db");

async function getResultData(id) {
	try {
		let getResultById = `select concat(s.firstname,' ',s.lastname)as name , r.stMId as id,su.subName,r.pracTotalMarks,r.pracOptainedMarks,r.theoryTotalMarks,r.theoryOptainedMarks,e.examName
        from resultMaster as r left join subjectMaster as su on su.suMId=r.suMId left join examMaster as e on e.eTId=r.examId left join studentMaster as s on s.stMId=r.stMId
        where r.stMId=${id} order by e.examName,su.subName ;    
        `

		return new Promise((resolve, reject) => {
			con.query(getResultById, (err, result, fields) => {
				if (err) return reject(err);
				else return resolve(result);
			})
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = getResultData;