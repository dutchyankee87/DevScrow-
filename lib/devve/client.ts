import { DevveClient, DevveClientConfig, DevveAuthResponse, DevveTransaction, DevveAsset, DevveNFT, DevveCheckout, DevveEscrowBundle, CreateAssetRequest, CreateNFTRequest, CheckoutNFTRequest, BundleEscrowRequest, UnbundleEscrowRequest, FulfillNFTRequest, SendTransactionRequest, TransactionStatusRequest, WalletBalanceRequest } from './types'
import { createHash, randomUUID } from 'crypto'

export class HttpDevveClient implements DevveClient {
  private config: DevveClientConfig
  private accessToken?: string

  constructor(config: DevveClientConfig) {
    this.config = config
  }

  async register(request: {
    username: string
    email: string
    fullName: string
    password: string
    phone?: string
  }): Promise<DevveAuthResponse> {
    const response = await this.makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: request.username,
        email: request.email,
        fullName: request.fullName,
        password: request.password,
        phone: request.phone,
        apikey: this.config.apiKey
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Registration failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    this.accessToken = data.accessToken
    return data
  }

  async login(request: {
    usernameOrEmail: string
    password: string
  }): Promise<DevveAuthResponse> {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        usernameOrEmail: request.usernameOrEmail,
        password: request.password,
        apikey: this.config.apiKey
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Login failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    this.accessToken = data.accessToken
    return data
  }

  async refreshToken(refreshToken: string): Promise<DevveAuthResponse> {
    const response = await this.makeRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refreshToken,
        apikey: this.config.apiKey
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Token refresh failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    this.accessToken = data.accessToken
    return data
  }

  async createAsset(request: CreateAssetRequest): Promise<{ coinId: string; transactionId: string }> {
    const response = await this.makeRequest('/core/asset/create', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Asset creation failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      coinId: data.coinId,
      transactionId: data.transactionId
    }
  }

  async createNFT(request: CreateNFTRequest): Promise<{ nftId: string; transactionId: string }> {
    const response = await this.makeRequest('/core/nft/create', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`NFT creation failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      nftId: data.nftId,
      transactionId: data.transactionId
    }
  }

  async checkoutNFT(request: CheckoutNFTRequest): Promise<DevveCheckout> {
    const response = await this.makeRequest('/core/nft/checkout', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`NFT checkout failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      checkoutId: data.checkoutId,
      nftId: request.nftId,
      buyerAddress: request.buyerAddress,
      reservedUntil: data.reservedUntil,
      status: 'RESERVED'
    }
  }

  async bundleEscrow(request: BundleEscrowRequest): Promise<DevveEscrowBundle> {
    const response = await this.makeRequest('/core/escrow/bundle', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Escrow bundle failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      bundleId: data.bundleId,
      nftId: data.nftId,
      tokensCoinId: request.tokensCoinId,
      tokensAmount: request.tokensAmount,
      status: 'ACTIVE'
    }
  }

  async unbundleEscrow(request: UnbundleEscrowRequest): Promise<DevveTransaction> {
    const response = await this.makeRequest('/core/escrow/unbundle', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Escrow unbundle failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      transactionId: data.transactionId,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }
  }

  async fulfillNFT(request: FulfillNFTRequest): Promise<DevveTransaction> {
    const response = await this.makeRequest('/core/nft/fulfill', {
      method: 'POST',
      body: JSON.stringify({
        ...request,
        checksum: this.generateChecksum(request)
      })
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`NFT fulfillment failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      transactionId: data.transactionId,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }
  }

  async sendTransaction(request: SendTransactionRequest): Promise<DevveTransaction> {
    const response = await this.makeRequest('/core/transactions/send', {
      method: 'POST',
      body: JSON.stringify(request)
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Transaction failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return {
      transactionId: data.transactionId,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    }
  }

  async getTransactionStatus(request: TransactionStatusRequest): Promise<DevveTransaction[]> {
    const response = await this.makeRequest('/core/transactions/status', {
      method: 'POST',
      body: JSON.stringify(request)
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Status check failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return data.transactions?.map((tx: { transactionId: string; status: string; blockHeight?: number; timestamp: string }) => ({
      transactionId: tx.transactionId,
      status: tx.status,
      blockHeight: tx.blockHeight,
      timestamp: tx.timestamp
    })) || []
  }

  async getWalletBalance(request: WalletBalanceRequest): Promise<DevveAsset[]> {
    const response = await this.makeRequest('/core/wallet/balances', {
      method: 'POST',
      body: JSON.stringify(request)
    })

    const data = await response.json()
    if (data.code) {
      throw new DevveError(`Balance check failed: ${data.message || 'Unknown error'}`, { cause: data })
    }

    return data.balances?.map((balance: { coinId: string; amount: number; properties?: Record<string, unknown> }) => ({
      coinId: balance.coinId,
      amount: balance.amount,
      properties: balance.properties
    })) || []
  }

  generateClientId(): string {
    return randomUUID()
  }

  generateChecksum(data: unknown): string {
    if (typeof data === 'object' && data !== null) {
      const content = JSON.stringify(data, Object.keys(data as Record<string, unknown>).sort())
      return createHash('sha256').update(content).digest('hex')
    }
    const content = JSON.stringify(data)
    return createHash('sha256').update(content).digest('hex')
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.config.baseUrl}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    }

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new DevveError(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response
  }
}

export class DevveError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message)
    this.name = 'DevveError'
    if (options?.cause) {
      this.cause = options.cause
    }
  }
}