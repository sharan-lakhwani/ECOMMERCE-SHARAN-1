function alertCustom(title, msg, type) {
	swal(title, msg, type);
}

const signup = async (e) => {
	e.preventDefault();

	const emailInput = document.getElementById("email-signup").value;
	const passwordInput = document.getElementById("password-signup").value;
	const nameInput = document.getElementById("name").value;
	const countryInput = document.getElementById("country").value;

	try {
		const response = await fetch("http://localhost:3000/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: emailInput,
				password: passwordInput,
				name: nameInput,
				country: countryInput,
			}),
		});

		//

		const data = await response.json();

		if (!response.ok) {
			return alertCustom("Hubo un error", data.message, "error");
		}

		alertCustom("Listo", data.message, "success");
	} catch (error) {
		return alertCustom("Hubo un error", "Lo siento", "error");
	}
};

const signin = async (e) => {
	e.preventDefault();

	console.log("signin");

	const emailInput = document.getElementById("email-signin").value;
	const passwordInput = document.getElementById("password-signin").value;

	try {
		const response = await fetch("http://localhost:3000/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: emailInput,
				password: passwordInput,
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return alertCustom("Hubo un error", data.message, "error");
		}

		alertCustom("Listo", data.message, "success");
	} catch (error) {
		return alertCustom("Hubo un error", "Lo siento", "error");
	}
};
