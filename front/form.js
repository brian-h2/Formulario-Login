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
    if (emailRegister !== "" && passwordRegister !== "") {
        publicarDatos(emailRegister,passwordRegister)
    } else {
        alert("Por favor, rellene las casillas");
    }
});

//Para publicar nuevos usuarios
const publicarDatos = (emailRegister,passwordRegister) => {
    fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailRegister,
            password: passwordRegister
        })
        
    })
    .then(res => {
        console.log(passwordRegister)  

        if (res.ok) {
            res.text().then(message => alert(message));
        } else {
            res.text().then(message => alert(message))
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
const enviarDatos = (emailRegister, passwordValue) => {
    fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailRegister,
            password: passwordValue
        })
        
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
