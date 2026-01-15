# Groupe Scolaire Niels Bohr - Landing Page

## Design Style Reference

- **Main Style**: Neomorphism with 3D-like rendering
- **Effects**: High contrast, ambient occlusion, colorful glows
- **Shadows**: Soft light and soft shadows
- **Popups**: Glassmorphism with frosted blur glass and glow lights
- **Colors**: Rainbow palette from logo (Yellow, Red, Green, Blue, Purple, Orange)

## Build Progress

### ✅ Completed Features

1. **Design System Setup**
   - Custom neomorphism CSS with soft shadows
   - Glassmorphism styles with backdrop blur
   - Colorful glow effects (purple, blue, rainbow)
   - HSL-based color tokens in design system
   - Custom button variants (neo, glass, gradient, bohr colors)
   - Custom card variants (neo, glass, neoPressed)
   - Custom input/textarea with neomorphism inset shadows

2. **Navbar**
   - Sticky header with blur on scroll
   - Mobile hamburger menu
   - Smooth scroll navigation
   - Logo with hover animation

3. **Hero Section**
   - Animated gradient background
   - Floating decorative elements
   - Gradient text effect for "Groupe Scolaire Niels Bohr"
   - Stats cards with neomorphism
   - CTA buttons with hover animations
   - Hero image with floating logo badge

4. **About Section (Pourquoi Niels Bohr)**
   - 6 feature cards with icons
   - Staggered reveal animations
   - Mission statement glassmorphism card with rainbow glow

5. **Programs Section**
   - 4 program cards (Préscolaire, CP-CE2, CM1-CM2, Langues)
   - Gradient accent bars
   - Feature lists per program
   - CTA button

6. **Gallery Section**
   - 3D spinning carousel with perspective
   - 6 gallery images (AI generated)
   - Auto-play with manual controls
   - Smooth transitions and depth effects
   - Dot indicators

7. **Contact Section**
   - Contact form with all fields
   - WhatsApp integration (+212 753-117012)
   - Email integration (GroupeScolaireNielsBohr@gmail.com)
   - Contact info cards
   - WhatsApp CTA button
   - Feature checklist

8. **Map Section**
   - Neomorphism styled placeholder map
   - Animated pin marker
   - Google Maps link button

9. **Chatbot**
   - Corner floating button with avatar
   - Glassmorphism popup with frosted blur
   - Chat interface with messages
   - Gradient header

10. **Footer**
    - Logo display
    - Copyright and credits

11. **Responsive Design**
    - Mobile-first approach
    - Hamburger menu for mobile
    - Responsive grid layouts
    - Touch-friendly interactions

12. **Animations**
    - Framer Motion throughout
    - Scroll-triggered animations
    - Hover effects on all interactive elements
    - Floating decorative elements

13. **Logo Preloader** (Added in update)
    - Animated logo display on page load
    - Smooth fade out transition

14. **OpenStreetMap Integration** (Added in update)
    - Leaflet.js for interactive map
    - Custom styled marker
    - Neomorphism card wrapper

### 🔧 Recent Updates

1. Made logo bigger in navbar (h-16 to h-20 on desktop)
2. Added logo preloader with animation
3. Fixed smooth scrolling on menu clicks
4. Replaced placeholder map with real Leaflet/OpenStreetMap
5. Refined UI with dark blue text for better readability
6. Updated all branding to Groupe Scolaire Niels Bohr

### 📋 Potential Future Enhancements

1. **Testimonials Section** - Parent reviews and success stories
2. **Team Section** - Staff photos and bios
3. **Lightbox for Gallery** - Full-screen image viewer
4. **Backend Email Sending** - Actual email delivery via Supabase Edge Functions
5. **Multi-language Support** - Arabic/French toggle
6. **Blog/News Section** - School updates and events
7. **Calendar Integration** - School schedule and events
8. **Online Registration Form** - Full enrollment system
9. **Parent Portal** - Login for parents to access student info
10. **Dark Mode Toggle** - Theme switcher

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **UI Components**: Shadcn/ui (customized)
- **Maps**: Leaflet + React-Leaflet + OpenStreetMap
- **Icons**: Lucide React
- **Build**: Vite

## Files Created/Modified

### New Components
- `src/components/Navbar.tsx`
- `src/components/HeroSection.tsx`
- `src/components/AboutSection.tsx`
- `src/components/ProgramsSection.tsx`
- `src/components/GallerySection.tsx`
- `src/components/ContactSection.tsx`
- `src/components/MapSection.tsx`
- `src/components/Chatbot.tsx`
- `src/components/Footer.tsx`
- `src/components/Preloader.tsx`

### Modified Files
- `src/index.css` - Full design system with neomorphism
- `tailwind.config.ts` - Extended theme with custom colors/shadows
- `src/components/ui/button.tsx` - Custom neomorphism variants
- `src/components/ui/card.tsx` - Glass/neo variants
- `src/components/ui/input.tsx` - Neomorphism styling
- `src/components/ui/textarea.tsx` - Neomorphism styling
- `src/pages/Index.tsx` - Main landing page
- `index.html` - Updated meta tags for SEO

### Assets
- `src/assets/logo.png` - Main school logo
- `src/assets/hero-children.jpg` - Hero section image
- `src/assets/chatbot-avatar.png` - Chatbot avatar
- `src/assets/gallery-1.jpg` to `gallery-6.jpg` - Gallery images

## Contact Information

- **Phone/WhatsApp**: +212 753-117012
- **Email**: GroupeScolaireNielsBohr@gmail.com
- **Location**: El Jadida, Morocco
