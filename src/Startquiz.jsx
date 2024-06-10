export default function Startquiz(props){
    return(
        <main>
        <div className="small_ball right"></div>
        
       <div className="frontpage">
         <h1 className="title">
           Quizzical
         </h1>
         <p className="small-txt">
           Some description if needed
         </p>
         <button onClick={props.startquiz} className="start-btn">Start quiz</button>  
       </div>
       
       
       
       <div className="small_ball left"></div>
     </main>
    )
}