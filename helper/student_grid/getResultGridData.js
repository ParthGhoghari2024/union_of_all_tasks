const con = require("../../db");

async function getResultGridData(offset, limit, orderByColumnName, ascQuery) {
    var resultData = {};
    // return Promise(async(resolve,reject)=>{
        var selectPrilimary = `select s.stMId as id,concat( s.firstname,' ', s.lastname)as name ,
        sum(r.pracOptainedMarks) as pracOptainedMarks ,sum(r.theoryOptainedMarks) theoryOptainedMarks ,sum(r.pracOptainedMarks+r.theoryOptainedMarks)as totalOptainedMarks from studentMaster as s
        left join  resultMaster as r on s.stMId=r.stMId
        where examId=1 group by s.stMId
        order by ${orderByColumnName} ${ascQuery}  limit  ${offset},${limit}; `
        var prilimaryData  = new Promise((resolve, reject) => {
            con.query(selectPrilimary, (err, result, fields) => {
                if (err)return reject(err);
                else {      
                    // console.log(1,result,result.length);
                    resolve(result);
                }
            })
        })  
        var selectTerminal = `select s.stMId as id,concat( s.firstname,' ', s.lastname)as name ,
        sum(r.pracOptainedMarks) as pracOptainedMarks ,sum(r.theoryOptainedMarks) theoryOptainedMarks ,sum(r.pracOptainedMarks+r.theoryOptainedMarks)as totalOptainedMarks from studentMaster as s
        left join  resultMaster as r on s.stMId=r.stMId
        where examId=2 group by s.stMId
        order by ${orderByColumnName} ${ascQuery}  limit  ${offset},${limit}; `
        var terminalData  = new Promise((resolve, reject) => {
            con.query(selectTerminal, (err, result, fields) => {
                if (err)return reject(err);
                else {      
                    // console.log(result);
                    resolve(result);
                }
            })
        })
        var selectFinal = `select s.stMId as id,concat( s.firstname,' ', s.lastname)as name ,
        sum(r.pracOptainedMarks) as pracOptainedMarks ,sum(r.theoryOptainedMarks) theoryOptainedMarks ,sum(r.pracOptainedMarks+r.theoryOptainedMarks)as totalOptainedMarks from studentMaster as s
        left join  resultMaster as r on s.stMId=r.stMId
        where examId=3 group by s.stMId
        order by ${orderByColumnName} ${ascQuery}  limit  ${offset},${limit}; `
        var finalData  = new Promise((resolve, reject) => {
            con.query(selectFinal, (err, result, fields) => {
                if (err)return reject(err);
                else {      
                    // console.log(result);
                    resolve(result);
                }
            })
        })

        resultData.prilimaryData = await prilimaryData;
        resultData.terminalData = await terminalData;
        resultData.finalData = await finalData;

        return resultData;



    // })
}

module.exports = getResultGridData;
