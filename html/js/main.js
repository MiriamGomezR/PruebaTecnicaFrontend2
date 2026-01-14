const quizData = [
    {
      question: "¿En qué año ocurrió el descubrimiento de América?",
        options: ["1492", "1485", "1502", "1453"],
        correct: 0
    },
    {
        question: "¿Quién fue el primer presidente de los Estados Unidos?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
        correct: 2
    },
    {
        question: "¿Qué cultura construyó las pirámides de Giza?",
        options: ["Maya", "Egipcia", "Azteca", "Griega"],
        correct: 1
    },
    {
        question: "¿En qué país comenzó la Revolución Industrial?",
        options: ["Francia", "Estados Unidos", "Alemania", "Inglaterra"],
        correct: 3
    },
    {
        question: "¿Quién era el líder de los mongoles que creó el imperio más grande de la historia?",
        options: ["Atila el Huno", "Genghis Khan", "Alejandro Magno", "Julio César"],
        correct: 1
    },
    {
        question: "¿Qué evento marcó el inicio de la Edad Moderna?",
        options: ["Caída del Imperio Romano", "Revolución Francesa", "Caída de Constantinopla", "La invención de la imprenta"],
        correct: 2
    },
    {
        question: "¿Qué civilización antigua fundó la ciudad de Machu Picchu?",
        options: ["Inca", "Olmeca", "Tolteca", "Moche"],
        correct: 0
    },
    {
        question: "¿Quién fue conocida como 'La Dama de Hierro'?",
        options: ["Isabel II", "Angela Merkel", "Margaret Thatcher", "Indira Gandhi"],
        correct: 2
    },
    {
        question: "¿Cuál fue el nombre de la primera bomba atómica lanzada en Hiroshima?",
        options: ["Fat Man", "Little Boy", "Tsar Bomba", "The Gadget"],
        correct: 1
    },
    {
        question: "¿En qué año cayó el Muro de Berlín?",
        options: ["1985", "1991", "1989", "1990"],
        correct: 2
    }
];

let currentIndex = 0;
let userAnswers = JSON.parse(localStorage.getItem('myQuizAnswers')) || {};

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const counterText = document.getElementById('question-counter');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const quizContent = document.getElementById('quiz-content');

function renderQuestion() {
    const current = quizData[currentIndex];

    counterText.innerText = `Pregunta ${currentIndex + 1} de ${quizData.length}`;
    questionText.innerText = current.question;

    optionsContainer.innerHTML = '';
    current.options.forEach((option, index) => {
        const isChecked = userAnswers[currentIndex] == index ? 'checked' : '';
        
        const optionHtml = `
            <label class="list-group-item d-flex align-items-center">
                <input class="form-check-input me-3" type="radio" name="answer" 
                       value="${index}" ${isChecked} onchange="saveAnswer(${index})">
                ${option}
            </label>
        `;
        optionsContainer.innerHTML += optionHtml;
    });

    btnPrev.disabled = currentIndex === 0;
    btnNext.innerText = currentIndex === quizData.length - 1 ? 'Finalizar' : 'Siguiente';
}

window.saveAnswer = (index) => {
    userAnswers[currentIndex] = index;
    localStorage.setItem('myQuizAnswers', JSON.stringify(userAnswers));
};

btnNext.addEventListener('click', () => {
    if (currentIndex < quizData.length - 1) {
        currentIndex++;
        renderQuestion();
    } else {
        showResults();
    }
});

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
    }
});

function showResults() {
    let score = 0;
    let resultsHtml = `<h3 class="mb-4 text-center">Resultados Finales</h3><hr>`;

    quizData.forEach((item, i) => {
        const userSelection = userAnswers[i];
        const isCorrect = userSelection == item.correct;
        if (isCorrect) score++;

        resultsHtml += `
            <div class="mb-3 p-2 border-bottom border-secondary">
                <p class="mb-1"><strong>${i + 1}. ${item.question}</strong></p>
                <p class="small ${isCorrect ? 'text-info' : 'text-danger'}">
                    Respuesta: ${userSelection !== undefined ? item.options[userSelection] : "No respondida"} 
                    ${isCorrect ? 'Respuesta Correcta' : 'Respuesta Incorrecta'}
                </p>
            </div>
        `;
    });

    resultsHtml += `
        <div class="text-center mt-4">
            <h4>Puntaje: ${score} / ${quizData.length}</h4>
            <button class="btn btn-custom mt-3" onclick="restartQuiz()">Reiniciar</button>
        </div>
    `;

    quizContent.innerHTML = resultsHtml;
    document.getElementById('instructions-section').style.display = 'none';
}

function restartQuiz() {
    localStorage.removeItem('myQuizAnswers');
    location.reload();
}

document.addEventListener('DOMContentLoaded', renderQuestion);