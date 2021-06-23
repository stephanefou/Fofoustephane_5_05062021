//EXPLIQUER
class Product {
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

//envoie une requête au serveur
//dans une fonction fléchée la partie gaucghe est une variable quon crée, ici data est la variable dans laquelle va être inséré le résultat du fetch 
//On a récupéré nos articles et voulons les afficher:
//On crée une boucle "for of" qui va parcourir le tableau jsonListproduct et pour chaque élément de ce tableau créera une variable jsonProduct qu'on pourra manipuler.
//Pour chaque produit, on crée un nouvel objet produit avec le json en paramètre
//"+=" permet de concaténer (ajoute la valeur qui est à droite à la valeur déjà existante, celle de gauche) a(nouvelle valeur)=a+b , a+=b
GET('http://localhost:3000/api/teddies/')
    .then( data => data.json())
    .then( jsonListProduct => {
        for ( let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);
            document.getElementById('teddies').innerHTML += `${Product.name}
                <img src="http://localhost:3000/api/teddies/imageUrl">
                `
        }
    });
    

/*class ProductManager {
    constructor(listProduct){
        this.listProduct = listProduct;
    }
}*/








