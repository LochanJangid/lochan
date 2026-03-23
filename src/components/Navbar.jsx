export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between px-10 py-5 z-50 backdrop-blur">
      <span className="font-bold text-xl">
        L<span className="text-green-400">J</span>
      </span>

      <div className="space-x-6 text-sm">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}