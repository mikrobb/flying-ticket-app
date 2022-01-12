import './App.css';
import { useEffect, useState } from 'react';
import AvioLogo from './img/Logo.png'
import S7Logo from './img/S7Logo.png'
import { useSelector, useDispatch } from "react-redux";

const URL = 'https://front-test.beta.aviasales.ru/tickets?searchId=562o0'

// https://front-test.beta.aviasales.ru/tickets?searchId=562o0

function App() {
  const dispatch = useDispatch();
  const tickets = useSelector((state)=>state.tickets)
  const currentPage = useSelector(state => state.currentPage) 
  const findChekbox = useSelector(state => state.findChekbox)
  const check = useSelector(state => state.check)
  

  

  
  useEffect(() => {
    fetch('https://front-test.beta.aviasales.ru/search')
    .then((data) => data.json())
    .then((json) => {
      fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${json.searchId}`)
        .then((data) => data.json())
        .then((json) => dispatch({ type: 'searchTickets', payload: json.tickets }));
    });
  }, []);
  

  function freeFunc(){
    dispatch({type:'findTicket', payload:'free'})
    const freeTickets = tickets.sort(function(a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    })
    dispatch({ type: 'searchTickets', payload: freeTickets })
  }

  function fasterFunc(){
    dispatch({type:'findTicket', payload:'faster'})
    const fasterTickets = tickets.sort(function(a, b) {
      return parseFloat(a.segments[0].duration) - parseFloat(b.segments[0].duration);
    })
    dispatch({ type: 'searchTickets', payload: fasterTickets }) 
  }

  function checking(e) {
    dispatch({type:'check', payload:e.target.value})
    // if  (check == 'Not') {
    //   const chekFind = tickets.sort(function(a, b) {
    //     return a.segments[0].stops.length - b.segments[0].stops.length;
    //   })
    //   dispatch({ type: 'searchTickets', payload: chekFind }) 
    // } else if (check == '1'){
    //   const chekFind = tickets.sort(function(a) {
    //     return a.segments[0].stops.length == 1;
    //   })
    //   dispatch({ type: 'searchTickets', payload: chekFind }) 
    // }
    
  }
  console.log(check)


  if (!tickets) return <div>Loading...</div>;
  return (
    <>
      <div className='logoBlock'><img src={AvioLogo} alt="" /></div>
      <div className='mainBlock'>
        <div className='checkBlock'>
          <p className='titleCheckBlock'>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
          <form>
          <div className='HoverDiv' >
          <input value='All' className='inputCheckBlock'  name='radioButton' type="radio" onClick={checking}/> <label htmlFor='inputCheckBlock'>Все</label>
          </div>
          <div className='HoverDiv' >
          <input value='Not' className='inputCheckBlock'  name='radioButton' type="radio" onClick={checking}/> <label htmlFor='inputCheckBlock'>Без пересадок</label>
          </div>
          <div className='HoverDiv' >
          <input value='1' className='inputCheckBlock'  name='radioButton' type="radio" onClick={checking}/> <label htmlFor='inputCheckBlock'>1 пересадка</label>
          </div>
          <div className='HoverDiv' >
          <input value='2' className='inputCheckBlock'  name='radioButton' type="radio" onClick={checking}/> <label htmlFor='inputCheckBlock'>2 пересадки</label>
          </div>
          <div className='HoverDiv' >
          <input value='3' className='inputCheckBlock'  name='radioButton' type="radio" onClick={checking}/> <label htmlFor='inputCheckBlock'>3 пересадки</label>
          </div>
          </form>
        </div>
        <div>
          <div className='ticketsBlock'> 
            <div className='timeCheckBlock'>
              <div className={findChekbox == 'free'? 'currentFindFree' : 'freeBlock'} onClick={freeFunc}>САМЫЙ ДЕШЕВЫЙ</div>
              <div className={findChekbox == 'faster'? 'currentFindFaster' : 'fasterBlock'} onClick={fasterFunc}>САМЫЙ БЫСТРЫЙ</div>
            </div>
            <div>
              {tickets.slice(0, currentPage).map((ticket)=>(
                <div className='ticket'>
                  <div className='ticketHeader'>
                    <div className='price'>{ticket.price} P</div>
                    <div className='logoCompany'><img src={S7Logo} alt="LogoCompany" /></div>
                  </div>
                  <div  className='firstInfoBlock'>
                    <div className='dateFirst'>{ticket.segments[0].origin} - {ticket.segments[0].destination} {new Date(ticket.segments[0].date).getDate()}-{new Date(ticket.segments[0].date).getMonth()+1}-{new Date(ticket.segments[0].date).getFullYear()}</div>
                    <div className='timeFly'>В ПУТИ {Math.round(ticket.segments[0].duration/60)}Ч</div>
                    <div className='stops'>
                      <div>{ticket.segments[0].stops == 0 ? 'Без пересадок' : 'Пересадки: '+ticket.segments[0].stops.length}</div>
                      <div>{ticket.segments[0].stops.map((stopss)=>(
                        <span style={{marginRight: '5px'}}>{stopss}</span>
                      ))}</div>
                    </div>
                  </div>
                  <div  className='secondInfoBlock'>
                    <div className='dateFirst'>{ticket.segments[1].origin} - {ticket.segments[1].destination} {new Date(ticket.segments[1].date).getDate()}-{new Date(ticket.segments[1].date).getMonth()+1}-{new Date(ticket.segments[1].date).getFullYear()}</div>
                    <div className='timeFly'>В ПУТИ {Math.round(ticket.segments[1].duration/60)}Ч</div>
                    <div className='stops'>
                      <div>{ticket.segments[1].stops == 0 ? 'Без пересадок' : 'Пересадки: '+ticket.segments[1].stops.length}</div>
                      <div>{ticket.segments[1].stops.map((stopss)=>(
                        <span style={{marginRight: '5px'}}>{stopss}</span>
                      ))}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>  
            <div className='showMore' onClick={()=>dispatch({type:'SetCurrentPage', payload: currentPage+5})}>ПОКАЗАТЬ ЕЩЁ 5</div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
