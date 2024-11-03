'use client';
import React from "react";
import { useState } from "react";

interface DarkModeIconProps {
    storage: string;
}

export default function DarkModeIcon({ storage = 'F-Theme' }: DarkModeIconProps) {
    const [initialDark, setInitialDark] = useState(() => {
        const savedTheme = localStorage.getItem(storage) || 'system';
        if (savedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedTheme === 'dark';
    });

    const Toggle = () => {
        const theme = localStorage.getItem(storage) || 'system';
        const DROPS = document.querySelectorAll('.lb-dm-drop');
        const TOGGLES = document.querySelectorAll('.lb-dm-togle');

        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            DROPS.forEach((d: any) => {
                d.value = isDark ? 'light' : 'dark';
            });
            TOGGLES.forEach((t) => {
                t.classList[isDark ? 'remove' : 'add']('active');
            });
            document.documentElement.style.colorScheme = isDark ? 'light' : 'dark';
            document.documentElement.classList[isDark ? 'remove' : 'add']('dark');

            localStorage.setItem(storage, isDark ? 'light' : 'dark');
            return
        }

        DROPS.forEach((d: any) => {
            d.value = theme === 'dark' ? 'light' : 'dark';
        });
        TOGGLES.forEach((t) => {
            t.classList[theme === 'dark' ? 'remove' : 'add']('active');
        });
        document.documentElement.style.colorScheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList[theme === 'dark' ? 'remove' : 'add']('dark');

        localStorage.setItem(storage, theme === 'dark' ? 'light' : 'dark');

        setInitialDark(v => !v);

    };

    return (
        <span className="lb-dm-icon-toggle icon d-flex f-center pointer br-6" onClick={Toggle}>
            {
                !initialDark ?
                    <svg viewBox="-5.5 0 32 32" stroke="none" fill="var(--f-p-text)">
                        <g>
                            <path d="M11.875 6v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.813 0.375-1.219 1.156-1.219s1.156 0.406 1.156 1.219zM14.219 9.25l1.438-2.031c0.469-0.625 1.063-0.75 1.656-0.313s0.656 1 0.188 1.688l-1.438 2c-0.469 0.688-1.031 0.75-1.656 0.313-0.594-0.438-0.656-0.969-0.188-1.656zM5.781 7.25l1.469 2c0.469 0.688 0.406 1.219-0.219 1.656-0.594 0.469-1.156 0.375-1.625-0.313l-1.469-2c-0.469-0.688-0.406-1.219 0.219-1.656 0.594-0.469 1.156-0.375 1.625 0.313zM10.719 11.125c2.688 0 4.875 2.188 4.875 4.875 0 2.656-2.188 4.813-4.875 4.813s-4.875-2.156-4.875-4.813c0-2.688 2.188-4.875 4.875-4.875zM1.594 11.813l2.375 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.75 0.969-1.563 0.719l-2.313-0.75c-0.781-0.25-1.063-0.75-0.844-1.5 0.25-0.719 0.75-0.938 1.531-0.688zM17.5 12.563l2.344-0.75c0.813-0.25 1.313-0.031 1.531 0.688 0.25 0.75-0.031 1.25-0.844 1.469l-2.313 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.031-1.219 0.813-1.469zM10.719 18.688c1.5 0 2.719-1.219 2.719-2.688 0-1.5-1.219-2.719-2.719-2.719s-2.688 1.219-2.688 2.719c0 1.469 1.188 2.688 2.688 2.688zM0.906 17.969l2.344-0.75c0.781-0.25 1.313-0.063 1.531 0.688 0.25 0.75-0.031 1.219-0.813 1.469l-2.375 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.063-1.219 0.844-1.469zM18.219 17.219l2.344 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.719 0.969-1.531 0.719l-2.344-0.781c-0.813-0.25-1.031-0.719-0.813-1.469 0.25-0.75 0.75-0.938 1.531-0.688zM3.938 23.344l1.469-1.969c0.469-0.688 1.031-0.781 1.625-0.313 0.625 0.438 0.688 0.969 0.219 1.656l-1.469 1.969c-0.469 0.688-1.031 0.813-1.656 0.375-0.594-0.438-0.656-1.031-0.188-1.719zM16.063 21.375l1.438 1.969c0.469 0.688 0.406 1.281-0.188 1.719s-1.188 0.281-1.656-0.344l-1.438-2c-0.469-0.688-0.406-1.219 0.188-1.656 0.625-0.438 1.188-0.375 1.656 0.313zM11.875 23.469v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.844 0.375-1.25 1.156-1.25s1.156 0.406 1.156 1.25z"></path>
                        </g>
                    </svg> :
                    <svg viewBox="-5 -4 26 26" fill="var(--f-p-title)" stroke="none">
                        <g>
                            <path d="M0 8.00002C0 4.75562 1.93132 1.9623 4.70701 0.707031L5.65436 1.65438C5.2352 2.51383 5 3.47946 5 4.50002C5 8.08987 7.91015 11 11.5 11C12.5206 11 13.4862 10.7648 14.3456 10.3457L15.293 11.293C14.0377 14.0687 11.2444 16 8 16C3.58172 16 0 12.4183 0 8.00002Z" ></path>
                            <path d="M11.5 7.00003L9 4.50003L11.5 2.00003L14 4.50003L11.5 7.00003Z"></path>
                        </g>
                    </svg>

            }
        </span>
    )
}