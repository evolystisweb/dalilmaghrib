import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'À propos', href: '#' },
    { name: 'Catégories', href: '#categories' },
    { name: 'Villes', href: '#cities' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  const categories = [
    { name: 'Gastronomie', href: '#' },
    { name: 'Hébergement', href: '#' },
    { name: 'Beauté & Bien-être', href: '#' },
    { name: 'Transport', href: '#' },
    { name: 'Shopping', href: '#' },
  ];

  const cities = [
    { name: 'Marrakech', href: '#' },
    { name: 'Casablanca', href: '#' },
    { name: 'Fès', href: '#' },
    { name: 'Rabat', href: '#' },
    { name: 'Tanger', href: '#' },
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Restez informé
              </h3>
              <p className="text-primary-foreground/70">
                Recevez les dernières nouveautés et offres exclusives.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 md:w-72 h-12 px-4 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:ring-2 focus:ring-primary outline-none"
              />
              <Button variant="moroccan" size="lg">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-moroccan-gold flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-primary-foreground">
                Dalil<span className="text-moroccan-gold">Maghrib</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              Votre guide ultime pour découvrir les meilleurs espaces et services au Maroc. Explorez, évaluez, partagez.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-moroccan-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4">Catégories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-primary-foreground/70 hover:text-moroccan-gold transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display font-semibold mb-4">Villes</h4>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.name}>
                  <a
                    href={city.href}
                    className="text-primary-foreground/70 hover:text-moroccan-gold transition-colors"
                  >
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 DalilMaghrib. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-moroccan-gold transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-moroccan-gold transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
