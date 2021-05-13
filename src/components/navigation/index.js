import { useEffect, useState } from 'react';
import './index.scss';

export const Navigation = ({ links }) => {
    const [currentSection, setCurrentSection] = useState(undefined);

    useEffect(() => {
        handleScroll()
    }, [])

    const handleScroll = () => {
        const sections = document.querySelectorAll('.cmp-container[id]');

        setCurrentSection(sections[0]);

        window.addEventListener('scroll', () => {
            const wTop = window.pageYOffset;

            sections.forEach(section => {
                if (wTop + 70 > section.offsetTop) {
                    setCurrentSection(section)
                }
            });
        });
    }

    return <div className='cmp-navigation' >
        {links?.map(({ anchor, label }, index) =>
            <a className={`cmp-navigation--link${currentSection && currentSection.id === anchor ? ' current' : ''}`} key={index} href={`#${anchor}`}>{label}</a>
        )}
    </div >
}

