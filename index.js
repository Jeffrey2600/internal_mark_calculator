const adminCredentials = {
      username: "admin",
      password: "password123"
    };

    const database = [
      { rollNo: "101", name: "Alice", internal1: 85, assignment1: 90, internal2: 88, assignment2: 92 },
      { rollNo: "102", name: "Bob", internal1: 75, assignment1: 80, internal2: 78, assignment2: 82 },
    ];

    function calculateMarks() {
      const assignment1 = parseFloat(document.getElementById('assignment1').value) || 0;
      const test1 = parseFloat(document.getElementById('test1').value) || 0;
      const assignment2 = parseFloat(document.getElementById('assignment2').value) || 0;
      const test2 = parseFloat(document.getElementById('test2').value) || 0;

      if (assignment1 < 0 || assignment1 > 100 || test1 < 0 || test1 > 100 || assignment2 < 0 || assignment2 > 100 || test2 < 0 || test2 > 100) {
        document.getElementById('result').innerText = 'Please enter valid marks between 0 and 100.';
        return;
      }

      const internalMarks = (assignment1 + test1+ assignment2 + test2) / 4; 
      document.getElementById('result').innerText = `Your Internal Marks: ${internalMarks.toFixed(2)}`;
    }

    function openAdminLogin() {
      document.getElementById('adminModal').style.display = 'block';
    }

    function authenticateAdmin() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === adminCredentials.username && password === adminCredentials.password) {
        alert('Login successful! Redirecting to admin page...');
        window.location.href = 'admin.html';
      } else {
        alert('Invalid username or password.');
      }

      document.getElementById('adminModal').style.display = 'none';
    }

    function searchStudent() {
      const rollNo = document.getElementById('searchRollNo').value;
      const student = database.find(student => student.rollNo === rollNo);

      if (student) {
        document.getElementById('searchResult').innerHTML = `
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Roll No:</strong> ${student.rollNo}</p>
          <p><strong>Internal 1:</strong> ${student.internal1}</p>
          <p><strong>Assignment 1:</strong> ${student.assignment1}</p>
          <p><strong>Internal 2:</strong> ${student.internal2}</p>
          <p><strong>Assignment 2:</strong> ${student.assignment2}</p>
        `;
      } else {
        document.getElementById('searchResult').innerText = 'No student found with the entered Roll No.';
      }
    }