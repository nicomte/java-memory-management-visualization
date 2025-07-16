<template>
  <span class="hover-term-wrapper" @mouseenter="show = true" @mouseleave="show = false">
    <span class="hover-term-content"><slot /></span>
    <span v-if="show" class="hover-tooltip">{{ tooltip }}</span>
  </span>
</template>

<script>
export default {
  name: 'HoverTerm',
  props: {
    tooltip: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.hover-term-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.hover-term-content {
  border-bottom: 1px dashed #64748b; /* Tailwind slate-500 */
  transition: color 0.2s ease;
}

.hover-term-wrapper:hover .hover-term-content {
  color: #4361ee;
}

/* Tooltip styling */
.hover-tooltip {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff; /* Tailwind slate-100 */
  color: #1e293b; /* Tailwind slate-800 */
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  min-width: 200px;
  max-width: 500px;
  white-space: normal;
  border: 1px solid #e2e8f0; 
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* shadow */
  z-index: 30;
  pointer-events: none;
  opacity: 0;
  animation: fadeIn 0.2s forwards;
  line-height: 1.5;
}

/* Tooltip arrow */
.hover-tooltip:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #ffffff transparent transparent transparent;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hover-tooltip {
    min-width: 150px;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
