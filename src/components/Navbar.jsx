export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="/" className="brand">
          Lochan Jangid
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/#work">Work</a>
          <a href="/#about">About</a>
          <a href="/#focus">Focus</a>
          <a className="nav-cta" href="https://github.com/LochanJangid" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </div>
    </header>
  );
}
