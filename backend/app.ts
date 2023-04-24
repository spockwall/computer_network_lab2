const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.text());

const radius = mysql.createConnection({
	host: "192.168.1.218",
	user: "zxc",
	password: "Group_12",
	database: "radius",
});

radius.connect((err: any) => {
	if (err) {
		console.log(err);
		console.log("connecting error");
		return;
	}
	console.log("connecting success");
});

app.get("/getuser", (req: any, res: any) => {
	radius.query("SELECT * FROM radcheck", (err: any, rows: any) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(rows);
		res.send(rows);
	});
});

app.get("/getflow", (req: any, res: any) => {
	const query = "SELECT username, acctstarttime, acctstoptime, acctoutputoctets FROM radacct;";
	const query2 = "SELECT username, acctoutputoctets FROM radacct;";
	const query_max = "SELECT username, max FROM quota;";
	const user_quota: any = {};
	const insert = () => {
		radius.query(query_max, (err: any, rows: any) => {
			console.log(rows);
			for (let j = 0; j < rows.length; j++) {
				let user = rows[j]["username"];
				let max_quota = rows[j]["max"];
				if (user_quota[user] > max_quota) {
					const block = `INSERT INTO radcheck (username, attribute, op, value) VALUES ("${user}", "auth-type", ":=", "reject");`;
					radius.query(block, (err: any, rows: any) => {
						if (err) {
							console.log(err.message);
						}
						console.log("insert succefully");
					});
				}
			}
		});
	};
	radius.query(query2, (err: any, rows: any) => {
		for (let i = 0; i < rows.length; i++) {
			const cur = rows[i];
			console.log(cur["username"]);
			if (user_quota[cur["username"]]) {
				user_quota[cur["username"]] += cur["acctoutputoctets"];
			} else {
				user_quota[cur["username"]] = cur["acctoutputoctets"];
			}
		}
		console.log(user_quota);
		insert();
	});

	radius.query(query, (err: any, rows: any) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(rows);
		res.send(rows);
	});
});

app.post("/newuser", (req: any, res: any) => {
	const newUser = req.body;
	const sql = "INSERT INTO radcheck (username, attribute, op, value) VALUES ?";
	const sql_max = "INSERT INTO quota (username, max) VALUES ?";
	const data = [[newUser.account, "Cleartext-Password", ":=", newUser.password]];
	const data_max = [[newUser.account]];
	radius.query(sql, [data], (err: any, res: any) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res);
	});
	radius.query(sql_max, [data_max], (err: any, res: any) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(res);
	});
});

app.listen(3000, () => {
	console.log(`server is listening on post 3000 !!!`);
});
