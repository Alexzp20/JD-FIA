import estadisticasFechas from '../Data/estadisticasFecha.json';

export const pedirEstFechas = () =>{

    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            resolve(estadisticasFechas);
        }, 500)
    })
}