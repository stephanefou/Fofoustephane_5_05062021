function getOrderInformation () {
    // Récupération de l'id de la commande
    let orderId = localStorage.getItem('orderIdResponse');
    console.log(orderId);

    // Récupération du prix total de la commande
    let totalPrice = localStorage.getItem('totalPrice');
    console.log(totalPrice);

    // Récupération de l'information de session active
    let markup = localStorage.getItem('markup');

    createConfirmationPage (orderId, totalPrice, markup);
}

function createConfirmationPage (orderId, totalPrice, markup) {
    // si le panier est vide, aucune données dans le local storage
    if(markup == null || markup === 0) {
        window.location.href = '../vue/index.html';
    }

    if(totalPrice == null || totalPrice === 0) {
        
        const confirmationMain = document.getElementById('confirmation-main');
        const confirmOrderDiv = document.createElement('div');
        confirmationMain.appendChild(confirmOrderDiv);
        confirmOrderDiv.className = 'confirmation-order-empty';

        const confirmationH2 = document.createElement('h2');
        confirmOrderDiv.appendChild(confirmationH2);
        confirmationH2.textContent = "Votre commande a bien été prise en compte !";

        const emptyCartConfirm = document.createElement('p');
        confirmOrderDiv.appendChild(emptyCartConfirm);
        emptyCartConfirm.className = "empty-cart-confirm";
        emptyCartConfirm.textContent = "Vous allez être redirigé vers la page principale...";

        // Bouton de retour sur la page principale
        const home = document.createElement('div');
        confirmOrderDiv.appendChild(home);
        home.className = 'home';

        const homeButton = document.createElement('button');
        home.appendChild(homeButton);

        const homeLink = document.createElement('a');
        homeButton.appendChild(homeLink);
        homeLink.href = '../vue/index.html';
        homeLink.title = '< Retourner à la liste des produits';
        homeLink.textContent = "< Continuer mes achats";
        
        window.location.href = '../vue/index.html';
        /*setTimeout(function redirect() {
            window.location.href = '../vue/index.html';
        }, 7000);*/
        //suppression du marquage de session | fin de session
        localStorage.removeItem('markup');

    } else {
        //création des éléments html de la page confirmation
        const confirmationMain = document.getElementById('confirmation-main');
        const confirmOrderDiv = document.createElement('div');
        confirmationMain.appendChild(confirmOrderDiv);
        confirmOrderDiv.className = 'confirmation-order';

        const confirmationH2 = document.createElement('h2');
        confirmOrderDiv.appendChild(confirmationH2);
        confirmationH2.textContent = "Oribears vous remercie de votre commande !";

        const confirmationText = document.createElement('p');
        confirmOrderDiv.appendChild(confirmationText);
        confirmationText.textContent = "Votre commande a bien été enregistrée.";

        const confirmationText2 = document.createElement('p');
        confirmOrderDiv.appendChild(confirmationText2);
        confirmationText2.innerHTML = "Vos oursons sont en préparation et serons bientôt en route vers l'adresse de livraison.<br />Veuillez trouver ci-dessous le récapitulatif de votre commande."

        const confirmationText3 = document.createElement('p');
        confirmOrderDiv.appendChild(confirmationText3);
        confirmationText3.textContent = "A très vite chez Oribears !"

        // Récapitulatif de la commande
        const orderResumeDiv = document.createElement('div');
        confirmOrderDiv.appendChild(orderResumeDiv);
        orderResumeDiv.className = 'order-resume';

        const confirmationH2Bis = document.createElement('H2');
        orderResumeDiv.appendChild(confirmationH2Bis);
        confirmationH2Bis.textContent = "Récapitulatif de votre commande : ";

        const orderIdResume = document.createElement('p');
        orderResumeDiv.appendChild(orderIdResume);
        orderIdResume.textContent = "Numéro de commande : ";
        orderIdResume.className = "order-id-resume";

        const orderIdDisplay = document.createElement('span');
        orderIdResume.appendChild(orderIdDisplay);
        orderIdDisplay.textContent = orderId;

        const totalPriceResume = document.createElement('p');
        orderResumeDiv.appendChild(totalPriceResume);
        totalPriceResume.textContent = "Montant de votre commande : ";
        totalPriceResume.className = "total-price-resume";

        const confirmationPrice = document.createElement('span');
        totalPriceResume.appendChild(confirmationPrice);
        confirmationPrice.textContent = totalPrice;

        // Bouton de retour à la page principale
        const home = document.createElement('div');
        confirmationMain.appendChild(home);
        home.className = 'home';

        const homeButton = document.createElement('button');
        home.appendChild(homeButton);

        const homeLink = document.createElement('a');
        homeButton.appendChild(homeLink);
        homeLink.href = '../vue/index.html';
        homeLink.title = '< Retourner à la liste des produits';
        homeLink.textContent = "< Continuer mes achats";

        // Nettoyage du localStorage
        localStorage.removeItem('basket-content');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('orderIdResponse');
    }
}

function redirect() {
    window.location.href = '../vue/index.html';
}

getOrderInformation ();