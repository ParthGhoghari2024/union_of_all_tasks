const con = require("../../db");

async function getTotalAvailableStudentsResult() {
    try {
        let query = "select s.stMId as id,concat( s.firstname,' ', s.lastname)as name ,sum(r.pracOptainedMarks) as pracOptainedMarks ,sum(r.theoryOptainedMarks) theoryOptainedMarks ,sum(r.pracOptainedMarks+r.theoryOptainedMarks)as totalOptainedMarks from studentMaster as s left join  resultMaster as r on s.stMId=r.stMId where examId=1 group by s.stMId";
        return new Promise((resolve, reject) => {
            con.query(query, (err, result, fields) => {
                if (err) return reject(err);
                else {
                    // console.log(result);
                    return resolve(result.length);
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}

async function getTotalAvailableStudentsAttanance() {
    try {
        let query = " select s.stMId as id , concat(s.firstname,' ' , s.lastname) as name,count(*) as presentDays  from studentMaster as s  LEFT JOIN attendanceMaster as a on s.stMId=a.stMId where present='p' and (date between '2023-12-1' and '2023-12-31')        group by s.stMId";
        return new Promise((resolve, reject) => {
            con.query(query, (err, result, fields) => {
                if (err) return reject(err);
                else {
                    // console.log(result);
                    return resolve(result.length);
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getTotalAvailableStudentsResult, getTotalAvailableStudentsAttanance };
