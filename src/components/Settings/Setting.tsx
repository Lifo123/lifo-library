import './Setting.css';

interface SettingProps {
    className?: string;
    style?: React.CSSProperties;
    head?: string | React.ReactNode;
    children?: React.ReactNode;
}

export default function Setting({ className, style, head = '', children }: SettingProps) {

    return (
        <div className='lb-setting-container f-col g-3 mx-auto'>
            {typeof head === 'string' ? <h2 className='fw-500'>{head}</h2> : head}
            <section className={`lb-setting h-100 w-100 d-flex g-4 ${className || ''}`} style={style}>
                {children}
            </section>
        </div>
    );
}
