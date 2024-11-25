const set = (state: boolean) => {
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    
    if (state) {
        html.style.paddingRight = '0px';
        html.setAttribute('data-scroll-state', 'false')
    } else {
        html.style.paddingRight = `${scrollbarWidth}px`;
        html.setAttribute('data-scroll-state', 'true')
    }
};


export const Scroll = {
    set, 
    show: () => set(true), 
    hide: () => set(false), 
}