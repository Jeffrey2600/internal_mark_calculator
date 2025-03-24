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

    // Store the created chart
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

    const totalMarks = (internal1 + assignment1 + quiz1 + internal2 + assignment2 + quiz2)/6;
    document.getElementById('totalMarks').innerText = totalMarks;

    // Update the student pie chart with marks breakdown
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

    // Dummy login validation (you can replace it with backend authentication)
    if (staffId === 'admin' && staffPassword === 'password') {
        document.querySelector('.login-page').classList.add('hidden');
        document.querySelector('.staff-page').classList.remove('hidden');
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
});

// Staff logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    document.querySelector('.staff-page').classList.add('hidden');
    document.querySelector('.student-page').classList.remove('hidden');
});

// Add student record functionality for staff
document.getElementById('addStudentBtn').addEventListener('click', () => {
    const studentName = document.getElementById('studentName').value;
    const subjectCode = document.getElementById('subjectCode').value;
    const internal1 = Number(document.getElementById('staffInternal1').value);
    const assignment1 = Number(document.getElementById('staffAssignment1').value);
    const quiz1 = Number(document.getElementById('staffQuiz1').value);
    const internal2 = Number(document.getElementById('staffInternal2').value);
    const assignment2 = Number(document.getElementById('staffAssignment2').value);
    const quiz2 = Number(document.getElementById('staffQuiz2').value);

    if (studentName && subjectCode) {
        // Create a new table row
        const table = document.getElementById('studentTable').querySelector('tbody');
        const newRow = table.insertRow();

        newRow.insertCell(0).innerText = studentName;
        newRow.insertCell(1).innerText = subjectCode;
        newRow.insertCell(2).innerText = internal1;
        newRow.insertCell(3).innerText = assignment1;
        newRow.insertCell(4).innerText = quiz1;
        newRow.insertCell(5).innerText = internal2;
        newRow.insertCell(6).innerText = assignment2;
        newRow.insertCell(7).innerText = quiz2;

        // Update the staff pie chart
        const totalMarks = internal1 + assignment1 + quiz1 + internal2 + assignment2 + quiz2;
        createPieChart('staffPieChart', ['Internal 1', 'Assignment 1', 'Quiz 1', 'Internal 2', 'Assignment 2', 'Quiz 2'], 
        [internal1, assignment1, quiz1, internal2, assignment2, quiz2], `Marks of ${studentName}`);
    } else {
        alert('Please fill in all fields.');
    }
});
