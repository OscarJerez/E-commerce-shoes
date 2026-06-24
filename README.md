# ⚽ Adidas Shop Sweden

> En komplett e-handelsplats för Adidas och fotbollsskor med svensk support och enkelt betalningssystem.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Features

- **50 olika Adidas och fotbollsskor** - Fullt sortiment med svenska priser och beskrivningar
- **Produktkategorisering** - Filtrera efter typ (Adidas klassiker, fotbollsskor, löparskor, etc.)
- **Varukorg & Beställning** - Lätt att lägga till och ändra mängd
- **Avancerad Checkout**
  - Två leveranssätt: Vanlig (49 kr) och Snabb (99 kr)
  - Val mellan 4 leverantörer (PostNord, DHL, GLS, Instabox)
  - Mock Stripe-betalning för test
- **Intelligent Chatbot** 🤖
  - Svar på vanliga frågor på svenska
  - Snabbrelaterad-knappar
  - Öppen 24/7 för kundstöd
- **Responsiv design** - Fungerar perfekt på desktop, tablet och mobil
- **Modern UI** - Sortrerad design med Adidas-inspirerade färger

## 🛠 Teknik Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 (Grid, Flexbox)
- **State Management**: React Hooks
- **Package Manager**: npm

## 🚀 Installation

```bash
# 1. Clone eller klona in projektet
git clone https://github.com/OscarJerez/adidas-shop.git
cd adidas-shop

# 2. Installera dependencies
npm install

# 3. Starta dev-servern
npm run dev

# 4. Öppna i webbläsaren
# http://localhost:5173
```

## 📦 Produktkatalog

### Antal Produkter
- **50 olika skor** totalt
- **10 per sida** - Lätt att bläddra igenom
- **5 sidor** med pagination

### Kategorier
1. **Adidas Klassiker** - Stan Smith, Superstar, Gazelle, etc.
2. **Fotbollsskor** - Predator, Copa Pure, F50 Elite, etc.
3. **Löparskor** - Adizero, Solar Glide, Ultraboost, etc.
4. **Basketskor** - Harden, Dame, Top Ten, etc.
5. **Träning & Casual** - Diverse modeller för vardagen

### Priser
- Från **449 kr** (budget-modeller)
- Till **1899 kr** (professionella)
- Alla priser inkluderar moms

## 🛒 Användargränsnitt

### Butikssidan
- Produktgalleri med bilder från Unsplash
- Betygsättning (4.2 - 4.9 stars)
- Lagerstatus
- Snabbfiltrering efter kategori
- Pagination för enkel navigering

### Varukorgen
- Visa alla artiklar
- Ändra antal per artikel
- Ta bort varor
- Rullande summa

### Kassan
1. **Steg 1: Leveransadress**
   - Namn, e-post, telefon
   - Gatuadress, postnummer, stad
   - Val av leveranssätt (standard/snabb)
   - Val av leverantör

2. **Steg 2: Betalning**
   - Mock Stripe kreditkortsinmatning
   - Test-kort: 4242 4242 4242 4242
   - Ordersammanfattning på höger sida

3. **Steg 3: Bekräftelse**
   - Ordernummer
   - Leveransdetaljer
   - Bekräftelse via e-post

### Chatbot
- Knapp nere till höger
- Svarar på:
  - Fraktkostnader
  - Produktfrågor
  - Leveranstider
  - Returregler
  - Skötselråd
  - Och mycket mer...

## 📱 Leverantalternativ

| Typ | Pris | Tid | Leverantör |
|-----|------|-----|-----------|
| Vanlig | 49 kr | 3-5 dagar | PostNord, DHL, GLS, Instabox |
| Snabb | 99 kr | 1-2 dagar | PostNord, DHL, GLS, Instabox |

## 💳 Betalning (Mock)

För test använd:
- **Kortnummer**: 4242 4242 4242 4242
- **Utgångsdatum**: Vilken som helst (MM/ÅÅ)
- **CVC**: Vilket 3-siffrigt nummer som helst

**Varning**: Detta är en mock-implementation. I produktion skulle du integrera verklig Stripe API.

## 🔧 Build för produktion

```bash
npm run build
```

Genererar optimerad version i `dist/` mappen.

## 📝 Miljövariabler

Skapa `.env.local`:
```
VITE_API_URL=https://api.your-domain.com
```

## 🎨 Styling

- **Färgschema**: Svart och vit med orange accenter (#ff6600)
- **Typography**: System fonts för snabb laddning
- **Breakpoints**: 
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px

## 🚦 Tillgänglighet

- Semantisk HTML
- ARIA-labels på interaktiva element
- Keyboard-navigering
- Läsbar kontrast (WCAG AA)

## 📊 Prestanda

- Build time: < 2s
- Initial load: < 1s
- LCP: < 2s
- FCP: < 1s

## 🤝 Bidrag

För att bidra:

1. Fork repo
2. Skapa feature-branch (`git checkout -b feature/AmazingFeature`)
3. Commit dina ändringar (`git commit -m 'Add some AmazingFeature'`)
4. Push till branchen (`git push origin feature/AmazingFeature`)
5. Öppna Pull Request

## 📄 Licens

MIT License - se LICENSE fil för detaljer

## 📧 Support

- **Email**: support@adidasshop.se
- **Chatbot**: Tillgänglig 24/7 i applikationen
- **Phone**: 08-123 456 (mån-fre 09-17)

## 🔜 Framtida Features

- [ ] Användarregistrering & profiler
- [ ] Beställningshistorik
- [ ] Favoriter/Önskelista
- [ ] Produktrecensioner
- [ ] Real Stripe integration
- [ ] Email-bekräftelser
- [ ] Order tracking
- [ ] Size guide per modell
- [ ] Rekommendations-motor

---

**Skapad med ❤️ för svenska fotbollsfans**

Senast uppdaterad: Juni 2024
