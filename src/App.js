import { useEffect, useState } from 'react';
import { loadMoonPhases } from './commons/getPhases';
import { Calendar } from './components/calendar';

export const App = () => {
  const [currentDayPhase, setCurrentDayPhase] = useState({})
  const [phaseLimit, setPhaseLimit] = useState([])
  const [phases, setPhases] = useState([])
  const [currentMonth, setCurrentMonth] = useState([])

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {
    const datas = await loadMoonPhases()

    if (datas) {
      setCurrentMonth(datas.monthName)
      getAllPhases(datas.phase)
    }
  }

  const getAllPhases = phases => {
    const limitPhases = Object.values(phases)?.filter(phase => phase.isPhaseLimit)
    const currentDay = new Date().getDate()
    const currentPhase = phases[currentDay];

    setCurrentDayPhase(currentPhase);
    setPhases(phases);
    setPhaseLimit(limitPhases);
  }

  return (

    <div className="App">
      <Calendar phases={phases} />
    </div>
  );
}
