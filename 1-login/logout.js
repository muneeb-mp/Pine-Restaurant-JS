const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // location.replace("login.html");
    if(confirm("Are you sure want to logout?") == true) {
        location.replace("login.html");
    }
});