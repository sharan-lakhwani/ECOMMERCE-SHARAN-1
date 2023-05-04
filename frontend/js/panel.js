function alertaSucess() {
  swal("Listo", "Producto creado.", "success");
}

function alertCustom(title, msg, type) {
  swal(title, msg, type);
}

const createProduct = async (e) => {
  e.preventDefault();

  const name = document.getElementById("nameProductCreate").value;

  const price = document.getElementById("priceProductCreate").value;
  const image = document.getElementById("imageProductCreate").value;

  try {
    const rta = await fetch(
      "https://ecommerce-sharan-1.onrender.com/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,

          image,
          price,
        }),
      }
    );
    if (!rta.ok) return alertCustom("Hubo un error", "Lo siento", "error");
    alertCustom("Listo", "Producto creado", "success");
  } catch (error) {
    return alertCustom("Hubo un error", "Lo siento", "error");
  }
};

const editProduct = async (e) => {
  e.preventDefault();

  const idProduct = document.getElementById("idProductEdit").value;
  const name = document.getElementById("nameProductEdit").value;

  const price = document.getElementById("priceProductEdit").value;
  const image = document.getElementById("imageProductEdit").value;

  try {
    const rta = await fetch(
      `https://ecommerce-sharan-1.onrender.com/api/products/${idProduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,

          image,
          price,
        }),
      }
    );
    if (!rta.ok) return alertCustom("Hubo un error", "Lo siento", "error");
    alertCustom("Listo", "Producto editado", "success");
  } catch (error) {
    alertaError();
  }
};

const deleteProduct = async (e) => {
  e.preventDefault();
  const idProduct = document.getElementById("idProductDelete").value;
  try {
    const rta = await fetch(
      `https://ecommerce-sharan-1.onrender.com/api/products/${idProduct}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!rta.ok) return alertCustom("Hubo un error", "Lo siento", "error");
    alertCustom("Listo", "Producto eliminado", "success");
    idProduct = "";
  } catch (error) {
    alertaError();
  }
};
