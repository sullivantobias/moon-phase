import React, { useEffect, useRef, useState } from 'react';
import { loadMoonPhases } from './commons/getPhases';
import { Navigation } from './components/navigation';
import { Container } from './components/container';
import { Phase } from './components/phase';
import { PhaseLimit } from './components/phaseLimit';
import { Separator } from './components/separator/separator';
import { Calendar } from './components/calendar';
import { Loader } from './components/loader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import './commons/styles/app.scss';
import './commons/styles/body.scss';



export const App = () => {
  const [currentDayPhase, setCurrentDayPhase] = useState({})
  const [phaseLimit, setPhaseLimit] = useState([])
  const [phases, setPhases] = useState([])
  const [currentMonth, setCurrentMonth] = useState([])
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth() + 1)
  const [loading, setLoading] = useState(true)
  const [init, setInit] = useState(true)
  const appRef = useRef()

  useEffect(() => {
    init && setTimeout(() => {
      getDatas()

      setInit(false)
    }, 3000)

    !init && calendarHandler();
  }, [monthIndex])

  const getDatas = async () => {
    const datas = await loadMoonPhases(monthIndex)

    if (datas) {
      const day = new Date().getDate();
      setCurrentMonth(datas.monthName)
      getAllPhases(datas.phase, day)

      setLoading(false);

      appRef.current.classList.add('loaded');
    }
  }

  const calendarHandler = async () => {
    const datas = await loadMoonPhases(monthIndex)

    if (datas) { setPhases(datas.phase); setCurrentMonth(datas.monthName) }
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

            <Container anchor='today' title='Today'>
              <Phase phaseSvg={currentDayPhase.svg} />
            </Container>
            <Separator />
            <Container anchor='keyPhase' title='Key Phases'>
              <PhaseLimit phaseLimit={phaseLimit} />
            </Container>
            <Separator />
            <Container anchor='calendar' title='Calendar' cN='App__wrapper__calendar'>
              <div className='App__wrapper__calendar__wrapper'>
                <FontAwesomeIcon
                  className={`App__wrapper__calendar--chevron${monthIndex === 1 ? ' disabled' : ''}`}
                  onClick={() => setMonthIndex(prev => prev - 1)}
                  icon={faChevronCircleLeft} />

                <span className='App__wrapper__calendar--month'>{currentMonth}</span>

                <FontAwesomeIcon
                  className={`App__wrapper__calendar--chevron${monthIndex === 12 ? ' disabled' : ''}`}
                  onClick={() => setMonthIndex(prev => prev + 1)}
                  icon={faChevronCircleRight} />

              </div>

              <Calendar phases={phases} />
            </Container>
          </>}
      </div>
      { loading && <Loader />}
    </div>
  );
}
