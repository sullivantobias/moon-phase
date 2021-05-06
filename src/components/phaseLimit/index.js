import { Phase } from "../phase";

import './index.scss';

export const PhaseLimit = ({ phaseLimit }) =>
    <div className='cmp-phaseLimit'>
        {phaseLimit?.map((phase, index) =>
            <div className='cmp-phaseLimit__item' key={index}>
                <Phase phaseSvg={phase.svg} />
                <p className='cmp-phaseLimit__item--name'>{phase.phaseName}</p>
                <div className='cmp-phaseLimit__item--timeEvent'>{phase.timeEvent}</div>
            </div>
        )}
    </div>





