const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("docId");
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

    fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) =>  doctorReview(data));
};

const displayDetails = (doctor) => {
  console.log(doctor);
  const parent = document.getElementById("doctor-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
  <img src="${doctor.image}" alt="">
  <div>
  <h3>${doctor.full_name}</h3>
  ${doctor.specialization.map((item) => {
    return `<p class="btn btn-primary btn-sm">${item}</p>`
    })}
    <h4>${doctor.designation}</h4>
    <p>Doctor reviews provide valuable insights into the experiences of patients who have visited a particular healthcare provider.</p>
    <h3>Fees: ${doctor.fee} BDT</h3>
    <button class="btn btn-secondary">TAKE APPOINMENT</button>
  </div>
  `
  parent.appendChild(div)
}

const doctorReview = (reviews) => {
    console.log(reviews);
    const parent = document.getElementById("reviews");
    reviews.forEach((review) => {
      const div = document.createElement("div");
      div.classList.add("review");
      div.innerHTML = `
          <img src="./images/girl.png" alt="">
          <h3>${review.doctor}</h3>
          <h4>${review.reviewer}</h4>
          <h4>${review.rating}</h4>
          <p>${review.body.slice(0, 200)}</p>
          <p>Created Time: ${review.created}</p>
          `;
      parent.appendChild(div);
    });
  };

getparams();






    // 
    // 
    // 
    // `;