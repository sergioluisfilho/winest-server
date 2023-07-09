const fs = require("fs");

// Ler o arquivo JSON
const rawData = fs.readFileSync("./scripts/winemag-data-130k-v2.json");
const jsonData = JSON.parse(rawData);

// Nome da tabela
const tableName = "wines";

// Criação da tabela
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    points VARCHAR(50),
    title VARCHAR(255),
    description TEXT,
    taster_name VARCHAR(255),
    taster_twitter_handle VARCHAR(255),
    price DECIMAL(10, 2),
    designation VARCHAR(255),
    variety VARCHAR(255),
    region_1 VARCHAR(255),
    region_2 VARCHAR(255),
    province VARCHAR(255),
    country VARCHAR(255),
    winery VARCHAR(255)
  );
`;

// Prepara os inserts dos elementos
const insertQueries = jsonData.map((wine) => {
  const values = Object.values(wine).map((value) => {
    if (typeof value === "string") {
      return `'${value.replace(/'/g, "''")}'`;
    } else if (value === null) {
      return "NULL";
    } else {
      return value;
    }
  });

  return `INSERT INTO ${tableName} VALUES (${values.join(", ")});`;
});

// Cria o conteúdo do arquivo script.sql
const scriptContent = `${createTableQuery}\n${insertQueries.join("\n")}`;

// Salva o arquivo script.sql
fs.writeFileSync("./scripts/script.sql", scriptContent);

console.log("Arquivo script.sql gerado com sucesso!");
