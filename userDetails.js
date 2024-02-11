const loaduserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      const parent = document.getElementById("user-detais-container");
      const div = document.createElement("div");
      div.classList.add("user-info");
      div.innerHTML = `
          <h1>${data.username}</h1>
          <h3>${data.email}</h3>
          <h3>${data.first_name}</h3>
          <h3>${data.last_name}</h3>
        `;
      parent.appendChild(div);
    });
};
loaduserDetails();
