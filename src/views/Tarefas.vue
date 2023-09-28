<template>
    <div class="tarefas">
    <h1 class="title">Tarefas</h1>
    <formulario></formulario>
    <lista></lista>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Formulario from './Tarefas/Formulario.vue';
import Lista from './Tarefas/Lista.vue';

export default defineComponent({
    name: 'TarefasView',
    components: { Formulario, Lista }
});
</script>
<style scoped>
.tarefas {
  padding: 1.25rem;
}

</style>