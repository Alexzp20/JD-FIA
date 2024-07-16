import menu from '../Data/menu.json'

export const pedirOpciones= () => {

    return new Promise ((resolve, reject) =>{
        setTimeout(() => {
            resolve(menu);
        }, 500)
    })
    }
    