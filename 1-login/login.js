const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    if (username.value == "admin" && password.value == "admin") {
        // window.open("management.html");
        location.replace("management.html");
        username.value = "";
        password.value = "";
    }
    else {
        alert("Username or Password incorrect");
    }
});

