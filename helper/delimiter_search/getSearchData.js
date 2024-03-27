const con = require("../../db");

async function getSearchData(queryObj) {
    var tempForAnd = Object.keys(queryObj).length - 1;
    console.log(tempForAnd);
    var getSearchData = `
    select stMId as id , firstname,lastname,email,email2,country,city 
    from studentMaster 
    
    ${tempForAnd >= 0 ? 'where' : '' } 

    ${queryObj.firstname ? ` ${queryObj.firstname[0].length > 1 ? "(" : ""}firstname like '%` + queryObj.firstname[0] + `%'${queryObj.firstname[0].length > 1 ? ")" : ""}  ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}  
    ${queryObj.lastname ? `${queryObj.lastname[0].length > 1 ? "(" : ""} lastname like '%` + queryObj.lastname[0] + `%' ${queryObj.firstname[0].length > 1 ? ")" : ""}   ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}  
    ${queryObj.email ? `${queryObj.email[0].length > 1 ? "(" : ""} email like '%` + queryObj.email[0] + `%' ${queryObj.email[0].length > 1 ? ")" : ""}   ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}  
    ${queryObj.email2 ? `${queryObj.email2[0].length > 1 ? "(" : ""} email2 like '%` + queryObj.email2[0] + `%'  ${queryObj.email2[0].length > 1 ? ")" : ""}  ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}  
    ${queryObj.country ? `${queryObj.country[0].length > 1 ? "(" : ""} country like '%` + queryObj.country[0] + `%' ${queryObj.country[0].length > 1 ? ")" : ""}   ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}  
    ${queryObj.city ? `${queryObj.city[0].length > 1 ? "(" : ""} city like '%` + queryObj.city[0] + `%' ${queryObj.city[0].length > 1 ? ")" : ""}  ${tempForAnd-- > 0 ? 'and' : ''} ` : ""}
    
    limit 100
    ;

   
    `;
    // console.log(getSearchData);
    return new Promise((resolve, reject) => {
        con.query(getSearchData, (err, result, fields) => {
            if (err) return reject(err);
            else return resolve({ result, fields });
        })
    })
}

module.exports = getSearchData;