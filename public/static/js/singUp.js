const formSingUp = document.getElementById("SingUpUser");
const error = document.getElementsByClassName("error")[0];

formSingUp.addEventListener("submit", event => {
    event.preventDefault();


    if(formSingUp.elements[0].value === "" || formSingUp.elements[1].value === ""){
        error.innerText = "Not all fields are filled";
        showError();
        return;
    }

    const data = JSON.stringify({
        name: formSingUp.elements[0].value,
        password: formSingUp.elements[1].value
    })


    fetch('/user/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(res => res.json())
        .then((res) => {
            if (res.success) {
                location = "/"
            } else {
                error.innerText = res.massage
                showError();
            }
        }).catch(e => {
        console.log(e)
    })

});


const showError = () => setTimeout(() => error.innerHTML = "", 3000)
