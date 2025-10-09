#!/usr/bin/env node

const { config } = require('dotenv');
const postgres = require('postgres');

// Load environment variables
config({ path: '.env.local' });

async function testConnection() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.log('❌ DATABASE_URL not found in .env.local');
    return;
  }

  console.log('🔍 Testing database connection...');
  console.log('📍 URL:', databaseUrl.replace(/:[^:@]*@/, ':***@')); // Hide password in logs

  try {
    const sql = postgres(databaseUrl, { prepare: false });
    
    // Test simple query
    const result = await sql`SELECT version()`;
    console.log('✅ Database connection successful!');
    console.log('📊 PostgreSQL version:', result[0].version.split(' ')[0] + ' ' + result[0].version.split(' ')[1]);
    
    await sql.end();
    console.log('🎉 Ready to run migrations!');
    
  } catch (error) {
    console.log('❌ Database connection failed:');
    console.log('🔍 Error:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Suggestions:');
      console.log('   1. Check your password is correct in .env.local');
      console.log('   2. If password has special characters, URL encode them:');
      console.log('      @ becomes %40, # becomes %23, etc.');
      console.log('   3. Try the direct connection URL from Supabase');
    }
  }
}

testConnection();