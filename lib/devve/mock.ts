import { DevveClient, DevveAuthResponse, DevveTransaction, DevveAsset, DevveCheckout, DevveEscrowBundle, CreateAssetRequest, CreateNFTRequest, CheckoutNFTRequest, BundleEscrowRequest, UnbundleEscrowRequest, FulfillNFTRequest, SendTransactionRequest, TransactionStatusRequest, WalletBalanceRequest } from './types'
import { randomUUID } from 'crypto'

interface MockWallet {
  address: string
  assets: Record<string, number>
}

interface MockNFT {
  id: string
  coinId: string
  owner: string
  metadata: { title: string; description: string; properties?: Record<string, unknown> }
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD'
}

interface MockCheckout {
  id: string
  nftId: string
  buyerAddress: string
  reservedUntil: Date
  status: 'RESERVED' | 'EXPIRED' | 'FULFILLED'
}

interface MockBundle {
  id: string
  nftId: string
  tokensCoinId: string
  tokensAmount: number
  status: 'ACTIVE' | 'RELEASED'
}

export class MockDevveClient implements DevveClient {
  private users = new Map<string, { username: string; email: string; password: string; walletAddress: string }>()
  private wallets = new Map<string, MockWallet>()
  private nfts = new Map<string, MockNFT>()
  private checkouts = new Map<string, MockCheckout>()
  private bundles = new Map<string, MockBundle>()
  private transactions = new Map<string, DevveTransaction>()
  private currentUser?: string

  constructor() {
    // Create some test data
    this.createTestData()
  }

  private createTestData() {
    // Test coin for payments
    const testCoinId = '17293822569102704641'
    
    // Create test user wallets
    const testAddresses = [
      'devve_test_wallet_1',
      'devve_test_wallet_2', 
      'devve_test_wallet_3'
    ]

    testAddresses.forEach(address => {
      this.wallets.set(address, {
        address,
        assets: {
          [testCoinId]: 1000000 // 1M test coins
        }
      })
    })
  }

  async register(request: {
    username: string
    email: string
    fullName: string
    password: string
    phone?: string
  }): Promise<DevveAuthResponse> {
    if (this.users.has(request.username)) {
      throw new Error('Username already exists')
    }

    const walletAddress = `devve_wallet_${randomUUID()}`
    
    this.users.set(request.username, {
      username: request.username,
      email: request.email,
      password: request.password,
      walletAddress
    })

    this.wallets.set(walletAddress, {
      address: walletAddress,
      assets: {
        '17293822569102704641': 100000 // Start with 100k test coins
      }
    })

    this.currentUser = request.username

    return {
      accessToken: `mock_access_token_${randomUUID()}`,
      refreshToken: `mock_refresh_token_${randomUUID()}`,
      idToken: `mock_id_token_${randomUUID()}`,
      expiresIn: 3600
    }
  }

  async login(request: {
    usernameOrEmail: string
    password: string
  }): Promise<DevveAuthResponse> {
    const user = this.users.get(request.usernameOrEmail)
    if (!user || user.password !== request.password) {
      throw new Error('Invalid credentials')
    }

    this.currentUser = request.usernameOrEmail

    return {
      accessToken: `mock_access_token_${randomUUID()}`,
      refreshToken: `mock_refresh_token_${randomUUID()}`,
      idToken: `mock_id_token_${randomUUID()}`,
      expiresIn: 3600
    }
  }

  async refreshToken(refreshToken: string): Promise<DevveAuthResponse> {
    return {
      accessToken: `mock_access_token_${randomUUID()}`,
      refreshToken: `mock_refresh_token_${randomUUID()}`,
      idToken: `mock_id_token_${randomUUID()}`,
      expiresIn: 3600
    }
  }

  async createAsset(request: CreateAssetRequest): Promise<{ coinId: string; transactionId: string }> {
    const coinId = `coin_${randomUUID()}`
    const transactionId = `tx_${randomUUID()}`

    const transaction: DevveTransaction = {
      transactionId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString()
    }

    this.transactions.set(transactionId, transaction)

    // Add to current user's wallet
    if (this.currentUser) {
      const user = this.users.get(this.currentUser)
      if (user) {
        const wallet = this.wallets.get(user.walletAddress)
        if (wallet) {
          wallet.assets[coinId] = request.supply || 1
        }
      }
    }

    return { coinId, transactionId }
  }

  async createNFT(request: CreateNFTRequest): Promise<{ nftId: string; transactionId: string }> {
    const nftId = `nft_${randomUUID()}`
    const coinId = `coin_${randomUUID()}`
    const transactionId = `tx_${randomUUID()}`

    // Auto-authenticate in mock mode for convenience
    if (!this.currentUser) {
      // Create a temporary user for this operation
      const tempUsername = `mock_user_${randomUUID()}`
      const walletAddress = `devve_wallet_${randomUUID()}`
      
      this.users.set(tempUsername, {
        username: tempUsername,
        email: `${tempUsername}@mock.com`,
        password: 'mock_password',
        walletAddress
      })

      this.wallets.set(walletAddress, {
        address: walletAddress,
        assets: {
          '17293822569102704641': 100000 // Start with 100k test coins
        }
      })

      this.currentUser = tempUsername
    }

    const user = this.users.get(this.currentUser)!

    const nft: MockNFT = {
      id: nftId,
      coinId,
      owner: user.walletAddress,
      metadata: request.metadata,
      status: 'AVAILABLE'
    }

    this.nfts.set(nftId, nft)

    const transaction: DevveTransaction = {
      transactionId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString()
    }

    this.transactions.set(transactionId, transaction)

    return { nftId, transactionId }
  }

  async checkoutNFT(request: CheckoutNFTRequest): Promise<DevveCheckout> {
    const nft = this.nfts.get(request.nftId)
    if (!nft) {
      throw new Error('NFT not found')
    }

    if (nft.status !== 'AVAILABLE') {
      throw new Error('NFT not available for checkout')
    }

    const checkoutId = `checkout_${randomUUID()}`
    const reservedUntil = new Date()
    reservedUntil.setMinutes(reservedUntil.getMinutes() + (request.reservationDuration || 30))

    const checkout: MockCheckout = {
      id: checkoutId,
      nftId: request.nftId,
      buyerAddress: request.buyerAddress,
      reservedUntil,
      status: 'RESERVED'
    }

    this.checkouts.set(checkoutId, checkout)
    nft.status = 'RESERVED'

    return {
      checkoutId,
      nftId: request.nftId,
      buyerAddress: request.buyerAddress,
      reservedUntil: reservedUntil.toISOString(),
      status: 'RESERVED'
    }
  }

  async bundleEscrow(request: BundleEscrowRequest): Promise<DevveEscrowBundle> {
    if (!this.currentUser) {
      throw new Error('Not authenticated')
    }

    const user = this.users.get(this.currentUser)!
    const wallet = this.wallets.get(user.walletAddress)!

    if (!wallet.assets[request.tokensCoinId] || wallet.assets[request.tokensCoinId] < request.tokensAmount) {
      throw new Error('Insufficient balance')
    }

    // Deduct tokens from wallet
    wallet.assets[request.tokensCoinId] -= request.tokensAmount

    const bundleId = `bundle_${randomUUID()}`
    const nftId = `escrow_nft_${randomUUID()}`

    const bundle: MockBundle = {
      id: bundleId,
      nftId,
      tokensCoinId: request.tokensCoinId,
      tokensAmount: request.tokensAmount,
      status: 'ACTIVE'
    }

    this.bundles.set(bundleId, bundle)

    return {
      bundleId,
      nftId,
      tokensCoinId: request.tokensCoinId,
      tokensAmount: request.tokensAmount,
      status: 'ACTIVE'
    }
  }

  async unbundleEscrow(request: UnbundleEscrowRequest): Promise<DevveTransaction> {
    const bundle = this.bundles.get(request.bundleId)
    if (!bundle) {
      throw new Error('Bundle not found')
    }

    if (bundle.status !== 'ACTIVE') {
      throw new Error('Bundle not active')
    }

    bundle.status = 'RELEASED'

    if (this.currentUser) {
      const user = this.users.get(this.currentUser)!
      const wallet = this.wallets.get(user.walletAddress)!
      
      if (!wallet.assets[bundle.tokensCoinId]) {
        wallet.assets[bundle.tokensCoinId] = 0
      }
      wallet.assets[bundle.tokensCoinId] += bundle.tokensAmount
    }

    const transactionId = `tx_${randomUUID()}`
    const transaction: DevveTransaction = {
      transactionId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString()
    }

    this.transactions.set(transactionId, transaction)

    return transaction
  }

  async fulfillNFT(request: FulfillNFTRequest): Promise<DevveTransaction> {
    const checkout = this.checkouts.get(request.checkoutId)
    if (!checkout) {
      throw new Error('Checkout not found')
    }

    if (checkout.status !== 'RESERVED') {
      throw new Error('Checkout not in reserved state')
    }

    const nft = this.nfts.get(checkout.nftId)!
    
    // Transfer NFT to buyer
    nft.owner = checkout.buyerAddress
    nft.status = 'SOLD'
    checkout.status = 'FULFILLED'

    // Release escrow if bundleId provided
    if (request.bundleId) {
      const bundle = this.bundles.get(request.bundleId)
      if (bundle) {
        bundle.status = 'RELEASED'
        
        // Find seller wallet and add payment
        const sellerWallet = this.wallets.get(nft.owner)
        if (sellerWallet) {
          if (!sellerWallet.assets[bundle.tokensCoinId]) {
            sellerWallet.assets[bundle.tokensCoinId] = 0
          }
          sellerWallet.assets[bundle.tokensCoinId] += bundle.tokensAmount
        }
      }
    }

    const transactionId = `tx_${randomUUID()}`
    const transaction: DevveTransaction = {
      transactionId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString()
    }

    this.transactions.set(transactionId, transaction)

    return transaction
  }

  async sendTransaction(request: SendTransactionRequest): Promise<DevveTransaction> {
    if (!this.currentUser) {
      throw new Error('Not authenticated')
    }

    const user = this.users.get(this.currentUser)!
    const fromWallet = this.wallets.get(user.walletAddress)!
    const toWallet = this.wallets.get(request.to)

    if (!fromWallet.assets[request.coinId] || fromWallet.assets[request.coinId] < request.amount) {
      throw new Error('Insufficient balance')
    }

    if (!toWallet) {
      throw new Error('Recipient wallet not found')
    }

    // Transfer assets
    fromWallet.assets[request.coinId] -= request.amount
    if (!toWallet.assets[request.coinId]) {
      toWallet.assets[request.coinId] = 0
    }
    toWallet.assets[request.coinId] += request.amount

    const transaction: DevveTransaction = {
      transactionId: request.clientId,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString()
    }

    this.transactions.set(request.clientId, transaction)

    return transaction
  }

  async getTransactionStatus(request: TransactionStatusRequest): Promise<DevveTransaction[]> {
    const results: DevveTransaction[] = []
    
    for (const uri of request.receiptUris) {
      const txId = uri.split('/').pop() || ''
      const transaction = this.transactions.get(txId)
      if (transaction) {
        results.push(transaction)
      }
    }

    return results
  }

  async getWalletBalance(request: WalletBalanceRequest): Promise<DevveAsset[]> {
    const wallet = this.wallets.get(request.walletAddress)
    if (!wallet) {
      return []
    }

    return Object.entries(wallet.assets).map(([coinId, amount]) => ({
      coinId,
      amount,
      properties: {}
    }))
  }

  generateClientId(): string {
    return randomUUID()
  }

  generateChecksum(data: unknown): string {
    return `mock_checksum_${randomUUID()}`
  }
}