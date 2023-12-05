import { useContext, useEffect, useRef } from "react";
import "./Respuestas.css"
import Context from "../../Context";

export const Respuestas=({nombre,opcion,respuesta})=>{
    const btnRespuesta = useRef();
    const {score,setScore,nivel,setNivel,setPreguntaActiva,setListaPreguntas,listaPreguntas,preguntaActiva,setActiva5050,reiniciarContador,setGano} =useContext(Context);


    useEffect(()=>{
        if(preguntaActiva.posiblesRespuestas.filter(el=>el!=="").length===4){
            btnRespuesta.current.classList.add("animate")
            setTimeout(() => {
                btnRespuesta.current.classList.remove("animate")
            }, 2000);
        }
    },[preguntaActiva])

    const perdio =()=>{
        setTimeout(()=>{
            btnRespuesta.current.classList.remove("incorrecta")
            let listaPregunnew;
            listaPregunnew = JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).filter(el=>el.nivel===localStorage.getItem("NivelLibreQuest") && el.estado===true);
            GuardarProgreso(score);
            setNivel(localStorage.getItem("NivelLibreQuest"));
            setListaPreguntas(listaPregunnew);
            setPreguntaActiva({});
            setScore(localStorage.getItem("ScoreLibreQuest"));
            setActiva5050(false);
            reiniciarContador();
        },1000)
    }

    const GuardarProgreso=(score)=>{
        if(parseInt(score) > parseInt(localStorage.getItem("ScoreMaxLibreQuest"))){
            localStorage.setItem("ScoreMaxLibreQuest",score);
        }
      }

    const seleccionarRespuesta=(nombre)=>{
        if(Array.from(document.getElementsByClassName("correcta")).length===0 && Array.from(document.getElementsByClassName("incorrecta")).length===0){
            if(nombre !== ""){
                if(nombre===respuesta){
                    btnRespuesta.current.classList.add("correcta");
                    document.getElementById("audioGanaste").play().catch(res=>{})
                    GuardarProgreso(`${parseInt(score)+100}`);
                    reiniciarContador();
                    document.getElementById("video").classList.add("contFelicidades");
                    setTimeout(()=>{
                        btnRespuesta.current.classList.remove("correcta")
                        let newNivel=nivel;
                        let newlistapreguntas = listaPreguntas.map(el=>{
                            if(el.pregunta=== preguntaActiva.pregunta){
                                el.estado=false;
                            }
                            return el
                        })
        
                        if(newlistapreguntas.filter(el=>el.estado===true).length ===0){
                            let ListadoActualizado = JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).map(el=>{
                                if(el.nivel===nivel){
                                    el.estado=false;
                                }
                                return el;
                            })
                            localStorage.setItem("ListaPreguntasLibreQuest",JSON.stringify(ListadoActualizado));
                            newNivel=`${parseInt(nivel)+1}`;
                            let maximoNivel= Math.max(...JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).map(el=>parseInt(el.nivel)));
                            if((parseInt(nivel)+1)<=maximoNivel){
                                setNivel(newNivel);
                                localStorage.setItem("NivelLibreQuest",`${parseInt(nivel)+1}`)
                                localStorage.setItem("ScoreLibreQuest",`${parseInt(score)+100}`)
                            }
                            else{
                                localStorage.setItem("NivelLibreQuest",`${parseInt(nivel)}`)
                                localStorage.setItem("ScoreLibreQuest",`${parseInt(score)}`)
                            }
                            newlistapreguntas = JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).filter(el=>el.nivel===newNivel && el.estado===true);
                        }
                        newlistapreguntas=newlistapreguntas.filter(el=>el.estado===true);
        
                        setListaPreguntas(newlistapreguntas);
                        setScore(parseInt(score)+100);
                        setActiva5050(false)
                        if(newlistapreguntas.length===0){
                            setPreguntaActiva({});
                            setGano(true);
                            document.getElementById("audioWinner").play().catch(res=>{})
                        }
                        else{
                            let newPreguntaActiva= newlistapreguntas[Math.floor(Math.random() * newlistapreguntas.length)];
                            newPreguntaActiva.posiblesRespuestas = [...newPreguntaActiva.posiblesRespuestas.sort(function() { return Math.random() - 0.5 })];
                            setPreguntaActiva(newPreguntaActiva);
                        }
                        document.getElementById("video").classList.remove("contFelicidades");
                    },1000)
                }
                else{
                    btnRespuesta.current.classList.add("incorrecta")
                    document.getElementById("audioPerdiste").play().catch(res=>{})
                    perdio();
                }
            }
        }
    }

    return(
        <div className={(nombre!=="" ? "respuesta " :"respuesta disabled")} ref={btnRespuesta} onClick={()=>seleccionarRespuesta(nombre)}>{(nombre !=="" ? opcion+":" : "")} {nombre}</div>
    );
}