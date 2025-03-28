// Initialize Chart.js for pie charts
let studentPieChart;
let staffPieChart;

// Pie chart configuration function
function createPieChart(canvasId, dataLabels, dataValues, title) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Destroy the previous chart to avoid duplication
    if (canvasId === 'studentPieChart' && studentPieChart) {
        studentPieChart.destroy();
    } else if (canvasId === 'staffPieChart' && staffPieChart) {
        staffPieChart.destroy();
    }

    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: dataLabels,
            datasets: [
                {
                    label: title,
                    data: dataValues,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9F40', '#9966FF'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        },
    });

    if (canvasId === 'studentPieChart') {
        studentPieChart = chart;
    } else {
        staffPieChart = chart;
    }
}

// Calculate total marks and update the student pie chart
document.getElementById('calculateBtn').addEventListener('click', () => {
    const internal1 = Number(document.getElementById('internal1').value);
    const assignment1 = Number(document.getElementById('assignment1').value);
    const quiz1 = Number(document.getElementById('quiz1').value);
    const internal2 = Number(document.getElementById('internal2').value);
    const assignment2 = Number(document.getElementById('assignment2').value);
    const quiz2 = Number(document.getElementById('quiz2').value);

    const totalMarks = ((internal1 + assignment1 + quiz1) +( internal2 + assignment2 + quiz2)) ;
    document.getElementById('totalMarks').innerText = totalMarks;

    createPieChart('studentPieChart', ['Internal 1', 'Assignment 1', 'Quiz 1', 'Internal 2', 'Assignment 2', 'Quiz 2'],
        [internal1, assignment1, quiz1, internal2, assignment2, quiz2], 'Student Marks Breakdown');
});

// Staff login functionality
document.getElementById('loginBtn').addEventListener('click', () => {
    document.querySelector('.student-page').classList.add('hidden');
    document.querySelector('.login-page').classList.remove('hidden');
});

document.getElementById('loginSubmit').addEventListener('click', () => {
    const staffId = document.getElementById('staffId').value;
    const staffPassword = document.getElementById('staffPassword').value;

    if (staffId === 'admin' && staffPassword === 'password') {
        document.querySelector('.login-page').classList.add('hidden');
        document.querySelector('.staff-page').classList.remove('hidden');
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    document.querySelector('.staff-page').classList.add('hidden');
    document.querySelector('.student-page').classList.remove('hidden');
});

// Add student record functionality with Edit and Delete features
document.getElementById('addStudentBtn').addEventListener('click', () => {
    const table = document.getElementById('studentTable').querySelector('tbody');
    const newRow = table.insertRow();

    const fields = [
        'rollno','studentName', 'subjectCode', 'subjectName',
        'staffInternal1', 'staffAssignment1', 'staffQuiz1',
        'staffInternal2', 'staffAssignment2', 'staffQuiz2'
    ];
    const values = fields.map(id => document.getElementById(id).value);

    if (values[0] && values[1]) {
        // Create cells for each field
        values.slice(0, 9).forEach((value, i) => newRow.insertCell(i).innerText = value);

        // Create actions cell with Edit and Delete buttons
        const actionsCell = newRow.insertCell();
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        
        editButton.innerText = 'Edit';
        deleteButton.innerText = 'Delete';

        // Attach edit functionality
        editButton.addEventListener('click', () => {
            editRecord(newRow, fields);
        });

        // Attach delete functionality
        deleteButton.addEventListener('click', () => {
            newRow.remove();
        });

        actionsCell.append(editButton, deleteButton);

        // Update the staff pie chart
        const totalMarks = values.slice(3, 9).reduce((sum, val) => sum + Number(val), 0);
        createPieChart('staffPieChart', ['Internal 1', 'Assignment 1', 'Quiz 1', 'Internal 2', 'Assignment 2', 'Quiz 2'],
            values.slice(3, 9).map(Number), `Marks of ${values[0]}`);
    } else {
        alert('Please fill in all fields.');
    }
});

// Function to edit an existing record in the table
function editRecord(row, fields) {
    row.childNodes.forEach((cell, index) => {
        if (index < fields.length) document.getElementById(fields[index]).value = cell.innerText;
    });
    row.remove();
}

