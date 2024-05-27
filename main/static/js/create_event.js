

function start(){
    const fileInput = document.getElementById('image_file');
    const fileInputDiv = document.getElementById('file-input-div');
    const image = document.getElementById('image-show');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                image.src = event.target.result;
                image.style.display = 'block';
                fileInputDiv.style.display = 'none'
            };

            reader.readAsDataURL(file);
        } else {
            image.style.display = 'none';
            fileInputDiv.style.display = 'block'
        }
    });
}