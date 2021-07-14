//Actualisation du nombre de produit dans le panier au niveau de l'en-tête
function displayQuantityInTheBasket() {
    
    //Récupération des données du localStorage
    let storedProducts = JSON.parse(localStorage.getItem('basket-content'));
    console.log(storedProducts);

    // si le panier est vide 
    if (storedProducts == null || storedProducts.length === 0) {
        const quantityInTheBasket = document.getElementById('quantity-in-the-basket');
        quantityInTheBasket.style.display = "none";

    } else {
            document.getElementById('quantity-in-the-basket').innerHTML =+ storedProducts.length;
    }
}

//Création d'une classe pour structurer le tableau product
class Product {
    constructor(selectedProduct, selectedColors, productQuantityInput) {
        this.selectedProduct = selectedProduct;
        this.selectedColors = selectedColors;
        this.productQuantityInput = productQuantityInput;
    }
}

//Récupération de l'id dans l'URL pour afficher les informations du produit sélectionné
function getProductIdFromURL() {
    let urlString = window.location.href;
    let url = new URL(urlString);
    let productId = url.searchParams.get("id");
    console.log(productId);
    getSelectedProduct (productId);
}

async function getSelectedProduct(productId) {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/" + productId);
        if (response.ok) {
            let selectedProduct = await response.json();
            createProductCard(selectedProduct);
            console.log(selectedProduct);
        } else { //En cas d'erreur de communication avec l'API
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
}

//Affichage dans une carte des informations du produit correspondant à l'id
function createProductCard(selectedProduct) {

    // Création des éléments html de la page produit
    const productMain = document.getElementById('produit');

    // Création de la div du produit
    const productDivImg = document.createElement('div');
    productMain.appendChild(productDivImg);
    productDivImg.className = 'div-img-product';

    //Ajout de l'image à la div du produit
    const productImg = document.createElement('img');
    productDivImg.appendChild(productImg);
    productImg.className = 'product-photo';
    productImg.setAttribute('src', selectedProduct.imageUrl);
    productImg.setAttribute('alt', 'Ours en peluche ' + selectedProduct.name);
    productImg.setAttribute('title', 'Ours en peluche ' + selectedProduct.name);

    //Création de la div d'information du produit
    const productDivInfo = document.createElement('div');
    productMain.appendChild(productDivInfo);
    productDivInfo.className = 'product-info';

    // Ajout du nom du produit en titre H2
    const productH2 = document.createElement('h2');
    productDivInfo.appendChild(productH2);
    productH2.textContent = 'Ours en peluche ' + selectedProduct.name;

    // Description du produit
    const productDescription = document.createElement('p');
    productDivInfo.appendChild(productDescription);
    productDescription.className = 'description';
    productDescription.textContent = selectedProduct.description;

    // Prix
    const productPrice = document.createElement('p');
    productDivInfo.appendChild(productPrice);
    productPrice.className = 'product-price';
    productPrice.textContent = selectedProduct.price/100 + ',00€';
    
    // Choix de la couleur
    const form = document.createElement('form');
    productDivInfo.appendChild(form);

    const customizationDiv = document.createElement('div');
    form.appendChild(customizationDiv);
    customizationDiv.className = 'customization-div';

    const colorChoiceDiv = document.createElement('div');
    customizationDiv.appendChild(colorChoiceDiv);
    colorChoiceDiv.className = 'color-choice';

    colorSelection(colorChoiceDiv, selectedProduct);

    const numberChoiceDiv = document.createElement('div');
    customizationDiv.appendChild(numberChoiceDiv);
    numberChoiceDiv.className = 'number-choice';

    const numberOfProductMinus = document.createElement('button');
    numberChoiceDiv.appendChild(numberOfProductMinus);
    numberOfProductMinus.type = 'button';
    numberOfProductMinus.className = 'button-minus';

    const numberOfProductMinusIcon = document.createElement('i');
    numberOfProductMinus.appendChild(numberOfProductMinusIcon);
    numberOfProductMinusIcon.className = 'fas fa-minus';

    let productQuantityInput = document.createElement('input');
    numberChoiceDiv.appendChild(productQuantityInput);
    productQuantityInput.className = 'quantity-value';
    productQuantityInput.setAttribute('type', "number");
    productQuantityInput.setAttribute('step', "1");
    productQuantityInput.setAttribute('max', "100");
    productQuantityInput.value = 1;
    //prevent the input to be empty
    productQuantityInput.required;

    const numberOfProductPlus = document.createElement('button');
    numberChoiceDiv.appendChild(numberOfProductPlus);
    numberOfProductPlus.type = 'button';
    numberOfProductPlus.className = 'button-plus';

    const numberOfProductPlusIcon = document.createElement('i');
    numberOfProductPlus.appendChild(numberOfProductPlusIcon);
    numberOfProductPlusIcon.className = 'fas fa-plus';

    //Écoute de la modification du nombre de produit
    productQuantityInput.value = decrementNumberOfProduct (productPrice, selectedProduct, numberOfProductMinus, productQuantityInput);
    productQuantityInput.value = incrementNumberOfProduct (productPrice, selectedProduct, numberOfProductPlus, productQuantityInput);
    productQuantityInput.value = EnteredNumberOfProductForm (productPrice, selectedProduct, productQuantityInput);
    console.log(productQuantityInput)

    // Création du bouton panier
    const submitDiv = document.createElement('div');
    form.appendChild(submitDiv);
    submitDiv.className = 'submit-div';

    const addToCartIcon = document.createElement('i');
    submitDiv.appendChild(addToCartIcon);
    addToCartIcon.className = 'fas fa-cart-plus';

    let addToCartButton = document.createElement('button');
    submitDiv.appendChild(addToCartButton);
    addToCartButton.type = 'submit';
    addToCartButton.name = 'addToCart';
    addToCartButton.id = 'submit';
    addToCartButton.textContent = "AJOUTER AU PANIER";

    addToCart(addToCartButton, selectedProduct, productQuantityInput);
}

// Ajout de la selection des couleurs disponible par produit
function colorSelection(colorChoiceDiv, selectedProduct) {
    const label = document.createElement('label');
    colorChoiceDiv.appendChild(label);
    label.textContent = "Couleur :";
    label.setAttribute('for', "selection"); /* for de #selection, attribut non affiché! */

    const colorSelect = document.createElement('select');
    colorChoiceDiv.appendChild(colorSelect);
    colorSelect.setAttribute('name', "Quelle couleur pour" + selectedProduct.name + "?"); /* colorSelectName, attibut non affiché donc variable dispensable */
    colorSelect.setAttribute('id', "color-selection");

    const colors = selectedProduct.colors;

    for (i = 0; i < colors.length; i++) {
        const colorSelectOption = document.createElement('option');
        colorSelect.appendChild(colorSelectOption);
        colorSelectOption.textContent = colors[i];
        colorSelectOption.setAttribute("value", colors[i]);
    }
    console.log(selectedProduct.colors)
}

//Décrément du nombre de produit
function decrementNumberOfProduct (productPrice, selectedProduct, numberOfProductMinus, productQuantityInput) {
    numberOfProductMinus.addEventListener("click", function() {
        productQuantityInput.value--;
        if (productQuantityInput.value < 1) {
            productQuantityInput.value = 1;
        }
        productPrice.textContent = (selectedProduct.price * productQuantityInput.value)/100 + ',00€';
    })
    return productQuantityInput.value;
}

//Incrément du nombre de produit
function incrementNumberOfProduct(productPrice, selectedProduct, numberOfProductPlus, productQuantityInput) {
    numberOfProductPlus.addEventListener("click", function() {
        productQuantityInput.value++;
        if (productQuantityInput.value > 100) {
            productQuantityInput.value = 100;
            window.alert("Désolé, le stock disponible pour ce produit est atteint.");
        }
        productPrice.textContent = (selectedProduct.price * productQuantityInput.value)/100 + ',00€';
    })
    return productQuantityInput.value;
}

//Saisie du nombre de produit
function EnteredNumberOfProductForm(productPrice, selectedProduct, productQuantityInput) {
    productQuantityInput.addEventListener("change", function(c) {
        const value = c.target.value;
        if (isNaN(value) || value < 1) {
            productQuantityInput.value = 1 ;
        } else if (value > 100) {
            productQuantityInput.value = 100 ;
            window.alert("Désolé, le stock disponible pour ce produit est atteint.");
        } else {
            productQuantityInput.value = value;
        }
        productPrice.textContent = (selectedProduct.price * productQuantityInput.value)/100 + ',00€';
    })
    return productQuantityInput.value;
}

// Ajout des articles dans le panier
function addToCart (addToCartButton, selectedProduct, productQuantityInput) {
    addToCartButton.addEventListener('click', function (event) {
        event.preventDefault(); //Sinon la page se recharge car c'est un bouton

        let selectedColors = document.getElementById('color-selection').value;

        let customizedSelectedProduct = {
            productName: selectedProduct.name,
            productId: selectedProduct._id,
            productColor: selectedColors,
            productImg: selectedProduct.imageUrl,
            quantity: productQuantityInput.value,
            productPrice: productQuantityInput.value * selectedProduct.price / 100,
        };
        console.log(customizedSelectedProduct);

        let storedProducts = JSON.parse(localStorage.getItem('basket-content'));
        if (storedProducts === null) {
            storedProducts = [];
        }
        storedProducts.push(customizedSelectedProduct);
        localStorage.setItem('basket-content', JSON.stringify(storedProducts));
        console.log(storedProducts);
        
        if (window.confirm(productQuantityInput.value + "x " + selectedProduct.name + ", " + selectedColors + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
            window.location.href = "../panier/panier.html";
        } else {
            window.location.href = "../vue/index.html";
        }
        document.getElementById('quantity-in-the-basket').innerHTML =+ storedProducts.length;
    })
}

getProductIdFromURL();
displayQuantityInTheBasket();