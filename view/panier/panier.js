//Création de l'objet contact contenant les données du formulaire qui va être envoyé au serveur
let contact = {};
//Création d'une classe pour structurer l'objet contact
class ContactData {
    constructor(firstName, lastName, email, city, address) {
        this.firstName = firstName
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;

        console.log(ContactData);
    }    
}

//Actualisation du nombre de produit dans le panier au niveau de l'en-tête
function displayQuantityInTheBasket() {

    //Récupération des données du localStorage
    let storedProducts = JSON.parse(localStorage.getItem('basket-content'));
    console.log(storedProducts);

    createBasket(storedProducts);
}

//Affichage des éléments HTML du panier
function createBasket(storedProducts) {
    const cartMain = document.getElementById('main-cart');
    const productStoredDiv = document.createElement('div');
    cartMain.appendChild(productStoredDiv);
    productStoredDiv.className = 'stored-product-div';

    const cartH2 = document.createElement('h2');
    productStoredDiv.appendChild(cartH2);
    cartH2.textContent = 'Vos articles';

    if(storedProducts == null || storedProducts.length === 0) {
        // si le panier est vide 
        const emptyCart = document.createElement('p');
        productStoredDiv.appendChild(emptyCart);
        emptyCart.className = "empty-cart";
        emptyCart.textContent = "Votre panier est vide..."

        cartH2.style.display = "none"; /*le titre n'apparaît pas dans le cas d'un panier vide*/
        const quantityInTheBasket = document.getElementById('quantity-in-the-basket');
        quantityInTheBasket.style.display = "none";

        // Bouton de retour sur la page principale
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

    } else {
        // si des éléments sont présents dans le panier : récupération des éléments du panier
        document.getElementById('quantity-in-the-basket').innerHTML =+ storedProducts.length;

        //Un numéro sera attribué à chaqu div productPrice ci-dessous, cela servira à la suppression unitaire
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
            productsCart.textContent = storedProduct.quantity + "x " + storedProduct.productName + ", " + storedProduct.productColor;

            const productPrice = document.createElement('div');
            eachProduct.appendChild(productPrice);
            productPrice.className = 'product-price';
            productPrice.id = i++;

            //affichage du prix par article
            const price = document.createElement('span');
            productPrice.appendChild(price);
            price.textContent = storedProduct.productPrice + "€";

            // création bouton suppression
            const deleteArticleButton = document.createElement('button');
            productPrice.appendChild(deleteArticleButton);
            deleteArticleButton.className = 'delete-button';
            deleteArticleButton.title = 'Supprimer cet article ?';

            const deleteArticleIcon = document.createElement('i');
            deleteArticleButton.appendChild(deleteArticleIcon);
            deleteArticleIcon.className = 'far fa-times-circle';

        }
        deleteArticle(storedProducts);

        const priceAndClear = document.createElement('div');
        productStoredDiv.appendChild(priceAndClear);
        priceAndClear.className = 'price-clear';

        const totalPriceDiv = document.createElement('div');
        priceAndClear.appendChild(totalPriceDiv);
        totalPriceDiv.className = 'total-price-div';

        const total = document.createElement('p');
        totalPriceDiv.appendChild(total);
        total.className = 'total';
        total.textContent = "Total à régler : ";

        const totalPriceDivBis = document.createElement('div');
        priceAndClear.appendChild(totalPriceDivBis);
        totalPriceDivBis.className = 'total-price-div-bis';

        const priceValue = document.createElement('span');
        totalPriceDivBis.appendChild(priceValue);
        priceValue.className = 'price-value';
        priceValue.textContent = addArticlePrice(storedProducts) + "€";

        localStorage.setItem('totalPrice', priceValue.textContent);
        const storagePrice = localStorage.getItem('totalPrice');
        console.log(storagePrice);
    
        //création d'un bouton pour vider le panier
        const clearCart = document.createElement('button');
        totalPriceDivBis.appendChild(clearCart);
        clearCart.className = 'clear-cart';

        clearbasket(clearCart);

        //Formulaire de commande
        const separatorWrapper = document.createElement('div');
        productStoredDiv.appendChild(separatorWrapper);
        separatorWrapper.className = 'separator-wrapper'

        const separator = document.createElement('div');
        separatorWrapper.appendChild(separator);
        separator.className = 'separator'

        const separatorTitleDiv = document.createElement('div');
        separatorWrapper.appendChild(separatorTitleDiv);
        separatorTitleDiv.className = 'separator-title-div'

        const productH2 = document.createElement('h2');
        separatorTitleDiv.appendChild(productH2);
        productH2.innerHTML = "Finalisez votre commande !<br>";
        productH2.className = 'separator-wrapper-title';
        
        const productH2Sub = document.createElement('span');
        separatorTitleDiv.appendChild(productH2Sub);
        productH2Sub.textContent = '(Remplissez les champs ci-dessous)';

        const separatorBis = document.createElement('div');
        separatorWrapper.appendChild(separatorBis);
        separatorBis.className = 'separator'

        const form = document.createElement('form');
        productStoredDiv.appendChild(form);
        form.className = 'order-form';

        // Formulaire "prénom"
        const firstNameDiv = document.createElement('div');
        form.appendChild(firstNameDiv);
        firstNameDiv.className = 'first-name field';

        const labelFirstName = document.createElement('label');
        firstNameDiv.appendChild(labelFirstName);
        labelFirstName.setAttribute('for', 'prénom');
        labelFirstName.textContent = 'Prénom : ';

        const firstName = document.createElement('input');
        firstNameDiv.appendChild(firstName);
        firstName.setAttribute('type', 'text');
        firstName.setAttribute('class', 'input');
        firstName.name = "Prénom";
        firstName.required = true;

        // Formulaire "nom"
        const lastNameDiv = document.createElement('div');
        form.appendChild(lastNameDiv);
        lastNameDiv.className = 'last-name field';

        const labelLastName = document.createElement('label');
        lastNameDiv.appendChild(labelLastName);
        labelLastName.setAttribute('for', 'nom');
        labelLastName.textContent = 'Nom : ';

        const lastName = document.createElement('input');
        lastNameDiv.appendChild(lastName);
        lastName.setAttribute('type', 'text');
        lastName.setAttribute('class', 'input');
        lastName.name = "Nom"
        lastName.required = true;

        // ajout formulaire "mail"
        const mailDiv = document.createElement('div');
        form.appendChild(mailDiv);
        mailDiv.className = 'mail field';

        const labelMail = document.createElement('label');
        mailDiv.appendChild(labelMail);
        labelMail.setAttribute('for', 'email');
        labelMail.textContent = 'Adresse mail : ';

        const mail = document.createElement('input');
        mailDiv.appendChild(mail);
        mail.setAttribute('type', 'email');
        mail.setAttribute('class', 'input');
        mail.name = "Adresse mail"
        mail.required = true;

        // ajout formulaire "ville"
        const cityDiv = document.createElement('div');
        form.appendChild(cityDiv);
        cityDiv.className = 'city field';

        const labelCity = document.createElement('label');
        cityDiv.appendChild(labelCity);
        labelCity.setAttribute('for', 'ville');
        labelCity.textContent = 'Ville : ';

        const city = document.createElement('input');
        cityDiv.appendChild(city);
        city.setAttribute('type', 'text');
        city.setAttribute('class', 'input');
        city.name = "Ville"
        city.required = true;

        // ajout formulaire "adresse"
        const addressDiv = document.createElement('div');
        form.appendChild(addressDiv);
        addressDiv.className = 'adress field';

        const labelAdress = document.createElement('label');
        addressDiv.appendChild(labelAdress);
        labelAdress.setAttribute('for', 'adresse');
        labelAdress.textContent = 'Votre adresse : ';

        const address = document.createElement('textarea');
        addressDiv.appendChild(address);
        address.setAttribute('type', 'text');
        address.setAttribute('class', 'input');
        address.name = "Adresse"
        address.required = true;
        address.rows = 4;

        // Bouton de validation de la commande
        const submitDiv = document.createElement('div');
        form.appendChild(submitDiv);
        submitDiv.className = 'submit-order';

        let submit = document.createElement('button');
        submitDiv.appendChild(submit);
        submit.type = 'submit';
        submit.name = 'add';
        submit.id = 'valid';
        submit.textContent = "Valider votre commande";

        // Bouton de retour sur la page principale
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

        validateForm(storedProducts);
    }
}

function deleteArticle(storedProducts) {
    // Récupération de l'article associé au bouton de suppression
    let deleteButton = document.getElementsByClassName('delete-button');
    for (let i = 0 ; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click' , function () {
            //On cible l'élément le plus proche possédant la classe '.product-price'
            let id = this.closest('.product-price').id;

            //Suppression de l'article du localStorage
            storedProducts.splice(id, 1);

            //Enregistrement du nouveau localStorage
            localStorage.setItem('basket-content', JSON.stringify(storedProducts));
            JSON.parse(localStorage.getItem('basket-content'));
            localStorage.removeItem('totalPrice'); //le total price sera rechargé/mis à jour au chargement de la page avec href

            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html";
        })
    }
}

function clearbasket(clearCart) {
    const clearCartLink = document.createElement('a');
    clearCart.appendChild(clearCartLink);
    clearCartLink.href = "panier.html";
    clearCartLink.id = "clear-cart-link"
    clearCartLink.title = 'Vider le panier ?';

    const clearButtonIcon = document.createElement('i');
    clearCartLink.appendChild(clearButtonIcon);
    clearButtonIcon.className = 'fas fa-trash-alt';

    clearCart.addEventListener("click", function(event) {
        event.preventDefault();
        localStorage.removeItem('basket-content');
        localStorage.removeItem('totalPrice');
        alert('Le panier a été vidé !');
        window.location.href = "panier.html";
    })
}

//Tableau de prix des articles choisis
function addArticlePrice(storedProducts) {
    let arrayPrice = [];
    let result;
    for (storedProduct of storedProducts) {
        let articlePrice = storedProduct.productPrice;
        arrayPrice.push(articlePrice);
    };
    totalPriceOrder(arrayPrice);
    result = totalPriceOrder(arrayPrice);
    return result;
}

//Prix total de la commande
function totalPriceOrder(arrayPrice) {
    let totalPrice = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        totalPrice = totalPrice + arrayPrice[i];
    }
    //2ème possibilé :
    /*let totalPrice;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalPrice = arrayPrice.reduce(reducer, 0);*/
    return totalPrice;
}

//Contrôle de la validité du formulaire et de la validation de la commande
function controlDataInformation() {
    let firstName = document.getElementsByName('Prénom')[0];
    let lastName = document.getElementsByName('Nom')[0];
    let email = document.getElementsByName('Adresse mail')[0];
    let city = document.getElementsByName('Ville')[0];
    let address = document.getElementsByName('Adresse')[0];

    // création fonctions de validité prénom, nom, ville
    function isValid(value) {
        return /^[A-Z-a-z\s]{3,40}$/.test(value);
    }

    // Fonctions de validité mail
    function validMail(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    // Fonctions de validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value);
    }

    // Vérification de la validité du prénom
    firstName.addEventListener("change", function(event) {
        if (isValid(firstName.value)) {
        } else {
            alert( "Veuillez saisir un prénom valide ; Les chiffres et les symboles (-*,#~&) ne sont pas autorisés.");
            event.preventDefault();
        }
    });
    // Vérification de la validité du nom
    lastName.addEventListener("change", function(event) {
        if (isValid(firstName.value)) {
        } else {
            alert("Veuillez saisir un nom valide ; Les chiffres et les symboles (-*,#~&) ne sont pas autorisés.");
            event.preventDefault();
        }
    });
    // Vérification de la validité de l'adresse email
    email.addEventListener("change", function(event) {
        if (validMail(email.value)) {
        } else {
            alert("Veuillez saisir une adresse mail valide (exemple : adresse@mail.com).");
            event.preventDefault();
        }
    });
    // Vérification de la validité de la ville
    city.addEventListener("change", function(event) {
        if (isValid(city.value)) {
        } else {
            alert("Veuillez saisir un nom de ville valide ; Les chiffres et les symboles (-*,#~&) ne sont pas autorisés.");
            event.preventDefault();
        }
    });
    // Vérification de la validité de l'adresse
    address.addEventListener("change", function(event) {
        if (validAddress(address.value)) {
        } else {
            alert("Veuillez saisir une adresse postale valide ;Les symboles (-*,#~&) ne sont pas autorisés.");
            event.preventDefault();
        }
    });

    if (isValid(firstName.value)
        && isValid(lastName.value)
        && validMail(email.value)
        && validAddress(address.value)
        && isValid(city.value)) {
            return true;
            /*validateForm(storedProduct);*/
    }
    else {
        return false;
    }
}

//Validation des données du formulaire
function validateForm(storedProducts) {
    let buttonValidation = document.getElementById('valid'); /*si Classname est utilisé, index indispensable car retourne un tableau, ici id est préférable*/
    buttonValidation.addEventListener("click", function(event) {
        event.preventDefault();
        
        if (controlDataInformation()) {

            getFormData ();

            let products = productsToSend(storedProducts);
            let dataInformationOrder;
                dataInformationOrder = {
                    contact,
                    products,
                };

            console.log(dataInformationOrder);
            postOrder(dataInformationOrder);
        }
    })
}

//Intégration des données du formulaire dans l'objet contact
function getFormData() {
    let firstName = document.getElementsByName('Prénom')[0].value;
    let lastName = document.getElementsByName('Nom')[0].value;
    let email = document.getElementsByName('Adresse mail')[0].value;
    let city = document.getElementsByName('Ville')[0].value;
    let address = document.getElementsByName('Adresse')[0].value;
    contact = new ContactData(firstName, lastName, address, city, email);

    console.log(contact);
}

// création d'un tableau products (id des oursons du panier
function productsToSend(storedProducts) {
    let products = [];
    for (storedProduct of storedProducts) {
        let productsId = storedProduct.productId;
        products.push((productsId));
    }
    return products;
}

//Requête POST pour envoyer l'objet Contact et le tableau products à l'API
async function postOrder(dataInformationOrder) {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(dataInformationOrder),
            headers: {
                'Accept': 'application/json', 
                'content-type': 'application/json'
            }
            
        });
        if (response.ok) {
            let data = await response.json();
            console.log(data.orderId);
            localStorage.setItem("orderIdResponse", data.orderId);
            window.location = "../confirmation/confirmation.html";
            localStorage.removeItem("basket-content");
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    } 
}

displayQuantityInTheBasket();
controlDataInformation()