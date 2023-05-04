let allProducts = [];
function alertCustom(title, msg, type) {
  swal(title, msg, type);
}
let productsSearch = [];

const copyId = (id) => {
  navigator.clipboard.writeText(id);
  alertCustom("Listo", "ID copiado", "success");
};

const renderProducts = (products) => {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `<div class="flex flex-col relative items-center gap-2 shadow rounded-md">
            <img
                src=${product.image}
                alt="imagen"
                class="w-48 h-48 object-cover hover:scale-105 duration-300"
            />
			<div 
			onclick="copyId('${product._id}')"

			class="absolute top-0 mt-2 mr-2 px-1 py-0.5 cursor-pointer font-bold right-0 bg-black text-xs rounded-full text-white">
			  ID 
			</div>
            <div class="flex flex-col w-full p-2">
                <span class="">${product.name} </span>
                <span class="text-gray-600 text-sm"> $ ${product.price} </span>
                <button
                    data-id=${product._id}
                    class="btn-add-to-cart p-2 w-full bg-green-500 outline-none hover:opacity-50 duration-300 mt-2 font-medium text-white rounded-md"
                >
                    Añadir al carrito
                </button>
            </div>
        </div>`;
  });

  document.getElementById("container_product").innerHTML = productsHTML;
};

const fetchAllProducts = async () => {
  const verifyNew = localStorage.getItem("notNew");

  const response = await fetch(
    `https://ecommerce-sharan-1.onrender.com/api/products/?initial=${
      verifyNew === null ? "true" : verifyNew
    }`
  );
  const rta = await response.json();
  allProducts = rta;
  renderProducts(rta);
};

const searchProducts = () => {
  const keyword = document.getElementById("search").value;

  const filteredProducts = allProducts.filter((product) => {
    if (keyword === "") return true;

    return product.name.toLowerCase().includes(keyword.toLowerCase().trim());
  });

  console.log(filteredProducts);

  renderProducts(filteredProducts);
  carritoAddToEvent();
};

window.onload = async () => {
  await fetchAllProducts();
  localStorage.setItem("notNew", false);

  const storage = JSON.parse(localStorage.getItem("cart"));
  if (storage) {
    carrito = storage;
    renderToCartList(storage);
  }

  carritoAddToEvent();
};
