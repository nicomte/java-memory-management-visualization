<template>
  <div class="app-container">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">Java Speicherverwaltung</h1>
        <p class="app-subtitle">Interaktive Visualisierung der Java-Speicherkonzepte</p>
      </div>
    </header>
    
    <nav class="main-nav">
      <div class="container nav-container">
        <!-- Neuer Home-Button für die WelcomePage -->
        <router-link to="/" class="nav-item" exact-active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <span>Home</span>
        </router-link>
        
        <!-- Der bisherige Visualizer-Link - jetzt auf /visualizer -->
        <router-link to="/visualizer" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <span>Visualisierung</span>
        </router-link>
        
        <router-link to="/theory" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </div>
          <span>Theory & Concepts</span>
        </router-link>
        
        <router-link to="/quiz" class="nav-item" active-class="active">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
          </div>
          <span>Quiz</span>
        </router-link>
      </div>
    </nav>
    
    <main class="main-content">

        <router-view></router-view>

    </main>

    <footer class="app-footer">
      <div class="container">
        <p>IIP2 - Java Speicherverwaltung</p>
        <p class="team-members">Ein Projekt von Alenka Isenring, Andrea Sustic, Fabrice von Jüchen und Nico Graf</p>
      </div>
    </footer>

  </div>
</template>

<script>
  export default {
  name: 'App'
}
</script>

<style>
/* Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

:root {
  --primary-color: #4361ee;
  --primary-light: #f0f4ff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --bg-light: #f8f9fa;
  --border-color: #e2e8f0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: #f0f2f5;
}

.container {
  width: 100%;
  /*max-width: 1200px;*/
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.app-header {
  background-color: white;
  padding: 1.0rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  background: linear-gradient(to right, #4361ee, #4895ef);
  background-clip: text;          /* Standard-Eigenschaft hinzufügen */
  -webkit-background-clip: text;  /* Für ältere Browser beibehalten */
  -text-fill-color: transparent;   /* Standard-Eigenschaft (zukünftig) */
  -webkit-text-fill-color: transparent;
}

.app-subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  padding: 2rem 0 4rem;
}

/* Navigation Styles */
.main-nav {
  background-color: white;
  padding: 0.75rem 0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-secondary);
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.nav-icon {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(243, 244, 246, 0.8);
  color: var(--text-primary);
}

.nav-item:hover .nav-icon {
  color: var(--primary-color);
}

.nav-item.active {
  background-color: var(--primary-light);
  color: var(--primary-color);
  font-weight: 600;
}

.nav-item.active .nav-icon {
  color: var(--primary-color);
}


/* Footer Styles */
.app-footer {
  background-color: white;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 2rem;
}

.team-members {
  margin-top: 0.25rem;
  font-size: 0.85rem;
}


@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .nav-container {
    gap: 0.5rem;
  }
  
  .nav-item {
    padding: 0.75rem 1.25rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 640px) {
  .nav-container {
    justify-content: space-between;
  }
  
  .nav-item {
    padding: 0.75rem 0.5rem;
  }
}
</style>