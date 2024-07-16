import { FaFilePdf } from 'react-icons/fa6';
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';
import { REACT_API_BASE_URL } from '../../Api';

export const VerPdf = ({id, tipo}) => {

  const cookies = new Cookies();
    const token = cookies.get('token')

    const handleDocSolicitud = async (id, tipo) => {
    try {
      // Realiza la solicitud a la API para obtener el PDF
      const response = await fetch(`${REACT_API_BASE_URL}/${tipo}/doc/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
           'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error('Error, documento inexistente');
       
      }

      // Convierte la respuesta en un Blob
      const blob = await response.blob();

      // Crea una URL para el Blob
      const url = window.URL.createObjectURL(blob);

       // Abre el PDF en una nueva pestaña y asigna un nombre a la pestaña
       const windowName = `documento_${id}`;
       window.open(url, windowName, 'noopener,noreferrer');
    } catch (error) {
      Swal.fire("Error al obtener el documento", {error}, "error");
    }
  };


  return <FaFilePdf className='w-25 h-25' style={{color: 'rgb(0, 0, 0)'}} onClick={()=>handleDocSolicitud(id, tipo)}/>
  
}
