// Header transparent
window.addEventListener("scroll", function(){
    var header = document.querySelector("header")
    header.classList.toggle("sticky", window.scrollY > 10)
})

// Botão de login
function change(){
    icon_login.src = "img/iconAltered.png"
}

function restore(){
    icon_login.src = "img/LOGINicon.png"
}

