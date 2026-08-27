import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/nourdoc-logo.png'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="brand brand-light">
            <img src={logo} alt="NourDoc" width="240" height="240" loading="lazy" decoding="async" />
            <span>
              Nour<span>Doc</span>
            </span>
          </Link>

          <p>
            AI-powered ambient clinical intelligence designed to return the
            clinical encounter to the conversation.
          </p>

          <span className="market-note">
            Local relevance. Global healthcare readiness.
          </span>
        </div>

        <div>
          <h3>Product</h3>
          <Link to="/product">Platform</Link>
          <Link to="/why-nourdoc">Why NourDoc</Link>
          <Link to="/healthcare-impact">Healthcare Impact</Link>
        </div>

        <div>
          <h3>Company</h3>
          <Link to="/about">About</Link>
          <Link to="/partners">Partners</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h3>Trust</h3>
          <Link to="/security-compliance">Security & Compliance</Link>
          <span>HIPAA Aligned</span>
          <span>GDPR Ready</span>
        </div>

        <div className="footer-contact-column">
          <h3>Contact</h3>
          <div className="footer-contact-item">
            <span className="footer-contact-label">Sales</span>
            <a
              href="mailto:hello@nour-doc.com"
              className="footer-contact-email"
              aria-label="Email NourDoc Sales"
            >
              hello@nour-doc.com
            </a>
          </div>

          <div className="footer-contact-item">
            <span className="footer-contact-label">Support</span>
            <a
              href="mailto:support@nour-doc.com"
              className="footer-contact-email"
              aria-label="Email NourDoc Support"
            >
              support@nour-doc.com
            </a>
          </div>

          <div className="footer-contact-item">
            <span className="footer-contact-label">Partnerships</span>
            <a
              href="mailto:hello@nour-doc.com"
              className="footer-contact-email"
              aria-label="Email NourDoc Partnerships"
            >
              hello@nour-doc.com
            </a>
          </div>

          <div className="footer-contact-item">
            <span className="footer-contact-label">Investors</span>
            <a
              href="mailto:hello@nour-doc.com"
              className="footer-contact-email"
              aria-label="Email NourDoc Investors"
            >
              hello@nour-doc.com
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} NourDoc</span>

        <span>Patient conversations, perfectly documented.</span>

        <a
          href="https://m3hive.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-powered"
          aria-label="Powered by M3Hive — visit M3Hive website"
        >
          <span>Powered by</span>
          <strong>M3Hive</strong>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  )
}
