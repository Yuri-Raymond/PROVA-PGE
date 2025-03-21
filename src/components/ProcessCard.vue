<template>
  <div class="process-card" :class="{ 'fechado': processo.status === 'Fechado' }">
    <h3>{{ processo.numero }}</h3>
    <p><strong>Status:</strong> {{ processo.status }}</p>
    <p><strong>Assunto:</strong> {{ processo.assunto }}</p>
    <button @click="$emit('remover-processo', processo.numero)">Remover</button>
  </div>
</template>

<script>
export default {
  name: 'ProcessCard',
  props: {
    processo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.process-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
}
.fechado {
  background-color: #f8d7da;
}
</style>
