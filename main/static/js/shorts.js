
let videos = [];
let video_player;
let short;

document.addEventListener('click', function(e) {
    console.log('Кликнуто на: ', e.target);

    video_player.muted = false;
});

function init_shorts(){
    video_player = document.getElementById('video-player');

    load_new_video();
}

function load_new_video(){
    fetch(BASE_URL + "get-short/")
        .then(response => response.json())
        .then(data => {

            data.brand = JSON.parse(data.brand)[0];
            data.comments = JSON.parse(data.comments);
            short = data;

            console.log(short)
            play_video(data.short);

            refresh();
            load_comments();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function play_video(short){
    video_player.src = short.url;
    video_player.play();
}

function refresh(){
    console.log(short.brand.pk);

    document.getElementById('brand-title').href = `http://127.0.0.1:8000/brand/${short.brand.pk}`
    
    document.getElementById('title').innerHTML = short.short.title;
    document.getElementById('description').innerHTML = short.short.description;
    document.getElementById('brand-title').innerHTML = short.brand.fields.title;
    document.getElementById('avatar').src = 'http://127.0.0.1:8000/media/' + short.brand.fields.avatar;
}

function next(){
    load_new_video();
}

function send_comment(){
    let input_el = document.getElementById('comment-input');
    let text = input_el.value;

    if (!text){
        return
    }

    let data = {
        'comment': text,
        'short_id': short.short.id,
        'brand_id': short.brand.pk,
    }

    console.log(data);

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

            short.comments.unshift(JSON.parse(data.comment)[0])

            load_comments();
        })
        .catch(error => {
            console.error("Ошибка:" + error);
        });
}


function load_comments(){
    let comments_el = document.getElementById('comments');

    comments = ``

    for (let i in short.comments){
        let comment = short.comments[i];

        fetch(BASE_URL + `get-user/${comment.fields.author}`)
            .then(response => response.json())
            .then(data => {
                user = JSON.parse(data.user)[0];

                comments +=
                    `
                    <div class="comment">
                
                        <div class="comment-profile">
                          <img src="https://abrakadabra.fun/uploads/posts/2021-12/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png">
                          <b>${user.fields.username}</b>
                        </div>
                
                        <div>
                          <span>${comment.fields.text}</span>
                        </div>
                        
                      </div>
                    `

                comments_el.innerHTML = comments
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }
}

function getCsrfToken() {
    const csrfTokenElement = document.getElementsByName('csrfmiddlewaretoken')[0];
    return csrfTokenElement ? csrfTokenElement.value : '';
}