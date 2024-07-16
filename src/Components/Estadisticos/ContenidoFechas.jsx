import React, { useEffect, useState } from 'react';

const ContenidoFechas = ({sub}) => {

    const [subCategorias, setSubCategorias] = useState([])
    
    useEffect(() => {
        setSubCategorias(sub);
       
    }, [sub ]);     

    return(
        <React.Fragment>
            {subCategorias.map((subcategoria)=>{
               return(
                    <tr key={subcategoria.nombre}>
                        <th scope='row'>{subcategoria.nombre}</th>
                        <td>{subcategoria.cantidad}</td>
                    </tr>
               ) 
                })}
        </React.Fragment>
    );
}

export default ContenidoFechas;
