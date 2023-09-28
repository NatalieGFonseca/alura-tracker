<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import Formulario from '../../components/Formulario.vue';
import ITarefa from '../../interfaces/ITarefa'
import { TipoDeNotificacao } from '../../interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar';
import  useNotificador  from '@/hooks/notificador'
import { CADASTRAR_TAREFAS } from '@/store/tipo-actions';

export default defineComponent({
  name: 'FormularioTarefa',
    mixins: [notificacaoMixin],
  components: {
    Formulario
  },

  computed: {
  },

  methods: {
    salvarTarefa ( tarefa : ITarefa ){
      this.store.dispatch(CADASTRAR_TAREFAS, tarefa).then( () => {
        this.notificar(TipoDeNotificacao.SUCESSO,'Nova tarefa foi salva',
        'Pronto, adicionada adicionada com sucesso'  );
      })
    },
  },

  setup(){
    const store = useStore()
    const {notificar} = useNotificador();
    return {
        store,
        notificar
    }
  }

});
</script>