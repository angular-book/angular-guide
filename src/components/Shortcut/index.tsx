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
    const winContent = `${prefix} + ${suffix}`;
    const macPrefix = macKeys[prefix] || 'None';
    const macContent = `${macPrefix} + ${suffix}`
    const hintContent = hint ? `(${hint})` : '';
    //const macContent = `blah`
    return (
        <span style={shortcutStyles}>
            Windows/Linux: <code>{winContent}</code> Mac: <code>{macContent}</code> {hintContent}
        </span>
    )
}