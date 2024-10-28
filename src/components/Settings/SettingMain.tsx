import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import LIBRARY from "../../context/libraryContext";

export default function SettingMain(props: any) {
    const { initName } = props;
    if (!initName) {
        throw new Error('You must provide a initName prop');
    };

    const [initial, setInitial] = useState<string>(initName);
    const context = useStore(LIBRARY.select);
    const ASIDE = useStore(LIBRARY.aside);

    useEffect(() => {
        if (ASIDE.length > 0) {
            setInitial(ASIDE[0]?.cont);
        }
    }, [ASIDE]);

    useEffect(() => {
        if (context.value) {
            setInitial(context.value); 
        }
    }, [context]);

    return (
        <main className="lb-main px-3 relative">
            {
                props[initial] || <p>No content found</p>
            }
        </main>
    );
}
