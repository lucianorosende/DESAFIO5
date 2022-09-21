import Contenedor from "./container.js";
import { app } from "./server.js";
import Express from "express";

export let products = [];
const Container = new Contenedor();

//Router
const apiRouter = Express.Router();

// get Products
apiRouter.get("/productos/listar", (req, res) => {
    let PRODUCTS = Container.getAll();

    !products.length
        ? res.json({ error: "No products found" })
        : res.json({ PRODUCTS });
});

// get Products based off id
apiRouter.get("/productos/listar/:id", (req, res) => {
    const { id } = req.params;
    let product = Container.getById(id);
    res.json({ product });
});

// add products and add id
apiRouter.post("/productos/guardar", (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
        return res.send("completar todo el formulario");
    }
    if (req.body.id === undefined) {
        req.body.id = 1;
        if (products.length > 0) {
            req.body.id = products[products.length - 1].id + 1;
        }
    }

    products.push(req.body);
    res.send("producto con id: " + req.body.id);
    // res.redirect("/api/productos/vista");
});

// update product based off id
apiRouter.put("/productos/actualizar/:id", (req, res) => {
    let { title, price, thumbnail } = req.body;
    let producto = Container.update(req.params.id, {
        title,
        price,
        thumbnail,
    });

    producto
        ? res.json(producto)
        : res.json({ error: "producto no encontrado" });
});

// delete product based off id
apiRouter.delete("/productos/borrar/:id", (req, res) => {
    const result = Container.delete(req.params.id);
    const getItem = Container.getById(req.params.id);
    console.log(getItem);
    products = result;

    getItem === "no existe ningun producto para el valor que deseas"
        ? res.send(`no hay producto con id: ${req.params.id}`)
        : res.send(products);
});

apiRouter.get("/productos/vista", (req, res) => {
    let prods = Container.getAll();
    // render vista if using hbs - layouts/index if using pug or ejs
    res.render("layouts/index", {
        productos: prods,
        hayProductos: prods.length,
    });
});

app.use("/api", apiRouter);
