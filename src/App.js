import React from 'react';
import uuidv4 from 'uuidv4';
import './App.css';

function App() {

  // The background is a grid of divs called hive.
  const [hive, setHive] = React.useState(createHiveBackground());

  // Create a 10 x 10 grid of divs (I called them hex as hexagons of a bee hive).
  // Returns an array containing the id, width and height of each hex.
  function createHiveBackground() {
    const h = [];
    for (let n = 0; n < 100; n++) {
      const hex = {
        id: uuidv4(),
        width: '10vw',
        height: '10vh',
      }
      h.push(hex);
    }
    return h;
  }

  /*
    Animate the event target element on hover by adding the class hex-zoom.
    This function removes the class once 3000 ms are passed after the
    mouse hovered the hex: this is done to allow the css transition to finish
    before removing the class and transition back to the original status.

    @param {event} e - event passed onMouseOver
  */
  function startAnimation(e) {

    const i = e.target.id;
    e.preventDefault();

    const tempHexes = hive.map((e)=>{
      if (e.id === i) {
        e.classes = 'hex-zoom';
        setTimeout(()=>{
          const hexesWithoutClass = hive.map((h)=>{
            if (h === e) {
              h.classes = '';
              return h;
            } else {
              return h;
            }
          })
          setHive(hexesWithoutClass);
        }, 4000);
        return e;
      } else {
        return e;
      }
    })
    setHive(tempHexes); 
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <div className='hive-container'>
        <div className='hive-container-bg' />
        {hive.map( (hex) => <div
                                  key={hex.id}
                                  id={hex.id}
                                  className={`hex ${hex.classes}`}
                                  style={{ width: hex.width, height: hex.height }}
                                  onMouseOver={(e)=>startAnimation(e)}
                                  // added for mobile
                                  onTouchStart={(e)=>startAnimation(e)}
                                />
        )}
        </div>
      </header>
    </div>
  );
}

export default App;
