import { Phase } from "../phase";

import './index.scss';

export const PhaseLimit = ({ phaseLimit }) =>
    <div className='cmp-phaseLimit'>
        {phaseLimit?.map(({ svg, phaseName, timeEvent, day }, index) =>
            <div className='cmp-phaseLimit__item' key={index}>
                <span className='cmp-phaseLimit__item--date'>{day}</span>
                <Phase phaseSvg={svg} />
                <p className='cmp-phaseLimit__item--name'>{phaseName}</p>
                <div className='cmp-phaseLimit__item--timeEvent'>{timeEvent}</div>
            </div>
        )}
    </div>





