<template>
  <TheoryLayout title="Call Stack">
    <!--übernimmt TheoryLayout und setzt den Titel auf "Call Stack"-->
    <div class="theory-content">
      <div class="important-note">
        <p>Der <strong>Call Stack</strong> (Aufrufstapel) ist eine logische Struktur, die Java Virtual Machine (JVM)
          nutzt, um nachzuvollziehen, welche Methode gerade aktiv ist und wohin das Programm zurückspringen soll, wenn
          diese Methode beendet ist.</p>
      </div>

      <div class="example-box">
        <h3>Wie funktioniert der Call Stack?</h3>
        <p>Der Call Stack funktioniert wie der Memory Stack nach dem LIFO-Prinzip (Last In, First Out).</p>
        <p>Die zuletzt
          aufgerufene Methode wird als erste wieder geschlossen.</p>
        <ul>
          <li><strong>Bei jedem Methodenaufruf:</strong> Wird ein <strong>Stack Frame</strong> erstellt und auf den Call-Stack
            gelegt (Push).
          </li>
          <li><strong>Wenn die Methode endet:</strong> Wird der <strong>Stack Frame</strong> wieder entfernt (Pop), und die JVM macht
            an
            an
            der Stelle weiter, wo die Methode aufgeruft wurde.</li>
        </ul>
      </div>

      <div class="visual-container">
        <h2>Was ist ein Stack Frame?</h2>
        <p>Für jede Methode wird beim Methodenaufruf ein spezieller Block (<strong>Stack-Frame</strong>) auf dem Stack
          erstellt der alle informationen der Methode enthält.</p>
        <p>Wenn die Methode wieder beendet wird, wird der Block der beendeten Methode wieder vom Stack entfernt.</p>



        <div class="two-column-layout">
          <div class="column">
            <h4><u>Ein Stack Frame enthält:</u></h4>
            <ul class="compact-list">
              <li><strong>Methodenname:</strong> Der Name der Methode, die gerade ausgeführt wird.</li>
              <li><strong>Lokale Variablen:</strong> Alle innerhalb der Methode deklarierten Variablen.</li>
              <li><strong>Parameter:</strong> Werte, die an die Methode übergeben wurden.</li>
              <li><strong>Rücksprungadresse:</strong> Die Information, wo das Programm nach Beendigung der Methode
                weiterläuft.</li>
            </ul>
          </div>


          <div class="column">
            <div class="visual-container">
              <div class="visual-fallback">
                <pre>

┌─────────────────────────┐
│    Lokale variablen     │ 
│  ---------------------- │
│  übergebene Parameter   │  =>  Stack Frame
│  ---------------------- │
│   Rücksprungadresse     │
└─────────────────────────┘
          </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="analogy-box">
        <h3>Unterschied zwischen Call Stack und Memory Stack</h3>
        <p>Der <strong>Call Stack</strong> ist wie eine Liste oder ein Plan, den das Programm nutzt, um sich zu merken,
          welche Methode gerade läuft und welche danach weiterlaufen soll.
          Der <strong>Memory Stack</strong> ist der physische Speicher im Arbeitsspeicher (RAM), wo die Daten (z.B.
          lokale
          Variablen, Rücksprungadressen) gespeichert werden.</p>
          <br>

        <div class="comparison-table-container">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Merkmal</th>
                <th>Call Stack</th>
                <th>Memory Stack (oft einfach: "Stack")</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Einfügeprinzip</strong></td>
                <td>LIFO</td>
                <td>LIFO</td>
              </tr>
              <tr>
                <td><strong>Definition</strong></td>
                <td>Logische Struktur, die sich merkt, welche Methode aktuell läuft und wohin zurückgesprungen wird.
                </td>
                <td>Teil des physischen Arbeitsspeichers (RAM), wo Stack Frames wirklich gespeichert werden.</td>
              </tr>
              <tr>
                <td><strong>Inhalt</strong></td>
                <td>Stack Frames (Methodenkontext)</td>
                <td>Beliebige Daten</td>
              </tr>
              <tr>
                <td><strong>Verwendung</strong></td>
                <td>Speichert Stack Frames pro Methodenaufruf</td>
                <td>Physikalischer Speicherbereich, in dem die Stack Frames liegen</td>
              </tr>
              <tr>
                <td><strong>Funktion</strong></td>
                <td>Verfolgt, welche Methode aufgerufen wurde und von wo</td>
                <td>Beinhaltet lokale Variablen, Rücksprungadressen, Parameter usw.</td>
              </tr>
              <tr>
                <td><strong>Konzept oder Speicher?</strong></td>
                <td>Konzept innerhalb der Laufzeitumgebung</td>
                <td>Realer Speicherbereich im RAM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <div class="example-box">
        <h3>Praktisches Beispiel</h3>
        <p><em>Hier seht ihr ein einfaches Beispiel, das zeigt, wie der Call Stack funktioniert.
            Weiter unten findet ihr eine Animation des Beispiels, das ihr Schritt durchklicken könnt, um zu sehen, wie
            sich der Call Stack verändert.</em></p>

        <!-- Beispielcode-->
        <div class="two-column-layout">
          <div class="column">
            <div class="example-box">
              <h4>Code Beispiel Call-Stack:</h4>
              <pre class="code-example">
public class CallStackExample {
    public static void <span class="highlight-text">main</span>(String[] args) {
        System.out.println("Start im main");
        <span class="highlight-text">methodA</span>();
        System.out.println("Zurück in main");
    }

    public static void <span class="highlight-texte">methodA</span>() {
        System.out.println("In methodA");
        <span class="highlight-text">methodB</span>();
        System.out.println("Zurück in methodA");
    }

    public static void <span class="highlight-text">methodB</span>() {
        System.out.println("In methodB");
    }
}
</pre>
              <div class="example-box">
                <p><strong>Call Stack Status während der Ausführung:</strong></p>
                <ol class="compact-list">
                  <li>Zunächst ist nur der <code>main()</code>-Frame auf dem Stack</li>
                  <li>Nach Aufruf von <code>methodA()</code> kommt ein Frame für <code>methodA()</code> dazu</li>
                  <li>Nach Aufruf von <code>methodB()</code> kommt ein Frame für <code>methodB()</code> dazu</li>
                  <li>Wenn <code>methodB()</code> endet, wird ihr Frame entfernt, und <code>methodA()</code> wird wieder
                    aktiv</li>
                  <li>Wenn <code>methodA()</code> endet, wird ihr Frame entfernt, und <code>main()</code> wird wieder
                    aktiv</li>
                </ol>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="animation-container">
              <p><em>Hier seht ihr, wie sich der Call Stack während der Programmausführung Schritt für Schritt
                  verändert:</em></p>
              <div class="stack-animation-steps">
                <div class="animation-step">
                  <div class="step-description">1. Programm startet</div>
                  <pre>
┌─────────────────────────┐
│     <span class="highlight-text">main</span>() Frame        │ ← Aktueller Stack-Frame
└─────────────────────────┘
            </pre>
                </div>
                <div class="animation-step">
                  <div class="step-description">2. methodA() wird aufgerufen</div>
                  <pre>
┌─────────────────────────┐
│      main() Frame       │ 
├─────────────────────────┤
│     <span class="highlight-text">methodA</span>() Frame     │ ← Aktueller Stack-Frame
└─────────────────────────┘
            </pre>
                </div>
                <div class="animation-step">
                  <div class="step-description">3. methodB() wird aufgerufen</div>
                  <pre>
┌─────────────────────────┐
│       main() Frame      │ 
├─────────────────────────┤
│     methodA() Frame     │
├─────────────────────────┤
│     <span class="highlight-text">methodB</span>() Frame     │ ← Aktueller Stack-Frame
└─────────────────────────┘
            </pre>
                </div>
                <div class="animation-step">
                  <div class="step-description">4. methodB() kehrt zurück</div>
                  <pre>
┌─────────────────────────┐
│      main() Frame       │ 
├─────────────────────────┤
│     <span class="highlight-text">methodA</span>() Frame     │ ← Aktueller Stack-Frame
└─────────────────────────┘
            </pre>
                </div>
                <div class="animation-step">
                  <div class="step-description">5. methodA() kehrt zurück</div>
                  <pre>
┌─────────────────────────┐
│     <span class="highlight-text">main</span>() Frame        │ ← Aktueller Stack-Frame
└─────────────────────────┘
            </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- interaktiver Demo-Bereich -->
        <h3>Interaktives Beispiel:</h3>
        <div class="interactive-demo">
          <div class="demo-container">
            <div class="code-section">
              <!-- pre (vorformatierter Txt darstellen)-->
              <pre class="code-example interactive-code">
<span :class="{ 'highlight-method': currentStep === 1 }">public class CallStackExample {</span>
<span :class="{ 'highlight-method': currentStep === 2 }">    public static void <span :class="{ 'highlight-active-method': currentStep >= 2 && currentStep <= 4 || currentStep >= 14, 'highlight-in-stack': currentStep >= 2 }">main</span>(String[] args) {</span>
<span :class="{ 'highlight-method': currentStep === 3 }">        System.out.println("Start im main");</span>
<span :class="{ 'highlight-method': currentStep === 4 }">        <span :class="{ 'highlight-active-method': currentStep === 4, 'highlight-in-stack': currentStep >= 5 && currentStep <= 13 }">methodA</span>();</span>
<span :class="{ 'highlight-method': currentStep === 14 }">        System.out.println("Zurück in main");</span>
<span :class="{ 'highlight-method': currentStep === 15 }">    }</span>
    
<span :class="{ 'highlight-method': currentStep === 5 }">    public static void <span :class="{ 'highlight-active-method': currentStep >= 5 && currentStep <= 7 || currentStep >= 11 && currentStep <= 13, 'highlight-in-stack': currentStep >= 5 && currentStep <= 13 }">methodA</span>() {</span>
<span :class="{ 'highlight-method': currentStep === 6 }">        System.out.println("In methodA");</span>
<span :class="{ 'highlight-method': currentStep === 7 }">        <span :class="{ 'highlight-active-method': currentStep === 7, 'highlight-in-stack': currentStep >= 8 && currentStep <= 10 }">methodB</span>();</span>
<span :class="{ 'highlight-method': currentStep === 12 }">        System.out.println("Zurück in methodA");</span>
<span :class="{ 'highlight-method': currentStep === 13 }">    }</span>
    
<span :class="{ 'highlight-method': currentStep === 8 }">    public static void <span :class="{ 'highlight-active-method': currentStep >= 8 && currentStep <= 10, 'highlight-in-stack': currentStep >= 8 && currentStep <= 10 }">methodB</span>() {</span>
<span :class="{ 'highlight-method': currentStep === 9 }">        System.out.println("In methodB");</span>
<span :class="{ 'highlight-method': currentStep === 10 }">    }</span>
<span :class="{ 'highlight-method': currentStep === 11 }">}</span></pre>
            </div>

            <div class="stack-section">
              <h4>Call Stack:</h4>
              <div class="stack-container">
                <transition-group name="stack-frame">
                  <!-- methodB Frame: Erscheint in Schritt 8-10 -->
                  <div v-if="currentStep >= 8 && currentStep <= 10" :key="'methodB'" class="stack-frame"
                    :class="{ 'active-frame': currentStep >= 8 && currentStep <= 10 }">
                    methodB() Frame
                  </div>

                  <!-- methodA Frame: Erscheint in Schritt 5-13 -->
                  <div v-if="currentStep >= 5 && currentStep <= 13" :key="'methodA'" class="stack-frame"
                    :class="{ 'active-frame': (currentStep >= 5 && currentStep <= 7) || (currentStep >= 11 && currentStep <= 13) }">
                    methodA() Frame
                  </div>

                  <!-- main Frame: Erscheint in Schritt 2-15 -->
                  <div v-if="currentStep >= 2 && currentStep <= 14" :key="'main'" class="stack-frame"
                    :class="{ 'active-frame': (currentStep >= 2 && currentStep <= 4) || currentStep >= 14 }">
                    main() Frame
                  </div>
                </transition-group>
              </div>

              <div class="output-console">
                <h4>Console Output:</h4>
                <pre class="console-output">{{ getConsoleOutput() }}</pre>
              </div>
            </div>
          </div>

          <div class="demo-controls">
            <button @click="prevStep" :disabled="currentStep <= 1">Vorheriger Schritt</button>
            <span class="step-indicator">Schritt {{ currentStep }} von {{ totalSteps }}</span>
            <button @click="nextStep" :disabled="currentStep >= totalSteps">Nächster Schritt</button>
            <button @click="resetDemo" class="reset-button">Reset</button>
          </div>

          <div class="step-description step-explanation">
            <strong>Schritt {{ currentStep }}:</strong> {{ getStepDescription() }}
          </div>
        </div>
      </div>

      <div class="summary-section">
        <h3>Zusammenfassung:</h3>
        <p>Der Call Stack ist wichtig für die Nachverfolgung von Methodenaufrufen und ermöglicht die Verschachtelung
          von
          Funktionsaufrufe. Jede Methode hat ihren eigenen Block (Stack-Frame), welches nachdem die Methode beendet
          ist
          automatisch vom Stack entfernt wird.</p>
      </div>
    </div>
  </TheoryLayout>
</template>

<script>
import TheoryLayout from './TheoryLayout.vue';

export default {
  name: 'CallStackTheory',
  components: {
    TheoryLayout
  },
  // Steuert Anzeige von Code, Stack-Frames und Konsolenausgaben
  data() {
    return {
      currentStep: 1,
      totalSteps: 15,

      // Konsolenausgaben für jeden Schritt
      consoleOutputs: [
        "", // Initialzustand
        "", // Schritt 1 
        "", // Schritt 2
        "Start im main", // Schritt 3: erstes println in main
        "Start im main", // Schritt 4 
        "Start im main", // Schritt 5
        "Start im main\nIn methodA", // Schritt 6: println in methodA
        "Start im main\nIn methodA", // Schritt 7
        "Start im main\nIn methodA", // Schritt 8
        "Start im main\nIn methodA\nIn methodB", // Schritt 9: println in methodB
        "Start im main\nIn methodA\nIn methodB", // Schritt 10
        "Start im main\nIn methodA\nIn methodB", // Schritt 11
        "Start im main\nIn methodA\nIn methodB\nZurück in methodA", // Schritt 12: zweites println in methodA
        "Start im main\nIn methodA\nIn methodB\nZurück in methodA", // Schritt 13
        "Start im main\nIn methodA\nIn methodB\nZurück in methodA\nZurück in main", // Schritt 14: zweites println in main
        "Start im main\nIn methodA\nIn methodB\nZurück in methodA\nZurück in main" // Schritt 15
      ],
      // Beschreibungen für jeden Schritt
      stepDescriptions: [
        "", // Platzhalter für 0-Index
        "Programmbeginn - Die Klasse wird geladen.", // Schritt 1
        "Die main-Methode wird vorbereitet. Der main-Frame wird auf den Call Stack gelegt.", // Schritt 2
        "Die erste Ausgabe in main() wird ausgeführt.", // Schritt 3
        "Der Aufruf von methodA() wird vorbereitet.", // Schritt 4
        "Die methodA-Definition wird geladen. Der methodA-Frame wird auf den Call Stack gelegt.", // Schritt 5
        "Die erste Ausgabe in methodA() wird ausgeführt.", // Schritt 6
        "Der Aufruf von methodB() wird vorbereitet.", // Schritt 7
        "Die methodB-Definition wird geladen. Der methodB-Frame wird auf den Call Stack gelegt.", // Schritt 8
        "Die Ausgabe in methodB() wird ausgeführt.", // Schritt 9
        "methodB() ist beendet, der Frame wird vom Stack entfernt.", // Schritt 10
        "Die Ausführung kehrt zu methodA() zurück.", // Schritt 11
        "Die zweite Ausgabe in methodA() wird ausgeführt.", // Schritt 12
        "methodA() ist beendet, der Frame wird vom Stack entfernt.", // Schritt 13
        "Die Ausführung kehrt zu main() zurück und die zweite Ausgabe wird ausgeführt.", // Schritt 14
        "main() ist beendet, das Programm endet." // Schritt 15
      ]
    };
  },

  methods: {
    // Schritte im Call Stack vorwärts/rückwärts bewegen
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    resetDemo() {
      this.currentStep = 1;
    },
    // Konsolenausgabe und Schrittbeschreibung für den aktuellen Schritt
    getConsoleOutput() {
      return this.consoleOutputs[Math.min(this.currentStep, this.consoleOutputs.length - 1)];
    },
    getStepDescription() {
      return this.stepDescriptions[this.currentStep];
    }
  }
}
</script>

<style scoped>
.interactive-demo {
  margin-top: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f8fafc;
}

.demo-container {
  display: flex;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .demo-container {
    flex-direction: column;
  }
}

.code-section {
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .code-section {
    max-width: 100%;
  }
}

.stack-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.stack-section h4 {
  margin-top: 0;
  /* Align heading with the top of code section */
}

.interactive-code {
  margin-top: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  flex-grow: 1;
}

.highlight-method {
  background-color: rgba(99, 125, 238, 0.25);
  border-left: 3px solid #4361ee;
  padding-left: 5px;
  font-weight: bold;
}

.stack-container {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 1rem;
  min-height: 200px;
  position: relative;
  display: flex;
  flex-direction: column-reverse; /* Stack wächst von oben nach unten */
}

.stack-frame {
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.active-frame {
  background-color: #e0f2fe;
  border-color: #4361ee;
  box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
}

.output-console {
  margin-top: 1rem;
}

.console-output {
  background-color: #1e1e3f;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  min-height: 120px;
  white-space: pre-wrap;
  flex-grow: 1;
}

.demo-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}

.demo-controls button {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.reset-button {
  background-color: #dc616b !important;
}

.reset-button:hover {
  background-color: #df4b57 !important;
}

.demo-controls button:hover:not(:disabled) {
  background-color: #3a56d4;
}

.demo-controls button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.step-indicator {
  font-weight: 500;
  color: #475569;
}

.step-description {
  margin-top: 1rem;
  font-size: 0.9rem;
}
.step-explanation {
  margin: 2rem 0;
  padding: 0.75rem 1rem;
  background: #eef2ff;
  border-left: 4px solid #4361ee;
  border-radius: 0.375rem;
  color: #1e293b;
  font-weight: 500;
}


/* Animation für Stack Frames */
.stack-frame-enter-active,
.stack-frame-leave-active {
  transition: all 0.5s ease;
}

.stack-frame-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.stack-frame-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Hervorhebung */
.highlight-active-method {
  color: #ff4757;
  font-weight: bold;
}

.highlight-in-stack {
  color: #2e86de;
  font-weight: bold;
}


/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .interactive-demo {
    padding: 1rem;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .demo-controls button {
    margin-bottom: 0.5rem;
  }
  
  .step-indicator {
    text-align: center;
    margin: 0.5rem 0;
  }
  
  .console-output {
    min-height: 80px;
    font-size: 0.8rem;
  }
  
  .interactive-code {
    font-size: 0.8rem;
  }
  
  /* Make animation steps scroll horizontally */
  .animation-container pre {
    overflow-x: auto;
    font-size: 0.75rem;
  }
  
  /* Better stack visualizations on mobile */
  .stack-container {
    min-height: 150px;
  }
}

/* Fix for very small screens */
@media (max-width: 480px) {
  .stack-frame {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
