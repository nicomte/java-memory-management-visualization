import {createRouter, createWebHashHistory} from 'vue-router'
import WelcomePage from '../components/WelcomePage.vue'
import TheoryCards from '../components/TheoryCards.vue'
import Visualizer from "@/components/Visualizer.vue";
import QuizPage from '../components/QuizPage.vue'

// Direkte Importe der Theorie-Komponenten
import CallStackTheory from '../components/theory/CallStackTheory.vue'
import MemoryStackTheory from '../components/theory/MemoryStackTheory.vue'
import MemoryHeapTheory from '../components/theory/MemoryHeapTheory.vue'
import MethodAreaTheory from '../components/theory/MethodAreaTheory.vue'
import StackPointerTheory from '../components/theory/StackPointerTheory.vue'
import InstructionPointerTheory from '../components/theory/InstructionPointerTheory.vue'
const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomePage
  },
  {
    path: '/visualizer',
    name: 'visualizer',
    component: Visualizer
  },
  {
    path: '/theory',
    name: 'theory',
    component: TheoryCards
  },
  // Direkte Routen zu den einzelnen Theorie-Komponenten
  {
    path: '/theory/callstack',
    name: 'theory-callstack',
    component: CallStackTheory
  },
  {
    path: '/theory/memory-stack',
    name: 'theory-memory-stack',
    component: MemoryStackTheory
  },
  {
    path: '/theory/memory-heap',
    name: 'theory-memory-heap',
    component: MemoryHeapTheory
  },
  {
    path: '/theory/method-area',
    name: 'theory-method-area',
    component: MethodAreaTheory
  },
  {
    path: '/theory/stack-pointer',
    name: 'theory-stack-pointer',
    component: StackPointerTheory
  },
  {
    path: '/theory/instruction-pointer',
    name: 'theory-instruction-pointer',
    component: InstructionPointerTheory
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.name === 'visualizer') {
      return false; // Don't scroll on Visualizer
    }
    return { top: 0 }; // Scroll to top on all others
  }
})

export default router