const Email = document.getElementById('exampleInputEmail1');
const Password = document.getElementById('exampleInputPassword1')
const buttonSubmit = document.getElementById('btn-submit');

buttonSubmit.addEventListener('click', (e) => {
    e.preventDefault(); 
    const passwordValue = Password.value; 
    const emailValue = Email.value;

    console.log(passwordValue)
});

// fetch('http://localhost:3000/login')
// .then(res => res.json())
// .then(users => {
//     console.log(users)
// })

