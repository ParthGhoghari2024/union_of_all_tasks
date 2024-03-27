const fs = require("fs");
const getGridData = require("../../helper/dynamic_grid/getGridData");
const getRowCountOfSelect = require("../../helper/dynamic_grid/getRowCountOfSelect");

async function homePage(req, res) {
    try {
        var query = req.query.query;
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
        var currentPage = Number(req.query.page) || 1;
        var recordsPerPage = 20;
        var orderBy = req.query.order || 1;
        var ascQuery = req.query.asc || "asc";
        var orderByIndex = query.indexOf("order by");

        var numberOfRows = req.query.rows || await getRowCountOfSelect(query);

        query = query.replace(";", "");// to add order by and limit later  ; removed
        if (query.includes("limit")) {
            query = query.substring(0, query.indexOf("limit"))
        }
        if (!query.includes("order by")) {
            query = orderByIndex === -1 ? query : query.substring(0, orderByIndex);
            query += ` order by ${orderBy} ${ascQuery} limit ${(currentPage - 1) * recordsPerPage},${recordsPerPage} `
        }
        var gridData = query && await getGridData(query);
        var totalPages = Math.ceil(numberOfRows / recordsPerPage);
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