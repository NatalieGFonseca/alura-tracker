<template>
  <div class="field">
    <p class="control has-icons-left has-icons-right">
      <input
        class="input"
        type="text"
        placeholder="Filtre aqui"
        v-model="filtro"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
  </div>
  <div class="lista">
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.tempo"
      :tarefa="tarefa"
      @ao-tarefa-clicada="selecionarTarefa(tarefa)"
    ></Tarefa>
    <!-- <Box v-if="listaVazia"> Você não produziu nada hoje </Box> -->
    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
          <p class="modal-card-title">Editando tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>
        <template v-slot:corpo>
          <label for="descricao" class="label">Descrição</label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="nomeDoProjeto"
          />
        </template>
        <template v-slot:rodape>
          <button class="button is-success" @click="editarTarefa">
            Salvar
          </button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref,watchEffect } from "vue";
import { useStore } from "../../store";
import Tarefa from "../../components/Tarefas.vue";
import Modal from "./Modal.vue";
//import Box from "../../components/Box.vue";
import { OBTER_TAREFAS, EDITAR_TAREFA } from "@/store/tipo-actions";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
  name: "ListaTarefas",
  components: {
    Tarefa,
    Modal,
    //Box,
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
    editarTarefa(): void {
      this.store
        .dispatch(EDITAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    const filtro = ref("");
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas
    //   // .filter(
    //   //   (t) => !filtro.value || t.descricao.includes(filtro.value)
    //   // )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    });
    return {
      store,
      filtro,
      tarefas:computed(() =>
      store.state.tarefa.tarefas)
    };
  },
});
</script>
