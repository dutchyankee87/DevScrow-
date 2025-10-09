# 🛡️ Devve Escrow Marketplace

A production-ready marketplace for digital services with instant, risk-free escrow powered by Devve's Contingent Transaction Sets (CTS).

## ✨ Features

### 🔒 **Atomic Escrow Protection**
- **Zero Counterparty Risk**: Powered by Devve's mathematical guarantees
- **Instant Settlement**: Payments release immediately upon delivery confirmation
- **Self-Custody**: Users maintain control of their assets throughout

### 🎯 **Complete Marketplace**
- **Service Listings**: Create and browse digital service offerings
- **Role-Based Access**: Buyer, seller, and admin roles with distinct capabilities
- **Real-Time Tracking**: Live escrow status updates and notifications
- **Dispute Resolution**: Admin-mediated conflict resolution system

### 💻 **Technical Excellence**
- **Next.js 15**: App Router with TypeScript and edge-ready architecture
- **Atomic Database**: PostgreSQL with Drizzle ORM and full type safety
- **Production UI**: shadcn/ui components with responsive design
- **API-First**: RESTful routes with Zod validation and error handling

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo>
cd mckays-app-template
npm install
```

### 2. Environment Setup
```bash
# Copy and configure environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 3. Database Setup
```bash
# Generate and run migrations
npm run db:generate
npm run db:migrate

# Optional: Seed with test data
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your marketplace!

## 🔧 Configuration

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/escrow_marketplace` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | `pk_test_...` |
| `CLERK_SECRET_KEY` | Clerk secret key | `sk_test_...` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |

### Devve Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `DEVVE_BASE_URL` | Devve API endpoint | `https://devve.testnet.devvio.com` |
| `DEVVE_API_KEY` | Devve API key | Test key from docs |
| `DEVVE_USE_MOCK` | Use mock client | `true` |

## 🏗️ Architecture

### Database Schema
```
profiles (user roles & wallet info)
    ↓
listings (service offerings as NFTs)
    ↓
escrows (transaction state machine)
    ├── deliverables (files/links/text)
    ├── disputes (resolution system)
    ├── messages (communication)
    └── audit_logs (full history)
```

### Escrow State Machine
```
CREATED → RESERVED → FUNDED → DELIVERED → COMPLETED
                ↓                    ↓
             EXPIRED              DISPUTED
                              ↓        ↓
                          REFUNDED  RESOLVED
```

### API Routes
```
/api/listings          # Browse & create services
/api/listings/[id]     # Individual listing management
/api/escrows           # Create & track escrows
/api/escrows/[id]      # Escrow actions (fund, deliver, complete)
```

## 🎯 User Flows

### **Seller Journey**
1. **Create Profile** → Set role to "seller"
2. **Connect Devve Wallet** → Link blockchain identity
3. **Create Listing** → Mint NFT representing service
4. **Receive Orders** → Monitor escrow dashboard
5. **Deliver Service** → Upload files or provide links
6. **Get Paid** → Instant settlement via CTS

### **Buyer Journey**
1. **Browse Marketplace** → Find services with escrow protection
2. **Create Escrow** → Initialize transaction
3. **Reserve NFT** → Lock service for purchase
4. **Fund Escrow** → Bundle payment tokens
5. **Receive Delivery** → Access uploaded content
6. **Confirm Satisfaction** → Trigger atomic release

### **Admin Features**
- **Dispute Resolution**: Mediate conflicts between parties
- **Marketplace Oversight**: Monitor transactions and users
- **System Management**: Handle escalated issues

## 🔐 Security Features

### **Financial Security**
- **Atomic Transactions**: CTS guarantees eliminate timing attacks
- **Idempotent Operations**: Prevent double-spending and replay attacks
- **Role-Based Access**: Strict permission enforcement on all operations

### **Data Protection**
- **Type Safety**: End-to-end TypeScript with runtime validation
- **Input Sanitization**: Zod schemas on all API boundaries
- **Audit Trail**: Complete transaction history in `audit_logs`

### **Wallet Integration**
- **Self-Custody**: Users control their own private keys
- **Mock Mode**: Safe development without real funds
- **Test Network**: Devve testnet integration for development

## 🛠️ Development

### **Project Structure**
```
app/
├── (authenticated)/dashboard/     # Protected user dashboard
├── (unauthenticated)/marketplace/ # Public marketplace
└── api/                          # RESTful API routes

actions/                          # Server actions for data mutations
├── listings.ts                   # Service management
├── escrows.ts                   # Transaction operations  
└── profiles.ts                  # User management

lib/devve/                       # Devve blockchain integration
├── client.ts                    # HTTP client
├── mock.ts                      # Development mock
└── types.ts                     # TypeScript interfaces

db/
├── schema/                      # Database schema definitions
└── migrations/                  # Version-controlled migrations
```

### **Key Commands**
```bash
npm run dev        # Start development server
npm run build      # Production build
npm run setup      # Development environment setup
npm run db:migrate # Run database migrations
npm run clean      # Lint & format code
npm run test       # Run test suite
```

## 🌐 Deployment

### **Environment Setup**
1. **Database**: Set up PostgreSQL (Supabase, Railway, etc.)
2. **Authentication**: Configure Clerk project
3. **Payments**: Set up Stripe account
4. **Devve**: Get production API keys

### **Production Checklist**
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Clerk webhook endpoints set
- [ ] Stripe webhook endpoints configured
- [ ] Devve production keys updated
- [ ] HTTPS enabled
- [ ] Monitoring configured

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Implement** changes with tests
4. **Run** `npm run clean` for code quality
5. **Submit** a pull request

## 📚 Resources

- **Devve Documentation**: https://devvdigital.gitbook.io/devve-network
- **Clerk Auth**: https://clerk.com/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **shadcn/ui**: https://ui.shadcn.com
- **Next.js 15**: https://nextjs.org/docs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](license) file for details.

---

**Built with ❤️ using Devve's revolutionary Contingent Transaction Sets**