import express from 'express';
import Inventario from './Inventario.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let almacen = new Inventario();

app.get('/api/productos/listar', (req, res) => {
    let productos = almacen.getProductos();
    let error = {error : 'no hay productos cargados'};
    productos.length != 0 ? res.status(200).json(productos) : res.status(200).json(error);

})

app.get('/api/productos/listar/:id', (req, res) => {
    let id = req.params.id;
    let producto = almacen.getProducto(id);
    let error = {error : 'producto no encontrado'};

    producto ? res.status(200).json(producto) : res.status(200).json(error)

})

app.post('/api/productos/guardar', (req, res) => {
    let productoModificado = almacen.addProducto(req.body);
    res.status(200).json(productoModificado);

})

const port = 8080
const serve = app.listen(port, () => console.log("Corriendo en el puerto " + port));