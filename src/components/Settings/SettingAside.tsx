import React, { useEffect, useState } from "react";
import LIBRARY from "../../context/libraryContext";

export default function SettingAside(props: any) {
    const [Options, setOptions] = useState<any>([]);

    const handleSelect = (e: any) => {
        LIBRARY.select.set({ value: e.target.innerHTML });
        const ALL = document.querySelectorAll('.lb-options');
        ALL.forEach((o) => {
            o.classList.remove('active');
        });

        const target = e.target as HTMLSpanElement;
        target.classList.add('active');
    };

    useEffect(() => {
        const test = Object.keys(props).filter((key) => key !== 'head' && key !== 'children')
        test.forEach((key) => {
            const arr = key.split('-')
            LIBRARY.aside.set([
                ...LIBRARY.aside.get(),
                { opt: Number(arr[0]), cont: arr[1] }
            ])
        })
    
        setOptions(LIBRARY.aside.get())
    }, [])


    return (
        <aside className="lb-aside f-col g-2 relative">
            {props?.head ? <h3 className="pt-4 pb-1">{props.head}</h3> : null}
            {
                Options.map((o: any, i: number) => {
                    return (
                        <span key={i} onClick={handleSelect}
                            className={`lb-options d-flex br-6 relative fw-300 pointer ${props.className || ''} ${i === 0 ? 'active' : ''}`}
                        >
                            {o.cont}
                        </span>
                    )
                })
            }
        </aside>
    );
}
