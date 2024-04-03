const fs = require("fs");
const con = require("../../db");

function listAllStudents(req, res) {
	try {
		let getAllUser = "select * from studentMaster ";
		con.query(getAllUser, (err, result, fields) => {
			if (err) throw err;
			res.render("student_grid/listAllStudents", { students: result });
		})
	} catch (error) {
		console.log(error);
	}


}

module.exports = listAllStudents;