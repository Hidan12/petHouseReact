import { useState } from "react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css'


export const ImageCorp = () => {

    const [src, setSrc] = useState(null)
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9});  // Configuración inicial del recorte
    const [completedCrop, setCompletedCrop] = useState(null);  // Almacena los detalles del recorte final
  
    const onSelectImage = (e)=>{
        //busca el archivo seleccionado
        const file = e.target.files[0];
        //si no hay archivos sale de la funcion
        if (!file) return

        const reader = new FileReader();
        //espera que la imagen cargue y cuando ya esta cargada ejecuta la funcion flecha
        reader.addEventListener('load', ()=>{
            const imageUrl = reader.result?.toString() || '';
            console.log(imageUrl);
        })
        

    }

    const onImageLoaded = (image) => {
        // Puedes realizar acciones después de que la imagen ha cargado
        console.log('Imagen cargada:', image);
      };


    const onCropComplete = (crop) => {
        setCompletedCrop(crop);
      };
    
    const onCropChange = (newCrop) => {
        setCrop(newCrop);
      };
  
  
  
    return (
    <div>
        <input type="file" name="" id="" onChange={onSelectImage} />
        {src && (
        <ReactCrop
          src={src}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
    </div>
  )
}
