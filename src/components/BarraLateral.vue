<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            <i class="fas fa-sun" :class="{ 'fas fa-moon' : modoEscuro }"></i>
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </router-link>
                    <router-link to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Barra Lateral',
        emits: ['aoAlterarTema'],
        data(){
            return {
                modoEscuro: false
            }
        },
        computed: {
            textoBotao() : string{
                if(this.modoEscuro){
                    return 'Desativar modo escuro'
                }
                return 'Ativar modo escuro'
            }
        },
        methods: {
            alterarTema(){
                this.modoEscuro = !this.modoEscuro;
                this.$emit('aoAlterarTema', this.modoEscuro)
            }
        }
    })
</script>

<style scoped>

header{
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header{
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}

.link{
    color: #fff;
}

.link:hover{
    color: #FAF0CA;
}

.link.router-link-active{
    color: #FAF0CA;
}

</style>