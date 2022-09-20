import Express from "express";
import handlebars from "express-handlebars";

export const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const port = 8080;

// Handlebars engine
// app.engine(
//     "hbs",
//     handlebars({
//         extname: ".hbs",
//         defaultLayout: "index.hbs",
//     })
// );
// app.set("view engine", "hbs");
// app.set("views", "./views-hbs");

// Pug engine
// app.set("view engine", "pug");
// app.set("views", "./views-pug");

// EJS engine
// app.set("view engine", "ejs");

// Levanta el server
app.listen(port, () => {
    console.log("server up");
});

app.use(Express.static("public"));
