//Récupération de l'id
const url_string = window.location.href;
const url = new URL(url_string);
const id = url.searchParams.get("id");

console.log(id);

class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

fetch("http://localhost:3000/api/teddies/" + id)
    .then(data => data.json())
    .then(product => {
        console.log(product)

        // création div produit
        const productMain = document.getElementById('produit');

        // création div de l'ourson
        const productDivImg = document.createElement('div');
        productMain.appendChild(productDivImg);
        productDivImg.className = 'div-img-product';

        //ajout image à la div ourson
        const productImg = document.createElement('img');
        productDivImg.appendChild(productImg);
        productImg.className = 'product-photo';
        productImg.setAttribute('src', product.imageUrl);
        productImg.setAttribute('alt', 'Ours en peluche ' + product.name);
        productImg.setAttribute('title', 'Ours en peluche ' + product.name);

        //création div de présentation
        const productDivInfo = document.createElement('div');
        productMain.appendChild(productDivInfo);
        productDivInfo.className = 'product-info';

        // ajout nom teddy en titre H2
        const productH2 = document.createElement('h2');
        productDivInfo.appendChild(productH2);
        productH2.textContent = 'Ours en peluche ' + product.name;

        // Description
        const productDescription = document.createElement('p');
        productDivInfo.appendChild(productDescription);
        productDescription.className = 'description';
        productDescription.textContent = product.description;

        // Prix
        const productPrice = document.createElement('p');
        productDivInfo.appendChild(productPrice);
        productPrice.className = 'product-price';
        productPrice.textContent = product.price / 100 + ',00' + '€';

        // Choix de la couleur
        const form = document.createElement('form');
        productDivInfo.appendChild(form);
        const colorChoiceDiv = document.createElement('div');
        form.appendChild(colorChoiceDiv);
        colorChoiceDiv.className = 'color-choice';

        const label = document.createElement('label');
        colorChoiceDiv.appendChild(label);
        label.textContent = "Choisir une couleur :";
        label.setAttribute('for', "selection");     /* for de #selection, attribut non affiché! */

        const colorSelect = document.createElement('select');
        colorChoiceDiv.appendChild(colorSelect);
        colorSelect.setAttribute('name', "Quelle couleur pour" + product.name + "?"); /* colorSelectName, attibut non affiché donc variable dispensable */
        colorSelect.setAttribute('id', "selection");

        // Couleurs disponible par produit
        const colors = product.colors;

        for (i = 0; i < colors.length; i++) {
            const colorSelectOption = document.createElement('option');
            colorSelect.appendChild(colorSelectOption);
            colorSelectOption.textContent = colors[i];
            colorSelectOption.setAttribute("value", colors[i]);
        }

        /*const numberOfProductMinus = document.createElement('button');
        form.appendChild(numberOfProductMinus);
        numberOfProductMinus.type = 'button';
        numberOfProductMinus.className = 'buttonMinus';
        
        const numberOfProductMinusIcon = document.createElement('i');
        numberOfProductMinus.appendChild(numberOfProductMinusIcon);
        numberOfProductMinusIcon.className = 'fas fa-minus';

        let productQuantityInput = document.createElement('input');
        form.appendChild(productQuantityInput);
        productQuantityInput.className = 'quantityValue';
        productQuantityInput.setAttribute('type', "text");
        productQuantityInput.value = 0;

        const numberOfProductPlus = document.createElement('button');
        form.appendChild(numberOfProductPlus);
        numberOfProductPlus.type = 'button';
        numberOfProductPlus.className = 'buttonPlus';

        const numberOfProductPlusIcon = document.createElement('i');
        numberOfProductPlus.appendChild(numberOfProductPlusIcon);
        numberOfProductPlusIcon.className = 'fas fa-plus';

        document.getElementsByClassName("buttonMinus")
            .addEventListener("click", function() {
                document.getElementsByClassName("quantityValue")
                    .value = (++productQuantityInput.value) + '';
        });*/

        /*var u = 0;

        function buttonPlus() {
            u++;
        }

        function buttonMinus() {
            u--;
        }*/

        // création bouton panier
        let addProduct = document.createElement('button');
        form.appendChild(addProduct);
        addProduct.type = 'submit';
        addProduct.name = 'addToCart';
        addProduct.id = 'submit';
        addProduct.textContent = "AJOUTER AU PANIER";

        const addProductIcon = document.createElement('i');
        form.appendChild(addProductIcon);
        addProductIcon.className = 'fas fa-plus-circle';

        // récupérations données et envoie au panier
        addProduct.addEventListener("click", function (event) {
            event.preventDefault();

        // stockage des données du/des teddy souhaité dans localStorage
            let selectedProducts = {
                productName: product.name,
                productId: product._id,
                productColor: colorSelect.value,
                productImg: product.imageUrl,
                quantity: 1,
                productPrice: product.price / 100,
            };
            console.log(selectedProducts);

            let storedProducts = JSON.parse(localStorage.getItem('newArticle'));
            const productColor = colorSelect.value;
            if(storedProducts == null)
                storedProducts = [];
                storedProducts.push(selectedProducts);
                localStorage.setItem('newArticle', JSON.stringify(storedProducts));
                console.log(storedProducts);
                if (window.confirm(product.name + " " + productColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    window.location.href = "../panier/panier.html";
                } else {
                    window.location.href = "../vue/index.html";
                }
        });
    });


/* Pour éviter d'avoir un tableau null... existait à partir de la ligne 106 jusqu'à la fin*//*
 let storedProducts = JSON.parse(localStorage.getItem('newArticle'));
            const productColor = colorSelect.value;
            if(storedProducts) {
                storedProducts.push(selectedProducts);
                localStorage.setItem('newArticle', JSON.stringify(storedProducts));
                console.log(storedProducts);
                if (window.confirm(product.name + " " + productColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    window.location.href = "view/panier/panier.html";
                } else {
                    window.location.href = "view/vue/index.html";
                }
            } else {
                storedProducts = [];
                storedProducts.push(selectedProducts);
                localStorage.setItem('newArticle', JSON.stringify(storedProducts));
                console.log(storedProducts);
                if (window.confirm(product.name + " " + productColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                    window.location.href = "view/panier/panier.html";
                } else {
                    window.location.href = "view/vue/index.html";
                }
            }
*/