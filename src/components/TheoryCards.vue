<template>
  <div class="theory-container">
    <!-- Statischer Titel anstelle der Tabs -->
    <h2 class="theory-heading">Wichtige Begriffe und Theorie</h2>

    <div class="intro-box">
      <p>
        In der Java-Welt arbeitet dein Code nicht direkt mit der Hardware, sondern läuft in einer sogenannten
        <strong>Java Virtual Machine (JVM)</strong>. Diese JVM ist wie eine „Zwischenschicht“, die den Code ausführt
        und dabei den Speicher sowie die Programmlogik verwaltet.
      </p>
      <p>Auf dieser Seite werden einige wichtige Konzepte vorgestellt, die erklären, wie die JVM im Hintergrund mit
        Speicher und Ausführung umgeht:
      </p>
      <div class="category-list">
        <ul>
          <li>
            <strong> Speicherbereiche:</strong>
            <em> Memory Heap,</em>
            <em> Memory Stack,</em>
            <em> Method Area</em>
          </li>
          <li>
            <strong> Ausführungssteuerung:</strong>
            <em> Call Stack,</em>
            <em> Stack Pointer,</em>
            <em> Instruction Pointer</em>
          </li>
        </ul>
      </div>
    </div>


    <div class="card-grid">
      <div v-for="(card, index) in theoryCards" :key="index" class="concept-card" @click="showTheoryDetail(card.id)">
        <h3 class="concept-title">{{ card.title }}</h3>
        <p class="concept-description">{{ card.shortDescription }}</p>
        <div class="card-footer">
          <span class="read-more">Mehr lesen &rarr;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheoryCards',
  data() {
    return {
      theoryCards: [
        {
          id: 'memory-heap',
          title: 'Memory Heap',
          shortDescription: 'Der Heap ist der Speicherbereich, in dem Objekte zur Laufzeit abgelegt werden. Wenn ein Objekt mit \'new\' erstellt wird, wird es im Heap gespeichert.'
        },
        {
          id: 'memory-stack',
          title: 'Memory Stack',
          shortDescription: 'Der Stack speichert lokale Variablen und Informationen zu Methodenaufrufen. Jeder Thread verfügt über seinen eigenen Stack.'
        },
        {
          id: 'method-area',
          title: 'Method Area',
          shortDescription: 'Die Method Area speichert Klassendaten wie Strukturen, Methoden-Code und den Konstantenpool.'
        },
        {
          id: 'callstack',
          title: 'Call Stack',
          shortDescription: 'Der Call Stack verwaltet die Abfolge von Methodenaufrufen. Jeder Methodenaufruf erzeugt einen neuen Stack-Frame.'
        },
        {
          id: 'stack-pointer',
          title: 'Stack Pointer',
          shortDescription: 'Der Stack Pointer zeigt auf den obersten Stack-Frame und definiert den aktuellen Ausführungskontext.'
        },
        {
          id: 'instruction-pointer',
          title: 'Instruction Pointer',
          shortDescription: 'Der Instruction Pointer (auch Programmzähler) zeigt auf die nächste auszuführende Anweisung im Programmablauf.'
        }
      ]
    }
  },
  methods: {
    showTheoryDetail(conceptId) {
      // Direkt zur entsprechenden Route navigieren
      this.$router.push({ name: `theory-${conceptId}` })
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

.theory-container {
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f9fafb 0%, #eef2f7 100%);
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.theory-heading {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.intro-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem 2rem;
  max-width: 100%;
  margin: 0 0 2rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.intro-box p {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 1rem;
}

.category-list {
  color: #475569;
}

.category-list p {
  margin-bottom: 0.3rem;
  font-weight: 600;
  text-decoration: underline;
}

.category-list ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0;
}

.category-list li {
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.category-list em {
  font-style: italic;
  margin-right: 0.3rem;
}

.category-list strong {
  font-weight: 500;
}

/* Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Max 3 cards per row */
  gap: 2rem;
  margin-bottom: 2rem;
}

.concept-card {
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 2rem;
  background: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.concept-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(59, 130, 246, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.concept-card:hover::after {
  opacity: 1;
}

.concept-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.concept-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #0f172a;
}

.concept-description {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
}

.card-footer {
  margin-top: 1.5rem;
  text-align: right;
}

.read-more {
  color: var(--accent-color);
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.2s;
}

.read-more:hover {
  color: var(--primary-color);
}

/* Responsive Grid */
@media (max-width: 1000px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    /* 2 cards per row on tablets */
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
    /* 1 card per row on mobile */
  }
}
</style>