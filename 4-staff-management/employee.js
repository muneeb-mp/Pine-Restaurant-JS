
let employeeList = [];

const loadEmployees = async () => {
    try {
        const res = await fetch("json/employees.json");
        employeeList = await res.json();
        // console.log(employeeList);

        displayEmployees(employeeList);
    }
    catch(err) {
        console.log(err);
    }
}


const displayEmployees = (employee) => {
    const employeesTable = employee.map((employee) => {
        return `
        <tr>
            <th scope="row">${employee.id}</th>
                <td>${employee.name}</td>
                <td>${employee.position}</td>
                <td>Rs. ${employee.dailywage}</td>
                <td><input type="text" class="days-worked" style="width:50px" min="0"/> Days</td>
                <td class="monthly-pay fw-bold"></td>
        </tr>
        `;
    }).join("");
    document.getElementById("employeeTable").innerHTML = employeesTable;

    monthlyPay();
}

loadEmployees();

function monthlyPay() {
    const daysWorked = document.querySelectorAll(".days-worked");

    daysWorked.forEach((workDay) => {
        workDay.addEventListener("keyup", (e) => {
            if(e.target.value === "" || e.target.value <= 0) {
                return;
            }
            else {
                if(e.key === "Enter") {
                    const day = e.target.value;
                    const dailyWage = Number(e.target.parentElement.parentElement.children[3].innerText.substring(4));
                    let monthlyPay = e.target.parentElement.parentElement.children[5];
                    const calMonthlyPay = day * dailyWage;

                    monthlyPay.innerText = "Rs. " + calMonthlyPay;
                }
            }
        });
    });
}


