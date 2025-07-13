import UI from "../../UI"

interface ToastShowProps {

}

export default function ToastShow() {
    return (
        <div className="f-col gap-2 f-center">
            <div className="f-row gap-2">
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('Top-Left', { noDissapear: true, position: 'top-left' }) }}>
                    top-left
                </span>
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('Top-Center', { noDissapear: true, position: 'top-center' }) }}>
                    top-center
                </span>
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('Top-Right', { noDissapear: true, position: 'top-right' }) }}>
                    top-right
                </span>
            </div>
            <div className="f-row gap-2">
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('bottom-Left', { noDissapear: true, position: 'bottom-left' }) }}>
                    bottom-left
                </span>
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('bottom-center', { noDissapear: true, position: 'bottom-center' }) }}>
                    bottom-center
                </span>
                <span className="btn btn-third rounded-md" onClick={() => { UI.toast.success('bottom-right', { noDissapear: true, position: 'bottom-right' }) }}>
                    bottom-right
                </span>
            </div>
            <div className="f-row gap-2">
                <span className="btn btn-secondary rounded-md" onClick={() => { UI.toast.dismiss()}}>
                    Dismiss All
                </span>
                <span className="btn btn-secondary rounded-md" onClick={() => { UI.toast.dismissFirst()}}>
                    Dismiss First
                </span>
            </div>
        </div>
    )
}