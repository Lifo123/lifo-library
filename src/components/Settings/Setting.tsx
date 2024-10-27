import './Setting.css';
import { useEffect, useState } from "react";
import Appearence from './Contents/Appearence';

interface SettingProps {
    element?: {
        [key: string]: {
            icon?: React.ReactNode;
            cont?: React.ReactNode;
        };
    };
    className?: string;
    style?: React.CSSProperties;
    asideClass?: string;
    mainClass?: string;
    asideStyle?: React.CSSProperties;
    mainStyle?: React.CSSProperties;
    head?: string | React.ReactNode;
    asideTittle?: string;
}

export default function Setting({
    className, style, asideClass, mainClass = '', asideStyle, mainStyle, head = '', asideTittle = 'Settings',
    element = {
        appereance: { cont: <Appearence /> },
    },
}: SettingProps) {
    // States
    const [selected, setSelected] = useState<string>('');
    const [aside, setAside] = useState<string[]>([]);
    const [main, setMain] = useState<React.ReactNode[]>([]);
    
    useEffect(() => {
        const keys = Object.keys(element);
        setAside(keys);
        setMain(keys.map((key) => element[key].cont || <p>Default</p>));
        setSelected(keys[0] || '');
    }, []);

    return (
        <div className='lb-setting-container f-col g-3 mx-auto'>
            {typeof head === 'string' ? <h2 className='fw-500'>{head}</h2> : head}
            <section className={`lb-setting h-100 w-100 d-flex g-4 ${className || ''}`} style={style}>
                <aside className={`lb-aside f-col g-2 ${asideClass || ''}`} style={asideStyle}>
                    {asideTittle ? <h3 className='fw-500 pt-3 pb-1'>{asideTittle}</h3> : null}
                    {aside.map((a, i) => (
                        <Options key={i} a={a} funct={setSelected} id={i} />
                    ))}
                </aside>
                <main className={`lb-main px-3 relative ${mainClass || ''}`} style={mainStyle}>
                    {selected && main[aside.indexOf(selected)]}
                </main>
            </section>
        </div>
    );
}

const Options = ({ a, funct, id }: { a: string, funct: React.Dispatch<React.SetStateAction<string>>, id: number }) => {

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const OPTIONS = document.querySelectorAll('.lb-options');
        OPTIONS.forEach((o) => {
            o.classList.remove('active');
        });

        const target = e.target as HTMLSpanElement;
        target.classList.add('active');
        e.stopPropagation();
        funct(a);
    }

    return (
        <span className={`lb-options d-flex br-6 relative fw-300 pointer ${id === 0 ? 'active' : ''}`} onClick={handleClick}>
            {a}
        </span>
    )
}
