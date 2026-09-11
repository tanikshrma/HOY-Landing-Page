import { Wordmark } from '../components/ui/Wordmark';

const YEAR = new Date().getFullYear();

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'What you get', href: '#what-you-get' },
  { label: 'Questions', href: '#faq' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-page py-12 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Wordmark tone="paper" withTagline size="h-11" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Personal styling that starts with the wardrobe you already own.
              Built in India.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-paper/65 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hello@houseofyou.in"
              className="text-sm text-paper/65 transition-colors hover:text-paper"
            >
              hello@houseofyou.in
            </a>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {YEAR} HOY — House of You. All rights reserved.</p>
          <p>
            We use your details only to contact you about access.{' '}
            <a href="mailto:hello@houseofyou.in" className="underline underline-offset-2 hover:text-paper/70">
              Request deletion
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
