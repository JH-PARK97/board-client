import { useState } from 'react';

type ToggleHookType = [boolean, () => void];

export default function useToggle(initialValue = false): ToggleHookType {
    const [status, setStatus] = useState<boolean>(initialValue);

    const toggleStatus = () => setStatus((prevStatus) => !prevStatus);

    return [status, toggleStatus];
}


