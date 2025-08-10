import { db } from "../firebase-config.js";
import { ref, set, push } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

window.registerStudent = function () {
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();

  if (!name || !email) {
    alert("⚠️ Please enter both name and email.");
    return;
  }

  const studentId = push(ref(db, "students")).key;

  set(ref(db, "students/" + studentId), {
    id: studentId,
    name,
    email
  })
    .then(() => {
      alert("✅ Student registered successfully.");
      document.getElementById("studentName").value = "";
      document.getElementById("studentEmail").value = "";
    })
    .catch((error) => {
      console.error("❌ Registration failed:", error);
      alert("❌ Failed to register student.");
    });
};

// ✅ Search Teacher by Subject
window.searchTeacher = function () {
  const subject = document.getElementById("searchSubject").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = "Searching...";

  const teacherRef = ref(db, "teachers");

  onValue(teacherRef, (snapshot) => {
    const data = snapshot.val();
    resultsDiv.innerHTML = "";
    let found = false;

    for (let key in data) {
      const teacher = data[key];
      if (teacher.subject && teacher.subject.toLowerCase().includes(subject)) {
        resultsDiv.innerHTML += `
          <div class="teacher-result">
            <h4>${teacher.name}</h4>
            <p><b>Subject:</b> ${teacher.subject}</p>
            <p><b>Email:</b> ${teacher.email}</p>
            <p><b>ID:</b> ${teacher.id}</p>
          </div><hr/>
        `;
        found = true;
      }
    }

    if (!found) {
      resultsDiv.innerHTML = "❌ No matching teachers found.";
    }
  }, (error) => {
    console.error("Search failed:", error);
    resultsDiv.innerHTML = "⚠️ Error loading teachers.";
  });
};

// ✅ Book Appointment with Student Info

window.bookAppointment = function () {
  const teacherId = document.getElementById("appointmentTeacherId").value.trim();
  const time = document.getElementById("appointmentTime").value.trim();
  const studentName = document.getElementById("appointmentStudentName").value.trim();  // ✅ fixed
  const studentEmail = document.getElementById("appointmentStudentEmail").value.trim();  // ✅ fixed

  console.log({ teacherId, time, studentName, studentEmail }); // debug

  if (!teacherId || !time || !studentName || !studentEmail) {
    alert("⚠ Please fill all fields.");
    return;
  }

  const appointmentId = push(ref(db, "appointments")).key;

  const appointmentData = {
    appointmentId,
    teacherId,
    time,
    studentName,
    studentEmail,
  };

  set(ref(db, "appointments/" + appointmentId), appointmentData)
    .then(() => {
      alert("✅ Appointment booked successfully!");
    })
    .catch((error) => {
      console.error("Error booking appointment:", error);
      alert("❌ Failed to book appointment.");
    });
};


  



