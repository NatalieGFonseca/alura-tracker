<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4"> 
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome  || 'N/D' }}
            </div>
            <div class="column">
                <Cronometro :tempo-em-segundos="tarefa.tempo" />
            </div>
        </div>
    </Box>
</template>
<script lang="ts">
    
import { defineComponent, PropType } from "vue";
import Cronometro from "./Cronometro.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from './Box.vue'

export default defineComponent({
    name: 'Tarefas',
    emits: ['aoTarefaClicada'],
    components: {
        Cronometro,
        Box
    },
    methods: {
        tarefaClicada() : void{
            this.$emit("aoTarefaClicada", this.tarefa)
        }
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }

})

</script>
<style>
    .clicavel{
        cursor: pointer;
    }
</style>
