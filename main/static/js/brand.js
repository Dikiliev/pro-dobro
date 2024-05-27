
let products = {}

function set_product(product_id, direction){
    products[product_id]['count'] = Math.max(0, products[product_id]['count'] += direction)

    let element = document.getElementById(product_id);
    element.innerHTML =  products[product_id]['count'];


    let check = document.getElementById('check-products')

    let check_content = ''
    let total = 0

    for (let key in products){
        let product = products[key];

        if (products[key].count <= 0){
            continue;
        }

        total += product.price * product.count;

        check_content += `
          <div class="check-tr">
            <span class="check-td title">${product.title}</span> <span class="check-td count">${product.count}шт</span> <span class="check-td price">${product.price * product.count}₽</span>
          </div>
        `;
    }

    check_content += `<br><div class="check-tr"><span class="check-td title">ИТОГО: ${total}₽</span></div>`
    check.innerHTML = check_content;

    let order_button = document.getElementById('order-button')
    order_button.classList.toggle('inactive', total <= 0)
}

function order(user_id, brand_id) {

    let data = {
        'user_id': user_id,
        'brand_id': brand_id,
        'products': []
    }

    for (let key in products){
        let product = products[key];

        if (product.count <= 0){
            continue;
        }

        data['products'].push({
            'id': key,
            'count': product.count,
        })
    }

    fetch(BASE_URL + "add-order/", {
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
            window.location.assign(BASE_URL + 'orders-for-user/');
        })
        .catch(error => {
            console.error("Ошибка:" + error);
        });


}

function getCsrfToken() {
    const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
    return csrfTokenElement ? csrfTokenElement.value : '';
}


