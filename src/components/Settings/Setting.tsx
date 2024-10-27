import { useEffect, useState } from "react";

interface SettingProps {
    element?: { [key: string]: React.ReactNode }; // Tipo específico para element
}

export default function Setting({
    element = {
        none: <p>Default</p>,
    },
}: SettingProps) {
    // States
    const [selected, setSelected] = useState<string>('');
    const [aside, setAside] = useState<string[]>([]);
    const [main, setMain] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const keys = Object.keys(element);
        setAside(keys);
        setMain(Object.values(element));
        setSelected(keys[0]);
    }, [])

    return (
        <section className="lb-setting h-100 w-100 f-row g-5">
            <aside>
                {aside.map((a, i) => (
                    <div className="f-col g-1" key={i}>
                        <button className="btn btn-primary" onClick={() => setSelected(a)}>
                            {a}
                        </button>
                    </div>
                ))}
            </aside>
            <div className="f-col g-11">
                {selected && main[aside.indexOf(selected)]}
            </div>
        </section>
    );
}
