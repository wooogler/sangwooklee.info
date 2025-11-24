import './src/styles/global.css';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

export const wrapRootElement = ({ element }) => {
  return <MDXProvider>{element}</MDXProvider>;
};

// Image zoom functionality
export const onClientEntry = () => {
  // Wait for DOM to be ready
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initImageZoom);
    // Also run immediately in case DOM is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(initImageZoom, 100);
    }
  }
};

export const onRouteUpdate = () => {
  // Re-initialize on route changes
  setTimeout(initImageZoom, 100);
};

function initImageZoom() {
  // Remove existing modal if any
  const existingModal = document.getElementById('image-zoom-modal');
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'image-zoom-modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    cursor: zoom-out;
  `;

  const modalImg = document.createElement('img');
  modalImg.style.cssText = `
    margin: auto;
    display: block;
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  // Close modal on click
  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Add click handlers to images
  const images = document.querySelectorAll('table img, .image-zoomable');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    
    // Remove any existing click handlers
    const newImg = img.cloneNode(true);
    img.parentNode.replaceChild(newImg, img);
    
    newImg.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modalImg.src = newImg.src;
      modal.style.display = 'block';
    });
    
    // Also handle clicks on parent anchor tags
    if (newImg.parentElement && newImg.parentElement.tagName === 'A') {
      newImg.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        modalImg.src = newImg.src;
        modal.style.display = 'block';
      });
    }
  });
}
