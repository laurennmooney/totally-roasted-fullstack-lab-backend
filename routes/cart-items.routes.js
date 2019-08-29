const express = require("express");
const cartRoutes = express.Router();
const pool = require("../connection");


function getCartItems(req, res) {
    pool.query("select * from shoppingcart order by id").then((result) => {
        res.send(result.rows);
    }); // works
}

cartRoutes.get("/cart-items", getCartItems); // works

cartRoutes.post("/cart-items", (req, res) => {
    console.log("POST works");
    pool.query("insert into shoppingcart (product, price, quantity) values ($1::text, $2::int, $3::int)", [req.body.product, req.body.price, req.body.quantity]).then(() => {
        getCartItems(req, res); // works
    })
});

cartRoutes.put("/cart-items/:id", (req, res) => {
    pool.query("update shoppingcart set quantity=$1::int where id=$2::int", [req.body.quantity, req.params.id]).then(() => {
        getCartItems(req, res);
    }); // works

})

cartRoutes.delete("/cart-items/:id", (req, res) => {
    console.log(req.params.id);
    pool.query("delete from shoppingcart where id=$1::int", [req.params.id]).then(() => {
        getCartItems(req, res);
    }); // works
});

module.exports = cartRoutes;