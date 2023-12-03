import { useContext, useEffect } from "react";
import { Respuestas } from "../Respuestas/Respuestas";
import "./Pregunta.css";
import Context from "../../Context";

export const Preguntas=({pregunta})=>{
    const {activa5050,setPreguntaActiva} = useContext(Context);

    useEffect(()=>{
        if(activa5050){
            let newRespuesta =[...pregunta.posiblesRespuestas];
            let cantidad=0;
            while(cantidad!==2){
                    let posicion = Math.floor(Math.random() * 4);
                    if(newRespuesta[posicion] !=="" && newRespuesta[posicion] !==pregunta.respuestaCorrecta){
                        newRespuesta[posicion]="";
                        cantidad++;
                    }
            }
            setPreguntaActiva({...pregunta,...{
                posiblesRespuestas: newRespuesta
            }})
        }
    },[activa5050])

    return(
        <div className="preguntas">
            {/* <div className="numero-pregunta">{`${(parseInt(score)/100)+1}`}</div> */}
            <div className="nombre">
                <div className="borde-left"></div>
                {pregunta.pregunta}
                <div className="borde-right"></div>
            </div>
            <div className="cont-opciones">
                <Respuestas opcion={"A"} nombre={pregunta.posiblesRespuestas[0]} respuesta={pregunta.respuestaCorrecta}/>
                <Respuestas opcion={"B"} nombre={pregunta.posiblesRespuestas[1]} respuesta={pregunta.respuestaCorrecta}/>
                <Respuestas opcion={"C"} nombre={pregunta.posiblesRespuestas[2]} respuesta={pregunta.respuestaCorrecta}/>
                <Respuestas opcion={"D"} nombre={pregunta.posiblesRespuestas[3]} respuesta={pregunta.respuestaCorrecta}/>
            </div>
        </div>
    )
}