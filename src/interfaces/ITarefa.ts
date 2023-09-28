import IProjeto from "./IProjeto";

export default interface ITarefa{
    id: number,
    tempo: number,
    descricao: string,
    projeto: IProjeto
}