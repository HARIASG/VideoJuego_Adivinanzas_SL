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
                {
                    pregunta.posiblesRespuestas.map((el,i)=>{
                        let opcion;
                        if(i===0)
                            opcion="A"
                        if(i===1)
                            opcion="B"
                        if(i===2)
                            opcion="C"
                        if(i===3)
                            opcion="D"
                        return(
                            <Respuestas key={i} opcion={opcion} nombre={el} respuesta={pregunta.respuestaCorrecta}/>
                        )
                    })
                }
            </div>
        </div>
    )
}