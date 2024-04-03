const getGridData = require("../../helper/dynamic_grid/getGridData");
const getRowCountOfSelect = require("../../helper/dynamic_grid/getRowCountOfSelect");

async function homePage(req, res) {
	try {
		let query = req.query.query;
		if (!query) {
			res.render("dynamic_grid/grid", {
				error: "",
				data: [],
				metaData: [],
				query: "",
				currentPage: 1,
				totalPages: 1,
				orderBy: "",
				ascQuery: "",
				offset: 0,
				limit: 0,
				rows: 0
			});
			return;
		}
		let temp = query.toLowerCase();
		if (temp.indexOf("select") === -1 || temp.indexOf("drop") !== -1 || temp.indexOf("truncate") !== -1 || temp.indexOf("update") !== -1 || temp.indexOf("delete") !== -1 || temp.indexOf("alter") !== -1 || temp.indexOf("create") !== -1 || temp.indexOf("insert") !== -1) {
			return res.render("dynamic_grid/grid", {
				error: "invalid query (only select allowed) ",
				data: [],
				metaData: [],
				query: "",
				currentPage: 1,
				totalPages: 1,
				orderBy: "",
				ascQuery: "",
				offset: 0,
				limit: 0,
				rows: 0
			});
		}
		let currentPage = Number(req.query.page) || 1;
		let recordsPerPage = 20;
		let orderBy = req.query.order || 1;
		let ascQuery = req.query.asc || "asc";
		let orderByIndex = query.indexOf("order by");

		let numberOfRows = req.query.rows || await getRowCountOfSelect(query);

		query = query.replace(";", "");// to add order by and limit later  ; removed
		if (query.includes("limit")) {
			query = query.substring(0, query.indexOf("limit"))
		}
		if (!query.includes("order by")) {
			query = orderByIndex === -1 ? query : query.substring(0, orderByIndex);
			query += ` order by ${orderBy} ${ascQuery} limit ${(currentPage - 1) * recordsPerPage},${recordsPerPage} `
		}
		let gridData = query && await getGridData(query);
		let totalPages = Math.ceil(numberOfRows / recordsPerPage);
		if (gridData === "") throw Error("Empty result");

		res.render("dynamic_grid/grid", {
			data: gridData.result || [],
			metaData: gridData.fields || [],
			error: "",
			query: req.query.query,
			currentPage: currentPage,
			totalPages: totalPages,
			orderBy: orderBy,
			ascQuery: ascQuery,
			offset: (currentPage - 1) * recordsPerPage,
			limit: recordsPerPage,
			rows: numberOfRows
		})
	} catch (error) {
		console.log(error);
		res.render("dynamic_grid/grid", {
			error: "wrong sql query",
			data: [],
			metaData: [],
			query: req.query.query,
			currentPage: 1,
			totalPages: 1,
			orderBy: orderBy,
			ascQuery: ascQuery,
			offset: (currentPage - 1) * recordsPerPage,
			limit: recordsPerPage,
			rows: numberOfRows
		})
	}
}

module.exports = homePage;