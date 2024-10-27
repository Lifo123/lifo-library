import Setting from "./Setting";
import Appearence from "./Contents/Appearence";
import Darkmode from "./Contents/Darkmode";
import Headings from "./Contents/Headings";
import Texts from "./Contents/Texts";



export default function Wrapper() {


    const data = {
        Appearence: { cont: <Appearence /> },
        Headings: { cont: <Headings /> },
        Texts: { cont: <Texts /> },
        Code: { cont: <p>Default</p> },
        Darkmode: { cont: <Darkmode /> },
    }

    return (
        <Setting element={data} />
    );
}
