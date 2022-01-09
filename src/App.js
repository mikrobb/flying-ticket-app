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
    .then((json) => setIdSearch(json));
  }, []);

  useEffect(() => {
    fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${idSearch.searchId}`)
    .then((data) => data.json())
    .then((json) => dispatch({ type: 'searchTickets', payload: json })); 
  }, [])


  
 
  console.log(idSearch.searchId);
  console.log(tickets)

  



  if (!tickets) return <div>Loading...</div>;
  return (
    <>
      <div style={{textAlign : 'center'}}><img src={AvioLogo} alt="" /></div>
      <div>
        <div style={{ backgroundColor: 'white' , width: '300px' , padding: "10px 0px"}}>
          <p style={{textAlign:'center'}}>КОЛИЧЕСТВО ПЕРЕСАДОК</p>
          <div className='HoverDiv'>
          <input style={{marginLeft : '10px'}} name='All' type="checkbox" /> <label htmlFor='All'>Все</label>
          </div>
          <div className='HoverDiv'>
          <input style={{marginLeft : '10px'}} name='BezPerecadki' type="checkbox" /> <label htmlFor='BezPerecadki'>Без пересадок</label>
          </div>
          <div className='HoverDiv'>
          <input style={{marginLeft : '10px'}} name='1' type="checkbox" /> <label htmlFor='1'>1 пересадка</label>
          </div>
          <div className='HoverDiv'>
          <input style={{marginLeft : '10px'}} name='2' type="checkbox" /> <label htmlFor='2'>2 пересадки</label>
          </div>
          <div className='HoverDiv'>
          <input style={{marginLeft : '10px'}} name='3' type="checkbox" /> <label htmlFor='3'>3 пересадки</label>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default App;
