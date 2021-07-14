//Actualisation du nombre de produit dans le panier au niveau de l'en-tête
function displayQuantityInTheBasket() {

    //Récupération des données du localStorage
    let storedProducts = JSON.parse(localStorage.getItem('basket-content'));
    console.log(storedProducts);

    // si le panier est vide 
    if (storedProducts == null || storedProducts.length === 0) {
        const quantityInTheBasket = document.getElementById('quantity-in-the-basket');
        quantityInTheBasket.style.display = "none";
    // si au moins un article est présent dans le panier 
    } else {
            document.getElementById('quantity-in-the-basket').innerHTML =+ storedProducts.length;
    }
}

//Affichage des éléments
function createCardForEachProduct(products) {
    
    for (let i = 0; i < products.length; i++) {
        document.getElementById("teddies").innerHTML += `
            <article>
                <a class="product-link">
                    <div class="div-img">
                        <img class="article-card__photo" src="${products[i].imageUrl}" alt="Ours en peluche brun fait main">
                    </div>
                    <div class="article-card__title">
                        <h3>Ours en peluche ${products[i].name}</h3>
                    </div>
                    <div class="article-card__info">
                        <p><i class="fas fa-check"></i>EN STOCK</p>
                        <span class="article-card__price">${products[i].price/100} €</span>
                    </div>
                </a>
            </article>`
        ;
        createProductLink(products, i);
        //<a href="../../view/produit/produit.html?id=${products[i]._id}" title="'Ours en peluche ${products[i].name}'"></a> "à coller à la place de a, remplace la fonction createProductLink
    }
};

function createProductLink(products, i) {
    let productLink = document.getElementsByClassName('product-link')[i]; //index important sinon le lien n'est pas intégré, possible si tu mets un id mais il est unique. les liens seront seulement cliquable depuis devtools   
    // récupération de l'url
    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    // console.log(window.location.pathname.replace(lastItem, 'product.html'))
    let url = window.location.origin + window.location.pathname.replace(lastItem, '../produit/produit.html');

    //Création d'un objet url
    let urlObj = new URL(url);
    let productId = products[i]._id;
    // Ajout du query string id
    urlObj.searchParams.append("id", productId);
    //linkProduct.href = urlObj;
    productLink.href = urlObj;
    productLink.title = 'Ours en peluche' + products[i].name;
}

//récupération de la liste des produits
const getProductList = async function() {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');
        if (response.ok) {
            let products = await response.json();
            createCardForEachProduct(products);
            console.log(products);
        } else { //En cas d'erreur de communication avec l'API
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
};    

//appel des fonctions
getProductList();
displayQuantityInTheBasket();