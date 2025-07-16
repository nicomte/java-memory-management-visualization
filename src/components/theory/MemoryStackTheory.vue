<template>
  <TheoryLayout title="Java Memory Stack">
    <div class="theory-content">
      <div class="two-column-layout">
        <div class="column">
          <div class="important-note">
            <p>
              Das <strong>Memory Stack</strong> ist ein spezieller
              <strong>Speicherbereich</strong> der Java Virtual Machine (JVM).
              Hier werden während der Programmausführung <HoverTerm
                tooltip="Einfache Datentypen wie int, boolean oder char.">primitive Werte</HoverTerm>,
              <HoverTerm tooltip="Verweise auf Objekte, die im Heap gespeichert sind.">Objektreferenzen</HoverTerm>,
              <HoverTerm tooltip="Eingabewerte, die einer Methode übergeben werden.">Methodenparameter</HoverTerm> und
              <HoverTerm tooltip="Innerhalb einer Methode deklarierte Variablen.">lokale Variablen</HoverTerm>
              gespeichert.
            </p>
            <br>
            <p>
              Das Memory Stack ist der physische Speicherbereich, während der <strong>Call
                Stack</strong> eine logische Struktur ist, die steuert,
              welche Methoden gerade aktiv sind. Jeder Methodenaufruf erzeugt einen <strong>Stack Frame</strong>, dessen
              Daten im Memory Stack abgelegt werden.
            </p>


          </div>
        </div>
        <div class="column">
          <div class="advanced-section">
            <h4>Daten im Memory Stack:</h4>
            <ul>
              <li>
                <HoverTerm tooltip="Einfache Datentypen wie int, boolean oder char.">Primitive Datentypen</HoverTerm>
              </li>
              <li>
                <HoverTerm tooltip="Verweise auf Objekte, die im Heap gespeichert sind.">Objektreferenzen</HoverTerm>
              </li>
              <li>
                <HoverTerm tooltip="Werte, die Methoden als Eingabe übergeben werden.">Methodenparameter</HoverTerm>
              </li>
              <li>
                <HoverTerm tooltip="Innerhalb einer Methode deklarierte Variablen.">Lokale Variablen</HoverTerm>
              </li>
              <li>
                <HoverTerm tooltip="Die Information, wohin das Programm nach Beenden einer Methode zurückkehrt.">
                  Rücksprungadresse</HoverTerm>
              </li>
            </ul>
            <p>
              Objekte selbst werden im <strong>Heap</strong> gespeichert – das Memory Stack enthält nur die Referenzen
              darauf.
            </p>
          </div>
        </div>
      </div>

      <!-- 2. Was bedeutet LIFO? -->
      <div class="visual-container">
        <h2>Wie funktioniert ein Stack?</h2>
        <p>
          Ein Stack ist eine Datenstruktur, die nach dem <em>Last In, First Out</em>
          Prinzip (LIFO) funktioniert. Das bedeutet: Das zuletzt abgelegte Element wird als erstes wieder
          entnommen.
        </p>
        <p>Sowohl der <strong>Memory Stack</strong> als auch der <strong>Call Stack</strong> basieren auf dem
          gleichen
          Prinzip wie jeder andere Stack: dem <em>Last In, First Out</em> (<strong>LIFO</strong>)-Prinzip.
        </p>
        <ul>
          <li><strong>Hinzufügen (Push):</strong> Neue Elemente werden immer oben auf den Stack gelegt.</li>
          <li><strong>Entfernen (Pop):</strong> Elemente werden ebenfalls von oben entfernt – man kann nur das oberste
            Element entnehmen.</li>
          <li><strong>Typische Verwendung:</strong> Stacks werden überall dort genutzt, wo Aufgaben oder Daten in
            umgekehrter Reihenfolge bearbeitet werden müssen.</li>
        </ul>


<div class="example-box">
        <h3>Was ist LIFO?</h3>
        <div class="two-column-layout">
          <div class="column">
            <div class="memory-leaks-detail">
              <p>
                Das LIFO-Prinzip („Last In, First Out“) beschreibt, dass das zuletzt hinzugefügte Element zuerst
                wieder
                entfernt wird.
                Stell dir einen Stapel von Aufgaben oder Büchern vor: Das Buch, das du zuletzt oben auf den Stapel
                legst, nimmst du auch als erstes wieder herunter.
              </p>
              <ul>
                <li>Einfache Organisation von Aufgaben oder Daten.</li>
                <li>Ideal für Rückverfolgung oder Zwischenspeicherung.</li>
                <li>Kommt in vielen Bereichen der Informatik zum Einsatz, z.B. bei Rückgängig-Funktionen oder bei der
                  Auswertung von Ausdrücken.</li>
              </ul>
            </div>
          </div>
          <div class="column align-center">
            <div class="memory-leaks-detail">
              <pre>

            Stack (LIFO):
            ┌──────────────┐
            │   Aufgabe 1  │ ← Zuerst hinzugefügt
            ├──────────────┤
            │   Aufgabe 2  │
            ├──────────────┤
            │ Neue Aufgabe │ ← Zuletzt hinzugefügt
            └──────────────┘

</pre>
            </div>
            </div>
          </div>
</div>

          <div class="analogy-box">
            <h4>Analogie: Persönlicher Assistent</h4>
            <p>
              Ein <strong>Stack</strong> ist wie ein persönlicher Assistent, der Aufgaben verwaltet.
              Immer wenn du ihm eine neue Aufgabe gibst, legt er sie ganz oben auf seine To-Do-Liste.
              Er arbeitet <strong>immer zuerst die oberste Aufgabe ab</strong>.
            </p>
            <p>
              Sobald er diese Aufgabe erledigt hat, streicht er sie und kümmert sich um die nächste oben auf dem Stapel.
              Wenn du ihm währenddessen eine neue Aufgabe gibst, landet diese wieder ganz oben und hat sofort Priorität.
            </p>
            <p>
              So funktioniert das <strong>LIFO-Prinzip</strong>: Die letzte Aufgabe kommt zuerst dran.
            </p>

          </div>
        </div>


        <!-- 3. Eigenschaften -->
        <div class="advanced-section">
          <h2>Wichtige Eigenschaften der Memory Stack:</h2>
          <div class="comparison-table-container">
            <table class="comparison-table">
            <tbody>
              <tr>
                <td><strong>Automatische Speicherverwaltung</strong></td>
                <td>Speicher wird beim Methodenende sofort freigegeben.</td>
              </tr>
              <tr>
                <td><strong>Thread-spezifisch</strong></td>
                <td>Jeder <HoverTerm tooltip="Ein Ausführungsstrang innerhalb eines Programms.">Thread</HoverTerm>
                  besitzt seinen eigenen Stack.</td>
              </tr>
              <tr>
                <td><strong>Schnelligkeit</strong></td>
                <td>Operationen erfolgen extrem schnell durch das LIFO-Prinzip.</td>
              </tr>
              <tr>
                <td><strong>Begrenzte Grösse</strong></td>
                <td>Zu viele Aufrufe führen zu einem <code>StackOverflowError</code>.</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>


        <!-- 4. Interaktive Visualisierung -->
        <section class="animation-container">
          <h2>Interaktives Beispiel: Wie funktioniert der Memory Stack?</h2>
          <p class="intro-text">
            Beobachte, wie Java den Memory Stack bei Methodenaufrufen verwaltet. Farbige Bereiche zeigen
            verschiedene
            Bestandteile eines Stack-Frames: Parameter, primitive Werte und Objektreferenzen.
          </p>
          <div class="two-column-layout">
            <!-- Code Section -->
            <div class="column left">
              <div class="code-block">
                <pre class="code-example">
<span :class="{ 'code-highlight': currentStep === 0 }">public class MemoryExample &#123;</span>
<span :class="{ 'code-highlight': currentStep === 1 }">    public static void main(String[] args) &#123;</span>
<span :class="{ 'code-highlight': currentStep === 2 }">        calculateSum(5, 7);</span>
<span>    &#125;</span>
<span></span>
<span :class="{ 'code-highlight': currentStep === 3 }">    public static void calculateSum(int a, int b) &#123;</span>
<span :class="{ 'code-highlight': currentStep === 3 }">        int result = a + b;</span>
<span :class="{ 'code-highlight': currentStep === 4 }">        String message = "Summe: " + result;</span>
<span :class="{ 'code-highlight': currentStep === 5 }">        System.out.println(message);</span>
<span>    &#125;</span>
<span>&#125;</span>
              </pre>
              </div>
            </div>

            <!-- Stack Visualization -->
            <div class="column right improved-stack-panel">
              <div class="step-indicator">
                Schritt {{ Math.min(currentStep + 1, steps.length) }} / {{ steps.length }}
              </div>
              <div class="interactive-controls">
                <button @click="reset">Reset</button>
                <button @click="nextStep" :disabled="currentStep >= steps.length">Nächster Schritt</button>
              </div>

              <div class="legend-and-explanation">
                <div class="stack-legend compact">
                  <span class="legend-item param">Parameter</span>
                  <span class="legend-item primitive">Primitiver Wert</span>
                  <span class="legend-item reference">Objektreferenz</span>
                </div>
                <p class="step-explanation"
                  v-html="currentExplanation || 'Klicke auf &quot;Nächster Schritt&quot; zum Starten.'"></p>
              </div>
            </div>
          </div>
          <!-- Stack Visualizations Side by Side -->
          <div class="stack-visuals-inline">

            <div>
              <h3>Call Stack</h3>
              <div class="callstack-visual">
                <div v-if="stackFrames.length === 0" class="empty">(Call Stack ist leer)</div>
                <transition-group name="callstack" tag="div">
                  <div v-for="(f, i) in stackFrames.slice().reverse()" :key="i" class="callstack-frame">
                    {{ f.name }}
                  </div>
                </transition-group>
              </div>
            </div>

            <div>
              <h3>Memory Stack</h3>
              <div class="stack-visual">
                <div v-if="stackFrames.length === 0" class="empty">(Stack ist leer)</div>
                <transition-group name="stack" tag="div">
                  <div v-for="(f, i) in stackFrames.slice().reverse()" :key="i" class="frame"
                    :class="{ active: i === 0 }">
                    <div class="frame-header">
                      <span v-if="i === 0" class="stack-pointer-arrow">⮕</span>
                      {{ f.name }}
                    </div>
                    <div class="frame-body">
                      <div v-for="item in f.content" :key="item.label" :class="item.type">
                        {{ item.label }} = {{ item.value }}
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>
          </div>

        </section>
      </div>
  </TheoryLayout>
</template>


<script>
import TheoryLayout from './TheoryLayout.vue';
import HoverTerm from '../HoverTerm.vue';

export default {
  name: 'MemoryStackTheory',
  components: { TheoryLayout, HoverTerm },
  data() {
    return {
      steps: [
        {
          action: 'push',
          frame: {
            name: 'main()',
            content: [{ type: 'param', label: 'args', value: '[]' }]
          },
          explanation: 'Start: Das <code>main()</code>-Frame wird erstellt und der Parameter <code>args</code> wird auf dem Stack gespeichert.'
        },
        {
          action: 'push',
          frame: {
            name: 'calculateSum(5,7)',
            content: [
              { type: 'param', label: 'a', value: '5' },
              { type: 'param', label: 'b', value: '7' }
            ]
          },
          explanation: 'Aufruf von <code>calculateSum(5,7)</code>. Die Parameter <code>a</code> und <code>b</code> werden im neuen Stack Frame abgelegt.'
        },
        {
          action: 'add',
          content: { type: 'primitive', label: 'result', value: '12' },
          explanation: 'Berechnung: Die lokale Variable <code>result</code> mit dem Wert <code>12</code> wird im Stack gespeichert.'
        },
        {
          action: 'add',
          content: { type: 'reference', label: 'message', value: 'ref1' },
          explanation: 'Die Variable <code>message</code> erhält eine Referenz (<code>ref1</code>) auf das erzeugte String-Objekt (im Heap).'
        },
        {
          action: 'pop',
          explanation: 'Die Methode <code>calculateSum()</code> ist beendet. Das oberste Stack Frame wird entfernt.'
        },
        {
          action: 'pop',
          explanation: 'Auch die Methode <code>main()</code> ist abgeschlossen. Der Stack ist jetzt vollständig geleert.'
        }
      ],
      currentStep: 0,
      stackFrames: [],
      currentExplanation: ''
    }
  },
  methods: {
    reset() {
      this.currentStep = 0;
      this.stackFrames = [];
      this.currentExplanation = '';
    },
    nextStep() {
      if (this.currentStep < this.steps.length) {
        const step = this.steps[this.currentStep];

        if (step.action === 'push') {
          // Deep clone to avoid shared references
          const newFrame = JSON.parse(JSON.stringify(step.frame));
          this.stackFrames.push(newFrame);
        }
        else if (step.action === 'add') {
          const topFrame = this.stackFrames[this.stackFrames.length - 1];
          const newContent = JSON.parse(JSON.stringify(step.content));
          topFrame.content.push(newContent);
        }
        else if (step.action === 'pop') {
          this.stackFrames.pop();
        }

        this.currentExplanation = step.explanation;
        this.currentStep++;
      }
    }
  },
  mounted() {
    this.reset();
  }
}
</script>



<style scoped>
.intro-text {
  margin-bottom: 1rem;
  color: #475569;
  font-style: italic;
}

/* === Code Block === */
.code-block {
  margin-bottom: 1rem;
  background: #1e1e3f;
  color: #e0e0ff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: 'Fira Code', monospace;
  overflow-x: auto;
  max-width: 100%;
}

.code-example {
  white-space: pre-line;
  font-size: 1.05rem;
  line-height: 1.5;
  background: none;
  color: inherit;
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
}

.code-highlight {
  background-color: rgba(67, 97, 238, 0.3);
  border-radius: 4px;
}

/* === Interactive Controls === */
.interactive-controls {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
  flex-wrap: wrap;
}

.interactive-controls button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* === Explanation and Legend === */
.legend-and-explanation {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 0.7rem;
}

.step-explanation {
  padding: 0.75rem 1rem;
  background: #eef2ff;
  border-left: 4px solid #4361ee;
  border-radius: 0.375rem;
  color: #1e293b;
  font-weight: 500;
  min-height: 4rem;
}

/* === Visual Layout === */
.stack-visuals-inline {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.stack-visuals-inline>div {
  flex: 1 1 300px;
  min-width: 0;
}

/* === Stack Container === */
.stack-visual {
  border: 1px dashed #cbd5e1;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f9fafb;
  min-height: 6rem;
  margin-top: 0.5rem;
}

.callstack-visual {
  border: 1px dashed #cbd5e1;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f9fafb;
  min-height: 6rem;
  margin-top: 0.5rem;
}

.empty {
  color: #6b7280;
  font-style: italic;
}

/* === Stack Frames === */
.frame,
.callstack-frame {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
}

.frame.active {
  border: 2px solid #4361ee;
  box-shadow: 0 2px 6px rgba(67, 97, 238, 0.3);
}

.frame-header {
  background: #eef2ff;
  padding: 0.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.frame-body {
  padding: 0.5rem;
}

/* === Stack Content Types === */
.param {
  background-color: #d1fae5;
  border-left: 4px solid #10b981;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
}

.primitive {
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
}

.reference {
  background-color: #e0f2fe;
  border-left: 4px solid #3b82f6;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
}

/* === Stack Arrow === */
.stack-pointer-arrow {
  color: #4361ee;
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

/* === Step Indicator === */
.step-indicator {
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.7rem;
  font-size: 1.05rem;
}

/* === Legend === */
.stack-legend {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stack-legend .legend-item {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.legend-item.param {
  background-color: #d1fae5;
  color: #065f46;
}

.legend-item.primitive {
  background-color: #fef3c7;
  color: #92400e;
}

.legend-item.reference {
  background-color: #e0f2fe;
  color: #1e3a8a;
}

/* === Animations === */
.stack-enter-active,
.stack-leave-active,
.callstack-enter-active,
.callstack-leave-active {
  transition: all 0.3s ease;
}

.stack-enter-from,
.stack-leave-to,
.callstack-enter-from,
.callstack-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* === Responsive Design === */
@media (max-width: 768px) {
  .stack-visuals-inline {
    flex-direction: column;
  }

  .interactive-controls {
    flex-direction: column;
  }

  .interactive-controls button {
    width: 100%;
  }

  .step-explanation {
    font-size: 0.95rem;
  }
}
</style>
