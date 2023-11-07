import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

type StatusMessageType = 'error' | 'success' | 'info';

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

    let variant = 'secondary';
    if (type === 'error') {
        variant = 'danger';
    } else if (type === 'success') {
        variant = 'success';
    }

    return (
        <Alert variant={variant}>{text}</Alert>
    );
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
        setSuccess: (text: string) => setMessage(text, 'success'),
        setError: (text: string) => setMessage(text, 'error'),
        setInfo: (text: string) => setMessage(text, 'info'),
    }

    return handle;
}
