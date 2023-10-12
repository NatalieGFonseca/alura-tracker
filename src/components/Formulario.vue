<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";

import { key } from "../store";
import { OBTER_PROJETOS } from "@/store/tipo-actions";

export default defineComponent({
  name: "Formulário",
  components: {
    Temporizador,
  },
  emits: ["aoSalvarTarefa"],
  /*props, contexto --- dentro de contexto tem o emit */
  setup(props, { emit }) {
    const store = useStore(key);
    store.dispatch(OBTER_PROJETOS);
    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);
    const finalizarTarefa = (tempoDecorrido: number): void => {
      const proj = projetos.value.find((proj) => proj.id == idProjeto.value);
      const descricaoProjeto = proj?.nome || "";
      emit("aoSalvarTarefa", {
        tempo: tempoDecorrido,
        descricao: descricao.value === "" ? descricaoProjeto : descricao.value,
        projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
      });
      descricao.value = "";
    };
    return {
      descricao,
      idProjeto,
      finalizarTarefa,
      projetos
    };
  },
});
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
