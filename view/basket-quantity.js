//Actualisation du nombre de produit dans le panier au niveau de l'en-tête
function displayQuantityInTheBasket() {

    //Récupération des données du localStorage
    let storedProducts = JSON.parse(localStorage.getItem('basket-content'));
    console.log(storedProducts);

    // si le panier est vide 
    if (storedProducts == null || storedProducts.length === 0) {
        const quantityInTheBasket = document.getElementById('quantity-in-the-basket');
        quantityInTheBasket.style.display = "none";

        //suppression du marquage de session | fin de session
        localStorage.removeItem('markup');

    // si au moins un article est présent dans le panier 
    } else {
            document.getElementById('quantity-in-the-basket').innerHTML =+ storedProducts.length;
    }
}