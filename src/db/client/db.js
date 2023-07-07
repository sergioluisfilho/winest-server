const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "db",
    port: 3306,
    user: "root",
    password: "root",
    database: "winest",
  },
});

knex.on("query", function (queryData) {
  console.log("knex query build ==> " + queryData.sql);
});

knex.on("error", (error) => {
  console.error("Erro no knex:", error);
});

module.exports = knex;
