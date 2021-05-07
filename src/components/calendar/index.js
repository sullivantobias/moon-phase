import { Phase } from '../phase';

import './index.scss';

export const Calendar = ({ phases }) =>
    <div className='cmp-calendar'>
        <div className='cmp-calendar__wrapper'>
            {Object.values(phases)?.map(({ svg, npWidget }, index) =>
                <div key={index} className='cmp-calendar__wrapper__item'>
                    <span className='cmp-calendar__wrapper__item--day'>{index + 1}</span>
                    <Phase phaseSvg={svg} />
                    <div className='cmp-calendar__wrapper__item--name'>{npWidget}</div>
                </div>
            )}
        </div>
    </div>

