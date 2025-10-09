export interface DevveAuthResponse {
  accessToken: string
  refreshToken: string
  idToken: string
  expiresIn: number
}

export interface DevveUser {
  userId: string
  username: string
  email: string
  walletAddress: string
}

export interface DevveTransaction {
  transactionId: string
  status: 'PENDING' | 'CONFIRMED' | 'FAILED'
  blockHeight?: number
  timestamp: string
}

export interface DevveAsset {
  coinId: string
  amount: number
  properties?: Record<string, unknown>
}

export interface DevveNFT {
  nftId: string
  coinId: string
  metadata: {
    title: string
    description: string
    properties?: Record<string, unknown>
  }
  owner: string
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD'
}

export interface DevveEscrowBundle {
  bundleId: string
  nftId: string
  tokensCoinId: string
  tokensAmount: number
  status: 'ACTIVE' | 'RELEASED'
}

export interface DevveCheckout {
  checkoutId: string
  nftId: string
  buyerAddress: string
  reservedUntil: string
  status: 'RESERVED' | 'EXPIRED' | 'FULFILLED'
}

export interface CreateAssetRequest {
  name: string
  description: string
  properties?: Record<string, unknown>
  supply: number
  clientId: string
  apikey: string
}

export interface CreateNFTRequest {
  metadata: {
    title: string
    description: string
    properties?: Record<string, unknown>
  }
  clientId: string
  apikey: string
}

export interface CheckoutNFTRequest {
  nftId: string
  buyerAddress: string
  reservationDuration?: number // minutes
  clientId: string
  apikey: string
}

export interface BundleEscrowRequest {
  tokensCoinId: string
  tokensAmount: number
  clientId: string
  apikey: string
}

export interface UnbundleEscrowRequest {
  bundleId: string
  clientId: string
  apikey: string
}

export interface FulfillNFTRequest {
  checkoutId: string
  bundleId?: string
  clientId: string
  apikey: string
}

export interface SendTransactionRequest {
  coinId: string
  amount: number
  to: string
  clientId: string
  checksum: string
  apikey: string
  properties?: Record<string, unknown>
}

export interface TransactionStatusRequest {
  receiptUris: string[]
  apikey: string
}

export interface WalletBalanceRequest {
  walletAddress: string
  apikey: string
}

export interface DevveClientConfig {
  baseUrl: string
  apiKey: string
  testMode?: boolean
}

export interface DevveClient {
  // Auth
  register(request: {
    username: string
    email: string
    fullName: string
    password: string
    phone?: string
  }): Promise<DevveAuthResponse>

  login(request: {
    usernameOrEmail: string
    password: string
  }): Promise<DevveAuthResponse>

  refreshToken(refreshToken: string): Promise<DevveAuthResponse>

  // Assets & NFTs
  createAsset(request: CreateAssetRequest): Promise<{ coinId: string; transactionId: string }>
  createNFT(request: CreateNFTRequest): Promise<{ nftId: string; transactionId: string }>
  
  // Escrow Operations
  checkoutNFT(request: CheckoutNFTRequest): Promise<DevveCheckout>
  bundleEscrow(request: BundleEscrowRequest): Promise<DevveEscrowBundle>
  unbundleEscrow(request: UnbundleEscrowRequest): Promise<DevveTransaction>
  fulfillNFT(request: FulfillNFTRequest): Promise<DevveTransaction>

  // Wallet & Transactions
  sendTransaction(request: SendTransactionRequest): Promise<DevveTransaction>
  getTransactionStatus(request: TransactionStatusRequest): Promise<DevveTransaction[]>
  getWalletBalance(request: WalletBalanceRequest): Promise<DevveAsset[]>

  // Utilities
  generateClientId(): string
  generateChecksum(data: unknown): string
}

