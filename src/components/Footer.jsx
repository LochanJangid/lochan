export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
      
      <div className="font-bold text-white">
        L<span className="text-green-400">J</span>
      </div>

      <div>
        © {new Date().getFullYear()} Lochan Jangid. All rights reserved.
      </div>

      <div className="text-gray-500 hover:text-green-400 transition">
  Made with ♥ in Jaipur
</div>
    </footer>
  );
}