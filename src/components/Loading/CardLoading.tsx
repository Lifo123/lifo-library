'use client'
import React from "react";
import { useStore } from "@nanostores/react";
import { Scroll } from "../../utils/Scroll.Utils.js";
import { $loading } from "../../Stores/Loading.Store.js";
import Icons from "../Icons/Icons.js";

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
                    props.custom || <div className="card-loading d-flex f-center fixed rounded-xl p-3">
                        <Icons size={26} icon="loading" />
                    </div>
                )
            }
        </span>
    )
}

