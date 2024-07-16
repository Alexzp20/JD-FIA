import solicitudes from '../Data/Solicitudes.json'
import agendas from '../Data/Agendas.json'
import acuerdos from '../Data/Acuerdos.json'
import usuarios from '../Data/Usuarios.json'
import categorias from '../Data/categorias.json'
import subCategorias from '../Data/subCategorias.json'

export const pedirSolicitudes= () => {

return new Promise ((resolve, reject) =>{
    setTimeout(() => {
        resolve(solicitudes);
    }, 500)
})
}

export const pedirAgendas= () => {

    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            resolve(agendas);
        }, 500)
    })
    }

export const pedirAcuerdos= () => {

    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            resolve(acuerdos);
        }, 500)
    })
    }

export const pedirUsuarios = ()=>{
    return new Promise ((resolve,reject) =>{
        setTimeout(()=>{
                resolve(usuarios);     
        },500)
    })
}

export const pedirCategorias = ()=>{
    return new Promise ((resolve,reject) =>{
        setTimeout(()=>{
                resolve(categorias);     
        },500)
    })
}

export const pedirSubCategorias = ()=>{
    return new Promise ((resolve,reject) =>{
        setTimeout(()=>{
                resolve(subCategorias);     
        },500)
    })
}

