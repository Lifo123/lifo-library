import Code from "../../Code/Code";
import InputRange from "../../input/InputRange";
import InputColor from "../../input/InputColor";

const test =
    `const HelloWorld = () => {
    return <h1>Hello, World! </h1>;
};`


export default function Appearence() {

    const changeFontSize = (value: any) => {
        document.documentElement.style.setProperty('--lb-multiplier', value.toString());
    }

    const changePrimaryColor = (value: any) => {
        document.documentElement.style.setProperty('--lb-primary', value);
    }

    const changeBG = (value: any) => {
        document.documentElement.style.setProperty('--lb-bg', value);
    }

    return (
        <div className="f-col w-100">
            <h2>Appearence Settings</h2>
            <p>In this page you can customize the appearance of the website. You can change the color scheme, font size, and other visual elements to match your preferences.</p>
            <h4>Code section %20</h4>
            <label>Font size</label>
            <InputRange min={1.2} max={1.8} funct={changeFontSize} step={0.01} initialValue={1.5} />
            <label>Colors</label>
            <InputColor funct={changePrimaryColor} initialValue='var(--lb-primary)' />
            <InputColor funct={changeBG} initialValue='var(--lb-bg)' />
        </div>
    );
}
