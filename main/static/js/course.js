let rating = 0;

document.addEventListener('DOMContentLoaded', (event) => {

    document.querySelectorAll('.star-rating input').forEach(input => {
        input.addEventListener('change', (event) => {
            rating = event.target.value;
        });
    });


    load_comments();
});

function join() {
    const data = {};
    fetch(BASE_URL + `join_team/${course_id}/`, {
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
            window.location.reload();

        })
        .catch(error => {
            console.error("Ошибка:" + error);
        });
}

function send_comment(){
    const starRating = document.getElementById('starRating');

    if (rating === 0) {
        starRating.classList.add('error', 'shake');

        setTimeout(() => {
            starRating.classList.remove('shake');
            starRating.classList.remove('error');
        }, 500);

        return;

    }

    let input_el = document.getElementById('comment-input');
    let text = input_el.value;

    if (!text) {
        input_el.classList.add('error', 'shake');

        setTimeout(() => {
            input_el.classList.remove('shake');
            input_el.classList.remove('error');
        }, 500);

        return;
    }

    let data = {
        'comment': text,
        'rating': rating,
        'course_id': course_id,
    }

    rating = 0;
    input_el.value = '';

    fetch(BASE_URL + "add-comment/", {
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

            load_comments();
        })
        .catch(error => {
            console.error("Ошибка:" + error);
        });
}


function load_comments(){
    let comments_el = document.getElementById('comments');

    let comments = ``

    fetch(BASE_URL + `get-comments/${course_id}`)
            .then(response => response.json())
            .then(data => {
                comms = data.comments

                console.log(data);
                console.log(comms);

                for (const comm of comms){
                    comments +=
                    `
                    <div class="comment">
                
                        <div class="comment-profile">
                          <img src="https://abrakadabra.fun/uploads/posts/2021-12/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png">
                          <b>${comm.author}</b>
                        </div>
                        
                        ${generateStartHTML(comm.rating)}
                
                        <div>
                          <span>${comm.text}</span>
                        </div>
                        
                      </div>
                    `
                }

                comments_el.innerHTML = comments
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}




function getCsrfToken() {
    const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
    return csrfTokenElement ? csrfTokenElement.value : '';
}