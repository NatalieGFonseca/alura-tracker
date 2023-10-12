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
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {useRouter} from "vue-router";
import { useStore } from "../../store";
import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETOS, EDITAR_PROJETOS } from "@/store/tipo-actions";
export default defineComponent({
  name: "FormularioProjetos",
  props: {
    id: {
      type: String,
    },
  },
  methods: {
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();/*roteador */
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");
    /*Procura o elemento quando for edição */
    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }
    
    /*  configura métodos */
    const cadastroComSucesso = () => {
      nomeDoProjeto.value = "";
      notificar(
        TipoDeNotificacao.SUCESSO,
        "Ação executada com sucesso!",
        "Projeto foi adicionado."
      );
      router.push("/projetos");
    };

    const salvarProjeto = () => {
      if (props.id) {
        store
          .dispatch(EDITAR_PROJETOS, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            cadastroComSucesso();
          });
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => {
            cadastroComSucesso();
          })
          .catch((ex) => {
            notificar(
              TipoDeNotificacao.FALHA,
              "Erro ao executar ação",
              "Mensagem: " + ex
            );
          });
      }
    };
    return {
      nomeDoProjeto,
      salvarProjeto
    };
  },
});
</script>
