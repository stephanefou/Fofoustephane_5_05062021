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
        document.getElementById("produit").innerHTML += `<div class="div-img-product">
                                                            <img class="product__photo" src="../../img/teddy_1.jpg" alt="Ours en peluche brun">
                                                        </div>
                                                        <div>
                                                            <h3 class="title">Ours en peluche Name</h3>
                                                            <p class="description">product-description</p>
                                                            <span price></span>
                                                            <div class="form">
                                                                <div class="color_choice">
                                                                    <label for="Choix de couleurs pour ours Name">Choix de la couleur : </label>
                                                                    <select name="Choix de couleurs pour ours Name" id="select_1 ">
                                                                        <option value="Tan">Tan</option>
                                                                        <option value="Chocolate">Chocolate</option>
                                                                        <option value="Black">Black</option>
                                                                        <option value="White">White</option>
                                                                    </select>
                                                                </div>
                                                                <button type="submit" name="addToCart" id="submit">Ajouter au panier</button>
                                                            </div>
                                                        </div>`;
    });


