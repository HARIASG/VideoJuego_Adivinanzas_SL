import { useContext} from 'react';
import { Preguntas } from '../Preguntas/Pregunta';
import Context from '../../Context';
import imgGano from "../../Imagenes/Ganaste.png"
import imgPerdio from "../../Imagenes/Game_over.png"

export const Juego=()=>{

  const {preguntaActiva,setActiva5050,tiempo,iniciarJuego,gano,score,nivel} = useContext(Context);

  const handleClickJuagar=()=>{
    document.getElementById("audioInicio").play().catch(res=>{})
    iniciarJuego();
  }

  return(

    <div style={{display:"contents"}}>
          <div className='cont-header'>
            <div className='Max-Score'>Maximo Score: {localStorage.getItem("ScoreMaxLibreQuest")}</div>
            <div className='score'>Score: {score}</div>
            {
              preguntaActiva.pregunta &&
              <div className='tiempo'>Tiempo: {tiempo}</div>
            }
            <div className='nivel'>Nivel: {nivel}</div>
          </div>
          {
            preguntaActiva.pregunta 
            ? <Preguntas pregunta={preguntaActiva}/>
            : <div className='cont-finJuego'>
                <img src={gano ? imgGano : imgPerdio } alt="" className='img-finJuego'/>
                {(gano ? "¡Winner!" : "¡Game Over!")}
              </div>
          }

          <div className='cont-ayudas'> 
          {
            preguntaActiva.pregunta 
            ?
            <>
              <div>Pistas</div>
              <div onClick={()=>setActiva5050(true)}>50/50</div>
            </>
            :
            <div style={{margin:"auto",marginTop:"20px"}} onClick={handleClickJuagar}>Volver a Jugar</div>
            }
          </div>
      </div>
  );
}