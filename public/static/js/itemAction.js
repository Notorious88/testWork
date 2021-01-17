const remove = document.getElementById("remove");
const change = document.getElementById("change");
const error = document.getElementsByClassName("error")[0];


remove.addEventListener("click", () => {
    const id = location.pathname.split("/")[2];

    fetch(`/delete/${id}`, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(res => {
            if(res.success){
                location = "/"
            } else {
                error.innerText = res.massage
            }
        })
        .catch(err => {
            console.log(err)
        })

})

change.addEventListener("submit", event => {
    event.preventDefault()
    const id = location.pathname.split("/")[2];

    if (change.elements[0].value === "") {
        error.innerText = "Name element is empty";
        showError();
        return;
    }

    if (change.elements[0].value.length > 5) {
        error.innerText = "The name is too long, must be no more than 5 characters!";
        showError();
        return;
    }

    const data = JSON.stringify({name: change.elements[0].value});

    fetch(`/change/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(res => res.json())
        .then(res => {
            if(res.success){
                location.reload();
            } else {
                error.innerText = res.massage
                showError();
            }
        })
        .catch(err => {
            console.log(err)
        })

})
const showError = () => setTimeout(() => error.innerHTML = "", 3000)
