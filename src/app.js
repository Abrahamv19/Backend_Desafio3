import express from "express"
import { ProductManager } from "./productManager.js"
import morgan from "morgan"

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(' dev '));

app.get('/products', async (req, res) => {
    try {
        const setLimit = req.query.limit;
        const products = await productManager.getProducts();
        
        if(!setLimit) {
            return res.status(200).json({status: 'success', data: products});
        } else {
            const newArray = products.slice(0, setLimit);
            return res.status(200).json({status: 'success', data: newArray});
        }
        
    } catch (error) {
        return res.status(400).json({status: 'error1', data: {}});
    }  
});

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const found = await productManager.getProductById(pid);
        if(found != undefined) {
            return res.status(200).json({status: 'success', data: found});
        } else {
            return res.status(400).json({status: 'Not found', data: {}});
        }
    } catch (error) {
        return res.status(400).json({status: 'error', data: {}});   
    }
});

app.listen(port, () => console.log(`Server on!! - Port: ${port}`));