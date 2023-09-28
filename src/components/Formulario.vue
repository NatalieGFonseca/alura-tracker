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
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.nome }}</option>
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
import { computed, defineComponent } from "vue";
import Temporizador from './Temporizador.vue'
import { useStore } from "vuex";

import { key } from '../store'
import { OBTER_PROJETOS } from "@/store/tipo-actions";

export default defineComponent({
  name: "Formulário",
  components: {
    Temporizador
  },
  emits: [ 'aoSalvarTarefa'],
  data(){
    return {
      descricao: "",
      idProjeto: ""
    }
  },
  computed:{
    
  },
  methods: {
    finalizarTarefa( tempoDecorrido: number) : void {
      console.log( "Tarefa: "+this.descricao+" Finalizada em: "+tempoDecorrido )
      const proj = this.projetos.find( proj => proj.id == this.idProjeto )
      const descricaoProjeto = proj?.nome || ''
      this.$emit('aoSalvarTarefa', {
        tempo: tempoDecorrido,
        descricao: this.descricao === '' ? descricaoProjeto : this.descricao,
        projeto: this.projetos.find( proj => proj.id == this.idProjeto )
      })
      this.descricao = ''
    },
  },
  setup(){
    const store = useStore(key)
    store.dispatch(OBTER_PROJETOS)
    return {
      projetos: computed( () => store.state.projeto.projetos )
    }
  }
});
</script>
<style>
.formulario{
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
