"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Royal Vault Crypto Wallet System
export interface CryptoWallet {
  walletId: string
  name: string
  type: "hot" | "cold" | "hardware" | "multisig"
  address: string
  publicKey: string
  encryptedPrivateKey: string
  seedPhrase?: string
  derivationPath: string
  network: "mainnet" | "testnet"

  // Balances
  balances: Record<string, CryptoBalance>
  totalValueUSD: number

  // Security
  isLocked: boolean
  lastUnlocked: Date
  securityLevel: "basic" | "enhanced" | "maximum"

  // Metadata
  createdAt: Date
  lastActivity: Date
  isActive: boolean
  tags: string[]
}

export interface CryptoBalance {
  symbol: string
  name: string
  amount: number
  valueUSD: number
  change24h: number
  contractAddress?: string
  decimals: number
  logoUrl: string
}

export interface CryptoTransaction {
  txId: string
  walletId: string
  type: "send" | "receive" | "swap" | "stake" | "unstake" | "approve"
  status: "pending" | "confirmed" | "failed" | "cancelled"

  // Transaction details
  fromAddress: string
  toAddress: string
  amount: number
  symbol: string
  valueUSD: number

  // Network details
  network: string
  blockNumber?: number
  gasUsed?: number
  gasFee: number
  gasPrice: number

  // Timestamps
  timestamp: Date
  confirmedAt?: Date

  // Metadata
  hash: string
  memo?: string
  tags: string[]
}

export interface CryptoCurrency {
  symbol: string
  name: string
  logoUrl: string
  currentPrice: number
  marketCap: number
  volume24h: number
  change24h: number
  change7d: number
  rank: number
  contractAddress?: string
  decimals: number
  network: string
}

export interface WalletPortfolio {
  totalValueUSD: number
  totalChange24h: number
  totalChangePercent24h: number

  // Asset allocation
  topAssets: {
    symbol: string
    name: string
    value: number
    percentage: number
    change24h: number
  }[]

  // Performance
  performance: {
    period: "24h" | "7d" | "30d" | "1y"
    value: number
    change: number
    changePercent: number
  }[]

  // Diversification
  diversification: {
    category: string
    value: number
    percentage: number
  }[]
}

export interface StakingPosition {
  positionId: string
  walletId: string
  protocol: string
  asset: string
  amount: number
  valueUSD: number
  apy: number
  rewards: number
  rewardsUSD: number
  startDate: Date
  lockPeriod?: number
  unlockDate?: Date
  status: "active" | "unstaking" | "completed"
}

export interface DeFiPosition {
  positionId: string
  walletId: string
  protocol: string
  type: "lending" | "borrowing" | "liquidity" | "farming" | "vault"

  // Assets
  suppliedAssets: {
    symbol: string
    amount: number
    valueUSD: number
  }[]

  borrowedAssets: {
    symbol: string
    amount: number
    valueUSD: number
  }[]

  // Metrics
  netValue: number
  healthFactor?: number
  apy: number
  rewards: number
  rewardsUSD: number

  // Status
  status: "active" | "liquidated" | "closed"
  createdAt: Date
  lastUpdated: Date
}

export interface NFTAsset {
  tokenId: string
  contractAddress: string
  name: string
  description: string
  imageUrl: string
  collection: string

  // Metadata
  attributes: {
    trait_type: string
    value: string
    rarity?: number
  }[]

  // Value
  floorPrice: number
  lastSalePrice?: number
  estimatedValue: number

  // Ownership
  walletId: string
  acquiredAt: Date
  acquiredPrice?: number
}

export interface WalletSecurity {
  // Authentication
  passwordHash: string
  biometricEnabled: boolean
  twoFactorEnabled: boolean

  // Backup
  seedPhraseBackedUp: boolean
  backupDate?: Date
  recoveryQuestions?: {
    question: string
    answerHash: string
  }[]

  // Monitoring
  suspiciousActivity: {
    timestamp: Date
    type: string
    description: string
    severity: "low" | "medium" | "high"
  }[]

  // Settings
  autoLockTimeout: number
  requirePasswordForTransactions: boolean
  maxTransactionAmount: number
  whitelistedAddresses: string[]
}

// Royal Vault Context
interface RoyalVaultContextType {
  // Wallet Management
  wallets: Record<string, CryptoWallet>
  activeWallet: CryptoWallet | null
  createWallet: (name: string, type: CryptoWallet["type"]) => Promise<CryptoWallet>
  importWallet: (seedPhrase: string, name: string) => Promise<CryptoWallet>
  setActiveWallet: (walletId: string) => void
  deleteWallet: (walletId: string) => Promise<void>

  // Security
  unlockWallet: (walletId: string, password: string) => Promise<boolean>
  lockWallet: (walletId: string) => void
  changePassword: (walletId: string, oldPassword: string, newPassword: string) => Promise<boolean>

  // Transactions
  sendTransaction: (params: SendTransactionParams) => Promise<CryptoTransaction>
  getTransactionHistory: (walletId: string, filters?: TransactionFilters) => CryptoTransaction[]
  estimateGas: (params: EstimateGasParams) => Promise<GasEstimate>

  // Portfolio
  getPortfolio: (walletId: string) => Promise<WalletPortfolio>
  refreshBalances: (walletId: string) => Promise<void>

  // Market Data
  getCurrencies: () => CryptoCurrency[]
  getCurrencyPrice: (symbol: string) => Promise<number>

  // DeFi & Staking
  stakingPositions: Record<string, StakingPosition[]>
  defiPositions: Record<string, DeFiPosition[]>
  nftAssets: Record<string, NFTAsset[]>

  // Analytics
  getWalletAnalytics: (walletId: string) => Promise<WalletAnalytics>

  // Settings
  settings: WalletSettings
  updateSettings: (settings: Partial<WalletSettings>) => void
}

export interface SendTransactionParams {
  walletId: string
  toAddress: string
  amount: number
  symbol: string
  gasPrice?: number
  gasLimit?: number
  memo?: string
}

export interface TransactionFilters {
  type?: string[]
  status?: string[]
  symbol?: string[]
  dateRange?: { from: Date; to: Date }
  amountRange?: { min: number; max: number }
}

export interface EstimateGasParams {
  from: string
  to: string
  amount: number
  symbol: string
}

export interface GasEstimate {
  gasLimit: number
  gasPrice: number
  gasFee: number
  gasFeeUSD: number
  estimatedTime: number
}

export interface WalletAnalytics {
  totalValue: number
  totalChange24h: number
  totalTransactions: number

  // Performance
  performance: {
    period: string
    value: number
    change: number
    changePercent: number
  }[]

  // Activity
  transactionVolume: {
    period: string
    volume: number
    count: number
  }[]

  // Asset allocation
  assetAllocation: {
    symbol: string
    value: number
    percentage: number
  }[]

  // Risk metrics
  riskMetrics: {
    volatility: number
    sharpeRatio: number
    maxDrawdown: number
    beta: number
  }
}

export interface WalletSettings {
  defaultNetwork: string
  defaultGasPrice: "slow" | "standard" | "fast"
  autoRefreshInterval: number
  showTestnets: boolean
  hideSmallBalances: boolean
  smallBalanceThreshold: number
  preferredCurrency: "USD" | "EUR" | "GBP" | "BTC" | "ETH"
  notifications: {
    transactions: boolean
    priceAlerts: boolean
    securityAlerts: boolean
    stakingRewards: boolean
  }
}

const RoyalVaultContext = createContext<RoyalVaultContextType | undefined>(undefined)

export const useRoyalVault = () => {
  const context = useContext(RoyalVaultContext)
  if (!context) {
    throw new Error("useRoyalVault must be used within a RoyalVaultProvider")
  }
  return context
}

// Sample data
const sampleCurrencies: CryptoCurrency[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    logoUrl: "/crypto/bitcoin.png",
    currentPrice: 43250.0,
    marketCap: 847000000000,
    volume24h: 15200000000,
    change24h: 2.45,
    change7d: -1.23,
    rank: 1,
    decimals: 8,
    network: "bitcoin",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logoUrl: "/crypto/ethereum.png",
    currentPrice: 2650.0,
    marketCap: 318000000000,
    volume24h: 8900000000,
    change24h: 3.21,
    change7d: 5.67,
    rank: 2,
    decimals: 18,
    network: "ethereum",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logoUrl: "/crypto/usdc.png",
    currentPrice: 1.0,
    marketCap: 25000000000,
    volume24h: 3200000000,
    change24h: 0.01,
    change7d: -0.02,
    rank: 5,
    contractAddress: "0xA0b86a33E6441b8435b662303c0f6a8c5c5c8c5c",
    decimals: 6,
    network: "ethereum",
  },
]

const sampleWallets: Record<string, CryptoWallet> = {
  wallet_001: {
    walletId: "wallet_001",
    name: "Royal Treasury",
    type: "hot",
    address: "0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4",
    publicKey: "0x04...",
    encryptedPrivateKey: "encrypted_key_data",
    derivationPath: "m/44'/60'/0'/0/0",
    network: "mainnet",
    balances: {
      BTC: {
        symbol: "BTC",
        name: "Bitcoin",
        amount: 2.5,
        valueUSD: 108125.0,
        change24h: 2.45,
        decimals: 8,
        logoUrl: "/crypto/bitcoin.png",
      },
      ETH: {
        symbol: "ETH",
        name: "Ethereum",
        amount: 15.75,
        valueUSD: 41737.5,
        change24h: 3.21,
        decimals: 18,
        logoUrl: "/crypto/ethereum.png",
      },
      USDC: {
        symbol: "USDC",
        name: "USD Coin",
        amount: 25000,
        valueUSD: 25000.0,
        change24h: 0.01,
        contractAddress: "0xA0b86a33E6441b8435b662303c0f6a8c5c5c8c5c",
        decimals: 6,
        logoUrl: "/crypto/usdc.png",
      },
    },
    totalValueUSD: 174862.5,
    isLocked: false,
    lastUnlocked: new Date(),
    securityLevel: "enhanced",
    createdAt: new Date(2024, 0, 15),
    lastActivity: new Date(),
    isActive: true,
    tags: ["main", "trading"],
  },
}

export const RoyalVaultProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, CryptoWallet>>(sampleWallets)
  const [activeWallet, setActiveWalletState] = useState<CryptoWallet | null>(sampleWallets.wallet_001)
  const [stakingPositions, setStakingPositions] = useState<Record<string, StakingPosition[]>>({})
  const [defiPositions, setDefiPositions] = useState<Record<string, DeFiPosition[]>>({})
  const [nftAssets, setNftAssets] = useState<Record<string, NFTAsset[]>>({})
  const [settings, setSettings] = useState<WalletSettings>({
    defaultNetwork: "ethereum",
    defaultGasPrice: "standard",
    autoRefreshInterval: 30000,
    showTestnets: false,
    hideSmallBalances: true,
    smallBalanceThreshold: 1,
    preferredCurrency: "USD",
    notifications: {
      transactions: true,
      priceAlerts: true,
      securityAlerts: true,
      stakingRewards: true,
    },
  })

  const createWallet = async (name: string, type: CryptoWallet["type"]): Promise<CryptoWallet> => {
    const walletId = `wallet_${Date.now()}`

    // Generate new wallet (mock implementation)
    const newWallet: CryptoWallet = {
      walletId,
      name,
      type,
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      publicKey: `0x04${Math.random().toString(16).substr(2, 128)}`,
      encryptedPrivateKey: "encrypted_private_key_data",
      derivationPath: "m/44'/60'/0'/0/0",
      network: "mainnet",
      balances: {},
      totalValueUSD: 0,
      isLocked: false,
      lastUnlocked: new Date(),
      securityLevel: "basic",
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
      tags: [],
    }

    setWallets((prev) => ({
      ...prev,
      [walletId]: newWallet,
    }))

    return newWallet
  }

  const importWallet = async (seedPhrase: string, name: string): Promise<CryptoWallet> => {
    // Validate seed phrase and derive wallet (mock implementation)
    const walletId = `wallet_${Date.now()}`

    const importedWallet: CryptoWallet = {
      walletId,
      name,
      type: "hot",
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      publicKey: `0x04${Math.random().toString(16).substr(2, 128)}`,
      encryptedPrivateKey: "encrypted_private_key_data",
      seedPhrase: seedPhrase,
      derivationPath: "m/44'/60'/0'/0/0",
      network: "mainnet",
      balances: {},
      totalValueUSD: 0,
      isLocked: false,
      lastUnlocked: new Date(),
      securityLevel: "basic",
      createdAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
      tags: ["imported"],
    }

    setWallets((prev) => ({
      ...prev,
      [walletId]: importedWallet,
    }))

    return importedWallet
  }

  const setActiveWallet = (walletId: string) => {
    const wallet = wallets[walletId]
    if (wallet) {
      setActiveWalletState(wallet)
    }
  }

  const deleteWallet = async (walletId: string): Promise<void> => {
    setWallets((prev) => {
      const newWallets = { ...prev }
      delete newWallets[walletId]
      return newWallets
    })

    if (activeWallet?.walletId === walletId) {
      const remainingWallets = Object.values(wallets).filter((w) => w.walletId !== walletId)
      setActiveWalletState(remainingWallets[0] || null)
    }
  }

  const unlockWallet = async (walletId: string, password: string): Promise<boolean> => {
    // Verify password and unlock wallet (mock implementation)
    setWallets((prev) => ({
      ...prev,
      [walletId]: {
        ...prev[walletId],
        isLocked: false,
        lastUnlocked: new Date(),
      },
    }))
    return true
  }

  const lockWallet = (walletId: string) => {
    setWallets((prev) => ({
      ...prev,
      [walletId]: {
        ...prev[walletId],
        isLocked: true,
      },
    }))
  }

  const changePassword = async (walletId: string, oldPassword: string, newPassword: string): Promise<boolean> => {
    // Verify old password and update (mock implementation)
    return true
  }

  const sendTransaction = async (params: SendTransactionParams): Promise<CryptoTransaction> => {
    const txId = `tx_${Date.now()}`

    const transaction: CryptoTransaction = {
      txId,
      walletId: params.walletId,
      type: "send",
      status: "pending",
      fromAddress: wallets[params.walletId].address,
      toAddress: params.toAddress,
      amount: params.amount,
      symbol: params.symbol,
      valueUSD: params.amount * (getCurrencyPrice(params.symbol) || 0),
      network: "ethereum",
      gasUsed: 21000,
      gasFee: 0.002,
      gasPrice: params.gasPrice || 20,
      timestamp: new Date(),
      hash: `0x${Math.random().toString(16).substr(2, 64)}`,
      memo: params.memo,
      tags: [],
    }

    // Update wallet balance (mock)
    setWallets((prev) => ({
      ...prev,
      [params.walletId]: {
        ...prev[params.walletId],
        balances: {
          ...prev[params.walletId].balances,
          [params.symbol]: {
            ...prev[params.walletId].balances[params.symbol],
            amount: prev[params.walletId].balances[params.symbol].amount - params.amount,
          },
        },
      },
    }))

    return transaction
  }

  const getTransactionHistory = (walletId: string, filters?: TransactionFilters): CryptoTransaction[] => {
    // Mock transaction history
    return []
  }

  const estimateGas = async (params: EstimateGasParams): Promise<GasEstimate> => {
    return {
      gasLimit: 21000,
      gasPrice: 20,
      gasFee: 0.002,
      gasFeeUSD: 5.3,
      estimatedTime: 60,
    }
  }

  const getPortfolio = async (walletId: string): Promise<WalletPortfolio> => {
    const wallet = wallets[walletId]
    if (!wallet) throw new Error("Wallet not found")

    const topAssets = Object.values(wallet.balances)
      .map((balance) => ({
        symbol: balance.symbol,
        name: balance.name,
        value: balance.valueUSD,
        percentage: (balance.valueUSD / wallet.totalValueUSD) * 100,
        change24h: balance.change24h,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    return {
      totalValueUSD: wallet.totalValueUSD,
      totalChange24h: 2450.75,
      totalChangePercent24h: 1.42,
      topAssets,
      performance: [
        { period: "24h", value: wallet.totalValueUSD, change: 2450.75, changePercent: 1.42 },
        { period: "7d", value: wallet.totalValueUSD, change: -1250.3, changePercent: -0.71 },
        { period: "30d", value: wallet.totalValueUSD, change: 15420.8, changePercent: 9.67 },
        { period: "1y", value: wallet.totalValueUSD, change: 85230.45, changePercent: 95.23 },
      ],
      diversification: [
        { category: "Bitcoin", value: 108125.0, percentage: 61.85 },
        { category: "Ethereum", value: 41737.5, percentage: 23.87 },
        { category: "Stablecoins", value: 25000.0, percentage: 14.28 },
      ],
    }
  }

  const refreshBalances = async (walletId: string): Promise<void> => {
    // Refresh balances from blockchain (mock implementation)
    console.log(`Refreshing balances for wallet ${walletId}`)
  }

  const getCurrencies = (): CryptoCurrency[] => {
    return sampleCurrencies
  }

  const getCurrencyPrice = async (symbol: string): Promise<number> => {
    const currency = sampleCurrencies.find((c) => c.symbol === symbol)
    return currency?.currentPrice || 0
  }

  const getWalletAnalytics = async (walletId: string): Promise<WalletAnalytics> => {
    const wallet = wallets[walletId]
    if (!wallet) throw new Error("Wallet not found")

    return {
      totalValue: wallet.totalValueUSD,
      totalChange24h: 2450.75,
      totalTransactions: 156,
      performance: [
        { period: "24h", value: wallet.totalValueUSD, change: 2450.75, changePercent: 1.42 },
        { period: "7d", value: wallet.totalValueUSD, change: -1250.3, changePercent: -0.71 },
        { period: "30d", value: wallet.totalValueUSD, change: 15420.8, changePercent: 9.67 },
      ],
      transactionVolume: [
        { period: "24h", volume: 15420.5, count: 8 },
        { period: "7d", volume: 89230.75, count: 42 },
        { period: "30d", volume: 234560.25, count: 156 },
      ],
      assetAllocation: Object.values(wallet.balances).map((balance) => ({
        symbol: balance.symbol,
        value: balance.valueUSD,
        percentage: (balance.valueUSD / wallet.totalValueUSD) * 100,
      })),
      riskMetrics: {
        volatility: 0.65,
        sharpeRatio: 1.23,
        maxDrawdown: -0.18,
        beta: 0.85,
      },
    }
  }

  const updateSettings = (newSettings: Partial<WalletSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  return (
    <RoyalVaultContext.Provider
      value={{
        wallets,
        activeWallet,
        createWallet,
        importWallet,
        setActiveWallet,
        deleteWallet,
        unlockWallet,
        lockWallet,
        changePassword,
        sendTransaction,
        getTransactionHistory,
        estimateGas,
        getPortfolio,
        refreshBalances,
        getCurrencies,
        getCurrencyPrice,
        stakingPositions,
        defiPositions,
        nftAssets,
        getWalletAnalytics,
        settings,
        updateSettings,
      }}
    >
      {children}
    </RoyalVaultContext.Provider>
  )
}
