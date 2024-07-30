const Footer = () => {
  return (
    <div className="p-4">
      <footer aria-label="Essentia" role="contentinfo">
        <span className="text-xs text-base-color-h dark:text-base-color-dark-h">
          <ul className="inline">
            <li className="inline">
              <a href="" role="link" target="_self" className="hover:underline">
                Política de privacidad
              </a>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <a href="" role="link" target="_self" className="hover:underline">
                Términos y condiciones
              </a>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <a href="" role="link" target="_self" className="hover:underline">
                Cookies
              </a>
              <span aria-hidden="true"> • </span>
            </li>
            <li className="inline">
              <a href="" role="link" target="_self" className="hover:underline">
                Acerca de
              </a>
            </li>
            <li className="flex flex-col text-base-color-m dark:text-base-color-dark-m mt-2">
              © 2024 Essentia®️
            </li>
          </ul>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
