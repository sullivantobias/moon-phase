import React, { useEffect, useRef, useState } from 'react';
import { loadMoonPhases } from './commons/getPhases';
import { Navigation } from './components/navigation';
import { Container } from './components/container';
import { Phase } from './components/phase';
import { PhaseLimit } from './components/phaseLimit';
import { Separator } from './components/separator/separator';
import { Calendar } from './components/calendar';
import { Loader } from './components/loader';

import './commons/styles/app.scss';
import './commons/styles/body.scss';



export const App = () => {
  const [currentDayPhase, setCurrentDayPhase] = useState({})
  const [phaseLimit, setPhaseLimit] = useState([])
  const [phases, setPhases] = useState([])
  const [currentMonth, setCurrentMonth] = useState([])
  const [loading, setLoading] = useState(true)

  const appRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      getDatas()
    }, 3000)
  }, [])

  const getDatas = async () => {
    const datas = await loadMoonPhases()

    if (datas) {
      const day = new Date().getDate();
      setCurrentMonth(`${day} ${datas.monthName}`)
      getAllPhases(datas.phase, day)

      setLoading(false);

      appRef.current.classList.add('loaded');
    }
  }

  const getAllPhases = (phases, day) => {
    const limitPhases = Object.values(phases)?.filter((phase, index) =>
      phase.isPhaseLimit && (phase.day = index + 1))
    const currentPhase = phases[day];

    setCurrentDayPhase(currentPhase);
    setPhases(phases);
    setPhaseLimit(limitPhases);
  }

  return (

    <div className="App" >
      <div ref={appRef} className='App__wrapper'>
        {!loading &&
          <>
            <Navigation links={[
              { anchor: 'today', label: 'Today' },
              { anchor: 'keyPhase', label: 'Key Phases' },
              { anchor: 'calendar', label: 'Calendar' }]} />

            <Container anchor='today' title={currentMonth}>
              <Phase phaseSvg={currentDayPhase.svg} />
            </Container>
            <Separator />
            <Container anchor='keyPhase' title='Key Phases'>
              <PhaseLimit phaseLimit={phaseLimit} />
            </Container>
            <Separator />
            <Container anchor='calendar' title='Calendar'>
              <Calendar phases={phases} />
            </Container>
          </>}
      </div>
      { loading && <Loader />}
    </div>
  );
}
