function Header({ username }) {
  return (
    <header>
      <h1>MTL News</h1>
      <p>News For Your Community</p>
      <p>Logged in as: {username}</p>
    </header>
  );
}

export default Header;
