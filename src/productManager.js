// DESAFIO 3 HUGO ABRAHAM VASQUEZ

import * as fs from 'fs'

export class ProductManager {

    constructor() {
        this.path = './products.json';   
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const archive = await fs.promises.readFile(this.path, "utf-8");
                const products = JSON.parse(archive)
                console.log(products);
                return products;
            } else {
                const products = await fs.promises.writeFile(this.path, "[]");
                console.log(products);
                return products;
            };
              
        } catch (error) {
            console.log(error);
        };
    };

    getProductByCode(code) {
        const archive = fs.readFile(this.path, "utf-8");
        const products = JSON.parse(archive)
       
        const existsInArray = products.find(prod => prod.code === code);
        if(existsInArray) {
            return true;
        } else {
            return false;
        }
    }
    
    generateId() {
        const archive = fs.readFile(this.path, "utf-8");
        const products = JSON.parse(archive)
        let maxId = 0;
        for(let i = 0; i < products.length; i++) {
            const prod = products[i];
            if(prod.id > maxId) {
                maxId = prod.id;
            }
        }
        return ++maxId;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            const archive = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(archive);

            if((title === undefined || title === null || title === '') || (description === undefined || description === null || description === '') || (price === undefined || price === null || price === '') || (thumbnail === undefined || thumbnail === null || thumbnail === '') || (code === undefined || code === null || code === '' || this.getProductByCode(code)) || (stock === undefined || stock === null || stock === '')) {
                console.log('Error!!, code field cannot be repeated and fields can not be undefined, null or empty space');            
            } else {
                let newProduct = {title, description, price, thumbnail, code, id: this.generateId()};
                products = [...products, newProduct];
                fs.writeFileSync(this.path, JSON.stringify(products))
    
                return console.log('Product added successfully!!');
            }

            
        } catch (error) {
            console.log(error);   
        }
    }

    getProductById = async (id) => {
        try {
            const archive = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(archive);

            const found = products.find(prod => prod.id == id);
            if(found) {
                console.log(found); 
                return found;
                  
            } else {
                console.log('Not found');
                return undefined;
            }

            
        } catch (error) {
            console.log(error); 
        }
    }

    deleteProduct(id) {
        const products = JSON.parse(fs.readFileSync(this.path, "utf-8"))

        if (products.find(p => p.id === id)) {
            products.splice(products.indexOf(products.find(p => p.id === id)), 1)
            fs.writeFileSync(this.path, JSON.stringify(products))
            return console.log("Deleted product successfully")
        } else {
            return console.log("Product not found")
        }
    }

    updateProduct(id, key, value) {
        const products = JSON.parse(fs.readFileSync(this.path, "utf-8"))

        if(key == "id"){
            return console.log("It is not possible to modify the id field, try another field")

        } else if (products.find(p => p.id === id)) {
            const Found = products.find(p => p.id === id)
            Found[key] = value
            fs.writeFileSync(this.path, JSON.stringify(products))
            return console.log("Updated product successfully", Found)
        } else {
            return console.log("Product not found")
        }
    }
}



