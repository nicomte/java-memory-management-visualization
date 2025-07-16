<template>
  <div class="quiz-container">
    <div v-if="quizStarted && !quizCompleted" class="quit-button-container">
      <button @click="endQuiz" class="quiz-button quit-button" data-tooltip="Quiz frühzeitig beenden">X</button>
    </div>
    
    <!-- Quiz Startseite-->
    <h1 class="quiz-title">Speicherverwaltung in Java: Quiz</h1>
    
    <div v-if="!quizStarted" class="quiz-intro">
      <div class="intro-content">
        <p>Teste dein Wissen über die Speicherverwaltung in Java mit diesem kurzen Quiz!</p>
        <p>Das Quiz besteht aus {{ questions.length }} Fragen zu den wichtigsten Konzepten:</p>
        <ul class="theory-topics-list">
          <li><router-link to="/theory/memory-heap" data-tooltip="Zur Theorie über Memory Heap wechseln">Memory Heap</router-link></li>
          <li><router-link to="/theory/memory-stack" data-tooltip="Zur Theorie über Memory Stack wechseln">Memory Stack</router-link></li>
          <li><router-link to="/theory/method-area" data-tooltip="Zur Theorie über Method Area wechseln">Method Area</router-link></li>
          <li><router-link to="/theory/callstack" data-tooltip="Zur Theorie über Call Stack wechseln">Call Stack</router-link></li>
          <li><router-link to="/theory/stack-pointer" data-tooltip="Zur Theorie über Stack Pointer wechseln">Stack Pointer</router-link></li>
          <li><router-link to="/theory/instruction-pointer" data-tooltip="Zur Theorie über Instruction Pointer wechseln">Instruction Pointer</router-link></li>         
        </ul>
      </div>
      
      <button @click="startQuiz" class="quiz-button start-button">Quiz starten</button>
    </div>

    <!--Anzeige Progressbar & Fragen counter-->
    <div v-else-if="!quizCompleted" class="quiz-question-container">
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-text">Frage {{ currentQuestionIndex + 1 }} von {{ questions.length }}</div>
      </div>
      
      <!--Multiple choice container-->
      <div class="question-card">
        <h2 class="question-text">{{ currentQuestion.question }}</h2>
        
        <div class="options-list">
          <div 
            v-for="(option, index) in currentQuestion.options" 
            :key="index" 
            class="option-item"
            :class="{
              'selected': selectedOption === index,
              'correct': showAnswer && index === currentQuestion.correctAnswer,
              'incorrect': showAnswer && selectedOption === index && index !== currentQuestion.correctAnswer
            }"
            @click="selectOption(index)"
          >
            <span class="option-marker">{{ ['A', 'B', 'C', 'D'][index] }}</span>
            <span class="option-text">{{ option }}</span>
          </div>
        </div>

        <div v-if="showAnswer" class="feedback-container">
          <div class="feedback" :class="isCorrect ? 'correct-feedback' : 'incorrect-feedback'">
            <div class="feedback-icon">{{ isCorrect ? '✓' : '✗' }}</div>
            <div class="feedback-text">
              <p><strong>{{ isCorrect ? 'Richtig!' : 'Falsch!' }}</strong></p>
              <p>{{ currentQuestion.explanation }}</p>
            </div>
          </div>
          <button @click="nextQuestion" class="quiz-button">
            {{ currentQuestionIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen' }}
          </button>
        </div>
        <div v-else class="action-container">
          <button @click="checkAnswer" class="quiz-button" :disabled="selectedOption === null">Antwort prüfen</button>
        </div>
      </div>
    </div>

    <!-- Quiz Ergebnisse-->
    <div v-else class="quiz-results">
      <h2>Quiz abgeschlossen!</h2>
      <div class="score-display">
        <div class="score-circle">
          {{ score }} / {{ answeredQuestions }}
        </div>
        <p class="score-percentage" v-if="answeredQuestions > 0">
          {{ Math.round((score / answeredQuestions) * 100) }}%
        </p>
        <p class="score-percentage" v-else>
          Es wurde noch keine Fragen beantwortet.
        </p>
      </div>

      <div class="result-feedback">
        <p v-if="answeredQuestions === questions.length && score === questions.length">Perfekt! Du beherrschst die Speicherverwaltung in Java!</p>
        <p v-else-if="answeredQuestions === questions.length && score / answeredQuestions >= 0.8">Sehr gut! Du verstehst die meisten Konzepte der Speicherverwaltung.</p>
        <p v-else-if="answeredQuestions === questions.length && score / answeredQuestions >= 0.6">Gut gemacht! Du hast ein solides Grundverständnis.</p>
        <p v-else-if="answeredQuestions === questions.length">Du solltest die Theorie nochmal wiederholen, um dein Wissen zu vertiefen.</p>
        <p v-else-if="answeredQuestions > 0">Du hast {{ score }} von {{ answeredQuestions }} Fragen richtig beantwortet.</p>
        <p v-else>Du hast das Quiz vorzeitig beendet.</p>
      </div>

      <div class="result-actions">
        <button @click="restartQuiz" class="quiz-button">Quiz wiederholen</button>
        <router-link to="/theory" class="theory-link">Zurück zur Theorie</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { quizQuestions } from '../data/quizQuestions';

export default {
  name: 'QuizPage',
  data() {
    return {
      quizStarted: false,
      quizCompleted: false,
      currentQuestionIndex: 0,
      selectedOption: null,
      showAnswer: false,
      score: 0,
      answeredQuestions: 0,
      originalQuestions: quizQuestions,
      questions: [] // Will be populated with shuffled questions
    };
  },
  created() {
    // Initialize questions with a copy of originalQuestions
    this.questions = [...this.originalQuestions];
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isCorrect() {
      return this.selectedOption === this.currentQuestion.correctAnswer;
    },
    progress() {
      return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    }
  },
  methods: {
    startQuiz() {
      this.quizStarted = true;
      this.quizCompleted = false;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.answeredQuestions = 0;
      this.selectedOption = null;
      this.showAnswer = false;
      
      // Quiz fragen mischen
      this.shuffleQuestions();
    },
    shuffleQuestions() {
      // Create a copy of the original questions
      const shuffled = [...this.originalQuestions];
      
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Update questions with shuffled array
      this.questions = shuffled;
    },
    selectOption(index) {
      if (!this.showAnswer) {
        this.selectedOption = index;
      }
    },
    checkAnswer() {
      this.showAnswer = true;
      if (this.isCorrect) {
        this.score++;
      }
      this.answeredQuestions++;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedOption = null;
        this.showAnswer = false;
      } else {
        this.quizCompleted = true;
      }
    },
    endQuiz() {
      this.quizCompleted = true;
    },
    restartQuiz() {
      this.startQuiz();
    }
  }
}
</script>

<style scoped>
.quiz-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; 
}


.quit-button-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.quiz-title {
  color: #1e293b;
  font-size: 2.25rem;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 3px solid #4361ee;
  padding-bottom: 1rem;
  padding-top: 3rem;
}

.quiz-intro {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  justify-content: space-between; 
}

.intro-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.start-button {
  margin-top: 2rem;
  margin-bottom: 1rem;
  margin-left: auto; 
  margin-right: auto;
  display: block; 
  padding: 0.85rem 2.5rem; 
}

.quiz-intro p {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #334155;
}

.quiz-intro ul {
  width: fit-content; 
  margin: 1.5rem auto; 
  padding-left: 2rem; 
  list-style-position: outside; 
  list-style-type: disc; 
  text-align: left; 
  display: block;
}

.quiz-intro li {
  margin-bottom: 0.5rem;
  color: #4361ee;
  padding-left: 0.25rem; 
  text-align: left; 
}

.theory-topics-list a {
  color: #4361ee;
  text-decoration: none;
  transition: color 0.2s, text-decoration 0.2s;
  position: relative;
}

.theory-topics-list a:hover {
  color: #3a56d4;
  text-decoration: underline;
}

.theory-topics-list a[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 100;
  font-size: 0.9rem;
  font-weight: normal;
}

/* Responsive anpassen für kleinere Bildschirme */
@media (max-width: 768px) {
  .theory-topics-list a[data-tooltip]:hover::after {
    left: 0;
    top: 100%;
    transform: none;
    margin-left: 0;
    margin-top: 5px;
  }
}

.quiz-button {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quiz-button:hover {
  background-color: #3a56d4;
}

.quiz-button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.quiz-progress {
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4361ee;
  transition: width 0.3s ease;
}

.progress-text {
  margin-top: 0.5rem;
  text-align: right;
  color: #64748b;
  font-size: 0.9rem;
}

.question-card {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.question-text {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.option-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.option-item:hover {
  background-color: #a1ccf7;
  border-color: #cbd5e1;
}

.option-item.selected {
  border-color: #4361ee;
  background-color: #eef2ff;
}

.option-item.correct {
  border-color: #10b981;
  background-color: #ecfdf5;
}

.option-item.incorrect {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.option-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #f1f5f9;
  border-radius: 50%;
  margin-right: 1rem;
  color: #475569;
  font-weight: bold;
}

.option-text {
  flex: 1;
}

.feedback-container {
  margin-top: 1.5rem;
}

.feedback {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.feedback-container button {
  margin-left: auto;
  display: block;
}

.correct-feedback {
  background-color: #ecfdf5;
  border-left: 4px solid #10b981;
}

.incorrect-feedback {
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
}

.feedback-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  font-weight: bold;
}

.correct-feedback .feedback-icon {
  color: #10b981;
}

.incorrect-feedback .feedback-icon {
  color: #ef4444;
}

.feedback-text p {
  margin-bottom: 0.5rem;
}

.action-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.quiz-results {
  text-align: center;
}

.score-display {
  margin: 2rem 0;
}

.score-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #4361ee;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto;
}

.score-percentage {
  font-size: 1.5rem;
  color: #1e293b;
  margin-top: 1rem;
  font-weight: 600;
}

.result-feedback {
  margin: 2rem 0;
  font-size: 1.2rem;
  color: #334155;
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.theory-link {
  color: #4361ee;
  text-decoration: none;
}

.theory-link:hover {
  text-decoration: underline;
}

.quit-button {
  background-color: #cbd5e1;
  position: relative;
  margin-top: 1rem;
  margin-right: 1rem;
}

.quit-button:hover {
  background-color: #4361ee;
}

.quit-button[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: -35px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 100;
}

@media (max-width: 640px) {
  .quiz-container {
    padding: 1.5rem;
  }
  
  .quiz-title {
    font-size: 1.75rem;
  }
  
  .question-text {
    font-size: 1.25rem;
  }
}
</style>
