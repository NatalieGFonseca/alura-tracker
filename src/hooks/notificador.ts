import { TipoDeNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutations"


type Notificador = {
    notificar: (tipo:TipoDeNotificacao, titulo: string , texto: string) => void
}

export default () : Notificador => {
    /*implementa a função declarada antes */
    const notificar = ( tipo:TipoDeNotificacao, titulo : string, texto : string ) : void => {
        store.commit(NOTIFICAR, {
            titulo,
             texto,
             tipo
          })
      }
      return {
        notificar
      }
}