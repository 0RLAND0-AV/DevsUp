// Obtenemos los elementos del carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');
const carritoSection = document.getElementById('carrito');

let totalPrice = 0;
let cart = {};

// Función para actualizar la lista de productos en el carrito
function updateCartDisplay() {
    cartItems.innerHTML = ''; // Limpiar el carrito antes de actualizar
    for (let product in cart) {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${cart[product].name} - ${cart[product].price.toFixed(2)} bs x ${cart[product].quantity} = ${(cart[product].price * cart[product].quantity).toFixed(2)} bs 
            <button class="remove-btn" data-product="${product}">Eliminar</button>`;
        cartItems.appendChild(cartItem);
    }

    // Actualizar el número de productos en el ícono del carrito
    cartCountElement.textContent = Object.keys(cart).reduce((acc, product) => acc + cart[product].quantity, 0);

    // Agregar eventos de eliminar a cada botón
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            removeFromCart(productName);
        });
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    if (cart[productName]) {
        // Actualizar el precio total
        totalPrice -= cart[productName].price * cart[productName].quantity;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Eliminar el producto del carrito
        delete cart[productName];
        updateCartDisplay();
    }
}

// Agregar el evento a cada botón
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Si el producto ya está en el carrito, aumentar la cantidad
        if (cart[productName]) {
            cart[productName].quantity += 1;
        } else {
            // Si no está en el carrito, agregarlo
            cart[productName] = {
                name: productName,
                price: productPrice,
                quantity: 1
            };
        }

        // Actualizar el precio total
        totalPrice += productPrice;
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Actualizar la visualización del carrito
        updateCartDisplay();
    });
});








//Bootstrap:------->
// NOTICE!!! Initially embedded in our docs this JavaScript
// file contains elements that can help you create reproducible
// use cases in StackBlitz for instance.
// In a real project please adapt this content to your needs.
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * For details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global bootstrap: false */

(() => {
    'use strict'
  
    // --------
    // Tooltips
    // --------
    // Instantiate all tooltips in a docs or StackBlitz
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach(tooltip => {
        new bootstrap.Tooltip(tooltip)
      })
  
    // --------
    // Popovers
    // --------
    // Instantiate all popovers in docs or StackBlitz
    document.querySelectorAll('[data-bs-toggle="popover"]')
      .forEach(popover => {
        new bootstrap.Popover(popover)
      })
  
    // -------------------------------
    // Toasts
    // -------------------------------
    // Used by 'Placement' example in docs or StackBlitz
    const toastPlacement = document.getElementById('toastPlacement')
    if (toastPlacement) {
      document.getElementById('selectToastPlacement').addEventListener('change', function () {
        if (!toastPlacement.dataset.originalClass) {
          toastPlacement.dataset.originalClass = toastPlacement.className
        }
  
        toastPlacement.className = `${toastPlacement.dataset.originalClass} ${this.value}`
      })
    }
  
    // Instantiate all toasts in docs pages only
    document.querySelectorAll('.bd-example .toast')
      .forEach(toastNode => {
        const toast = new bootstrap.Toast(toastNode, {
          autohide: false
        })
  
        toast.show()
      })
  
    // Instantiate all toasts in docs pages only
    // js-docs-start live-toast
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
  
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }
    // js-docs-end live-toast
  
    // -------------------------------
    // Alerts
    // -------------------------------
    // Used in 'Show live alert' example in docs or StackBlitz
  
    // js-docs-start live-alert
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
  
      alertPlaceholder.append(wrapper)
    }
  
    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
      alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success')
      })
    }
    // js-docs-end live-alert
  
    // --------
    // Carousels
    // --------
    // Instantiate all non-autoplaying carousels in docs or StackBlitz
    document.querySelectorAll('.carousel:not([data-bs-ride="carousel"])')
      .forEach(carousel => {
        bootstrap.Carousel.getOrCreateInstance(carousel)
      })
  
    // -------------------------------
    // Checks & Radios
    // -------------------------------
    // Indeterminate checkbox example in docs and StackBlitz
    document.querySelectorAll('.bd-example-indeterminate [type="checkbox"]')
      .forEach(checkbox => {
        if (checkbox.id.includes('Indeterminate')) {
          checkbox.indeterminate = true
        }
      })
  
    // -------------------------------
    // Links
    // -------------------------------
    // Disable empty links in docs examples only
    document.querySelectorAll('.bd-content [href="#"]')
      .forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault()
        })
      })
  
    // -------------------------------
    // Modal
    // -------------------------------
    // Modal 'Varying modal content' example in docs and StackBlitz
    // js-docs-start varying-modal-content
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
      exampleModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.
  
        // Update the modal's content.
        const modalTitle = exampleModal.querySelector('.modal-title')
        const modalBodyInput = exampleModal.querySelector('.modal-body input')
  
        modalTitle.textContent = `New message to ${recipient}`
        modalBodyInput.value = recipient
      })
    }
    // js-docs-end varying-modal-content
  
    // -------------------------------
    // Offcanvas
    // -------------------------------
    // 'Offcanvas components' example in docs only
    const myOffcanvas = document.querySelectorAll('.bd-example-offcanvas .offcanvas')
    if (myOffcanvas) {
      myOffcanvas.forEach(offcanvas => {
        offcanvas.addEventListener('show.bs.offcanvas', event => {
          event.preventDefault()
        }, false)
      })
    }
  })()
  