import { CSSProperties } from "react";
import React from "react";
import { ReactSVG } from "react";

type KEYS = 'Ctrl' | 'Alt' | 'Windows';

type ShortcutProps = {
    prefix: KEYS;
    suffix: string;
    hint?: string
}

const macKeys = {
    'Ctrl': 'Command',
    'Alt': 'Option',
    'Windows': 'Command/Apple'
} as const;
const shortcutStyles: CSSProperties = {
    paddingLeft: '.5em'
}
export default function Shortcut({ prefix, suffix, hint }: ShortcutProps) {

    const macPrefix = macKeys[prefix] || 'None';
    const hintContent = hint ? `(${hint})` : '';
    //const macContent = `blah`
    return (
        <span style={shortcutStyles}>
            {kbd(prefix)} + {kbd(suffix)} Mac: {kbd(macPrefix)} + {kbd(suffix)} {hintContent}
        </span>
    )
}

function kbd(content: string) {
    return <kbd>{content}</kbd>
}