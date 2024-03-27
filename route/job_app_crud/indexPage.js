const { gridDataOfBasicDetails } = require("../../helper/job_app_crud/dbHelperBasicDetails");

async function homePage(req, res) {
    try {
        var gridData = await gridDataOfBasicDetails();
        res.render("job_app_crud/index",{
            metaData : gridData.fields,
            data : gridData.result 
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = homePage;