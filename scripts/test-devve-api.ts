#!/usr/bin/env tsx

/**
 * DevVe Testnet API Validation Script
 * 
 * This script tests all the endpoints we've implemented in our DevVe client
 * to see what's actually working in the real testnet vs our assumptions.
 */

import { createDevveClient } from '../lib/devve'
import { randomUUID } from 'crypto'

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'https://devve.testnet.devvio.com',
  apiKey: process.env.DEVVE_API_KEY || '8f4f6afa-372f-4488-b62e-2faf3a2b51cf', // Test key from docs
  testMode: true
}

interface TestResult {
  endpoint: string
  method: string
  status: 'PASS' | 'FAIL' | 'ERROR'
  message: string
  responseData?: any
}

const results: TestResult[] = []

function log(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`)
}

function addResult(endpoint: string, method: string, status: TestResult['status'], message: string, responseData?: any) {
  results.push({ endpoint, method, status, message, responseData })
  const emoji = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️'
  log(`${emoji} ${method} ${endpoint}: ${message}`)
}

async function testEndpoint(
  name: string, 
  endpoint: string, 
  method: string, 
  testFn: () => Promise<any>
) {
  try {
    log(`Testing ${name}...`)
    const result = await testFn()
    addResult(endpoint, method, 'PASS', 'Success', result)
    return result
  } catch (error: any) {
    const message = error.message || 'Unknown error'
    if (error.message?.includes('HTTP 404') || error.message?.includes('not found')) {
      addResult(endpoint, method, 'FAIL', `Endpoint not found: ${message}`)
    } else if (error.message?.includes('HTTP 400') || error.message?.includes('Bad Request')) {
      addResult(endpoint, method, 'FAIL', `Bad request: ${message}`)
    } else {
      addResult(endpoint, method, 'ERROR', `Network/other error: ${message}`)
    }
    return null
  }
}

async function main() {
  log('🚀 Starting DevVe Testnet API Validation')
  log(`Testing against: ${TEST_CONFIG.baseUrl}`)
  log(`Using API Key: ${TEST_CONFIG.apiKey?.slice(0, 8)}...`)
  
  // Force non-mock mode for this test
  process.env.DEVVE_USE_MOCK = 'false'
  process.env.DEVVE_BASE_URL = TEST_CONFIG.baseUrl
  process.env.DEVVE_API_KEY = TEST_CONFIG.apiKey
  
  const client = createDevveClient(TEST_CONFIG)
  
  // Generate test data
  const testUsername = `test_user_${randomUUID().slice(0, 8)}`
  const testEmail = `${testUsername}@test.com`
  const testPassword = 'TestPassword123!'
  let authResult: any = null
  
  log('\n📋 PHASE 1: Authentication Endpoints')
  
  // Test user registration
  authResult = await testEndpoint(
    'User Registration',
    '/auth/register',
    'POST',
    () => client.register({
      username: testUsername,
      email: testEmail,
      fullName: 'Test User',
      password: testPassword,
      phone: '+1234567890'
    })
  )
  
  // Test user login (only if registration worked)
  if (authResult) {
    await testEndpoint(
      'User Login',
      '/auth/login', 
      'POST',
      () => client.login({
        usernameOrEmail: testUsername,
        password: testPassword
      })
    )
    
    // Test token refresh
    await testEndpoint(
      'Token Refresh',
      '/auth/refresh',
      'POST', 
      () => client.refreshToken(authResult.refreshToken)
    )
  } else {
    // Try login with potentially existing test credentials
    await testEndpoint(
      'User Login (fallback)',
      '/auth/login',
      'POST',
      () => client.login({
        usernameOrEmail: 'test_user',
        password: 'test_password'
      })
    )
  }
  
  log('\n📋 PHASE 2: Core Functionality')
  
  // Test asset creation
  const assetResult = await testEndpoint(
    'Asset Creation',
    '/core/asset/create',
    'POST',
    () => client.createAsset({
      name: 'Test Token',
      description: 'A test token for API validation',
      supply: 1000000,
      clientId: client.generateClientId(),
      apikey: TEST_CONFIG.apiKey
    })
  )
  
  // Test transaction status check
  if (assetResult?.transactionId) {
    await testEndpoint(
      'Transaction Status',
      '/core/transactions/status',
      'POST',
      () => client.getTransactionStatus({
        receiptUris: [`transaction/${assetResult.transactionId}`],
        apikey: TEST_CONFIG.apiKey
      })
    )
  } else {
    // Try with a dummy transaction ID
    await testEndpoint(
      'Transaction Status (dummy)',
      '/core/transactions/status', 
      'POST',
      () => client.getTransactionStatus({
        receiptUris: ['transaction/dummy_tx_id'],
        apikey: TEST_CONFIG.apiKey
      })
    )
  }
  
  // Test wallet balance
  await testEndpoint(
    'Wallet Balance',
    '/core/wallet/balances',
    'POST',
    () => client.getWalletBalance({
      walletAddress: testUsername || 'test_wallet_address',
      apikey: TEST_CONFIG.apiKey
    })
  )
  
  log('\n📋 PHASE 3: Advanced Features (NFT & Escrow)')
  
  // Test NFT creation
  const nftResult = await testEndpoint(
    'NFT Creation',
    '/core/nft/create',
    'POST',
    () => client.createNFT({
      metadata: {
        title: 'Test NFT',
        description: 'A test NFT for API validation',
        properties: { type: 'test' }
      },
      clientId: client.generateClientId(),
      apikey: TEST_CONFIG.apiKey
    })
  )
  
  // Test NFT checkout
  if (nftResult?.nftId) {
    await testEndpoint(
      'NFT Checkout',
      '/core/nft/checkout',
      'POST',
      () => client.checkoutNFT({
        nftId: nftResult.nftId,
        buyerAddress: 'test_buyer_address',
        reservationDuration: 30,
        clientId: client.generateClientId(),
        apikey: TEST_CONFIG.apiKey
      })
    )
  }
  
  // Test escrow bundling
  if (assetResult?.coinId) {
    await testEndpoint(
      'Escrow Bundle',
      '/core/escrow/bundle',
      'POST',
      () => client.bundleEscrow({
        tokensCoinId: assetResult.coinId,
        tokensAmount: 100,
        clientId: client.generateClientId(),
        apikey: TEST_CONFIG.apiKey
      })
    )
  }
  
  // Test direct transaction sending
  if (assetResult?.coinId) {
    await testEndpoint(
      'Send Transaction',
      '/core/transactions/send',
      'POST',
      () => client.sendTransaction({
        coinId: assetResult.coinId,
        amount: 10,
        to: 'test_recipient_address',
        clientId: client.generateClientId(),
        checksum: client.generateChecksum({ test: 'data' }),
        apikey: TEST_CONFIG.apiKey
      })
    )
  }
  
  log('\n📊 TEST RESULTS SUMMARY')
  log('=' .repeat(50))
  
  const passed = results.filter(r => r.status === 'PASS').length
  const failed = results.filter(r => r.status === 'FAIL').length
  const errors = results.filter(r => r.status === 'ERROR').length
  
  log(`Total tests: ${results.length}`)
  log(`✅ Passed: ${passed}`)
  log(`❌ Failed: ${failed}`) 
  log(`⚠️  Errors: ${errors}`)
  
  log('\n📋 DETAILED RESULTS')
  log('=' .repeat(50))
  
  const categories = {
    'Authentication': results.filter(r => r.endpoint.startsWith('/auth')),
    'Core Features': results.filter(r => r.endpoint.startsWith('/core') && !r.endpoint.includes('/nft') && !r.endpoint.includes('/escrow')),
    'NFT Features': results.filter(r => r.endpoint.includes('/nft')),
    'Escrow Features': results.filter(r => r.endpoint.includes('/escrow')),
    'Other': results.filter(r => !r.endpoint.startsWith('/auth') && !r.endpoint.startsWith('/core'))
  }
  
  for (const [category, categoryResults] of Object.entries(categories)) {
    if (categoryResults.length > 0) {
      log(`\n${category}:`)
      categoryResults.forEach(result => {
        const emoji = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️'
        log(`  ${emoji} ${result.method} ${result.endpoint} - ${result.message}`)
      })
    }
  }
  
  log('\n🔍 RECOMMENDATIONS')
  log('=' .repeat(50))
  
  if (passed === 0) {
    log('❌ No endpoints are working. Check:')
    log('   - Network connectivity')
    log('   - API key validity') 
    log('   - Base URL correctness')
  } else if (categories['Authentication'].every(r => r.status === 'PASS')) {
    log('✅ Authentication is working - you can build user login/registration')
    
    if (categories['Core Features'].some(r => r.status === 'PASS')) {
      log('✅ Basic features work - you can build token creation and balance checking')
    }
    
    if (categories['NFT Features'].length === 0 || categories['NFT Features'].every(r => r.status !== 'PASS')) {
      log('⚠️  NFT features may not be available - consider using basic tokens for marketplace')
    }
    
    if (categories['Escrow Features'].length === 0 || categories['Escrow Features'].every(r => r.status !== 'PASS')) {
      log('⚠️  Built-in escrow may not be available - you may need to build custom escrow logic')
    }
  } else {
    log('⚠️  Authentication issues detected - may need different auth approach')
  }
  
  log('\n✨ DevVe API validation complete!')
}

// Run the validation
main().catch(console.error)