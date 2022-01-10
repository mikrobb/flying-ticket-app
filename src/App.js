import './App.css';
import { useEffect, useState } from 'react';
import AvioLogo from './img/Logo.png'
import { useSelector, useDispatch } from "react-redux";

const URL = 'https://front-test.beta.aviasales.ru/tickets?searchId=562o0'

// https://front-test.beta.aviasales.ru/tickets?searchId=562o0

function App() {
  const [idSearch , setIdSearch]= useState('')
  const dispatch = useDispatch();
  const searchId = useSelector(state => state.searchId)
  const tickets = useSelector((state)=>state.tickets)
  
  

  

  
  useEffect(() => {
    fetch('https://front-test.beta.aviasales.ru/search')
    .then((data) => data.json())
    .then((json) => {
      fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${json.searchId}`)
        .then((data) => data.json())
        .then((json) => dispatch({ type: 'searchTickets', payload: json.tickets }));
    });
  }, []);

  console.log()
  

  function test(){
    console.log(tickets.length <= 20)
  }



  if (!tickets) return <div>Loading...</div>;
  return (
    <>
      <div className='logoBlock'><img src={AvioLogo} alt="" /></div>
      <div className='mainBlock'>
        <div className='checkBlock'>
          <p className='titleCheckBlock'>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
          <div className='HoverDiv'>
          <input className='inputCheckBlock'  name='All' type="checkbox" /> <label htmlFor='All'>Все</label>
          </div>
          <div className='HoverDiv'>
          <input className='inputCheckBlock'  name='BezPerecadki' type="checkbox" /> <label htmlFor='BezPerecadki'>Без пересадок</label>
          </div>
          <div className='HoverDiv'>
          <input className='inputCheckBlock'  name='1' type="checkbox" /> <label htmlFor='1'>1 пересадка</label>
          </div>
          <div className='HoverDiv'>
          <input className='inputCheckBlock'  name='2' type="checkbox" /> <label htmlFor='2'>2 пересадки</label>
          </div>
          <div className='HoverDiv'>
          <input className='inputCheckBlock'  name='3' type="checkbox" /> <label htmlFor='3'>3 пересадки</label>
          </div>
        </div>
        <div>
          <div className='ticketsBlock'> 
            <div className='timeCheckBlock'>
              <div className='freeBlock'>САМЫЙ ДЕШЕВЫЙ</div>
              <div className='fasterBlock'>САМЫЙ БЫСТРЫЙ</div>
            </div>
            <div>
              {tickets.filter((ticket) => ticket.length >= 20).map((ticket)=>(
                <div>{ticket.price}</div>
              ))}
            </div>
            <button onClick={test}>test</button>
            
          </div>
          <div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
