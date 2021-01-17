const formLogin = document.getElementById("loginUser");
const error = document.getElementsByClassName("error")[0];

formLogin.addEventListener("submit", event => {
    event.preventDefault();

    if (formLogin.elements[0].value === "" || formLogin.elements[1].value === "") {
        error.innerText = "Not all fields are filled";
        showError();
        return;
    }

    const data = JSON.stringify({
        name: formLogin.elements[0].value,
        password: formLogin.elements[1].value
    })


    fetch('/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(res => {
        if (res.status === 401) {
            error.innerText = "Wrong login or password!"
            showError()
            return;
        }
        res.json()
            .then(result => {
            if(result.success){
                location = "/"
            }else {
                error.innerText = "Wrong login or password!"
                showError();
            }
        })


    }).catch(err => {
        console.log(err)
    })

});

const showError = () => setTimeout(() => error.innerHTML = "", 3000)


