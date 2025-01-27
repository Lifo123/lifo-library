import { useResize } from "./useResize";

interface ResizerProps {
    type?: 'row' | 'col' | 'both';
    color?: boolean
}


export default function Resizer({
    type = 'both',
    ...props
}: ResizerProps) {

    const { handleMouseDown } = useResize();

    return (
        <>
            {
                type === 'both' ? (
                    <>
                        <span className="resizer-bar d-flex absolute"
                            data-type='col'
                            onMouseDown={(e) => handleMouseDown(e, "col")}
                            data-color={props.color}
                            ></span>
                        <span className="resizer-bar d-flex absolute"
                            data-type='row'
                            onMouseDown={(e) => handleMouseDown(e, "row")}
                            data-color={props.color}
                            ></span>
                        <span className="resizer-bar d-flex absolute br-6"
                            data-type='both'
                            onMouseDown={(e) => handleMouseDown(e, "both")}
                            data-color={props.color}
                            ></span>
                    </>
                ) : (
                    <span className="resizer-bar d-flex absolute"
                        data-type={type}
                        onMouseDown={(e) => handleMouseDown(e, type)}
                        data-color={props.color}
                    ></span>
                )
            }
        </>
    )

}

