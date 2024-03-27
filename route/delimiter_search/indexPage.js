const fs = require("fs");
const getSearchData = require("../../helper/delimiter_search/getSearchData");

async function homePage(req, res) {
    try {
        var searchQuery = req.query.search || "";
        // console.log(searchQuery);

        var spChar = [];

        for (let i = 0; i < searchQuery.length; i++) {
            if(searchQuery[i]==="_")spChar.push("firstname");
            if(searchQuery[i]==="^")spChar.push("lastname");
            if(searchQuery[i]==="$")spChar.push("email");
            if(searchQuery[i]==="{")spChar.push("email2");
            if(searchQuery[i]==="}")spChar.push("country");
            if(searchQuery[i]===":")spChar.push("city");
        }
       

        searchQuery = searchQuery.replace(/[_^${}:]/g, ',');
        // console.log(spChar, searchQuery);

        var queryValues = searchQuery.split(",");
        queryValues = queryValues.slice(1, queryValues.length)
        // console.log(queryValues);
        

        var queryObj = {};

        for (let i = 0; i < queryValues.length; i++) {
            if(queryObj[spChar[i]]){
                queryObj[spChar[i]].push( queryValues[i]);
            }else{
                queryObj[spChar[i]] = [queryValues[i]]
            }
        }

        for (const key in queryObj) {
            if (Object.hasOwnProperty.call(queryObj, key)) {
                console.log("--",queryObj[key].length);
                if(queryObj[key].length>1){
                    temp = "";
                    for (let i = 0; i < queryObj[key].length; i++) {
                        if(i==0){
                            temp += queryObj[key][i] + "%'";
                        }else if(i==queryObj[key].length-1){
                            temp +=  " or "+ key +" like '%"+ queryObj[key][i] ;
                        }else{
                            temp += "or "+  key+  " like '%" + queryObj[key][i] + "%'";
                        }
                    }

                    queryObj[key][0] = temp
                    queryObj[key] = queryObj[key].splice(0,1);
                }
            }
        }
        // console.log(queryObj);


        

        // var firstnameQuery = queryValues[spChar.indexOf("firstname")];

        // console.log(firstnameQuery);

        var searchData = await getSearchData(queryObj);
        res.render("delimiter_search/index", {
            data: searchData.result || [],
            metaData: searchData.fields || []
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = homePage;