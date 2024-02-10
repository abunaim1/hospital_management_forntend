const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("docId");
  loadTime(param);
  fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

  fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => doctorReview(data));
};

const displayDetails = (doctor) => {
  const parent = document.getElementById("doctor-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
  <img src="${doctor.image}" alt="">
  <div>
  <h3>${doctor.full_name}</h3>
  ${doctor.specialization.map((item) => {
    return `<p class="btn btn-primary btn-sm">${item}</p>`;
  })}
    <h4>${doctor.designation}</h4>
    <p>Doctor reviews provide valuable insights into the experiences of patients who have visited a particular healthcare provider.</p>
    <h3>Fees: ${doctor.fee} BDT</h3>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Take an appoinment</button>
  </div>
  `;
  parent.appendChild(div);
};

const doctorReview = (reviews) => {
  const parent = document.getElementById("doctor-review");
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
const loadTime = (id) => {
  fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("doctor-time");
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.name;
        parent.appendChild(option);
      });
    });
};

const handleAppoinment = () => {
  const param = new URLSearchParams(window.location.search).get("docId");
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById("symptom").value;
  const time = document.getElementById("doctor-time");
  const selectedTime = time.options[time.selectedIndex];
  const info = {
    appointment_type: selected.value,
    appointment_status: "Pending",
    time: selectedTime.value,
    symptom: symptom,
    cancel: false,
    patient: 1,
    doctor: param,
  };
  fetch("https://testing-8az5.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
loadTime();
getparams();
