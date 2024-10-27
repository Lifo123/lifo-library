import DarkmodeDrop from "../../Darkmode/DarkmodeDrop";
import DarkmodeToggle from "../../Darkmode/DarkmodeToggle";

interface DarkmodeProps {

}

export default function Darkmode() {
    return (
        <div>
            <h2>Darkmode Settings</h2>
            <p>This is a paragraph that explains the purpose of this article. You can use this space to provide context about the topic you are discussing.</p>
            <span className="f-col g-1">
                <label>Darkmode in Dropdown</label>
                <DarkmodeDrop storage="F-Theme" />
            </span>
            <span className="f-col mt-3">    
                <label>Darkmode in Toggle</label>
                <DarkmodeToggle storage="F-Theme" />
            </span>
        </div>
    )
}