import React from 'react';

export default function ThemeButton() {
    const handleClickToggleTheme = () => {
        const $html = document.querySelector('html');
        if (!$html) return;

        const isDarkMode = $html.classList.contains('dark');

        if (isDarkMode) {
            $html.classList.remove('dark');
        } else {
            $html.classList.add('dark');
        }
    };

    return <button onClick={handleClickToggleTheme}>dark mode</button>;
}
