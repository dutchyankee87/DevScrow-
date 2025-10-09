#!/bin/bash

echo "🚀 Setting up Escrow Marketplace development environment..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found. Please create it with the required environment variables."
    echo "📋 See .env.example for reference."
    exit 1
fi

# Source environment variables
export $(grep -v '^#' .env.local | xargs)

# Check for required environment variables
required_vars=("DATABASE_URL" "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" "CLERK_SECRET_KEY" "STRIPE_SECRET_KEY")
missing_vars=()

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    printf ' - %s\n' "${missing_vars[@]}"
    echo "📝 Please update your .env.local file."
    exit 1
fi

echo "✅ Environment variables configured"

# Check if database is accessible
echo "🔍 Checking database connection..."
if npx drizzle-kit introspect > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "⚠️ Database connection failed. The app will use mock mode for Devve transactions."
    echo "💡 To set up PostgreSQL:"
    echo "   - Install PostgreSQL locally"
    echo "   - Create database: createdb escrow_marketplace"
    echo "   - Update DATABASE_URL in .env.local"
fi

# Run database migrations
echo "📊 Running database migrations..."
if npm run db:generate > /dev/null 2>&1 && npm run db:migrate > /dev/null 2>&1; then
    echo "✅ Database migrations completed"
else
    echo "⚠️ Database migrations failed. Please check your DATABASE_URL and database setup."
fi

echo ""
echo "🎉 Setup complete! You can now:"
echo "   npm run dev          # Start development server"
echo "   npm run db:seed      # Seed database with test data"
echo ""
echo "📖 Visit http://localhost:3000 to see your marketplace"
echo "🔧 Visit http://localhost:3000/dashboard to access the dashboard"
echo ""
echo "🔗 Important links:"
echo "   - Clerk Dashboard: https://dashboard.clerk.com"
echo "   - Devve Docs: https://devvdigital.gitbook.io/devve-network"
echo "   - Stripe Dashboard: https://dashboard.stripe.com"