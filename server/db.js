import mysql from "mysql2/promise";

// Pool: um conjunto de conexões abertas e reaproveitadas a cada consulta.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true, // datas chegam como texto "AAAA-MM-DD", sem conversão de fuso
});

// O MariaDB do XAMPP vem sem o modo estrito: sem ele, uma data impossível vira 0000-00-00
// e um texto longo demais é cortado, só com um aviso. Cada conexão nova liga o modo estrito,
// para o banco recusar esses dados com erro.
// Neste evento a conexão é a versão com callback do mysql2 (query não devolve Promise);
// o void avisa o lint de que não há resultado a esperar. O comando entra na fila da
// conexão antes de qualquer consulta da API.
db.on("connection", (conexao) => {
  void conexao.query("SET SESSION sql_mode = CONCAT(@@SESSION.sql_mode, ',STRICT_TRANS_TABLES')");
});

export default db;
