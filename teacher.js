import { db } from "../firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// ✅ Teacher Login by Email
function loginTeacher() {
  const email = document.getElementById("teacherLoginEmail")?.value.trim().toLowerCase();
  if (!email) return alert("Please enter your email to login.");

  const teacherRef = ref(db, "teachers");

  onValue(teacherRef, (snapshot) => {
    const data = snapshot.val();
    let matchedTeacher = null;

    for (const id in data) {
      if (data[id].email?.toLowerCase() === email) {
        matchedTeacher = { id, ...data[id] };
        break;
      }
    }

    if (matchedTeacher) {
      localStorage.setItem("teacherId", matchedTeacher.id);
      alert(`✅ Logged in as ${matchedTeacher.name}`);
      viewAppointments(); // Load appointments after login
    } else {
      alert("❌ Teacher not found. Check your email.");
    }
  }, (err) => {
    console.error("Firebase Error:", err);
    alert("🚨 Database error during login.");
  });
}

// ✅ View Appointments for Logged-in Teacher
function viewAppointments() {
  const teacherId = localStorage.getItem("teacherId");
  const container = document.getElementById("appointmentList");

  if (!teacherId) {
    return alert("❌ Please login first.");
  }

  const appointmentsRef = ref(db, "appointments");

  onValue(appointmentsRef, (snapshot) => {
    const data = snapshot.val();
    container.innerHTML = "";

    if (!data) {
      container.innerHTML = "📭 No appointments found.";
      return;
    }

    let html = "";
    let count = 0;

    Object.entries(data).forEach(([id, app]) => {
      if (app.teacherId === teacherId) {
        html += `
          <div class="appointment-card">
            <p><b>Student:</b> ${app.studentName}</p>
            <p><b>Email:</b> ${app.studentEmail}</p>
            <p><b>Time:</b> ${app.time}</p>
            <p><b>Status:</b> ${app.status}</p>
            <hr>
          </div>
        `;
        count++;
      }
    });

    container.innerHTML = count > 0 ? html : "📭 No appointments for you.";
  }, (err) => {
    console.error("Firebase Read Error:", err);
    container.innerHTML = "❌ Could not load appointments.";
  });
}

window.loginTeacher = loginTeacher;
window.viewAppointments = viewAppointments;
