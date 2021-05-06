import { Phase } from '../phase';
import './index.scss';

export const Calendar = ({ phases }) =>
    <div className='cmp-calendar'>
        {Object.values(phases)?.map((phase, index) =>
            <div key={index} className='cmp-calendar__item'>
                <Phase phaseSvg={phase.svg} />
            </div>
        )}
    </div>

