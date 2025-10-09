import { DevveClient, DevveClientConfig } from './types'
import { HttpDevveClient } from './client'
import { MockDevveClient } from './mock'

export * from './types'
export * from './client'
export * from './mock'

export function createDevveClient(config?: DevveClientConfig): DevveClient {
  const useMock = process.env.DEVVE_USE_MOCK === 'true'
  
  if (useMock) {
    return new MockDevveClient()
  }

  if (!config) {
    const baseUrl = process.env.DEVVE_BASE_URL || 'https://devve.testnet.devvio.com'
    const apiKey = process.env.DEVVE_API_KEY || '8f4f6afa-372f-4488-b62e-2faf3a2b51cf' // Test key from docs
    
    config = {
      baseUrl,
      apiKey,
      testMode: true
    }
  }

  return new HttpDevveClient(config)
}

export const devveClient = createDevveClient()