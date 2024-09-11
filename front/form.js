// Referencias a los elementos del DOM
const Email = document.getElementById('exampleInputEmail1');
const Password = document.getElementById('exampleInputPassword1');
const buttonSubmit = document.getElementById('btn-submit');

// Referencias al registro

const EmailRegister = document.getElementById('exampleInputEmail2');
const PasswordRegister = document.getElementById('exampleInputPassword2');
const buttonRegisterUser = document.getElementById('btn-register-user');

// Mostrar el formulario de registro y ocultar los demás

// Evento para el botón "Registrarse"
buttonRegisterUser.addEventListener('click', (e) => {
    e.preventDefault();
    const emailRegister = EmailRegister.value;
    const passwordRegister = PasswordRegister.value;
    publicarDatos(emailRegister,passwordRegister)
});

const publicarDatos = (emailRegister,passwordRegister) => {
    fetch(`http://localhost:3000/login/register${emailRegister}.${passwordRegister}`, {
        method: 'POST'
    })
    .then(res => {
        if (res.ok) {
            alert('Registrado correctamente')
        } else {
            alert('Usuario no encontrado');
        }
    });
}

// Evento para enviar los datos del formulario de login
buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const passwordValue = Password.value;
    const emailValue = Email.value;
    if (emailValue !== "" && passwordValue !== "") {
        enviarDatos(emailValue, passwordValue);
    } else {
        alert("Por favor, rellene las casillas");
    }
});

// Función para enviar datos al servidor (login)
const enviarDatos = (emailValue, passwordValue) => {
    fetch(`http://localhost:3000/login/${emailValue}.${passwordValue}`, {
        method: 'GET'
    })
    .then(res => {
        if (res.ok) {
            document.getElementById('form-login').style.display = "none !important"; // Oculta el formulario de login
            document.getElementById('home').innerHTML = `
                <h1>Bienvenido a la página</h1>
            `;
        } else {
            alert('Usuario no encontrado');
        }
    });
};
//Tengo que transformar el metodo post de login y register, en login enviar los datos en el body no en la url