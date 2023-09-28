<template>

<div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <Cronometro :tempo-em-segundos="tempoEmSegundos"></Cronometro>
          <button class="button" @click="iniciar" :disabled="cronometroAtivo">
            <span class="icon"><i class="fas fa-play"></i></span>
            <span>Play</span>
          </button>
          <!-- :disabled atualiza o estado do elemento quando coloca :algumacoisa -->
          <button class="button" @click="finalizar" :disabled="!cronometroAtivo">
            <span class="icon"><i class="fas fa-stop"></i></span>
            <span>Stop</span>
          </button>
        </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ['aoTemporizadorFinalizado'], /*Eventos contidos no componente */
  components: {
    Cronometro
  },
  data(){
    return {
        tempoEmSegundos: 0,
        cronometro: 0,
        cronometroAtivo: false
    }
  },
  computed:{
    
  },
  methods: {
    iniciar(){
       this.cronometro = setInterval( () => {
            this.tempoEmSegundos += 1
        },1000)
        this.cronometroAtivo = true
    },
    finalizar(){
        this.cronometroAtivo = false
        clearInterval(this.cronometro)
        this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
        this.tempoEmSegundos = 0
    }
  }
});
</script>