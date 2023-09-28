<template>
  <div class="lista">
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.tempo"
      :tarefa="tarefa"
      @ao-tarefa-clicada="selecionarTarefa(tarefa)"
    ></Tarefa>
    <!-- <Box v-if="listaVazia"> Você não produziu nada hoje </Box> -->
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <label for="descricao" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="nomeDoProjeto"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="editarTarefa">Salvar</button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../../store";
import Tarefa from "../../components/Tarefas.vue";
// import Box from "../../components/Box.vue";
import { OBTER_TAREFAS, EDITAR_TAREFA } from "@/store/tipo-actions";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "ListaTarefas",
  components: {
    Tarefa,
    // Box,
  },

  data() {
    return {
      /*aceita ITarefa ou null  */
      tarefaSelecionada: null as ITarefa | null,
    };
  },

  computed: {
    // listaVazia(): boolean {
    //   return this.tarefas.length === 0;
    // },
  },

  methods: {
    selecionarTarefa(tarefa: ITarefa): void {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    editarTarefa():void{
      this.store.dispatch(EDITAR_TAREFA, this.tarefaSelecionada).then( () => this.fecharModal() )
    }
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
    };
  },
});
</script>
