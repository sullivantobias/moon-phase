import { useEffect, useState } from 'react';
import { loadMoonPhases } from './commons/getPhases';
import { Phase } from './components/phase';

export const App = () => {
  const [currentDayPhase, setCurrentDayPhase] = useState({})

  useEffect(() => {
    getDatas()
  }, [])

  const getDatas = async () => {
    const datas = await loadMoonPhases()

    datas && getCurrentDayPhase(datas.phase);
  }

  const getCurrentDayPhase = phase => {
    const currentDay = new Date().getDate()
    const currentPhase = phase[currentDay];

    setCurrentDayPhase(currentPhase);
  }

  return (
    <div className="App">
      <Phase phaseSvg={currentDayPhase.svg} />
    </div>
  );
}
