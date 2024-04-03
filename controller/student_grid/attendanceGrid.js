const getAttendanceGridData = require("../../helper/student_grid/getAttendanceGridData");
const getTotalAvailableStudents = require("../../helper/student_grid/getTotalAvailableStudents");
const getSearchDataWithoutLimit = require("../../helper/student_grid/getSearchDataWithoutLimit");

async function attendanceGrid(req, res) {
	try {
		let currentPageFromQuery = req.query.page ? Number(req.query.page) : 1;
		let recordsPerPage = 20;

		let totalStudents = await getTotalAvailableStudents.getTotalAvailableStudentsAttanance();
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
		let id = req.query.id;
		// console.log(id);
		if (id === "") id = undefined;//if user enters empty id show all records 
		if (isNaN(parseInt(id))) id = undefined;//if user enters invalid id show all records 
		let searchMoreQuery = {
			firstname: req.query.firstname || "",
			lastname: req.query.lastname || "",
			presentdays: req.query.presentdays || "",
			percentage: req.query.percentage || "",
			andOr: req.query.andOr || "",
		}
		let attendanceGridData = await getAttendanceGridData(offsetForStudentsData, limitForStudentsData, orderByColumnName, ascQuery, year, month, daysOfMonth, id, searchMoreQuery);
		if (searchMoreQuery.firstname || searchMoreQuery.lastname || searchMoreQuery.percentage || searchMoreQuery.presentdays) {
			tempResult = await getSearchDataWithoutLimit(offsetForStudentsData, limitForStudentsData, orderByColumnName, ascQuery, year, month, daysOfMonth, id, searchMoreQuery);
			totalPages = Math.ceil(tempResult.length / recordsPerPage);
		}

		res.render("student_grid/attendanceGrid", {
			data: attendanceGridData,
			currentPage: currentPageFromQuery,
			totalPages: totalPages,
			orderBy: orderByColumnName,
			ascQuery: ascQuery,
			daysOfMonth: daysOfMonth,
			searchMoreQuery: searchMoreQuery
		});

	} catch (error) {
		console.log(error);
	}
}

module.exports = attendanceGrid;