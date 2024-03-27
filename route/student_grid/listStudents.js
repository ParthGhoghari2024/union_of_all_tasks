const fs = require("fs");
const con = require("../../db");
const getStudentsData = require("../../helper/student_grid/getStudentsData");
const getStudentsRecordsCount = require("../../helper/student_grid/getStudentRecordCount");

async function listStudents(req, res) {
    try {
        var currentPageFromQuery = req.query.page ? Number(req.query.page) : 1;
        var totalRecord = await getStudentsRecordsCount();
        var recordsPerPage = Number(process.env.recordsPerPage);
        var totalPages = Math.ceil(totalRecord[0].count/recordsPerPage) ||   Number(process.env.totalPages);
        var orderByColumnName = req.query.order;
        if (!orderByColumnName || orderByColumnName === "id") {
            orderByColumnName = "stMId";
        }
        var ascQuery = req.query.asc || "asc";

        var offsetForStudentsData = (currentPageFromQuery - 1) * recordsPerPage;
        var limitForStudentsData = recordsPerPage;
        var studentsData = await getStudentsData(offsetForStudentsData, limitForStudentsData, orderByColumnName, ascQuery);
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