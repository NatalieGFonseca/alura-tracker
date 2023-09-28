<template>
    <section class="projetos">
      <form @submit.prevent="salvarProjeto">
        <div>
          <label for="nomeDoProjeto" class="label"></label>
          <input
            type="text"
            class="input"
            v-model="nomeDoProjeto"
            id="nomeDoProjeto"
          />
        </div>
        <div class="field"><button class="button" type="submit">Salvar</button></div>
      </form>
    </section>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import {useStore} from '../../store'
  import { TipoDeNotificacao } from "@/interfaces/INotificacao";
  import useNotificador from "@/hooks/notificador"
import { CADASTRAR_PROJETOS, EDITAR_PROJETOS } from "@/store/tipo-actions";
  export default defineComponent({
    name: "FormularioProjetos",
    props: {
        id: {
            type: String
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projeto.projetos.find( proj => proj.id == this.id )
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data() {
      return {
        nomeDoProjeto: ""
      };
    },
    methods: {
      salvarProjeto(): void {
        if(this.id){
          this.store.dispatch(EDITAR_PROJETOS, {
            id: this.id,
            nome: this.nomeDoProjeto
          }).then( () => {
            this.cadastroComSucesso()
          });
        }else{
          this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto).then( () => {
            this.cadastroComSucesso()
          }
          ).catch( ex => {
            this.notificar(TipoDeNotificacao.FALHA, 'Erro ao executar ação', 'Mensagem: '+ex)
          })
        }
      },
      cadastroComSucesso(): void{
        this.nomeDoProjeto = ''
          this.notificar(TipoDeNotificacao.SUCESSO, 'Ação executada com sucesso!', 'Projeto foi adicionado.')
          this.$router.push('/projetos')
      }
      
    },
    setup(){
      const store = useStore();
      const {notificar} = useNotificador();
      return {
        notificar,
        store,
      }
    }
  });
  </script>

  