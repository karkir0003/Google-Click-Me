// ==UserScript==
// @name         Google Click Me Button
// @namespace    https://github.com/karkir0003/Google-Click-Me
// @version      2.0
// @description  Adds a centered "Click Me" button under Google Search buttons with toast message
// @author       karkir0003
// @match        https://www.google.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/karkir0003/Google-Click-Me/main/google-click-me.user.js
// @downloadURL  https://raw.githubusercontent.com/karkir0003/Google-Click-Me/main/google-click-me.user.js
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
            showToast('You clicked me! You have run your first Tampermonkey script!');
        });

        // Insert the button after the Google Search buttons
        searchButtonContainer.appendChild(button);
    }

    function showToast(message) {
        const button = document.getElementById('click-me-button');
        const container = button.parentElement; // Parent div of the button
        if (!button || !container) return;
    
        const toast = document.createElement('div');
        toast.innerText = message;
        toast.style.position = 'relative';
        toast.style.marginTop = '12px'; // 12px below button
        toast.style.padding = '14px 20px';
        toast.style.fontSize = '14px';
        toast.style.fontWeight = '500';
        toast.style.textAlign = 'center';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.2)';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.display = 'inline-block';
        toast.style.maxWidth = '250px';
    
        container.appendChild(toast);
    
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 10);
    
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => { toast.remove(); }, 300);
        }, 2500);
    }

    // Wait for the page to load buttons, then inject
    const observer = new MutationObserver(() => {
        addButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
