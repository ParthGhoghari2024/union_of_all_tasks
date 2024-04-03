const fs = require("fs");
const con = require("../../db");
const getStudentsData = require("../../helper/student_grid/getStudentsData");
const getStudentsRecordsCount = require("../../helper/student_grid/getStudentRecordCount");

async function listStudents(req, res) {
	try {
		let currentPageFromQuery = req.query.page ? Number(req.query.page) : 1;
		let totalRecord = await getStudentsRecordsCount();
		let recordsPerPage = Number(process.env.recordsPerPage);
		let totalPages = Math.ceil(totalRecord[0].count / recordsPerPage) || Number(process.env.totalPages);
		let orderByColumnName = req.query.order;
		if (!orderByColumnName || orderByColumnName === "id") {
			orderByColumnName = "stMId";
		}
		let ascQuery = req.query.asc || "asc";

		let offsetForStudentsData = (currentPageFromQuery - 1) * recordsPerPage;
		let limitForStudentsData = recordsPerPage;
		let studentsData = await getStudentsData(offsetForStudentsData, limitForStudentsData, orderByColumnName, ascQuery);
		res.render("student_grid/listStudents", {
			students: studentsData,
			currentPage: currentPageFromQuery,
			totalPages: totalPages,
			orderBy: orderByColumnName,
			ascQuery: ascQuery
		});

	} catch (error) {
		console.log(error);
	}
}

module.exports = listStudents;