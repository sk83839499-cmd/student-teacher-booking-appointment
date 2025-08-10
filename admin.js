// app.js
import { db } from "./firebase-config.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Add Teacher
window.addTeacher = function () {
  const name = document.getElementById("adminTeacherName").value.trim();
  const department = document.getElementById("adminTeacherDept").value.trim();
  const subject = document.getElementById("adminTeacherSubject").value.trim();
  const email = document.getElementById("adminTeacherEmail").value.trim();

  if (!name || !department || !subject || !email) {
    alert("Please fill all teacher details");
    return;
  }

  const newRef = push(ref(db, "teachers"));
  set(newRef, {
    id: newRef.key,
    name,
    department,
    subject,
    email
  }).then(() => {
    alert("Teacher added successfully");
    loadTeachers();
    document.getElementById("adminTeacherName").value = "";
    document.getElementById("adminTeacherDept").value = "";
    document.getElementById("adminTeacherSubject").value = "";
    document.getElementById("adminTeacherEmail").value = "";
  }).catch((error) => {
    alert("Error: " + error);
  });
};

// Load Teachers
window.loadTeachers = function () {
  const container = document.getElementById("teacherList");
  container.innerHTML = "Loading...";

  onValue(ref(db, "teachers"), (snapshot) => {
    const data = snapshot.val();

    if (!data) {
      container.innerHTML = "No teachers found.";
      return;
    }

    container.innerHTML = Object.values(data).map(t => `
      <div style="margin-bottom:10px">
        <b>${t.name}</b> - ${t.subject} (${t.department})<br/>
        <small>ID: ${t.id}</small>
        <hr/>
      </div>
    `).join("");
  });
};

// Load on page ready
window.addEventListener("DOMContentLoaded", loadTeachers);
