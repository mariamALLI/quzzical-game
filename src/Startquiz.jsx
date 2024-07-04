import Yellow from '../src/assets/Yellow.png';
import Blue from '../src/assets/Blue.png';

export default function Startquiz(props){
    return(
        <main>
        <div className="small_ball right">
          <img src={Yellow} alt="yellow shaped blob" />
        </div>
        
       <div className="frontpage">
         <h1 className="title">
           Quizzical
         </h1>
         <p className="small-txt">
          General knowledge quiz in 30secs
         </p>
         <button onClick={props.startquiz} className="start-btn">Start quiz</button>  
       </div>
       
       
       
       <div className="small_ball left">
       <img src={Blue} alt="blue shaped blob" />
       </div>
     </main>
    )
}