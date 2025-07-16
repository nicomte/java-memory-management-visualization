<template>
  <div class="welcome-container">
    <!-- Statischer Titel anstelle der Tabs -->
    <h2 class="theory-heading">Über dieses Projekt</h2>

    <div class="intro-box">
      <p>
        Diese Anwendung wurde im Rahmen des Moduls "Integrales Informatik Praxisprojekt 2" (IIP2) an der Hochschule
        Luzern entwickelt.
        Sie dient als interaktives Lernwerkzeug, um die Speicherverwaltungskonzepte in Java besser zu verstehen.
      </p>
      <p>
        Durch visuelle Darstellungen und interaktive Elemente möchten wir komplexe Konzepte wie Stack- und
        Heap-Speicher,
        Instruction Pointer, Stack Frames und Objektreferenzen anschaulich vermitteln.
      </p>
    </div>

    <div class="welcome-content-container">
      <div class="two-column-layout">
        <!-- Features card -->
        <div class="welcome-card">
          <h2>Funktionen der Anwendung</h2>
          <div class="features-grid">
            <!-- Static feature items -->
            <div class="feature-item">
              <h3>Code Explorer</h3>
              <p>Zeigt Java-Code mit Syntaxhervorhebung. Ein Pfeil (Instruction Pointer) markiert die nächste
                auszuführende Zeile.</p>
            </div>
            <div class="feature-item">
              <h3>Memory Visualizer</h3>
              <p>Stellt Stack und Heap in Echtzeit dar. Zeigt Variablen, Objekte und Referenzen während der
                Code-Ausführung.</p>
            </div>
            <div class="feature-item">
              <h3>Schrittweise Ausführung</h3>
              <p>Führe den Code Zeile für Zeile aus, geh vor und zurück, und beobachte die Änderungen im Speicher.</p>
            </div>
            <div class="feature-item">
              <h3>Theorie & Konzepte</h3>
              <p>Lerne die theoretischen Grundlagen zu Stack, Heap, Call Stack und anderen wichtigen
                Java-Speicherkonzepten.</p>
            </div>
          </div>
        </div>

        <!-- Usage Steps card -->
        <div class="welcome-card">
          <h2>So verwendest du die Anwendung</h2>
          <div class="steps-grid">
            <!-- Static step cards -->
            <div class="step-card">
              <strong>1. Code anschauen</strong>
              <p>Auf der linken Seite siehst du den Java-Code, der ausgeführt wird.</p>
            </div>
            <div class="step-card">
              <strong>2. Durch den Code navigieren</strong>
              <p>Verwende die Buttons "Next Step" und "Previous Step", um durch den Code zu navigieren.</p>
            </div>
            <div class="step-card">
              <strong>3. Speicheränderungen beobachten</strong>
              <p>Auf der rechten Seite kannst du sehen, wie sich der Speicherzustand mit jedem Schritt verändert.</p>
            </div>
            <div class="step-card">
              <strong>4. Theorie erkunden</strong>
              <p>Besuche den "Theory & Concepts" Bereich, um mehr über die Speicherverwaltung in Java zu lernen.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview -->
      <div class="welcome-card full-width-card">
        <h2>Vorschau der Visualisierung</h2>
        <div class="visualizer-preview-wrapper">
          <VisualizerPreview :readOnly="true" :mode="'preview'" class="visualizer-preview-component" />
        </div>
      </div>


      <!-- Start Button -->
      <div class="welcome-footer">
        <button @click="startVisualizer" class="start-button">
          Zur Visualisierung
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import VisualizerPreview from '@/components/Visualizer.vue';

export default {
  name: 'WelcomePage',
  components: {
    VisualizerPreview
  }, methods: {
    startVisualizer() {
      this.$router.push('/visualizer');
    }
  }
}
</script>

<style scoped>
:root {
  --border-color: #e2e8f0;
  --bg-muted: #f1f5f9;
  --text-muted: #64748b;
  --primary-color: #3b82f6;
  --accent-color: #4361ee;
}

/* === Container === */
.intro-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem 2rem;
  max-width: 100%;
  margin: 0 0 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.intro-box p {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
}

.welcome-container {
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f9fafb 0%, #eef2f7 100%);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.welcome-content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
}

/* === Card Base === */
.welcome-card {
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.welcome-card h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.25rem;
}

.welcome-card p {
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
}


/* === Top Full Width Section === */
.full-width-card {
  grid-column: 1 / -1;
}

/* === Grid: Funktionen + Steps === */
.features-usage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* === Features === */
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* === Steps (Usage Guide) === */
.steps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Shared style for both features and usage steps */
.feature-item,
.step-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;
  /* unified */
  line-height: 1.6;
  /* unified */
  transition: transform 0.2s ease;
  font-family: inherit;
  color: #1e293b;
}

/* Features still hoverable */
.feature-item:hover,
.step-card:hover {
  transform: translateY(-3px);
}

/* Usage step cards still get color and heading treatment */
.step-card {
  background: var(--bg-muted);
  /* overrides white from shared */
}

.step-card strong,
.feature-item h3 {
  font-weight: 700;
  font-size: 1rem;
  /* same size for both */
  margin-bottom: 0.5rem;
  display: block;
}

.step-card strong {
  color: var(--accent-color);
}

.feature-item h3 {
  color: #1e293b;
}

/* === Visualizer Preview === */
.visualizer-preview-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visualizer-preview-component {
  width: 100%;
  height: 40%;
  pointer-events: none;
  filter: grayscale(0.15) brightness(0.97);
  transform: scale(0.95);
  transform-origin: top left;
}


/* === Typography === */
.theory-heading {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* === Start Button === */
.welcome-footer {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.start-button {
  background-color: var(--accent-color);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.start-button:hover {
  background-color: var(--primary-color);
}

/* === Responsive === */
@media (max-width: 1024px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .visualizer-preview-component {
    transform: scale(0.7);
  }

  .welcome-card {
    padding: 1.5rem;
  }
}
</style>
