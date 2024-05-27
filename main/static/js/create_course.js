

let lessons = []
let lessonCount = 0

function addLesson(){
    lessonCount++;
    const lessonsContainer = document.getElementById('lessons-container');

    const lessonDiv = createLessonHTML(lessonCount);
    lessons.push(lessonDiv);
    lessonsContainer.appendChild(lessonDiv);
}

function createLessonHTML(index){
    const lessonDiv = document.createElement('div');
    lessonDiv.classList.add('lesson');

    lessonDiv.innerHTML = `
        <div class="input-group">
            <label for="lesson_title_${index}">Название урока:</label>
            <input type="text" id="lesson_title_${index}" name="lesson_title_${index}" required>
        </div>
        <div class="input-group">
            <label for="lesson_image_${index}">Фото урока:</label>
            <input type="file" id="lesson_image_${index}" name="lesson_image_${index}" accept="image/*" required>
        </div>
        <div class="input-group">
            <label for="lesson_description_${index}">Описание урока:</label>
            <textarea id="lesson_description_${index}" name="lesson_description_${index}" required></textarea>
        </div>
    `;

    return lessonDiv
}

function removeLesson(){
    let lastLesson = lessons.pop();
    lastLesson.remove();
}

document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('add-lesson').addEventListener('click', addLesson);
        document.getElementById('remove-lesson').addEventListener('click', removeLesson);

        addLesson();
});