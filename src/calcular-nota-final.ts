


export const calcularNotaFinal = (notasMedias: number[],peso: number[],): number => {
    const notaFinal = notasMedias.reduce((acc, notaMedia, index) => acc + notaMedia * peso[index],0);
    const notaFinalRedondeada = Number(notaFinal.toFixed(2));
    return notaFinalRedondeada;
 }