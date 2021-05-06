import './index.scss';

export const Phase = ({ phaseSvg }) =>
    <div className='cmp-phase' dangerouslySetInnerHTML={{ __html: phaseSvg }} />

