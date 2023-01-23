const logout = document.querySelector(".logout");
const signapp = document.querySelector(".sign-app");
const elForm = document.querySelector(".form");
const Exit = document.querySelector(".exit");
const Admin = document.querySelector(".lgn");
// function Loginn() {

Exit.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5501/index.html";
});

let error = document.querySelector(".error-message");
elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    email: e.target.email.value,
    password: e.target.password.value,
    phone: e.target.phone.value,

    name: "name",
    inn: 123123,
    company_name: "kompany",
    type: "partner",
    bank_account: "asdasd",
    bank_name: "bank",
    mfo: 12123123321123,
    company_address: "asdasdwqeq",
  };

  (async function () {
    try {
      const res = await fetch("https://backend.gazoil.uz/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        window.location.href = "http://127.0.0.1:5501/pages/admin.html";
      } else {
        error.style.display = "block";
        error.textContent = "Email yoki parol oldin ishlatilgan";

        setTimeout(() => {
          error.style.display = "none";
        }, 3000);
      }

      localStorage.setItem("token", "token");
    } catch (error) {
      console.log(error);
    }
  })();
});

// }
// export default Loginn;
const getItem = localStorage.getItem("token");

Admin.addEventListener("click", () => {
  if (getItem != "token") {
    let error = document.querySelector(".error-message");
    error.style.display = "block";
    error.textContent = "Iltimos oldin ro'yxatdan o'ting !";
  } else if (getItem == "token") {
    window.location.href = "http://127.0.0.1:5501/pages/admin.html";
  }
});
