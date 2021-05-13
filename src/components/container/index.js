import './index.scss';

export const Container = ({ children, title, anchor, cN }) =>
    <div id={anchor} className={`cmp-container${' ' + cN}`}>
        <h1 className='cmp-container--title'>{title}</h1>
        {children}
    </div>

