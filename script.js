document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const addQuestionButton = document.getElementById('add-question');
    const createQuizButton = document.querySelector('button[type="submit"]');
    const takeQuizDiv = document.getElementById('take-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const submitQuizButton = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('result');

    let quizzes = [];

    addQuestionButton.addEventListener('click', () => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');
        questionBlock.innerHTML = `
            <input type="text" placeholder="Question" class="question-input" required>
            <input type="text" placeholder="Option A" class="option-input" required>
            <input type="text" placeholder="Option B" class="option-input" required>
            <input type="text" placeholder="Option C" class="option-input" required>
            <input type="text" placeholder="Option D" class="option-input" required>
            <select class="correct-answer">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        `;
        questionsContainer.appendChild(questionBlock);
    });

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const questions = [];
        const questionBlocks = document.querySelectorAll('.question-block');

        questionBlocks.forEach(block => {
            const question = block.querySelector('.question-input').value;
            const options = [
                block.querySelector('.option-input:nth-child(2)').value,
                block.querySelector('.option-input:nth-child(3)').value,
                block.querySelector('.option-input:nth-child(4)').value,
                block.querySelector('.option-input:nth-child(5)').value
            ];
            const correctAnswer = block.querySelector('.correct-answer').value;

            questions.push({
                question,
                options,
                correctAnswer
            });
        });

        quizzes.push(questions);
        alert('Quiz Created Successfully!');
        quizForm.reset();
        questionsContainer.innerHTML = `
            <div class="question-block">
                <input type="text" placeholder="Question" class="question-input" required>
                <input type="text" placeholder="Option A" class="option-input" required>
                <input type="text" placeholder="Option B" class="option-input" required>
                <input type="text" placeholder="Option C" class="option-input" required>
                <input type="text" placeholder="Option D" class="option-input" required>
                <select class="correct-answer">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        `;

        displayQuiz();
    });

    function displayQuiz() {
        takeQuizDiv.style.display = 'block';
        quizContainer.innerHTML = '';

        quizzes[quizzes.length - 1].forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question-block');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <label><input type="radio" name="question${index}" value="A"> ${q.options[0]}</label><br>
                <label><input type="radio" name="question${index}" value="B"> ${q.options[1]}</label><br>
                <label><input type="radio" name="question${index}" value="C"> ${q.options[2]}</label><br>
                <label><input type="radio" name="question${index}" value="D"> ${q.options[3]}</label><br>
            `;
            quizContainer.appendChild(questionDiv);
        });

        submitQuizButton.style.display = 'block';
    }

    submitQuizButton.addEventListener('click', () => {
        const quiz = quizzes[quizzes.length - 1];
        let score = 0;

        quiz.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.correctAnswer) {
                score++;
            }
        });

        resultDiv.innerHTML = `You scored ${score} out of ${quiz.length}`;
        submitQuizButton.style.display = 'none';
   
