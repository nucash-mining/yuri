import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <Image src="/header.png" alt="Logo" width={983} height={349} />
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a
              href="https://dexscreener.com/fantom/0x06cb7fecf5e50cfd8729e1c4f5e75e7e7332ecfb"
              target="_blank"
              rel="noreferrer"
            >
              Dexscreener
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/yeh_on_ftm"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/w9ttbzg4"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
