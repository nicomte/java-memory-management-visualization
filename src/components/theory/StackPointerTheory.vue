<template>
  <TheoryLayout title="Stack Pointer">
    <div class="theory-content">

      <div class="example-box">
        <div class="two-column-layout">
          <div class="column">
            <p>Der <strong>Stack Pointer (SP)</strong> ist ein spezielles <HoverTerm
                tooltip="Ein schneller Speicher im Prozessor">
                Register
              </HoverTerm>, das auf die <strong>aktuelle Position im Stack</strong> zeigt. Man kann ihn sich wie ein
              Lesezeichen
              vorstellen,
              das angibt, an welcher Stelle im Stack sich das Programm momentan befindet.</p>
            <p>Im Verlauf eines Programms werden ständig Daten auf den Stack geschoben und wieder vom Stack entfernt,
              wenn Funktionen aufgerufen und abgeschlossen werden.
              Um zu wissen, <strong>wo neue Daten abgelegt werden müssen und wo im Stack sich das Programm gerade
                befindet</strong>, wird der Stack Pointer (SP) verwendet.
            </p>

          </div>

          <div class="column align-middle">
            <img src="@/assets/stackPointer.png" alt="Diagramm eines Stacks mit Stack-Pointer" class="stack-image"
              @error="checkImage" v-if="imageLoaded" />
          </div>
        </div>
      </div>

      <div class="analogy-box">
        <h4>Alltagsbeispiel</h4>
        <p>Stell dir einen Stapel Teller in einer Cafeteria vor:</p>
        <ul>
          <li>Du kannst nur Teller vom <strong>obersten</strong> Teil des Stapels nehmen (POP).</li>
          <li>Du kannst nur neue Teller <strong>oben</strong> auf den Stapel legen (PUSH).</li>
          <li>Der <strong>Stack Pointer</strong> ist wie dein Finger, der immer auf den obersten Teller zeigt.</li>
          <li>Wenn du einen Teller hinzufügst, bewegt sich dein Finger nach oben.</li>
          <li>Wenn du einen Teller nimmst, bewegt sich dein Finger nach unten.</li>
        </ul>
      </div>

      <div class="example-box">
        <h3>Funktionsweise des Stack Pointers:</h3>
        <p>Der Stack Pointer ist ein <HoverTerm tooltip="Ein Zeiger, der sich während des Programms verändert.">
            dynamischer Zeiger</HoverTerm>, der sich bei jedem Methodenaufruf und jeder Methodenrückkehr im Speicher
          verändert.</p>



        <div class="two-column-layout">
          <div class="column">
            <div class="example-box">
              <h4>Bei einem Methodenaufruf:</h4>
              <ol>
                <li>Ein neuer Stack-Frame wird erstellt.</li>
                <li>Der Stack Pointer <HoverTerm tooltip="wird kleiner gemacht / reduziert.">dekrementiert</HoverTerm>
                  sich
                  (zeigt auf eine niedrigere Adresse), um den neuen Frame zu markieren.</li>
                <li>Dieser
                  neue Stack-Frame wird der aktuelle Ausführungskontext - er erhält alle Infos der gerade
                  laufenden Funktion.</li>
              </ol>
            </div>
          </div>

          <div class="column">
            <div class="example-box">
              <h4>Bei einer Methodenrückkehr:</h4>
              <ol>
                <li>Der aktuelle <HoverTerm tooltip="Bereich im Stack, indem infos über eine Funktion gespeichert ist.">
                    Stack-Frame</HoverTerm>, wird vom Stack entfernt.</li>
                <li>Der Stack Pointer wird <HoverTerm tooltip="wird erhöht">inkrementiert</HoverTerm> (zeigt auf eine
                  höhere
                  Adresse), um zum vorherigen Funktionsaufruf zurückzukehren.</li>
                <li>Die Methode, die die aktuelle Funktion aufgerufen hat, wird fortgesetzt.</li>
              </ol>
            </div>
          </div>
        </div>

      </div>





      <!-- Try-It-Yourself Sektion -->
      <div class="try-yourself-section collapsible-section">
        <div class="section-header" @click="toggleSection('tryYourself')">
          <h3><i class="fas fa-hands-on"></i> Visualisierung eines Stacks!<i class="fas"
              :class="sections.tryYourself ? 'fa-chevron-up' : 'fa-chevron-down'"></i></h3>
        </div>
        <p><em>zum einblenden / ausblenden klicken</em></p>
        <div class="section-content" v-show="sections.tryYourself">
          <p>Experimentiere hier mit dem Stack. Wähle verschiedene Aktionen und sieh, wie sich der Stack und der Stack
            Pointer verändern!</p>

          <div class="simulator">
            <div class="simulator-controls">
              <button @click="simulatePush" class="sim-button">PUSH (Wert hinzufügen)</button>
              <button @click="simulatePop" :disabled="simulatorStack.length === 0" class="sim-button">POP (Wert
                entfernen)</button>
              <button @click="simulateMethodCall" class="sim-button">Methodenaufruf</button>
              <button @click="simulateMethodReturn" :disabled="simulatorFrames <= 1"
                class="sim-button">Methodenrückkehr</button>
              <button @click="resetSimulator" class="sim-button reset">Reset</button>
            </div>

            <div class="simulator-stack">
              <div v-for="(item, index) in simulatorStack" :key="index" class="stack-item"
                :class="{ 'current-frame': index === simulatorStack.length - 1 }">
                {{ item }}
                <span v-if="index === simulatorPointer" class="stack-pointer-indicator">← SP</span>
              </div>
              <div v-if="simulatorStack.length === 0" class="empty-stack">Stack ist leer</div>
            </div>

            <div class="simulator-info">
              <p><strong>Stack Frames:</strong> {{ simulatorFrames }}</p>
              <p><strong>Stack Pointer Position:</strong> {{ simulatorPointer }}</p>
              <p><strong>Stack-Grösse:</strong> {{ simulatorStack.length }}</p>
            </div>
          </div>
        </div>
      </div>
      <h3>Zusammenspiel mit dem Call Stack:</h3>
      <p>Wenn eine neue Methode aufgerufen wird, wird ein neues Stack-Frame erstellt. Der Stack Pointer wird
        aktualisiert und zeigt auf das neue Frame. Wenn die Methode beendet wird, wird der Stack-Frame entfernt und
        der
        Stack Pointer wird zurückgesetzt, um auf das vorherige Frame zu zeigen.</p>


      <div class="summary-section">
        <h3>Zusammenfassung:</h3>
        <p><strong>Der Stack Pointer zeigt immer auf den Bereich im Speicher, der die Daten der aktuell laufenden
          Funktion speichert.</strong> Wenn die Funktion endet, wird dieser Bereich entfernt, und der Stack Pointer
          zeigt auf die vorherige Funktion. Dies ermöglicht dem Programm, nach einer Rückkehr aus einer Funktion genau an der
          richtigen Stelle weiterzumachen. </p>
        <p>Er bewegt sich mit jedem Methodenaufruf und jeder
          Methodenrückkehr und ermöglicht so die strukturierte Abarbeitung von verschachtelten Methodenaufrufen. Ohne
          den Stack Pointer könnte die JVM nicht wissen, wo im Programm sie sich gerade befindet und welche Variablen
          zum aktuellen Kontext gehören.</p>
      </div>

    </div>
  </TheoryLayout>
</template>

<script>
import TheoryLayout from './TheoryLayout.vue';
import HoverTerm from '../HoverTerm.vue'; // Add this import

export default {
  name: 'StackPointerTheory',
  components: {
    TheoryLayout,
    HoverTerm // Register the component
  },
  data() {
    return {

      // Stack Visualisierung
      simulatorStack: ["main(): int n = 10"],
      simulatorPointer: 0,
      simulatorFrames: 1,
      simulatorCounter: 0,

      // Für ausklappbare Sektionen
      sections: {
        tryYourself: false
      },

      imageLoaded: true
    };
  },
  methods: {
    // Interaktive Animation Methoden
    nextStep() {
      if (this.currentStep < this.maxSteps - 1) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    resetAnimation() {
      this.currentStep = 0;
    },

    // Simulator Methoden
    simulatePush() {
      const value = `Variable${++this.simulatorCounter} = ${Math.floor(Math.random() * 100)}`;
      this.simulatorStack.push(value);
      this.simulatorPointer = this.simulatorStack.length - 1;
    },
    simulatePop() {
      if (this.simulatorStack.length > 0) {
        this.simulatorStack.pop();
        this.simulatorPointer = Math.max(0, this.simulatorStack.length - 1);
      }
    },
    simulateMethodCall() {
      this.simulatorFrames++;
      const methodName = `method${this.simulatorFrames}`;
      this.simulatorStack.push(`--- Frame-Grenze ---`);
      this.simulatorStack.push(`${methodName}(): Rücksprungadresse`);
      this.simulatorStack.push(`${methodName}(): Parameter`);
      this.simulatorPointer = this.simulatorStack.length - 1;
    },
    simulateMethodReturn() {
      if (this.simulatorFrames > 1) {
        // Entferne den aktuellen Frame - suche nach der letzten Frame-Grenze
        let frameFound = false;
        while (this.simulatorStack.length > 0 && !frameFound) {
          const item = this.simulatorStack.pop();
          if (item === "--- Frame-Grenze ---") {
            frameFound = true;
          }
        }
        this.simulatorFrames--;
        this.simulatorPointer = this.simulatorStack.length - 1;
      }
    },
    resetSimulator() {
      this.simulatorStack = ["main(): int n = 10"];
      this.simulatorPointer = 0;
      this.simulatorFrames = 1;
      this.simulatorCounter = 0;
    },

    // Section Toggle
    toggleSection(section) {
      this.sections[section] = !this.sections[section];
    },

    checkImage(event) {
      this.imageLoaded = !event.target.error;
    },

    mounted() {
      // Lade FontAwesome für Icons
      const script = document.createElement('script');
      script.src = 'https://kit.fontawesome.com/a076d05399.js';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
}
</script>

<style scoped>
.stack-image {
  max-width: 85%;
  height: auto;
  margin: 0 auto;
  display: block;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


/* Allgemeine Container-Stile */
.animation-placeholder,
.interactive-container,
.try-yourself-section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.8rem;
  background-color: #f8fafc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}



.try-yourself-section {
  background-color: #faf5ff;
  border-left: 4px solid #a855f7;
}


/* Interaktive Animation Styling */
.animation-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.control-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.control-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.control-button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.animation-display {
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 200px;
  position: relative;
}

.animated-stack {
  background-color: #f8fafc;
  border: 1px dashed #94a3b8;
  padding: 1rem;
  margin: 0 auto;
  width: fit-content;
  font-family: monospace;
  font-size: 1rem;
  color: #334155;
}

.step-description {
  font-weight: bold;
  color: #4361ee;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.step-explanation {
  margin-top: 1rem;
  font-style: italic;
  color: #6b7280;
}

/* Try-It-Yourself Simulator */
.simulator {
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
}

.simulator-controls {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.sim-button {
  padding: 0.5rem 1rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.sim-button:hover:not(:disabled) {
  background-color: #4f46e5;
  transform: scale(1.05);
}

.sim-button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.sim-button.reset {
  background-color: #ef4444;
}

.sim-button.reset:hover {
  background-color: #dc2626;
}

.simulator-stack {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-height: 200px;
  background-color: #f1f5f9;
  overflow-y: auto;
}

.stack-item {
  padding: 0.5rem;
  border-top: 1px solid #cbd5e1;
  display: flex;
  justify-content: space-between;
  background-color: white;
}

.stack-item:first-child {
  border-top: none;
}

.stack-item.current-frame {
  background-color: #f0f9ff;
}

.stack-pointer-indicator {
  color: #ef4444;
  font-weight: bold;
}

.empty-stack {
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
  font-style: italic;
}

.simulator-info {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  border-top: 1px solid #cbd5e1;
  padding-top: 0.5rem;
}

/* Ausklappbare Sektionen */
.collapsible-section .section-header {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapsible-section .section-content {
  margin-top: 1rem;
  transition: all 0.3s ease;
}

/* Medienabfragen für Responsive Design */
@media (max-width: 768px) {
  .theory-content h2 {
    font-size: 1.5rem;
  }

  .theory-content h3 {
    font-size: 1.25rem;
  }

  .analogy-content {
    flex-direction: column;
  }

  .simulator-controls {
    flex-direction: column;
  }

  .sim-button {
    width: 100%;
  }
}
</style>
