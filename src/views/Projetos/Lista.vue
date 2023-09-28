<template>
    <section class="projetos">
      <router-link to="/projetos/novo" class="button">
        <span class="icon is-small"><i class="fas fa-plus"></i></span>
        <span>Novo Projeto</span>
      </router-link>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="projeto in projetos" :key="projeto.id">
            <td>{{ projeto.id }}</td>
            <td>{{ projeto.nome }}</td>
            <td>
              <router-link :to="`/projetos/${projeto.id}`" class="button">
                <span class="icon is-small"><i class="fas fa-pencil-alt"></i></span>
              </router-link>
              <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
                <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </template>
  <script lang="ts">
  import { computed, defineComponent } from "vue";
  import { useStore } from "@/store";
  import useNotificador from "@/hooks/notificador"
import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { DELETAR_PROJETOS, OBTER_PROJETOS } from "@/store/tipo-actions";
  
  export default defineComponent({
    name: "ListaProjetos",
    data() {
      return {
        nomeDoProjeto: "",
      };
    },
    methods: {
        excluir(id:string){
          this.notificar(TipoDeNotificacao.ATENCAO, 'Atenção', 'A ação não poderá ser desfeita')
            this.store.dispatch(DELETAR_PROJETOS, id).then( () => {
              this.notificar(TipoDeNotificacao.SUCESSO, 'Exclusão do projeto', 'Excluído com sucesso')
            } ).catch( ex => {
              this.notificar(TipoDeNotificacao.FALHA, 'Exclusão do projeto', 'Erro: '+ex)
            });
        }
    },
    setup() {
      const store = useStore();
      const {notificar} = useNotificador();
      store.dispatch(OBTER_PROJETOS)
      return {
        store,
        notificar,
        projetos: computed(() => store.state.projeto.projetos),
      };
    },
  });
  </script>

  