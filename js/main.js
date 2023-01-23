// import Loginn from "./login.js";    login pageda hammasi ishlayabdi  import qilishda kamchilik bor
import Sliderr from "./slider.js";
//  localStorage  dan bookmark o'chirilsa darkmode ishlamay qolayabdi  ???
const body = document.querySelector("body");
const mainPosts = document.querySelector(".main");
const Bookmarks = document.querySelector(".select-bookmarks");
const elTopCards = document.querySelector(".swiper-wrapper");
const BottomCards = document.querySelector(".main-bottom");
const elSearch = document.querySelector("#search");
const Select = document.querySelector("#select");
const AllResult = document.querySelector(".result");

const elBody = document.querySelector("body");
const logout = document.querySelector(".logout");
const signapp = document.querySelector(".sign-app");
const mode = document.querySelector(".mode");

//   API  post  qilish
let arrPosts = [];

fetch("https://63c3b5c0a9085635752b7972.mockapi.io/create")
  .then((res) => res.json())
  .then((data) => {
    arrPosts = data;
    render(arrPosts);

    // search
    elSearch.addEventListener("input", () => {
      const elSearchValue = elSearch.value.trim();
      const elReg = new RegExp(elSearchValue, "gi");
      const filterItem = arrPosts.filter((element) =>
        element.title.match(elReg)
      );
      if (filterItem.length > 0) {
        BottomCards.textContent = "";
        render(filterItem);
      }
    });

    // SELECT

    const optionSelect = (data) => {
      const postIds = [];
      const selectFragment = document.createDocumentFragment();
      const Option = document.createElement("option");
      Option.textContent = "All";
      Option.value = "All";
      selectFragment.appendChild(Option);

      data.forEach((element) => {
        if (!postIds.includes(element.createdAt)) {
          postIds.push(element.createdAt);

          const Option = document.createElement("option");
          Option.textContent = element.createdAt;
          Option.value = element.createdAt;
          selectFragment.appendChild(Option);
        }
      });
      Select.appendChild(selectFragment);
    };
    optionSelect(data);

    Select.addEventListener("change", (e) => {
      const createdAt = e.target.value;
      BottomCards.textContent = "";
      const result = arrPosts.filter((post) => {
        if (post.createdAt == createdAt) {
          return post;
        }
      });

      if (createdAt === "All") {
        render(arrPosts);
      } else {
        render(result);
      }
    });
  });

//   render  cards
function render(date) {
  date.forEach((element) => {
    const fragment = document.createDocumentFragment();
    const card = document.createElement("div");
    card.className = "  shadow p-2 rounded-2 text-center w-25";
    card.innerHTML = `
    <img  style="min-height: 300px; max-height: 300px;"  src="${element.banner}" class="rounded-2 mb-1 w-100" alt="image">
    <h5>${element.title}</h5>
    <p>${element.description}</p>
    <span>${element.createdAt}</span>
    <div class="d-flex justify-content-between mt-1 mb-1 gap-2">
      <button class="bookmark   btn w-50 bg-warning text-dark " data-id='${element.id}'>Bookmark</button>
      <button class="btn w-50 bg-light text-info" data-id='${element.id}'>More info</button>
    </div>
    <button class="btn w-100 bg-secondary text-white">Read</button>
    `;
    fragment.appendChild(card);
    BottomCards.appendChild(fragment);

    // //  swipper
    const swiper = document.createElement("div");
    swiper.className =
      "swiper-slide  text-center ms-2 me-2  shadow p-3 rounded-2  w-25";
    swiper.innerHTML = `
       <img  style="min-height: 270px; max-height: 270px;"  src="${element.banner}" class="rounded-2 mb-1 w-100 alt="image">
       <h5>${element.title}</h5>
       <p>${element.description}</p>
       <span>${element.createdAt}</span>
     <div class="d-flex justify-content-between mt-1 mb-1 gap-2">
       <button class="bookmark   btn w-50 bg-warning text-dark " data-id='${element.id}'>Bookmark</button>
       <button class="more-info btn w-50 bg-light text-info" data-id='${element.id}'>More info</button>
     </div>
     <button class="btn w-100 bg-secondary text-white">Read</button>
    `;

    elTopCards.appendChild(swiper);
  });
}

let book = [
  {
    title: "title 1 ",
    description: "Miss Flora Marvin ",
  },
];
mainPosts.addEventListener("click", function (e) {
  const Target = e.target;
  const id = Target.dataset.id;
  if (Target.matches(".bookmark")) {
    fetch(`https://63c3b5c0a9085635752b7972.mockapi.io/create/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const newPost = {
          id: data.id,
          title: data.title,
          description: data.description,
        };
        book.push(newPost);

        console.log(book);
        window.localStorage.setItem("items", JSON.stringify(book));
        // window.location.reload();
      });
  }
});

const result = JSON.parse(window.localStorage.getItem("items"));

SelectBookmarks(result);
function SelectBookmarks(results) {
  // Bookmarks.textContent = ""
  results.forEach((element) => {
    const selectCards = document.createElement("div");
    selectCards.className = "d-flex justify-content-between  shadow p-2";
    selectCards.innerHTML = `
     <div>
        <h5>${element.title}
        </h5>
        <p >${element.description}
        </p>
     </div>
     <div class="d-flex mt-2 gap-1">
        <img src="../images/book-open.png" alt="book" width="20" height="20">
        <img src="../images/delete.png" alt="delete" class="delete" data-id='${element.id}' width="20" height="20">
    </div>
    `;

    Bookmarks.appendChild(selectCards);
  });
}

//  bookmark  delete
// Bookmarks.addEventListener("click", function (e) {
//   const Target = e.target;
//   const id = Target.dataset.id;
//   console.log(id);
//   if (Target.matches(".delete")) {
//     localStorage.removeItem("items");
//     // //  SelectBookmarks(result)
//   }
// });
///////   single page
// function SinglePage(single ,parent) {
//
//   mainPosts.addEventListener("click", function (e) {
//     const Target = e.target;
//     const id = Target.dataset.id;

//     if (Target.matches(".more-info")) {
//       // fetch(`https://63c3b5c0a9085635752b7972.mockapi.io/create/${id}`)
//       //   .then((res) => res.json())
//       //   .then((data) => {
//       //     data.forEach((element) => {
//       //       const single = document.createElement("div");
//       //       single.className = "d-flex flex-row gap-3";
//       //       single.innerHTML = `
//       //         <img src="${element.banner}" alt="image" height="500">
//       //         <h2> ${element.title}</h2>
//       //         <h2> ${element.description}</h2>
//       //         <h4> ${element.abaout}</h4>
//       //         <h3> ${element.description} . ${element.createdAt}</h3>
//       //         `;
//       //     });
//       //   });
//       window.location.href = "http://127.0.0.1:5501/pages/SingePage.html";
//     }
//     //
//   });
//   //
// }
// export default SinglePage() ;

//   This codes for  select button
// Loginn()
// if (!"token") {
//   logout.style.display = "none";
//   signapp.style.display = "block";
//   console.log("token yo'q");
// } else if ("token") {
//   logout.style.display = "block";
//   signapp.style.display = "none";
//   console.log("token bor");
// }

logout.addEventListener("click", (e) => {
  window.location.href = "http://127.0.0.1:5501/pages/admin.html";
});
signapp.addEventListener("click", (e) => {
  window.location.href = "http://127.0.0.1:5501/pages/login.html";
});

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    elBody.classList.add("light-mode");
  }
});
mode.addEventListener("click", () => {
  elBody.classList.toggle("light-mode");
  if (elBody.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
//  OVOZ ORQALI backgroundColor  berish
const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

mode.onclick = function () {
  alert("Ovoz orqali O'zgartirish mumkin");
  recognition.start();
  console.log("Ready to receive a color command.");
};
recognition.onresult = function (event) {
  const color = event.results[0][0].transcript;
  body.style.backgroundColor = color;
};
// SLIDER CODE
Sliderr();
