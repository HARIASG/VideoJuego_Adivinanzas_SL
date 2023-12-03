import './App.css';
import { useContext} from 'react';
import Context from './Context';
import { Juego } from './Components/Juego/Juego';
import audioInicio from './Imagenes/Inicio.mp3';
import audioGanaste from './Imagenes/celebracion.mp3';
import audioPerdiste from './Imagenes/gameover.mp3';
import audioWinner from './Imagenes/ganaste.mp3';

function App() {
  const {jugando,setJugando} = useContext(Context);

  const handleClickIniciar=()=>{
    document.getElementById("audioInicio").play().catch(res=>{})
    setJugando(true);
  }

  return (
    <div className="App">
      <audio style={{display:"none"}} controls id="audioInicio">
        <source src={audioInicio} />
      </audio>
      <audio style={{display:"none"}} controls id="audioGanaste">
        <source src={audioGanaste} />
      </audio>
      <audio style={{display:"none"}} controls id="audioPerdiste">
        <source src={audioPerdiste} />
      </audio>
      <audio style={{display:"none"}} controls id="audioWinner">
        <source src={audioWinner} />
      </audio>
      <div id='video' className=''></div>
      {
        jugando
        ? <Juego/>
        :<div className='cont-inicio'>
          <div className='cont-header'>
            <div className='Max-Score'>Maximo Score: {(localStorage.getItem("ScoreMaxLibreQuest")?localStorage.getItem("ScoreMaxLibreQuest") : "0")}</div>
          </div>
          <div className='contain-iniciar'>
            <div className="sol">
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="rayo"></div>
              <div className="contenido"></div>
            </div>
            <div className='btn-jugar' onClick={handleClickIniciar}>Iniciar</div>
          </div>
          {/* <div className='presentador'></div> */}
        </div>
      }
    </div>
  );
}

export default App;
