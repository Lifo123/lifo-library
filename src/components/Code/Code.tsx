import React, { useState } from "react";

interface CodeProps {
    md: string;
}

export default function Code({ md }: CodeProps) {
    const [render, setRender] = useState<string | null>(null);

    // Define el mapa de colores con palabras clave en arrays
    const colorMap: { [key: string]: string[] } = {
        declare: ['let', 'const', 'function'],
        keyword: ['if', 'else', 'switch', 'case', 'default', 'for', 'while', 'do', 'break', 'continue', 'return', 'throw', 'try', 'catch', 'finally', 'class', 'extends', 'implements', 'instanceof', 'interface', 'package', 'private', 'protected', 'public', 'static', 'super', 'this', 'typeof', 'void', 'with', 'yield', 'delete', 'in', 'of', 'instanceof', 'new', 'typeof', 'void', 'await', 'async', 'from', 'as'],
        literal: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
        built_in: ['console', 'require', 'module', 'exports', 'process', '__dirname', '__filename'],
        operator: ['+', '-', '*', '/', '%', '**', '++', '--', '<<', '>>', '>>>', '&', '|', '^', '~', '===', '!==', '<', '>', '<=', '>=', 'instanceof', 'in', 'typeof', 'new', 'void', 'delete', '?', ':', '='],
    };

    const styling = (code: string) => {
        // Divide el código en líneas para poder aplicar estilos por cada línea
        const lines = code.split('\n');
        const styledLines = lines.map(line => {
            let styledLine = line;

            // Itera sobre cada tipo de color en el colorMap
            Object.keys(colorMap).forEach((type) => {
                colorMap[type].forEach((keyword) => {
                    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
                    const colorClass = `token-${type}`;  // Clase de color para cada tipo
                    styledLine = styledLine.replace(regex, `<span class="${colorClass}">${keyword}</span>`);
                });
            });

            return styledLine;
        });

        // Unir las líneas con estilo y actualizar el estado
        setRender(styledLines.join('\n'));
    };

    const handleClick = () => {
        styling(md);
    };

    return (
        <div>
            <pre onClick={handleClick}>
                <code dangerouslySetInnerHTML={{ __html: render || md }} />
            </pre>
            <style>
                {`
                    .token-declare { color: blue; }
                    .token-keyword { color: pink; }
                    .token-literal { color: purple; }
                    .token-built_in { color: teal; }
                    .token-operator { color: orange; }
                    /* Añade más estilos según sea necesario */
                `}
            </style>
        </div>
    );
}
