const getTotalAvailableStudents = require("../../helper/student_grid/getTotalAvailableStudents");
const getResultGridData = require("../../helper/student_grid/getResultGridData");
async function resultGrid(req, res) {
	try {
		let currentPageFromQuery = req.query.page ? Number(req.query.page) : 1;
		let recordsPerPage = 20;

		let totalStudents = await getTotalAvailableStudents.getTotalAvailableStudentsResult();
		let totalPages = totalStudents / recordsPerPage;
		let orderByColumnName = req.query.order || "id";
		let ascQuery = req.query.asc || "asc";

		let offsetForStudentsData = (currentPageFromQuery - 1) * recordsPerPage;
		let limitForStudentsData = recordsPerPage;

		let queryDate = req.query.filterDate || "12,23";
		let month;
		let year;
		if (queryDate) {
			month = Number(queryDate.split(",")[0]);
			year = Number(queryDate.split(",")[1]);
		} else {
			month = 1;
			year = 2024;
		}

		var daysOfMonth = (month === 4 || month === 6 || month === 9 || month === 11) ? daysOfMonth = 30 : daysOfMonth = 31;
		if (month === 2) daysOfMonth = 28;
		let resultGridData = await getResultGridData(offsetForStudentsData, limitForStudentsData, orderByColumnName, ascQuery, year, month, daysOfMonth);
		// console.log("-", resultGridData.finalData.length);
		res.render("student_grid/resultGrid", {
			prilimaryData: resultGridData.prilimaryData,
			terminalData: resultGridData.terminalData,
			finalData: resultGridData.finalData,
			currentPage: currentPageFromQuery,
			totalPages: totalPages,
			orderBy: orderByColumnName,
			ascQuery: ascQuery,
			daysOfMonth: daysOfMonth,
		});



	} catch (error) {
		console.log(error);
	}
}

module.exports = resultGrid;
