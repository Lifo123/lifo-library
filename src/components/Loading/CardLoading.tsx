import React from "react";
import CircleLoading from "./CircleLoading.js";
import { Scroll } from "../../utils/Scroll.Utils.js";
import { useStore } from "@nanostores/react";
import { $loading } from "src/Stores/Loading.Store.js";

interface CardLoadingProps {
    custom?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function CardLoading(props: CardLoadingProps) {
    const LOADING = useStore($loading)

    React.useEffect(() => {
        if (LOADING.card_loading) {
            Scroll.hide();
        } else {
            Scroll.show();
        }
    }, [LOADING.card_loading]);

    return (
        <span
            className={`flifo-portal fixed d-flex f-center ${LOADING.card_loading ? 'visible' : 'delete'}`}
            style={{
                pointerEvents: LOADING.card_loading ? 'visible' : 'none',
                backgroundColor: props?.style?.backgroundColor || '#0000003b',
                ...props.style
            }}
        >
            {
                LOADING.card_loading && (
                    props.custom || <div className="card-loading d-flex f-center relative fixed br-10 p-3">
                        <CircleLoading size={26} stroke={'rgb(var(--lb-black))'} />
                    </div>
                )
            }
        </span>
    )
}

