const loadServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displaydata(data))
    .catch((err) => console.log(err));
};

const displaydata = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("service-container");
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="card shadow h-100">
    <div class="ratio ratio-16x9">
      <img src=${service.image} class="card-img-top" loading="lazy" alt="Service image" />
    </div>
    <div class="card-body p-3 p-xl-5">
      <h3 class="card-title h5">${service.name}</h3>
      <p class="card-text">${service.description.slice(0, 100)}</p>
      <a href="#" class="btn btn-primary">Details</a>
    </div>
  </div>
    `;
    parent.appendChild(li);
  });
};
const loadDoctors = (search) => {
  document.getElementById("spinner").style.display = "block";
  fetch(` https://testing-8az5.onrender.com/doctor/list/?search=${search ? search : ""}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("nodata").style.display = "none";
        displayDoctors(data?.results);
      } else {
        document.getElementById("doctors").innerHTML = "";
        document.getElementById("nodata").style.display = "block";
        document.getElementById("spinner").style.display = "none";
      }
    });
};

const displayDoctors = (doctors) => {
  document.getElementById("doctors").innerHTML = " ";
  doctors?.forEach((doctor) => {
    const parent = document.getElementById("doctors");
    const div = document.createElement("div");
    div.classList.add("doctor");
    div.innerHTML = `
    <img src=${doctor.image} class="card-img-top" alt="Doctor image" />
    <div class="card-body">
      <h4 class="card-title">${doctor?.full_name}</h4>
      <h5>${doctor?.designation[0]}</h5>
      <p>Beyond just treating symptoms,we believe in addressing the root causes of illness and promoting holistic well-being.</p>
      ${doctor?.specialization?.map((item) => {
        return `<span class=specialization>${item}</span>`;
      })}
      <a href="#" class="btn btn-primary">Details</a>
    </div>
    `;
    parent.appendChild(div);
  });
};

const loadDesignation = () => {
  fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("designation");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerText = `${item?.name}`;
        parent.appendChild(li);
      });
    });
};

const loadSpecialization = () => {
  fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const parent = document.getElementById("specialization");
      data.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')" >${item.name}</li>
        `;
        parent.appendChild(li);
      });
    });
};

const loadSearch = () => {
  const value = document.getElementById("search").value;
  loadDoctors(value);
};

const loadReview = () => {
  fetch("https://smart-care.onrender.com/doctor/reviews/")
    .then((res) => res.json())
    .then((data) => displayReview(data));
};

const displayReview = (reviews) => {
  const parent = document.getElementById("reviews");
  reviews.forEach((review) => {
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `
        <img src="./images/girl.png" alt="">
        <h4>Dr. Abraham Jangali</h4>
        <h4>${review.rating}</h4>
        <p>${review.body.slice(0, 200)}</p>
        <p>Created Time: ${review.created}</p>
        `;
    parent.appendChild(div);
  });
};

loadServices();
loadDoctors();
loadDesignation();
loadSpecialization();
loadReview();
