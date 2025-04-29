// ==UserScript==
// @name         Google Click Me Button
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Adds a centered "Click Me" button under Google Search buttons with toast message
// @author       karkir0003
// @match        https://www.google.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/karkir0003/google-click-me-script/main/tampermonkey.user.js
// @downloadURL  https://raw.githubusercontent.com/YOUR_USERNAME/google-click-me-script/main/tampermonkey.user.js
// ==/UserScript==

(function() {
    'use strict';

    function addButton() {
        const searchButtonContainer = document.querySelector('form div.FPdoLc'); // FPdoLc is the container class for Google buttons
        if (!searchButtonContainer) return;

        // Check if button already exists
        if (document.getElementById('click-me-button')) return;

        // Create the button
        const button = document.createElement('button');
        button.id = 'click-me-button';
        button.innerText = 'Click Me';
        button.style.marginTop = '20px';
        button.style.padding = '10px 24px';
        button.style.fontSize = '16px';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.backgroundColor = '#4285F4';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        button.style.transition = 'background-color 0.2s ease';
        button.style.display = 'block';
        button.style.marginLeft = 'auto';
        button.style.marginRight = 'auto';

        button.onmouseenter = () => button.style.backgroundColor = '#3367D6';
        button.onmouseleave = () => button.style.backgroundColor = '#4285F4';

        // Add click listener for toast
        button.addEventListener('click', () => {
            showToast('You clicked me');
        });

        // Insert the button after the Google Search buttons
        searchButtonContainer.appendChild(button);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.padding = '12px 20px';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        toast.style.fontSize = '14px';
        toast.style.opacity = 0;
        toast.style.zIndex = 10000;
        toast.style.transition = 'opacity 0.4s ease';

        document.body.appendChild(toast);

        setTimeout(() => { toast.style.opacity = 1; }, 10);

        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => { toast.remove(); }, 400);
        }, 2000);
    }

    // Wait for the page to load buttons, then inject
    const observer = new MutationObserver(() => {
        addButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
