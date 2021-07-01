//EXPLIQUER
class Product {
    constructor(jsonProduct){
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

//envoie une requête au serveur
//dans une fonction fléchée la partie gauche est une variable quon crée, ici data est la variable dans laquelle va être inséré le résultat du fetch 
//On a récupéré nos articles et voulons les afficher:
//On crée une boucle "for of" qui va parcourir le tableau jsonListproduct et pour chaque élément de ce tableau créera une variable jsonProduct qu'on pourra manipuler.
//Pour chaque produit, on crée un nouvel objet produit avec le json en paramètre
//"+=" permet de concaténer (ajoute la valeur qui est à droite à la valeur déjà existante, celle de gauche) a(nouvelle valeur)=a+b , a+=b

/*function getListProduct() {
    fetch("http://localhost:3000/api/teddies/")
    .then( data => data.json())
    .then( jsonListProduct => {
        console.log(jsonListProduct);
});*/

fetch("http://localhost:3000/api/teddies/")
    .then( data => data.json())
    .then( jsonListProduct => {
        for(let jsonProduct of jsonListProduct){
            let product = new Product(jsonProduct);
            document.getElementById("teddies").innerHTML += `<article>
                                                                <a href="../../view/produit/produit.html?id=${product._id}" title="'Ours en peluche ${product.name}'">
                                                                    <div class="div-img">
                                                                        <img class="article-card__photo" src="${product.imageUrl}" alt="Ours en peluche brun fait main">
                                                                    </div>
                                                                    <div class="article-card__title">
                                                                        <h3>Ours en peluche ${product.name}</h3>
                                                                    </div>
                                                                    <div class="article-card__info">
                                                                        <p><i class="fas fa-check"></i>EN STOCK</p>
                                                                        <span class="article-card__price">${product.price/100} €</span>
                                                                    </div>
                                                                </a>
                                                            </article>`;
        }
    });