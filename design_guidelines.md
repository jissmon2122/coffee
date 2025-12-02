# Coffee Shop Online Ordering Platform - Design Guidelines

## Design Approach
**Hybrid Approach**: Drawing inspiration from successful food ordering platforms (Uber Eats, Starbucks, DoorDash) combined with Material Design principles for consistent component behavior and clear information hierarchy.

**Core Philosophy**: Create a warm, approachable ordering experience that balances visual appeal with ordering efficiency. Focus on quick browsing, easy customization, and confident checkout.

---

## Typography System

**Font Family**: 
- Primary: 'Playfair Display' (Google Fonts) - Headers, product names
- Secondary: 'Inter' (Google Fonts) - Body text, UI elements

**Hierarchy**:
- H1 (Hero/Page titles): text-4xl md:text-5xl, font-bold
- H2 (Category headers): text-3xl, font-semibold
- H3 (Product names): text-xl, font-semibold
- Body (Descriptions): text-base, font-normal
- Small (Prices, labels): text-sm, font-medium
- Button text: text-base, font-semibold

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm (p-4, gap-6, my-8, etc.)

**Container Structure**:
- Main wrapper: max-w-7xl mx-auto px-4 md:px-6
- Content sections: py-12 md:py-16
- Card padding: p-6
- Component gaps: gap-6 to gap-8

**Grid Patterns**:
- Menu items: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Category navigation: Horizontal scroll on mobile, grid on desktop
- Cart items: Single column stacked list

---

## Component Library

### Navigation Header
- Sticky top navigation with shop logo (left), shopping cart icon with badge (right)
- Height: h-16 md:h-20
- Include current order total next to cart icon
- Mobile: Hamburger menu for categories

### Hero Section
- Height: 60vh on desktop, 50vh on mobile
- Large hero image showcasing coffee shop ambiance (warm interior, coffee being poured, or signature drinks)
- Overlay with centered headline and subheadline
- Primary CTA button with blur backdrop (backdrop-blur-sm)
- No hover effects on hero CTA button

### Category Navigation
- Horizontal pill-style tabs (rounded-full badges)
- Sticky below header on scroll
- Icons from Heroicons paired with category names
- Active state indicator

### Product Cards
- Aspect ratio 4:3 for product images
- Image at top, content below (not overlaid)
- Product name, description (2 lines truncated), price
- "Add to Cart" button at card bottom
- Hover effect: Subtle lift (hover:shadow-lg transition)

### Customization Modal
- Full-screen overlay on mobile, centered modal on desktop (max-w-2xl)
- Product image at top (fixed height 300px)
- Sections: Size selection (radio buttons), milk options (radio), extras (checkboxes), sweetness (slider or buttons)
- Live price update as options change
- Quantity selector: Minus/Plus buttons with number display
- "Add to Cart" action button at bottom (sticky on mobile)

### Shopping Cart
- Slide-in panel from right (w-full md:w-96)
- Backdrop overlay when open
- Cart item cards: Small thumbnail (64x64), name, customizations (text-sm), quantity controls, remove button
- Subtotal, tax, total breakdown
- "Checkout" primary button
- Empty state: Friendly illustration + message

### Checkout Form
- Single column layout (max-w-2xl mx-auto)
- Input fields: Name, phone number, pickup time selector (dropdown with 15-min intervals)
- Special instructions textarea
- Order summary sidebar on desktop, accordion on mobile
- "Place Order" prominent button

### Confirmation Screen
- Centered success icon (checkmark in circle)
- Order number (large, bold)
- Estimated pickup time
- Order details summary
- "Order Again" and "View Menu" action buttons

---

## Images

**Required Images**:
1. **Hero Image**: Wide shot of cozy coffee shop interior with natural lighting, customers enjoying coffee, warm atmosphere (1920x1080)
2. **Product Images**: High-quality photos for each menu item on white/neutral background (800x600):
   - Espresso drinks with latte art
   - Iced beverages in branded cups
   - Pastries and food items styled appetizingly
3. **Empty Cart State**: Friendly coffee-themed illustration
4. **Success/Confirmation**: Simple checkmark or coffee cup icon illustration

**Image Placement**:
- Hero: Full-width background with gradient overlay
- Products: Card thumbnails, modal detailed view
- Cart: Small thumbnails (64x64) next to items

---

## Interaction Patterns

**Icon Library**: Heroicons (CDN)
- Shopping cart, plus/minus, close, checkmark, clock, user, coffee cup icons

**Loading States**: Skeleton screens for menu items, spinner for cart actions

**Animations**: Minimal and purposeful only
- Cart badge pulse on item add
- Smooth slide-in transitions for cart/modal
- Subtle fade transitions between sections

**Mobile Optimization**:
- Bottom navigation bar for Categories/Cart/Profile
- Touch-friendly tap targets (min 44x44)
- Swipe gestures for cart dismissal

---

## Accessibility

- Proper semantic HTML structure
- ARIA labels for icon-only buttons
- Keyboard navigation support for modals and cart
- Focus visible states for all interactive elements
- Form inputs with associated labels
- Sufficient contrast ratios maintained throughout

This design creates an inviting, efficient ordering experience that feels premium yet approachable, mirroring the warmth of a physical coffee shop visit.