
    let students = JSON.parse(localStorage.getItem('students')) || [];

    function renderTable() {
      const tableBody = document.getElementById('studentTable');
      tableBody.innerHTML = '';
      students.forEach((student, index) => {
        tableBody.innerHTML += `
          <tr>
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.internal1}</td>
            <td>${student.assignment1}</td>
            <td>${student.internal2}</td>
            <td>${student.assignment2}</td>
            <td class="actions">
              <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
          </tr>`;
      });
    }

    function addStudent() {
      const name = document.getElementById('name').value;
      const rollNo = document.getElementById('rollNo').value;
      const internal1 = document.getElementById('internal1').value;
      const assignment1 = document.getElementById('assignment1').value;
      const internal2 = document.getElementById('internal2').value;
      const assignment2 = document.getElementById('assignment2').value;

      if (!name || !rollNo) {
        alert('Name and Roll No are required!');
        return;
      }

      students.push({ name, rollNo, internal1, assignment1, internal2, assignment2 });
      localStorage.setItem('students', JSON.stringify(students));
      renderTable();
    }

    function editStudent(index) {
      const student = students[index];
      document.getElementById('name').value = student.name;
      document.getElementById('rollNo').value = student.rollNo;
      document.getElementById('internal1').value = student.internal1;
      document.getElementById('assignment1').value = student.assignment1;
      document.getElementById('internal2').value = student.internal2;
      document.getElementById('assignment2').value = student.assignment2;

      deleteStudent(index);
    }

    function deleteStudent(index) {
      students.splice(index, 1);
      localStorage.setItem('students', JSON.stringify(students));
      renderTable();
    }

    document.addEventListener('DOMContentLoaded', renderTable);