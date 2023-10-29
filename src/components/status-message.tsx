import React, { useState } from 'react';

type StatusMessageType = 'error' | 'sucess' | 'info';

interface StatusMessageHandle {
    text: string;
    type: StatusMessageType
    setMessage: (text: string, type: StatusMessageType) => void;
    clearMessage: () => void;
    setSuccess: (text: string) => void;
    setError: (text: string) => void;
    setInfo: (text: string) => void;
}

interface StatusMessageProps {
    handle: StatusMessageHandle
}

export const StatusMessage: React.FC<StatusMessageProps> = (props) => {
    const text = props.handle.text;
    const type = props.handle.type;

    if (!text) return null;

    const styles = {
        color: type === 'error' ? 'red' : (type === 'sucess' ? 'green' : 'black'),
    };

    return <p style={styles}>{text}</p>;
};

export function useStatusMessage(): StatusMessageHandle {
    const [text0, setText] = useState<string>("");
    const [type0, setType] = useState<StatusMessageType>('info');

    const setMessage = (text: string, type: StatusMessageType) => {
        setText(text);
        setType(type);
    }

    const handle: StatusMessageHandle = {
        text: text0,
        type: type0,
        setMessage: setMessage,
        clearMessage: () => setMessage("", 'info'),
        setSuccess: (text: string) => setMessage(text, 'sucess'),
        setError: (text: string) => setMessage(text, 'error'),
        setInfo: (text: string) => setMessage(text, 'info'),
    }

    return handle;
}
