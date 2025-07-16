<template>
  <div class="theory-detail">
    <div class="theory-header">
      <button @click="goBack" class="back-button">&larr; Zurück zur Übersicht</button>
      <h1>{{ title }}</h1>
    </div>

    <div class="theory-inner-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheoryLayout',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'theory' });
    }
  }
}
</script>

<style>
/* === Import Modern Font === */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

/* === CSS Variables === */
:root {
  --primary-color: #4f46e5;
  --primary-hover: #4338ca;
  --accent-color: #4338ca;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --background-light: #f9fafb;
  --background-dark: #1e1e2f;
  --text-dark: #1e293b;
  --text-muted: #475569;
  --border-color: #dbe2ef;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  --transition-speed: 0.3s;
  --radius: 0.75rem;
  --font-main: 'Poppins', sans-serif;
  --code-bg: #0f172a;
}

/* === Base Container === */
.theory-detail {
  padding: 1.5rem 1rem;
  max-width: min(92vw, 1200px);
  margin: 1.5rem auto;
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  font-family: var(--font-main);
}

/* === Header === */
.theory-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.5rem 2rem;
}

.back-button {
  background: var(--background-light);
  color: var(--text-dark);
  border: 1px solid var(--border-color);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-speed);
}

.back-button:hover {
  background: var(--primary-color);
  color: white;
  transform: translateX(-2px);
}

.theory-detail h1 {
  color: var(--text-dark);
  font-size: 2.3rem;
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 0.4rem;
  margin-top: 0.8rem;
}

/* === Content Styling === */
.theory-content {
  padding: 0 0.8rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.theory-content h2 {
  color: var(--text-dark);
  font-size: 1.9rem;
  margin: 1.5rem 0 0.8rem 0;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.25rem;
}

.theory-content h3 {
  color: var(--primary-color);
  font-size: 1.4rem;
  margin: 1.2rem 0 0.8rem 0;
}

.theory-content h4 {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 1.2rem 0 0 0;
}

/* === Lists & Indentation === */
ul,
ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
  color: var(--text-muted);
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

ul li {
  position: relative;
  list-style: none;
}

ul li::before {
  content: '•';
  position: absolute;
  left: -1.1rem;
  color: var(--accent-color);
  font-weight: bold;
}

ol {
  list-style-position: outside;
}

ol li {
  padding-left: 0.2rem;
}

/* === Inline Code === */
code {
  background: #f3f4f6;
  color: #1e293b;
  padding: 0.12rem 0.35rem;
  border-radius: 0.3rem;
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.85rem;
  white-space: nowrap;
}

/* === Boxes & Containers === */
.visual-container,
.example-box,
.important-note,
.analogy-box,
.animation-container,
.summary-section,
.advanced-section {
  margin: 1.5rem 0;
  padding: 1.2rem;
  background: var(--background-light);
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--box-shadow);
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
}

.visual-container:hover,
.example-box:hover,
.analogy-box:hover,
.animation-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.analogy-box {
  background: #ecf4fc; /*#e0f7ff*/
}

.important-note {
  background: #fff4e6;
}

.summary-section {
  background: #eef4ff;
}

/* === Two Column Layout === */
.two-column-layout {
  display: flex;
  gap: 0.8rem;
  margin: 0.8rem 0;
  align-items: flex-start;
  flex-wrap: wrap;
}

.column {
  flex: 1 1 45%;
  min-width: 260px;
}

/* === Buttons & Interactive Elements === */
.toggle-advanced,
.sim-button,
.interactive-controls button {
  padding: 0.6rem 1.2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  transition: background-color var(--transition-speed), transform 0.2s;
}

.toggle-advanced:hover,
.sim-button:hover,
.interactive-controls button:hover {
  background: var(--primary-hover);
  transform: scale(1.05);
}

.sim-button.reset {
  background: var(--danger-color);
}

.sim-button.reset:hover {
  background: var(--danger-hover);
}

/* === Code Blocks === */
.code-example {
  background: var(--background-dark);
  color: #e0e7ff;
  padding: 1.2rem;
  border-radius: var(--radius);
  overflow-x: auto;
  margin: 1.2rem 0;
}

/* === Highlighted Text === */
.highlight-text {
  color: #2e86de;
  font-weight: bold;
}

.highlight-text-red{
  color: #de2e2e;
  font-weight: bold;
}
/* === Tables === */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.comparison-table th {
  background: var(--primary-color);
  color: white;
  padding: 0.6rem;
}

.comparison-table td {
  border: 1px solid var(--border-color);
  padding: 0.6rem;
}

.comparison-table tr:nth-child(even) {
  background: #f1f5f9;
}

/* === Stack Visualizations === */
.stack-frame {
  background: white;
  border: 2px solid var(--primary-color);
  box-shadow: var(--box-shadow);
  padding: 0.6rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

.active-frame {
  border-color: var(--danger-color);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
}

/* === Console Output === */
.console-output {
  background: #111827;
  color: #d1fae5;
  padding: 1.2rem;
  border-radius: var(--radius);
  font-family: monospace;
  margin-top: 1rem;
}

/* === Animations === */
.stack-enter-active,
.stack-leave-active,
.callstack-enter-active,
.callstack-leave-active {
  transition: all var(--transition-speed) ease;
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
  .theory-detail {
    padding: 1rem 0.5rem;
    margin: 1rem auto;
    width: 100%;
    box-shadow: none;
    border-radius: 0.25rem;
  }
  
  .theory-header {
    margin: 1rem;
  }
  
  .theory-detail h1 {
    font-size: 1.8rem;
  }
  
  .two-column-layout {
    flex-direction: column;
  }
  
  .column {
    flex: 1 1 100%;
    min-width: 100%;
    margin-bottom: 1rem;
  }
  
  .comparison-table-container {
    overflow-x: auto;
  }
  
  .comparison-table {
    min-width: 600px; /* Ensures table has minimum width for scrolling */
    overflow-x: auto;
  }
  
  .theory-content h2 {
    font-size: 1.5rem;
  }
  
  .theory-content h3 {
    font-size: 1.2rem;
  }
  
  .theory-content h4 {
    font-size: 1rem;
  }
  
  code {
    word-break: break-word;
    white-space: normal;
  }
}

/* Mobile-specific adjustments */
@media (max-width: 480px) {
  .theory-detail h1 {
    font-size: 1.5rem;
  }
  
  .back-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .toggle-advanced, 
  .sim-button, 
  .interactive-controls button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  /* Force spacing between stacked buttons */
  .interactive-controls {
    flex-direction: column;
  }
}

/* Make code examples scrollable horizontally on mobile */
.code-example {
  max-width: 100%;
  overflow-x: auto;
}

/* Ensure stack visualizations are responsive */
.stack-animation-steps pre,
.visual-fallback pre {
  white-space: pre;
  overflow-x: auto;
  max-width: 100%;
  font-size: 0.8rem;
}

/* Make demo container responsive */
.demo-container {
  flex-direction: column;
}

.code-section, 
.stack-section {
  max-width: 100%;
  width: 100%;
}

@media (min-width: 769px) {
  .demo-container {
    flex-direction: row;
  }
  
  .code-section {
    max-width: 50%;
  }
}
</style>
