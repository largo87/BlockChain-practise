function validate() {
    var username = document.getElementById("username").value;
    console.log(username);
    var password = document.getElementById("password").value;
    console.log("username:", username)
    console.log("password:", password)
    var valid = false;
    var usernameArray = ["hamdi"];
    var passwordArray = ["12345"];
    if (username === usernameArray[0] && password === passwordArray[0]) {
        valid = true;
        // alert("Login wass successful")
        // break;
    }
    if (valid) {
        window.location = "profilo.html";

    } else {
        alert("Password Sbagliata")
    }


}