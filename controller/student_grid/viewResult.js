const getResultData = require("../../helper/student_grid/getResultData");
const getAttedanceByIdAndMonth = require("../../helper/student_grid/getAttedanceByIdAndMonth");
async function viewResult(req, res) {
	try {
		let id = req.query.id;

		let resultData = await getResultData(id);

		let AttedanceByIdAndMonth = await getAttedanceByIdAndMonth(id);
		// console.log(AttedanceByIdAndMonth);
		// console.log(resultData);
		res.render("student_grid/viewResult", {
			data: resultData,
			AttedanceByIdAndMonth: AttedanceByIdAndMonth
		})

	} catch (error) {
		console.log(error);
	}
}

module.exports = viewResult;
