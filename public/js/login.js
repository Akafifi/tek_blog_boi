const loginForm = async (e) =>  {
    e.preventDefault();
    console.log('login form was called')

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        }   else {
            console.log('Error')
        }
    }
}

document.querySelector('.login-btn')
document.addEventListener('click', loginFormHandler)