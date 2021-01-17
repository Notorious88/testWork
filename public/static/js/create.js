const formCreateItem = document.getElementById("createItem");
const error = document.getElementsByClassName("error")[0];
const createItem = document.getElementById("createSuccess");

formCreateItem.addEventListener("submit", event => {
    event.preventDefault();


    if (formCreateItem.elements[0].value === "") {
        error.innerText = "Name element is empty";
        showError();
        return;
    }

    if (formCreateItem.elements[0].value.length > 5) {
        error.innerText = "The name is too long, must be no more than 5 characters!";
        showError();
        return;
    }

    const data = JSON.stringify({
        name: formCreateItem.elements[0].value,
    })


    fetch('/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    }).then(res => res.json())
        .then((res) => {
            if(res.success){
                formCreateItem.elements[0].value = "";
                createItem.innerText = res.massage;
                showError()
            }
            else {
                error.innerText = res.massage
                showError();
            }
        }).catch(e => {
        console.log(e)
    })
})

const showError = () => setTimeout(() => {
    error.innerHTML = "";
    createItem.innerHTML = ""
}, 3000)
