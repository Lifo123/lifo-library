const set = (state: boolean) => {
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    //const isMobile = window.innerWidth <= 700;
    
    if (state) {
        html.style.paddingRight = '0px';
        html.setAttribute('data-scroll-state', 'false')
    } else {
        html.style.paddingRight = `${scrollbarWidth}px`;
        // if (!isMobile && scrollbarWidth > 0) {
        //     html.style.paddingRight = `${scrollbarWidth}px`;
        // }
        html.setAttribute('data-scroll-state', 'true')
    }
};


export const Scroll = {
    set, 
    show: () => set(true), 
    hide: () => set(false), 
}