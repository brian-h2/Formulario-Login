const Email = document.getElementById('exampleInputEmail1');
const Password = document.getElementById('exampleInputPassword1')
const buttonSubmit = document.getElementById('btn-submit');

buttonSubmit.addEventListener('click', (e) => {
e.preventDefault(); 
const passwordValue = Password.value; 
const emailValue = Email.value;
if(emailValue != "" && passwordValue != "") {
    enviarDatos(emailValue,passwordValue)
} else{
    alert("Porfavor rellene las casillas")
}
});

const enviarDatos = (emailValue,passwordValue) => {
fetch(`http://localhost:3000/login/${emailValue}.${passwordValue}`, {
    method: 'GET'
})
.then(res => {
    if(res.ok) {
        document.getElementById('form').style.cssText = "display: none !important;"
        document.getElementById('home').innerHTML =  `
            <h1>Bienvenido a la pagina</h1>
        `
    } else {
    // Si no se encuentra el usuario, devuelve un mensaje de error
        alert('Usuario no encontrado')
    }
})
}