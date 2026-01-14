// 6. Arreglo de objetos con las preguntas
const questions = [
    {
        question: "¿Cuál es el lenguaje de programación estándar para la web?",
        options: ["Java", "Python", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "¿Qué significa CSS?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correct: 1
    },
    {
        question: "¿Cuál es la etiqueta HTML para insertar una imagen?",
        options: ["<picture>", "<img>", "<image>", "<src>"],
        correct: 1
    }
];

let currentIndex = 0;

// Referencias al DOM
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const counterText = document.getElementById('question-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// 7. Función para mostrar la pregunta actual
function renderQuestion() {
    const currentQuestion = questions[currentIndex];
    
    // Actualizar contador y texto de la pregunta
    counterText.innerText = `${currentIndex + 1} de ${questions.length}`;
    questionText.innerText = currentQuestion.question;

    // Limpiar opciones anteriores
    optionsContainer.innerHTML = '';

    // Generar radio buttons para las opciones
    currentQuestion.options.forEach((option, index) => {
        const optionHtml = `
            <label class="list-group-item d-flex align-items-center">
                <input class="form-check-input me-2" type="radio" name="quiz-option" value="${index}">
                ${option}
            </label>
        `;
        optionsContainer.innerHTML += optionHtml;
    });

    // Control de estado de botones
    btnPrev.disabled = currentIndex === 0;
    btnNext.innerText = currentIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente';
}

// 5. Funciones para los eventos Click
btnNext.addEventListener('click', () => {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        alert('¡Has terminado el cuestionario!');
    }
});

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
});

// Inicializar la carga de la página
document.addEventListener('DOMContentLoaded', renderQuestion);