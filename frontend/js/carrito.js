let carrito = [];

const carritoContainer = document.querySelector(".container_cart");

function carritoAddToEvent() {
	const clickButton = document.querySelectorAll(".btn-add-to-cart");
	clickButton.forEach((btn) => {
		btn.addEventListener("click", addAddToCart);
	});
}

function addAddToCart(e) {
	const idProduct = e.target.dataset.id;

	const product = allProducts.find((product) => product._id == idProduct);
	console.log(product);

	const verifyCart = carrito.find((product) => product._id == idProduct);

	if (!verifyCart) {
		carrito.push({ ...product, cantidad: 1 });
	} else {
		const products = carrito.map((product) => {
			if (product._id == idProduct) {
				console.log(product.cantidad);
				return {
					...product,
					cantidad: product.cantidad + 1,
				};
			}
			return product;
		});
		carrito = products;
	}

	renderToCartList();
	carritoTotal();
}

function carritoTotal() {
	const spanTotalHtml = document.querySelector(".price-total");

	const totalCarrito = carrito
		.reduce((acc, product) => {
			console.log(acc, product.price);
			return acc + product.price * product.cantidad;
		}, 0)
		.toFixed(2);

	spanTotalHtml.innerHTML = `${totalCarrito}`;
	addLocalStorage();
}

function removeItemCart(e) {
	const id = e.target.closest(".removeCart").dataset.id;

	const newCart = carrito.filter((product) => product._id !== id);

	carrito = newCart;
	carritoTotal();
	renderToCartList();
}

function renderToCartList() {
	carritoContainer.innerHTML = "";
	carrito.forEach((product) => {
		const row = document.createElement("div");
		const content = `	<div class="shadow-md w-full justify-between flex items-center gap-2">
        <div class="flex gap-2 items-center">
            <img
                src=${product.image}
                class="w-16 h-full object-cover"
            />
            <div class="flex flex-col p-2">
                <span class="text-gray-700"> ${product.name} </span>
                <span class="text-gray-500"> $<span>${product.price}</span> </span>
       
                <span class="text-gray-700"> Cantidad: <span>${product.cantidad}</span> </span>
            </div>
        </div>
        
        <div 
     
        class="removeCart p-3 cursor-pointer"
        data-id=${product._id}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="currentColor"
                class="bi bi-trash3 hover:text-red-500"
                viewBox="0 0 16 16"
            >
                <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                />
            </svg>
        </div>
    </div>`;

		row.innerHTML = content;
		carritoContainer.append(row);
		row.querySelector(".removeCart").addEventListener("click", removeItemCart);
		carritoTotal();
	});
}

function addLocalStorage() {
	localStorage.setItem("cart", JSON.stringify(carrito));
}
