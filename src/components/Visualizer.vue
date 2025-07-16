<script>

import { useProgramStore } from "@/store/memory";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import MemoryStackTable from "@/components/MemoryStackTable.vue";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default {
  name: 'myVisualizer',

  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: ''
    }
  },

  components: {
    MemoryStackTable
  },

  setup(props) {
    const store = useProgramStore();
    const { instructionPointer, currentLineExecuted } = storeToRefs(store);

    // function to scroll to the highlighted line
    const scrollToHighlightedLine = () => {
      setTimeout(() => {
        // Try to find and scroll to the current line
        const currentLine = document.querySelector('.current-line');
        if (currentLine) {
          currentLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }

        // If no current line is found, try to scroll to the next line
        const nextLine = document.querySelector('.next-line');
        if (nextLine) {
          nextLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    };

    // Watch for changes to the instruction pointer or current line
    watch([instructionPointer, currentLineExecuted], () => {
      scrollToHighlightedLine();
    });

    onMounted(async () => {
      await store.loadPrograms();

      if (props.readOnly || props.mode === 'preview') return;

      scrollToHighlightedLine();

      // Use a delay to ensure DOM is fully painted
      if (!store.driverTourCompleted) {
        setTimeout(() => {
          const driverObj = driver({
            showProgress: true,
            steps: [
              {
                element: '.program-area',
                popover: {
                  title: 'Quellcode',
                  description:
                    'Hier wird der visualisierte Quellcode angezeigt. Die markierte Zeile wird aktuell ausgeführt, der Pfeil stellt den Instruction-Pointer dar und zeigt auf die als nächstes auszuführende Zeile.',
                },
              },
              {
                element: '.memory-section:nth-of-type(1)',
                popover: {
                  title: 'Call-Stack',
                  description:
                    'Hier werden die aktuell ausgeführten Methoden aufgelistet. Die aktuellste Methode ist zuoberst.',
                },
              },
              {
                element: '.memory-section:nth-of-type(2)',
                popover: {
                  title: 'Memory-Stack',
                  description:
                    'Variabeln welche im Scope der aktuellen Methode liegen, sind hier aufgeführt.',
                },
              },
              {
                element: '.memory-section:nth-of-type(3)',
                popover: {
                  title: 'Memory-Heap',
                  description:
                    'Der Heap ist der Speicherort für alle nicht-elementaren Datentypen wie z.B. Arrays und Objekte.',
                },
              },
              {
                element: '.memory-stack-table-wrapper',
                popover: {
                  title: 'Memory-Stack-Table',
                  description: 'Hier werden alle Variabeln schön lesbar gesammelt.',
                },
              }
            ],
          });
          driverObj.drive();
          store.driverTourCompleted = true;
        }, 400);
      }
    });


    return {
      store, instructionPointer, scrollToHighlightedLine
    }
  }

}

</script>


<template>
  <div v-if="store.programsLoaded">

    <div v-if="!readOnly && mode !== 'preview'" class="top-button-row">
      <button class="reset-btn" @click="store.reset">Reset</button>
      <!-- Program Selection -->
      <div class="prg-selection-container">
        <button v-for="(value, key, index) in {
          'Point & Line': 'Verwaltung von Objekten im Speicher',
          'Zinsenrechner': 'Verwaltung von Statischen Methoden im Speicher',
          'Temperatur Kalkulator': 'Verwaltung von Statischen Variablen im Speicher'
        }" :key="index" :id="'btn-' + (index + 1)" type="button" class="custom-btn tooltip-wrapper"
          :class="{ active: store.programSelection === index }" @click="store.selectProgram(index)">
          {{ key }}
          <span class="tooltip-bubble">{{ value }}</span>
        </button>
      </div>
    </div>

    <!-- Memory Visualization Container -->
    <div class="memory-visualization-container">
      <!-- Top Controls (Styled Reset Button) -->


      <!-- Program Area -->
      <div class="program-area">
        <h2>Program</h2>

        <div>
          <p v-for="(line, index) in store.selectedProgram.code" :key="'code-' + index" class="program-line"
            :data-line-number="index" :class="{
              'current-line': index === store.currentLineExecuted,
              'next-line': index === store.instructionPointer
            }">
            <span>{{ line }}</span>
          </p>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">
        <div class="memory-visualization">
          <!-- Call Stack -->
          <div class="memory-section">
            <h3>Call Stack</h3>
            <div v-if="store.callStack.length === 0" class="empty-state">Empty</div>
            <div class="reverse-stack-wrapper">
              <div class="allocation-item" v-for="(method, index) in store.callStack" :key="'call-' + index"
                :class="method.classes">
                <strong>{{ method.name }}</strong>
              </div>
            </div>
          </div>

          <!-- Memory Stack -->
          <div class="memory-section">
            <h3>Memory Stack</h3>
            <div v-if="store.memoryStack.length === 0" class="empty-state">Empty</div>
            <div class="reverse-stack-wrapper">
              <div class="allocation-item" v-for="(entry, index) in store.memoryStack" :key="'stack-' + index"
                :class="entry.classes">
                <strong>{{ entry.value }}</strong>
              </div>
            </div>
          </div>

          <!-- Memory Heap -->
          <div class="memory-section">
            <h3>Memory Heap</h3>
            <div id="heap">
              <div class="allocation-item heap-item" v-for="(entry, index) in store.heap" :key="'heap-' + index"
                :class="entry.classes">
                <div class="heap-box">
                  <div class="heap-line-1">{{ entry.name }}: {{ entry.value }}</div>
                  <div class="heap-line-2">{{ entry.address }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Memory Stack Table -->
          <div class="memory-section memory-stack-table-wrapper">
            <h3>Memory Stack Table</h3>
            <div class="memory-stack-table-driver-anchor">
              <memory-stack-table />
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div class="explanation">
          <h3>Erklärung</h3>
          <p v-if="store.explanation.trim() === ''">Initialer Status</p>
          <p>{{ store.explanation }}</p>
        </div>

        <!-- Console Output -->
        <div class="console">
          <h3>Console Output</h3>
          <div v-if="store.console.length === 0" class="empty-state">No Output</div>
          <div v-for="(item, index) in store.console" :key="'console-' + index" class="console-item">
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>


      <!-- Controls (fixed on bottom) -->
      <div v-if="!readOnly && mode !== 'preview'" class="controls">
        <div v-if="!readOnly && mode !== 'preview'" class="instruction-pointer-display">
          Instruction Pointer: {{ store.instructionPointer }}
        </div>
        <button class="prev-btn" @click="store.previousStep">◀ Prev</button>
        <button class="next-btn" @click="store.nextStep">Next ▶</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --accent-color: #4338ca;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --background-light: #f9fafb;
  --text-dark: #1e293b;
  --text-muted: #475569;
  --border-color: #dbe2ef;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  --radius: 0.75rem;
  --font-main: 'Poppins', sans-serif;
}

/* === Global === */
body {
  font-family: var(--font-main);
  margin: 0;
  padding: 0;
  background-color: #f3f4f6;
}

/* === Main Layout === */
.memory-visualization-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  height: calc(100vh - 220px);
  padding: 1rem;
  overflow: hidden;
  box-sizing: border-box;
}

.program-area {
  flex: 0 0 42%;
  background: #f5f7fa;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.program-area>div {
  overflow-y: auto;
  overflow-x: visible;
  flex-grow: 1;
}

.program-area h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.8rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.2rem;
}

/* === Program Code Lines === */
.program-line {
  font-family: monospace;
  font-size: 0.78rem;
  display: flex;
  align-items: flex-start;
  padding: 0.2rem 0.3rem 0.2rem 0.5rem;
  border-left: 3px solid transparent;
  position: relative;
  animation: fadeInSlideUp 0.3s ease;
}

.program-line::before {
  content: attr(data-line-number);
  display: inline-block;
  width: 2rem;
  color: #888;
  text-align: right;
  margin-right: 0.6rem;
  flex-shrink: 0;
  font-weight: 500;
}

.program-line span {
  white-space: pre-wrap;
  display: inline-block;
}

.current-line {
  background-color: #fff9ec;
  font-weight: bold;
  border-left: 3px solid var(--accent-color);
}

.current-line:hover::after {
  content: 'Current Instruction';
  position: absolute;
  left: 25px;
  bottom: 20%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  transform: translateY(-50%);
}



.next-line {
  background-color: rgba(67, 56, 202, 0.05);
  border-left: 3px solid var(--accent-color);
}

.next-line::before {
  content: "⮞";
  position: absolute;
  top: 0;
  color: var(--accent-color);
  font-size: 1.2rem;
  font-weight: bold;
}

.next-line:hover::after {
  content: 'Instruction Pointer';
  position: absolute;
  left: 25px;
  top: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  transform: translateY(-50%);
}


/* === Right Panel === */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 100%;
  overflow: hidden;
}

/* === Memory Grid === */
.memory-visualization {
  display: grid;
  grid-template-columns: 1fr 1.1fr 1.1fr 1.6fr;
  gap: 0.8rem;
  flex-grow: 1;
  overflow: hidden;
  align-items: flex-start;
  height: 100%;
}

/* === Sections === */
.memory-section {
  background: var(--background-light);
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.memory-section h3 {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.2rem;
}

.console {
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  max-height: 120px;
  overflow-y: auto;
  animation: fadeInSlideUp 0.4s ease;
  flex-shrink: 0;
}

.console-item {
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.4rem;
  border-radius: 6px;
  font-size: 0.75rem;
  line-height: 1.3;
}

.explanation {
  background: #eef4ff;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  overflow: auto;
  font-size: 0.85rem;
  animation: fadeInSlideUp 0.4s ease;
  flex-shrink: 0;
  max-height: 110px;
  overflow-y: auto;
}

.console h3,
.explanation h3 {
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 0.2rem;
}

/* === Memory Objects === */
.allocation-item {
  background: white;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  padding: 0.4rem 0.6rem;
  font-size: 0.7rem;
  animation: fadeInSlideUp 0.4s ease;
}

.reverse-stack-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

#heap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.heap-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.1rem;
  background: white;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  min-height: 60px;
  text-align: center;
}

.heap-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}

.heap-line-1 {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.heap-line-2 {
  font-size: 0.7rem;
  color: #64748b;
}

.address {
  font-size: 0.65rem;
  color: #2c3e50;
}

/* === Memory Stack Table === */
.memory-stack-table {
  overflow-x: auto;
  overflow-y: auto;
  flex-grow: 1;
}

.memory-stack-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.7rem;
}

.memory-stack-table th,
.memory-stack-table td {
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border-color);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.memory-stack-table th {
  background-color: var(--primary-color);
  color: white;
}

.memory-stack-table tr:nth-child(even) {
  background-color: #f1f5f9;
}

/* === Explanation === */
.explanation {
  background: #eef4ff;
  font-size: 0.85rem;
}

/* === Controls === */
.controls {
  position: fixed;
  bottom: 7rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 1000;
  pointer-events: none;
}

.controls button {
  pointer-events: auto;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: var(--box-shadow);
  color: white;
}

.prev-btn,
.next-btn {
  background-color: var(--primary-color);
}

.prev-btn:hover,
.next-btn:hover {
  background-color: var(--primary-hover);
}

/* === Instruction Pointer Display === */
.instruction-pointer-display {
  position: fixed;
  bottom: 7rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(120, 120, 120, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.3rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1f2937;
  pointer-events: none;
  z-index: 999;
}

/* === Buttons === */
.prg-selection-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  flex-grow: 1;
}

.prg-selection-container .custom-btn {
  position: relative;
  background-color: var(--primary-color);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.prg-selection-container .custom-btn:hover {
  background-color: var(--primary-hover);
}

.custom-btn.active {
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  font-weight: bold;
  box-shadow: 0 0 6px rgba(79, 70, 229, 0.4);
}

.top-button-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem 2rem 1.5rem 2rem;
}

.reset-btn {
  background-color: var(--danger-color);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  box-shadow: var(--box-shadow);
}

.reset-btn:hover {
  background-color: var(--danger-hover);
}

/* === Tooltip === */
.tooltip-wrapper {
  position: relative;
}

.tooltip-bubble {
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  background-color: black;
  color: white;
  font-size: 0.80rem;
  font-weight: 400;
  line-height: 1.3;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  white-space: normal;
  transition: opacity 0.2s ease-in-out;
  max-width: 28rem;
  min-width: 12rem;
  z-index: 999;
}

.tooltip-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip-wrapper:hover .tooltip-bubble {
  visibility: visible;
  opacity: 1;
}

/* === Animation === */
@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === Scrollbar === */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* === Empty State === */
.empty-state {
  font-style: italic;
  color: #999;
}

/* === Colored Memory Borders === */
.method_main {
  border: 2px solid #FF6347 !important;
}

.method_1 {
  border: 2px solid #4682B4 !important;
}

.method_2 {
  border: 2px solid #32CD32 !important;
}

.object_1 {
  border: 2px solid #FFD700 !important;
}

.object_2 {
  border: 2px solid #8A2BE2 !important;
}

.object_3 {
  border: 2px solid #FF8C00 !important;
}

/* === Responsive === */
@media (max-width: 1024px) {
  .memory-visualization-container {
    flex-direction: column;
    height: auto;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .program-area,
  .right-panel {
    flex: 1 1 100%;
    width: 100%;
    height: auto;
  }

  .memory-visualization {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 0.75rem;
  }

  .console,
  .explanation {
    max-height: none;
  }

  .controls {
    position: relative;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 0.75rem;
    width: 100%;
  }

  .controls button {
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    width: 90%;
    max-width: 300px;
  }

  .instruction-pointer-display {
    position: relative;
    transform: none;
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.8rem;
  }

  .top-button-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    margin: 0.5rem 1rem 1.5rem;
  }

  .prg-selection-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
    width: 100%;
  }

  .prg-selection-container .custom-btn,
  .reset-btn {
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
    width: 100%;
  }

  .tooltip-bubble {
    font-size: 0.6rem;
    max-width: 90vw;
    min-width: auto;
  }
}

@media (max-width: 1024px) and (min-width: 701px) {
  .instruction-pointer-display {
    order: -1;
    position: relative;
    left: 0;
    transform: none;
    text-align: center;
    background: rgba(120, 120, 120, 0.1);
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    max-width: 300px;
    width: 100%;
  }
}

@media (max-width: 700px) {
  .program-line::before {
    display: none;
  }

  .program-line {
    font-size: 0.7rem;
    padding-left: 0.3rem;
  }

  .memory-section h3,
  .console h3,
  .explanation h3 {
    font-size: 0.8rem;
  }

  .memory-stack-table th,
  .memory-stack-table td {
    font-size: 0.65rem;
    padding: 0.25rem;
  }

  .custom-btn,
  .reset-btn,
  .controls button {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 300px;
  }
}


@media (max-width: 480px) {
  .memory-visualization-container {
    padding: 0.3rem;
    gap: 0.4rem;
    flex-direction: column;
  }

  .program-area h2 {
    font-size: 0.85rem;
    text-align: center;
  }

  .program-line {
    font-size: 0.65rem;
    padding-left: 0.3rem;
  }

  .memory-visualization {
    grid-template-columns: 1fr;
  }

  .memory-section h3,
  .console h3,
  .explanation h3 {
    font-size: 0.75rem;
  }

  .memory-stack-table th,
  .memory-stack-table td {
    font-size: 0.6rem;
    padding: 0.2rem;
  }

  .controls {
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem;
    margin-top: 1rem;
    width: 100%;
    pointer-events: auto;
  }

  .controls button {
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;
    width: 80%;
    max-width: 300px;
  }

  .instruction-pointer-display {
    order: -1;
    position: static;
    transform: none;
    font-size: 0.75rem;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.4rem 0.8rem;
    text-align: center;
    width: 100%;
    max-width: 300px;
  }

  .console,
  .explanation {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }

  .tooltip-bubble {
    font-size: 0.55rem;
    padding: 0.3rem 0.5rem;
    max-width: 90vw;
  }

  .heap-line-1 {
    font-size: 0.75rem;
  }

  .heap-line-2 {
    font-size: 0.65rem;
  }
}
</style>
