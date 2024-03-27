const getResultData = require("../../helper/student_grid/getResultData");
const getAttedanceByIdAndMonth = require("../../helper/student_grid/getAttedanceByIdAndMonth");
async function viewResult(req, res) {
    try {
        var id = req.query.id;

        var resultData = await getResultData(id);

        var AttedanceByIdAndMonth = await getAttedanceByIdAndMonth(id);
        // console.log(AttedanceByIdAndMonth);
        // console.log(resultData);
        res.render("student_grid/viewResult",{
            data : resultData,
            AttedanceByIdAndMonth : AttedanceByIdAndMonth
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = viewResult;
