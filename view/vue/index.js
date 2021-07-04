const getProductList =  async function() {
    //récupération des données de l'API 
    try {
        let response = await fetch('http://localhost:3000/api/teddies/');
        if (response.ok) {
            let products = await response.json();
            console.log(products);

            for (let product of products) {
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
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
}

//appel de la fonction getTeddies
getProductList();

/*//Création d'articles pour chaque produit
                const productsArticle = document.createElement('article');
                productsDiv.appendChild(productsArticle);
        
                //Création d'un lien vers produit.html pour chaque article
                const productLink = document.createElement("a");
                productLink.href = "../../view/produit/produit.html?id=" + product._id;
                productsArticle.appendChild(productLink);
                productLink.setAttribute('title', "Ours en peluche" + product.name);

                //Création d'un div pour l'image
                const productImgDiv = document.createElement('div');
                productsArticle.appendChild(productImgDiv);
                productImgDiv.className = 'div-img';

                //création image du produit
                const productImg = document.createElement('img');
                productImgDiv.appendChild(productImg);
                teddyImg.setAttribute('src', product.imageUrl);
                teddyImg.setAttribute('alt', 'Ours en peluche brun fait main');
                productImg.className = 'article-card__photo';
        
                
                
        
                //création div teddyRef
                const teddiesRef = document.createElement('div');
                productLink.appendChild(teddiesRef);
                teddiesRef.className = 'teddies_ref';
        
                //création h3 de teddyRef
                const h3TeddiesRef = document.createElement('h3');
                teddiesRef.appendChild(h3TeddiesRef);
                h3TeddiesRef.textContent = teddy.name;
        
                //création p de teddyRef
                const pTeddiesRef = document.createElement('p');
                teddiesRef.appendChild(pTeddiesRef);
                pTeddiesRef.textContent = teddy.price / 100 + " €";*/