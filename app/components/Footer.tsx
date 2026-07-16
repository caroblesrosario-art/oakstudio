import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-paper">
      <div className="container-x py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/50">
              A design & coding studio for websites, apps, CRMs and ads — run
              like software, so you always know where things stand.
            </p>
            <a
              href="mailto:oakstudio.do@gmail.com"
              className="mt-5 inline-block text-sm font-medium text-ink underline underline-offset-4 hover:text-ink/70"
            >
              oakstudio.do@gmail.com
            </a>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Studio</p>
            <ul className="mt-4 space-y-3 text-sm text-ink/60">
              <li><Link href="/#services" className="hover:text-ink">Services</Link></li>
              <li><Link href="/#process" className="hover:text-ink">How it works</Link></li>
              <li><Link href="/#pricing" className="hover:text-ink">Plans</Link></li>
              <li><Link href="/#about" className="hover:text-ink">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-ink/40">Clients</p>
            <ul className="mt-4 space-y-3 text-sm text-ink/60">
              <li><Link href="/start" className="hover:text-ink">Start a project</Link></li>
              <li><Link href="/dashboard" className="hover:text-ink">Track a project</Link></li>
              <li>
                <a href="mailto:oakstudio.do@gmail.com" className="hover:text-ink">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-ink/8 pt-6 text-xs text-ink/40 sm:flex-row">
          <p>© {new Date().getFullYear()} OakStudio. All rights reserved.</p>
          <p>Design & code, delivered like a product.</p>
        </div>
      </div>
    </footer>
  );
}
