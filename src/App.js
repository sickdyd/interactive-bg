import React from 'react';
import uuidv4 from 'uuidv4';
import './App.css';

function App() {

  const [hive, setHive] = React.useState(createHiveBackground());

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
                                  onTouchStart={(e)=>startAnimation(e)}
                                />
        )}
        </div>
      </header>
    </div>
  );
}

export default App;
