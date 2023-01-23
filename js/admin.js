const elForm = document.querySelector(".form");

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let Target = e.target;
  let Title = Target.title.value;
  let Description = Target.username.value;
  let Image = Target.image.value;
  let Mounth = Target.mounth.value;
  const newPost = {
    title: Title,
    description: Description,
    banner: Image,
    createdAt: Mounth,
  };
  fetch(`https://63c3b5c0a9085635752b7972.mockapi.io/create`, {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Post Muvoffaqqiyatli qo'shildi");
      window.location.reload();
    });
});
