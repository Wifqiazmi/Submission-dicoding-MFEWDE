import lazySizes from 'lazysizes';
import DrawerInitiator from '../utils/drawer-intiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

lazySizes.init();

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const hamburgerButtonElement = document.querySelector('#hamburger');
    const drawerElement = document.querySelector('#drawer');
    const mainElement = document.querySelector('main');
    const headerMenuElement = document.querySelector('.header__menu');

    function openMenu(event) {
      drawerElement.style.left = '0';
      headerMenuElement.classList.add('active');
      event.stopPropagation();
    }

    function closeMenu(event) {
      drawerElement.style.left = '-300px';
      headerMenuElement.classList.remove('active');
      event.stopPropagation();
    }

    hamburgerButtonElement.addEventListener('click', (event) => {
      if (drawerElement.style.left === '0') {
        closeMenu(event);
      } else {
        openMenu(event);
      }
      event.preventDefault(); // Menghentikan perubahan URL
    });

    mainElement.addEventListener('click', (event) => {
      if (window.innerWidth <= 768) {
        closeMenu(event);
      }
    });

    headerMenuElement.addEventListener('click', (event) => {
      if (window.innerWidth > 768) {
        closeMenu(event);
      }
    });

    const drawerItems = document.querySelectorAll('#drawer a');
    drawerItems.forEach((item) => {
      item.addEventListener('click', closeMenu);
    });

    document.querySelectorAll('a, button, input').forEach((element) => {
      if (element.offsetWidth < 44 || element.offsetHeight < 44) {
        console.log(element);
      }
    });

    const skipToContentButton = document.querySelector('.skip-link');

    function handleSkipToContent(event) {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    }

    skipToContentButton.addEventListener('click', handleSkipToContent);
  }
}

export default App;
