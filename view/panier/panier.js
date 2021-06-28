//récupération données localStorage
let storedProducts = JSON.parse(localStorage.getItem('newArticle'));
console.log(storedProducts);

// création de la page du récapitulatif panier
const cartMain = document.getElementById('main-cart');
const productStoredDiv = document.createElement('div');
cartMain.appendChild(productStoredDiv);
productStoredDiv.className = 'stored-product-div';

const cartH2 = document.createElement('h2');
productStoredDiv.appendChild(cartH2);
cartH2.textContent = 'Vos articles';

if(storedProducts == null || storedProducts.length === 0){
    // si le panier est vide 
    const emptyCart = document.createElement('p');
    productStoredDiv.appendChild(emptyCart);
    emptyCart.className = "empty-cart";
    emptyCart.textContent = "Votre panier est vide..."
} else {
    // si des éléments sont présents dans le panier : récupération des éléments du panier
    let i = 0;
    for (storedProduct of storedProducts) {
        const eachProduct = document.createElement('div');
        productStoredDiv.appendChild(eachProduct);
        eachProduct.className = 'each-product';

        const cartDivImg = document.createElement('div');
        eachProduct.appendChild(cartDivImg);
        cartDivImg.className = 'div-img-cart';
        
        const cartImg = document.createElement('img');
        cartDivImg.appendChild(cartImg);
        cartImg.className = 'cart-photo';
        cartImg.setAttribute('src', storedProduct.productImg);
        cartImg.setAttribute('alt', 'Ours en peluche ' + storedProduct.productName);
        cartImg.setAttribute('title', 'Ours en peluche ' + storedProduct.productName);

        const productsCart = document.createElement('p');
        eachProduct.appendChild(productsCart);
        productsCart.textContent = storedProduct.quantity + "x " + storedProduct.productName + " , " + storedProduct.productColor;

        const productPrice = document.createElement('div');
        eachProduct.appendChild(productPrice);
        productPrice.className = 'product-price';
        productPrice.id = i++; /* ----------------------------------*/

        const price = document.createElement('span');
        productPrice.appendChild(price);
        price.textContent = storedProduct.productPrice + "€"

        // création bouton suppression
        const deleteButton = document.createElement('button');
        productPrice.appendChild(deleteButton);
        deleteButton.className = 'delete-button';
        deleteButton.title = 'Supprimer cet article ?';

        const deleteButtonIcon = document.createElement('i');
        deleteButton.appendChild(deleteButtonIcon);
        deleteButtonIcon.className = 'far fa-times-circle';

    };
    // Récupération de l'article associé au bouton de suppression
    let deleteButton = document.getElementsByClassName('delete-button');
    for (let i = 0 ; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click' , function (event) {
            event.preventDefault();
            let id = this.closest('.product-price').id;

            //Suppression de l'article du localStorage
            storedProducts.splice(id, 1);

            //Enregistrement du nouveau localStorage
            localStorage.setItem('newArticle', JSON.stringify(storedProducts));
            JSON.parse(localStorage.getItem('newArticle'));

            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html";
        }); 
    };

    //calcul du montant total
    let calculPrice = []
    for (storedProduct of storedProducts) {
        let article = storedProduct.productPrice;
        calculPrice.push(article);
    };

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = calculPrice.reduce(reducer, 0);
    console.log(totalPrice);

    const totalPriceDiv = document.createElement('div');
    productStoredDiv.appendChild(totalPriceDiv);
    totalPriceDiv.className = 'total-price-div';

    const total = document.createElement('p');
    totalPriceDiv.appendChild(total);
    total.className = 'total';
    total.textContent = "Total à régler : ";

    const priceValue = document.createElement('span');
    totalPriceDiv.appendChild(priceValue);
    priceValue.className = 'price-value';
    priceValue.textContent = totalPrice + "€";

    //création d'un bouton pour vider le panier
    const clearCart = document.createElement('button');
    productStoredDiv.appendChild(clearCart);
    clearCart.className = 'clear-cart';

    const clearCartLink = document.createElement('a');
    clearCart.appendChild(clearCartLink);
    clearCartLink.href = "panier.html";
    clearCartLink.id = "clear-cart-link"
    clearCartLink.title = 'Vider le panier';
    clearCartLink.textContent = "Vider le panier ";

    const clearButtonIcon = document.createElement('i');
    clearCartLink.appendChild(clearButtonIcon);
    clearButtonIcon.className = 'fas fa-trash-alt'

    clearCart.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem('newArticle');
        alert('Le panier a été vidé !')
        window.location.href = "panier.html";
    });

    //Formulaire de commande
    const form = document.createElement('form');
    productStoredDiv.appendChild(form);
    form.className = 'order-form';

    const productH2 = document.createElement('h2');
    form.appendChild(productH2);
    productH2.textContent = "Veuillez remplir ce formulaire pour passer commande : ";

    // Fonctions de validité prénom, nom, ville
    function isValid(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    };

    // Fonctions de validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
    };

    // Fonctions de validité mail
    function validMail(value){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    };

    // Formulaire "prénom"
    const firstNameDiv = document.createElement('div');
    form.appendChild(firstNameDiv);
    firstNameDiv.className = 'name-div';

    const labelFirstName = document.createElement('label');
    firstNameDiv.appendChild(labelFirstName);
    labelFirstName.setAttribute('for', 'prénom');
    labelFirstName.textContent = 'Votre prénom : ';

    const firstName = document.createElement('input');
    firstNameDiv.appendChild(firstName);
    firstName.setAttribute('type', 'text');
    firstName.setAttribute('class', 'name');
    firstName.name = "Prénom";
    firstName.required = true;

    // Vérification de la validité du prénom
    firstName.addEventListener("change", function (event) {
        if (isValid(firstName.value)) {
        } else {
            alert( "Veuillez saisir un prénom valide ; Les chiffres et les symbole (-*,#~&) ne sont pas autorisés.")
            event.preventDefault()
        }
    });

    // Formulaire "nom"
    const lastNameDiv = document.createElement('div');
    form.appendChild(lastNameDiv);
    lastNameDiv.className = 'name-div';

    const labelLastName = document.createElement('label');
    lastNameDiv.appendChild(labelLastName);
    labelLastName.setAttribute('for', 'nom');
    labelLastName.textContent = 'Votre nom : ';

    const lastName = document.createElement('input');
    lastNameDiv.appendChild(lastName);
    lastName.setAttribute('type', 'text');
    lastName.setAttribute('class', 'name');
    lastName.name = "Nom"
    lastName.required = true;

    // Vérification de la validité du nom
    lastName.addEventListener("change", function (event) {
        if (isValid(lastName.value)) {
        } else {
            alert("Veuillez saisir un nom valide ; Les chiffres et les symbole (-*,#~&) ne sont pas autorisés.")
            event.preventDefault()
        }
    });

    // ajout formulaire "adresse"
    const addressDiv = document.createElement('div');
    form.appendChild(addressDiv);
    addressDiv.className = 'name-div';

    const labelAdress = document.createElement('label');
    addressDiv.appendChild(labelAdress);
    labelAdress.setAttribute('for', 'adresse');
    labelAdress.textContent = 'Votre adresse : ';

    const address = document.createElement('textarea');
    addressDiv.appendChild(address);
    address.setAttribute('type', 'text');
    address.setAttribute('class', 'name');
    address.name = "Adresse"
    address.required = true;

    // Vérification de la validité de l'adresse
    address.addEventListener("change", function (event) {
        if (validAddress(address.value)){
        } else {
            event.preventDefault()
            alert("Veuillez saisir une adresse postale valide ;Les symbole (-*,#~&) ne sont pas autorisés.");
        }
    });

    // ajout formulaire "ville"
    const cityDiv = document.createElement('div');
    form.appendChild(cityDiv);
    cityDiv.className = 'name-div';

    const labelCity = document.createElement('label');
    cityDiv.appendChild(labelCity);
    labelCity.setAttribute('for', 'ville');
    labelCity.textContent = 'Votre ville : ';

    const city = document.createElement('input');
    cityDiv.appendChild(city);
    city.setAttribute('type', 'text');
    city.setAttribute('class', 'name');
    city.name = "Ville"
    city.required = true;

    // Vérification de la validité de la ville
    city.addEventListener("change", function (event) {
        if (isValid(city.value)) {
        } else {
            alert("Veuillez saisir un nom de ville valide ; Les chiffres et les symbole (-*,#~&) ne sont pas autorisés.")
            event.preventDefault()
        }
    });

    // ajout formulaire "mail"
    const mailDiv = document.createElement('div');
    form.appendChild(mailDiv);
    mailDiv.className = 'name-div';

    const labelMail = document.createElement('label');
    mailDiv.appendChild(labelMail);
    labelMail.setAttribute('for', 'email');
    labelMail.textContent = 'Votre adresse mail : ';

    const mail = document.createElement('input');
    mailDiv.appendChild(mail);
    mail.setAttribute('type', 'email');
    mail.setAttribute('class', 'name');
    mail.name = "Adresse mail"
    mail.required = true;

    // Vérification de la validité du mail
    mail.addEventListener("change", function (event) {
        if (validMail(mail.value)){
        } else {
            event.preventDefault()
            alert("Veuillez saisir une adresse mail valide (exemple : adresse@mail.com).");
        }
    });

    // Bouton de validation de la commande
    const submitDiv = document.createElement('div');
    form.appendChild(submitDiv);
    submitDiv.className = 'name-div';

    let submit = document.createElement('button');
    submitDiv.appendChild(submit);
    submit.type = 'submit';
    submit.name = 'add';
    submit.id = 'valid';
    submit.textContent = "Valider votre commande";

    // Bouton de validation de la commande
    const home = document.createElement('div');
    cartMain.appendChild(home);
    home.className = 'home';

    const homeButton = document.createElement('button');
    home.appendChild(homeButton);

    const homeLink = document.createElement('a');
    homeButton.appendChild(homeLink);
    homeLink.href = '../vue/index.html';
    homeLink.title = '< Retourner à la liste des produits';
    homeLink.textContent = "< Continuer mes achats";

    // Envoie des données panier + formulaire de commande si ce dernier est valide
    submit.addEventListener("click", function (event) {
        if(isValid(firstName.value) && isValid(lastName.value) && validAddress(address.value) && isValid(city.value) && validMail(mail.value)){
            event.preventDefault();

            // envoie du prix total au localStorage
            localStorage.setItem('totalPrice', totalPrice);
            const storagePrice = localStorage.getItem('totalPrice');
            console.log(storagePrice);

            //Création de l'objet "contact"
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: mail.value,
            }
            console.log(contact);

            // création d'un tableau products (id des oursons du panier)
            /*-------------------------------*/
            let productsArray = [];
            for (storedProduct of storedProducts) {
                let productsId = storedProduct.productId;
                productsArray.push((productsId));
            }
            console.log(products);
/*---------------------------------------------*/
            // Objet regroupant contact et produits
            let send = {
                contact,
                productsArray,
            }
            console.log(send);

            // Envoie des données au serveur
            const post = async function (data){
                try {
                    let response = await fetch('http://localhost:3000/api/teddies/order', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if(response.ok) {
                        let data = await response.json();
                        console.log(data.orderId);
                        localStorage.setItem("responseOrder", data.orderId);
                        window.location = "confirmation.html";
                        localStorage.removeItem("newArticle");

                    } else {
                        event.preventDefault();
                        console.error('Retour du serveur : ', response.status);
                        alert('Erreur rencontrée : ' + response.status);
                    } 
                } catch (error) {
                    alert("Erreur : " + error);
                } 
            };
            post(send);
        }
    });
};