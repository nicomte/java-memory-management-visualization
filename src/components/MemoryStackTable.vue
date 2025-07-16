<template>
  <div v-if="stackVariables.length === 0" class="empty-state">Empty</div>
  <table v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(variable, index) in stackVariables" :key="index" :class="variable.classes">
        <td>{{ variable.name }}</td>
        <td>{{ variable.value }}</td>
        <td>{{ variable.type }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useProgramStore } from '@/store/memory';
import { computed } from 'vue';

export default {
  name: 'MemoryStackTable',
  setup() {
    const store = useProgramStore();

    const stackVariables = computed(() => store.memoryStack);

    return {
      stackVariables
    };
  }
}
</script>

<style scoped>
.empty-state {
  color: #999;
  font-style: italic;
}

/* Match memory-section box look */
table {
  width: 90%;
  border-spacing: 0;
  background-color: #fafafa;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 2px solid #dbe2ef;
  border-collapse: separate;
}

/* Rounded corners and header styling */

th, td {
  padding: 0.5rem 0.8rem;
  border: 1px solid #dbe2ef;
  text-align: left;
  font-size: 0.8rem;
}

tr:nth-child(even) {
  background-color: #f1f5f9;
}

tr.method_main td {
  border: 2px solid #FF6347 !important;
}

tr.method_1 td {
  border: 2px solid #4682B4 !important;
}

tr.method_2 td {
  border: 2px solid #32CD32 !important;
}

tr.object_1 td {
  border: 2px solid #FFD700 !important;
}

tr.object_2 td {
  border: 2px solid #8A2BE2 !important;
}

tr.object_3 td {
  border: 2px solid #FF8C00 !important;
}
</style>

