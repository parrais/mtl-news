import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p>
        <Link to="/">Home</Link>
      </p>

      <p>
        MTL News layout by <a href="https://github.com/parrais/">Matt Lewis</a>.
        Site icon by <a href="http://www.freepik.com/">Freepik</a>.
      </p>
    </footer>
  );
}

export default Footer;
