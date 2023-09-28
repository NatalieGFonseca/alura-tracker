import IProjeto from "@/interfaces/IProjeto";
import { Module } from "vuex";
import { Estado } from "@/store";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETO } from "../tipo-mutations";
import clientApi from "@/api/api";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, EDITAR_PROJETOS, DELETAR_PROJETOS } from "../tipo-actions";

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto,Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string){
            /*irá desconsiderar o id passado, criando uma nova lista */
           state.projetos = state.projetos.filter(  proj => proj.id != id )
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]){
           state.projetos = projetos
        },
    },
    actions:{
        [OBTER_PROJETOS]({ commit }){
            clientApi.get("projetos").then( resp => 
                commit(DEFINIR_PROJETO, resp.data)    
            )
        },
        [CADASTRAR_PROJETOS](contexto, nomeDoProjeto){
            return clientApi.post('projetos', {
                nome: nomeDoProjeto
            })
        },
        [EDITAR_PROJETOS]({commit}, projeto: IProjeto){
            return clientApi.put(`projetos/${projeto.id}`, projeto ).then( () => {
                commit( ALTERA_PROJETO, projeto)
            })
        },
        [DELETAR_PROJETOS]({commit}, id: string){
            return clientApi.delete(`projetos/${id}` ).then( () => {
                commit(EXCLUIR_PROJETO, id)
            })
        },
    }
}