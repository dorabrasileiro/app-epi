(() => {
  const isElement = (value) => value instanceof Element || value instanceof HTMLElement;

  const getTextContent = (element) => (element ? element.textContent.trim() : '');

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      link.addEventListener('click', (event) => {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  };

  const initFavorites = () => {
    document.querySelectorAll('.heart').forEach((heart) => {
      heart.setAttribute('role', 'button');
      heart.setAttribute('tabindex', '0');
      heart.setAttribute('aria-label', 'Adicionar aos favoritos');

      const toggleFavorite = () => {
        heart.classList.toggle('is-active');
        const active = heart.classList.contains('is-active');
        heart.setAttribute('aria-label', active ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
        heart.style.filter = active ? 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.8))' : 'none';
      };

      heart.addEventListener('click', toggleFavorite);
      heart.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleFavorite();
        }
      });
    });
  };

  const initAddToCartButtons = () => {
    document.querySelectorAll('.adicionar-ao-carrinho, .adicionar-ao-carrinho-7').forEach((button) => {
      const originalText = getTextContent(button);
      button.dataset.originalText = originalText;

      button.addEventListener('click', () => {
        button.classList.add('is-added');
        button.textContent = 'Adicionado';
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('is-added');
          button.disabled = false;
        }, 1200);
      });
    });
  };

  const initQuantityControls = () => {
    document.querySelectorAll('.box-83').forEach((quantityWrap) => {
      const quantityText = quantityWrap.querySelector('.text-5');
      if (!quantityText) return;

      const parseQuantity = () => {
        const match = getTextContent(quantityText).match(/\d+/);
        return match ? Number(match[0]) : 1;
      };

      const updateQuantityText = (quantity) => {
        quantityText.textContent = ` -     ${quantity}     +`;
        quantityText.dataset.value = String(quantity);
      };

      updateQuantityText(parseQuantity());

      quantityWrap.addEventListener('click', (event) => {
        const rect = quantityWrap.getBoundingClientRect();
        const middle = rect.left + rect.width / 2;
        const currentQuantity = parseQuantity();
        const nextQuantity = event.clientX < middle ? Math.max(1, currentQuantity - 1) : currentQuantity + 1;
        updateQuantityText(nextQuantity);
      });
    });
  };

  const initSearchFilter = () => {
    const searchInputs = document.querySelectorAll('.buscar-produtos, .buscar-por-numero-ou');
    if (!searchInputs.length) return;

    const productCards = [...document.querySelectorAll('.box-54, .box-57, .box-53, .box-56')];

    searchInputs.forEach((input) => {
      input.addEventListener('input', () => {
        const searchValue = input.value.trim().toLowerCase();

        productCards.forEach((card) => {
          const cardText = card.textContent.toLowerCase();
          const isVisible = !searchValue || cardText.includes(searchValue);
          card.style.display = isVisible ? '' : 'none';
        });
      });
    });
  };

  const initFormInteraction = () => {
    const submitButton = document.querySelector('.enviar-solicitacao');
    const requiredFields = document.querySelectorAll('input[aria-label], textarea[aria-label], select');

    if (!submitButton) return;

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();

      let hasEmptyField = false;
      requiredFields.forEach((field) => {
        const value = field.value.trim();
        if (!value) {
          hasEmptyField = true;
          field.style.border = '1px solid #f04452';
        } else {
          field.style.border = '1px solid rgba(0, 0, 0, 0.15)';
        }
      });

      if (hasEmptyField) {
        alert('Preencha todos os campos obrigatórios antes de enviar.');
        return;
      }

      submitButton.textContent = 'Enviado';
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.textContent = 'Enviar solicitação';
        submitButton.disabled = false;
      }, 1800);
    });
  };

  const initCategorySelection = () => {
    const buttons = [...document.querySelectorAll('.box-44, .box-50, .box-48')];

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('is-selected'));
        button.classList.add('is-selected');
      });
    });
  };

  const init = () => {
    initSmoothScroll();
    initFavorites();
    initAddToCartButtons();
    initQuantityControls();
    initSearchFilter();
    initFormInteraction();
    initCategorySelection();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
