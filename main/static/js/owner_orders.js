function set_state(order_id, state){
    let status_element = document.getElementById(`status-${order_id}`)
    let buttons = status_element.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle('active', i < state)
    }

    let data = {
        'order_id': order_id,
        'state': state,
    }

    fetch(BASE_URL + "set-order-status/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCsrfToken() // Получение CSRF-токена
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Ошибка:" + error);
        });
}

function getCsrfToken() {
    const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
    return csrfTokenElement ? csrfTokenElement.value : '';
}