<template>
  <TheoryLayout title="Instruction Pointer">
    <div class="theory-content">

      <div class="visual-container">
        <p>
          Der <strong>Instruction Pointer (IP)</strong> ist ein
          <HoverTerm
            tooltip="Ein Register ist ein kleines, extrem schnelles Speicherfeld innerhalb der CPU, das wichtige Daten oder Adressen speichert.">
            Register</HoverTerm>.
          In vielen Prozessor-Architekturen wird er als Program Counter (PC) genannt.
          In der
          <HoverTerm tooltip="Die Java Virtual Machine (JVM) ist die Laufzeitumgebung, die Java-Programme ausführt.">JVM
          </HoverTerm>
          übernimmt der Instruction Pointer die gleiche Aufgabe wie der Program Counter in der CPU: <strong>Er zeigt auf
            die nächste
            <HoverTerm tooltip="Maschinenunabhängiger Code, den die JVM interpretiert und ausführt.">Bytecode
            </HoverTerm>
            -Anweisung.
          </strong>
        </p>
        <div class="two-column-layout">

          <div class="column">
            <div class="analogy-box">
              <p>
                Stell dir vor, du liest ein Kochrezept. Du brauchst einen Finger oder Lesezeichen, um zu wissen, bei
                welchem
                Schritt du bist.
                Genau so funktioniert der <strong>Instruction Pointer</strong> in einem Computer: Er zeigt immer auf die
                nächste
                Anweisung, die ausgeführt werden soll.
              </p>
            </div>
          </div>
          <div class="column">
            <div class="important-note">
              <p>
                <strong>Instruction Pointer</strong> und <strong>Program Counter</strong> sind zwei Begriffe für
                dasselbe
                Konzept.
                Im Hardware-Bereich spricht man oft vom Program Counter, während in Software- oder JVM-Kontexten der
                Begriff
                Instruction Pointer verwendet wird.
              </p>
            </div>
          </div>
        </div>
      </div>


      <h3></h3>
      <div class="comparison-grid">
        <div class="comparison-item">
          <h3>Stack Pointer</h3>
          <ul class="compact-list">
            <li>Zeigt auf den aktuellen
              <HoverTerm
                tooltip="Ein Stack Frame ist ein Speicherblock im Call Stack, der lokale Variablen und Rücksprungadressen einer Methode enthält.">
                Stack Frame</HoverTerm>
            </li>
            <li>Ändert sich nur bei Methoden-Ein- und Austritten</li>
            <li>Verwaltet Speicher und Kontext</li>
          </ul>
        </div>
        <div class="comparison-item">
          <h3>Instruction Pointer</h3>
          <ul class="compact-list">
            <li>Zeigt auf die nächste auszuführende Anweisung</li>
            <li>Ändert sich bei jeder Anweisung</li>
            <li>Steuert den Ablauf des Codes</li>
          </ul>
        </div>
      </div>

      <div class="example-box">
        <h4>Der Instruction Pointer:</h4>
        <ul>
          <li>Ermöglicht gezielte Sprünge bei
            <HoverTerm tooltip="Bedingte Programmabläufe wie if/else-Strukturen.">Bedingungen</HoverTerm>
            oder
            <HoverTerm tooltip="Der Aufruf einer Funktion oder Methode.">Methodenaufrufen</HoverTerm>.
          </li>
          <li>Ist <strong>nicht sichtbar</strong> oder direkt steuerbar im Java-Code.</li>
          <li>Die
            <HoverTerm tooltip="Java Virtual Machine, die deinen Java-Code ausführt.">JVM</HoverTerm>
            verwaltet ihn automatisch.
          </li>
          <li>
            Mit einem
            <HoverTerm
              tooltip="Ein Debugger ist ein Werkzeug, das dir ermöglicht, den Ablauf deines Programms Schritt für Schritt zu verfolgen.">
              Debugger</HoverTerm>
            kannst du den aktuellen Stand des Instruction Pointers einsehen.
          </li>
        </ul>
      </div>

      <div class="summary-section">
        <h3>Zusammenfassung:</h3>
        <p>
          Der Instruction Pointer steuert den Ablauf eines Programms, indem er Anweisungen der Reihe nach oder
          durch
          gezielte Sprünge ausführt.
          In Multi-Threading-Umgebungen sorgt er dafür, dass jeder Thread seinen eigenen Ablauf verfolgt.
        </p>
      </div>

      <button @click="showAdvanced = !showAdvanced" class="toggle-advanced">
        {{ showAdvanced ? 'Weniger anzeigen' : 'Für Fortgeschrittene' }}
      </button>

      <div v-if="showAdvanced" class="advanced-section">
        <h2>Vertiefung: Mehr zum Verhalten des Instruction Pointers</h2>
        <div class="analogy-box">
          <p>In der JVM gibt es <strong>Threads</strong>, sobald ein Programm gestartet wird.
            Jeder Thread hat seinen eigenen Ablauf und wird vom Betriebssystem oder der JVM verwaltet.
            Threads sind wichtig, weil sie es ermöglichen, dass verschiedene Teile eines Programms gleichzeitig
            ausgeführt
            werden, was die Effizienz erhöht.
          </p>
          <p>
            <strong>Jeder Thread besitzt seinen eigenen Instruction Pointer</strong>. So kann jeder Thread unabhängig
            arbeiten
            und weiss
            genau, welche Anweisung er als nächstes ausführen muss.
          </p>
        </div>

        <h3>Bytecode und der Instruction Pointer</h3>
        <p>Während wir
          normalen Code sehen, arbeitet die Maschine nur mit Bytecode. Genau durch diesen Bytecode
          navigiert
          der Instruction Pointer.</p>
        <p>
          Normalerweise erhöht sich der Instruction Pointer automatisch nach jeder Anweisung.
          Bei speziellen
          <HoverTerm
            tooltip="Anweisungen wie Sprünge, Bedingungen oder Methodenaufrufe, die den normalen Ablauf verändern.">
            Kontrolltransfer</HoverTerm>-Instruktionen
          springt er gezielt zu anderen Adressen:
        </p>
        <ul class="compact-list">
          <li><strong>Sprünge:</strong> Der IP wird auf eine andere Bytecode-Adresse gesetzt.</li>
          <li><strong>Bedingte Sprünge:</strong> Nur wenn eine Bedingung erfüllt ist, springt der IP.</li>
          <li><strong>Methodenaufrufe:</strong> Der aktuelle IP wird gespeichert, bevor zur Methode gesprungen
            wird.
          </li>
          <li><strong>Returns:</strong> Der gespeicherte IP wird wiederhergestellt.</li>
        </ul>
        <div class="two-column-layout">
          <div class="column">
            <div class="example-box">
              <p>
                Dieses einfache Java-Programm vergleicht zwei Zahlen und gibt die grössere Zahl zurück:
              </p>

              <pre class="code-example">
public int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}</pre>
              <p>
                Der <strong>Instruction Pointer</strong> steuert dabei, welche Bytecode-Anweisung als nächstes
                ausgeführt wird.
              </p>
            </div>
            <div class="example-box">
              <h3>Technisches Hintergrund</h3>
              <p>
                Das Konzept des Instruction Pointers stammt aus der Prozessor-Architektur, wo er meist
                <HoverTerm tooltip="Ein Register in der CPU, das die Adresse der nächsten Maschinenanweisung enthält.">
                  Program
                  Counter</HoverTerm>
                genannt wird. Jede
                <HoverTerm tooltip="Die technische Struktur von Hard- oder Software.">Architektur</HoverTerm>
                hat dabei eigene Mechanismen zur Steuerung.
              </p>
            </div>
          </div>

          <div class="column">
            <div class="example-box">
              <p><strong>So bewegt sich der Instruction Pointer durch den Bytecode:</strong></p>
              <div class="execution-steps">
                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>0: iload_1</code>
                </div>
                <p>Lade Wert von <code>a</code> in ein Register.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>1: iload_2</code>
                </div>
                <p>Lade Wert von <code>b</code>.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>2: if_icmple 7</code>
                </div>
                <p>Vergleiche <code>a</code> und <code>b</code>. Wenn <code>a &le; b</code>, springe zu Adresse 7.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>5: iload_1</code>
                </div>
                <p><em>(Nur wenn kein Sprung erfolgt)</em> Lade <code>a</code>, weil es grösser ist.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>6: ireturn</code>
                </div>
                <p>Gib <code>a</code> zurück.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>7: iload_2</code>
                </div>
                <p><em>(Falls gesprungen)</em> Lade <code>b</code>.</p>

                <div class="execution-step">
                  <div class="ip-indicator">&rarr;</div><code>8: ireturn</code>
                </div>
                <p>Gib <code>b</code> zurück.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TheoryLayout>
</template>

<script>
import TheoryLayout from './TheoryLayout.vue';
import HoverTerm from '../HoverTerm.vue';

export default {
  name: 'InstructionPointerTheory',
  components: {
    TheoryLayout,
    HoverTerm
  },
  data() {
    return {
      showAdvanced: false
    }
  }
}
</script>

<style scoped>
/* === Compact List Styling === */
.compact-list {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.compact-list li {
  position: relative;
  list-style: none;
  margin-bottom: 0.4rem;
  line-height: 1.5;
}

.compact-list li::before {
  content: '▸';
  position: absolute;
  left: -1.2rem;
  color: var(--accent-color);
  font-size: 1rem;
}

/* === General List Override === */
ul {
  list-style: none;
  padding-left: 1.5rem;
}

ul li {
  position: relative;
  margin-bottom: 0.6rem;
  line-height: 1.6;
}

ul li::before {
  content: '•';
  position: absolute;
  left: -1.2rem;
  color: var(--primary-color);
  font-size: 0.9rem;
}

/* Ordered List */
ol {
  list-style: decimal outside;
  padding-left: 1.5rem;
}

ol li {
  margin-bottom: 0.6rem;
}

/* === Comparison Grid Improvements === */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0;
}

.comparison-item {
  background-color: #ffffff;
  padding: 1.2rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.comparison-item:hover {
  transform: translateY(-3px);
}

.comparison-item h3 {
  margin-bottom: 0.8rem;
  color: var(--primary-color);
  font-size: 1.4rem;
}

/* === Execution Steps Modernized === */
.execution-steps {
  border-radius: 0.6rem;
  padding: 1rem 1.2rem;
  margin-top: 1rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  color: #d4d4d4;
  font-size: 0.9rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
}

.execution-step {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.6rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  width: fit-content;
}

.ip-indicator {
  color: #ef4444;
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
}

/* Description below each step */
.execution-steps p {
  margin: 0.2rem 0 0.8rem 1.8rem;
  font-size: 0.85rem;
  color: #9ca3af;
}

/* === Code Example Improvements === */
.code-example,
.visual-container pre {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem 1.2rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  overflow-x: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.5;
}

.visual-container pre {
  margin: 0;
}

/* === Toggle Button Enhancement === */
.toggle-advanced {
  margin: 2rem 0 1rem 0;
  padding: 0.7rem 1.5rem;
  background-color: var(--primary-color);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.toggle-advanced:hover {
  background-color: var(--primary-hover);
  transform: scale(1.05);
}

/* === Responsive Tweaks === */
@media (max-width: 900px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .execution-step {
    font-size: 0.85rem;
  }

  .toggle-advanced {
    width: 100%;
    text-align: center;
  }
}
</style>
