import { createContext, useEffect, useState } from "react";
import { PreguntasSoftware } from "./PreguntasAleatorias";

const Context = createContext();

const ContextProvider =({children})=>{
    const [nivel,setNivel]=useState("1");
    const [listaPreguntas,setListaPreguntas]=useState([]);
    const [preguntaActiva,setPreguntaActiva]=useState({});
    const [score,setScore]=useState("0");
    const [tiempo,setTiempo]=useState(60);
    const [gano,setGano]=useState(false);
    const [activa5050,setActiva5050]=useState(false);
    const [jugando,setJugando] = useState(false)

    let listaPregunnew=[],preguntaActivanew;

    const reiniciarContador=()=>{
      setTiempo(60);
    }

    const iniciarJuego=()=>{
      if(!localStorage.getItem("NivelLibreQuest")){
        localStorage.setItem("NivelLibreQuest","1");
      }
      //Descomentar para cuando gane todo el juego se reestablescan los parametros desde 0.
      else{
        let nivelActual=localStorage.getItem("NivelLibreQuest");
        let listaActual= JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).filter(el=>el.nivel===nivelActual);
        let maximoNivel= Math.max(...JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).map(el=>parseInt(el.nivel)));
        if(listaActual.filter(el=>el.estado===true).length===0 && maximoNivel === parseInt(nivelActual)){
          localStorage.setItem("ListaPreguntasLibreQuest",JSON.stringify(PreguntasSoftware));
          localStorage.setItem("ScoreMaxLibreQuest","0");
          localStorage.setItem("ScoreLibreQuest","0");
          localStorage.setItem("NivelLibreQuest","1");
        }
      }
  
      if(!localStorage.getItem("ScoreMaxLibreQuest")){
        localStorage.setItem("ScoreMaxLibreQuest","0");
      }

      if(!localStorage.getItem("ScoreLibreQuest")){
        localStorage.setItem("ScoreLibreQuest","0");
      }
  
      if(!localStorage.getItem("ListaPreguntasLibreQuest")){
        localStorage.setItem("ListaPreguntasLibreQuest",JSON.stringify(PreguntasSoftware));
        listaPregunnew = PreguntasSoftware.filter(el=>el.nivel==="1" && el.estado===true);
      }
      else{
        listaPregunnew = JSON.parse(localStorage.getItem("ListaPreguntasLibreQuest")).filter(el=>el.nivel===localStorage.getItem("NivelLibreQuest") && el.estado===true);
      }
      
      //Descomentar para que cuando gane todo el juego no lo deje jugar mas y salga que gano
      // if(listaPregunnew.length ===0){
      //   setGano(true);
      // }
      // else{
      //   preguntaActivanew = listaPregunnew[Math.floor(Math.random() * listaPregunnew.length)];
      //   preguntaActivanew.posiblesRespuestas= [...preguntaActivanew.posiblesRespuestas.sort(function() { return Math.random() - 0.5 })];
      //   setListaPreguntas(listaPregunnew);
      //   setPreguntaActiva(preguntaActivanew);
      //   setTiempo(60);
      //   setGano(false);
      // }

      //Descomentar para cuando gane todo el juego le siga cargando los datos por defecto
      preguntaActivanew = listaPregunnew[Math.floor(Math.random() * listaPregunnew.length)];
      preguntaActivanew.posiblesRespuestas= [...preguntaActivanew.posiblesRespuestas.sort(function() { return Math.random() - 0.5 })];
      setListaPreguntas(listaPregunnew);
      setPreguntaActiva(preguntaActivanew);
      setTiempo(60);
      setGano(false);

      setNivel(localStorage.getItem("NivelLibreQuest"));
      setScore(localStorage.getItem("ScoreLibreQuest"));
      setActiva5050(false);
    }
    

    useEffect(()=>{
        let eventoIntervalo =setInterval(()=>{
          if(tiempo!==0){
            setTiempo(tiempo-1)
          }
          else{
            setPreguntaActiva({})
            document.getElementById("audioPerdiste").play().catch(res=>{})
            clearInterval(eventoIntervalo);
          }
        },1000)

        return () => clearInterval(eventoIntervalo);
    },[tiempo])

    useEffect(()=>{
      if(jugando){
        iniciarJuego();
      }
    },[jugando])
    
    const data={
      nivel,setNivel,listaPreguntas,setListaPreguntas,preguntaActiva,setPreguntaActiva,score,setScore,
      activa5050,setActiva5050,tiempo,setTiempo,reiniciarContador,iniciarJuego,gano,setGano,jugando,setJugando
    };

    return(
        <Context.Provider value={data}>{children}</Context.Provider>
    );
}

export {ContextProvider}
export default Context;