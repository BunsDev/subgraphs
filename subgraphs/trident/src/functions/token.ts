import { Address, BigInt } from '@graphprotocol/graph-ts'
import { BIG_DECIMAL_ZERO, BIG_INT_ONE, BIG_INT_ZERO, PairType } from '../constants'
import { ERC20 } from '../../generated/MasterDeployer/ERC20'
import { NameBytes32 } from '../../generated/MasterDeployer/NameBytes32'
import { SymbolBytes32 } from '../../generated/MasterDeployer/SymbolBytes32'
import { Token, _FactoryToken } from '../../generated/schema'
import { createTokenPrice } from './token-price'
import { getOrCreateFactory } from './factory'



export function getOrCreateToken(id: string, type: string = PairType.ALL, isCalledFromPairCreation: boolean = false): Token {
  let token = Token.load(id)

  if (token === null) {
    token = new Token(id)
    createTokenPrice(id)

    const contract = ERC20.bind(Address.fromString(id))

    const decimals = getTokenDecimals(contract)
    const name = getTokenName(contract)
    const symbol = getTokenSymbol(contract)
    token.price = id
    token.name = name.value
    token.nameSuccess = name.success
    token.symbol = symbol.value
    token.symbolSuccess = symbol.success
    token.decimals = decimals.value
    token.decimalsSuccess = decimals.success
    token.price = id
    token.rebase = id

    token.liquidity = BIG_INT_ZERO
    token.liquidityNative = BIG_DECIMAL_ZERO
    token.liquidityUSD = BIG_DECIMAL_ZERO
    token.volume = BIG_DECIMAL_ZERO
    token.volumeNative = BIG_DECIMAL_ZERO
    token.volumeUSD = BIG_DECIMAL_ZERO
    token.feesNative = BIG_DECIMAL_ZERO
    token.feesUSD = BIG_DECIMAL_ZERO
    token.txCount = BIG_INT_ZERO
    token.pairCount = BIG_INT_ZERO

    token.save()

    // const globalFactory = getOrCreateFactory(PairType.ALL)
    // globalFactory.tokenCount = globalFactory.tokenCount.plus(BIG_INT_ONE)
    // globalFactory.save()
  }

  if (isCalledFromPairCreation) {
    let factoryToken = _FactoryToken.load(type.concat(":").concat(id))
    if (factoryToken === null) {
      factoryToken = new _FactoryToken(type.concat(":").concat(id))
      factoryToken.save()

      const factory = getOrCreateFactory(type)
      factory.tokenCount = factory.tokenCount.plus(BIG_INT_ONE)
      factory.save()
    }

    let globalFactoryToken = _FactoryToken.load(PairType.ALL.concat(":").concat(id))
    if (globalFactoryToken === null) {
      globalFactoryToken = new _FactoryToken(PairType.ALL.concat(":").concat(id))
      globalFactoryToken.save()

      const globalFactory = getOrCreateFactory(PairType.ALL)
      globalFactory.tokenCount = globalFactory.tokenCount.plus(BIG_INT_ONE)
      globalFactory.save()
    }

  }

  return token as Token
}

class Symbol {
  success: boolean
  value: string
}

function getTokenSymbol(contract: ERC20): Symbol {
  const symbol = contract.try_symbol()
  if (!symbol.reverted) {
    return { success: true, value: symbol.value.toString() }
  }

  const symbolBytes32Contract = SymbolBytes32.bind(contract._address)

  const symbolBytes32 = symbolBytes32Contract.try_symbol()

  if (
    !symbolBytes32.reverted &&
    symbolBytes32.value.toHex() != '0x0000000000000000000000000000000000000000000000000000000000000001'
  ) {
    return { success: true, value: symbolBytes32.value.toString() }
  }

  return { success: false, value: '???' }
}

class Name {
  success: boolean
  value: string
}

function getTokenName(contract: ERC20): Name {
  const name = contract.try_name()

  if (!name.reverted) {
    return { success: true, value: name.value.toString() }
  }

  const nameBytes32Contract = NameBytes32.bind(contract._address)

  const nameBytes32 = nameBytes32Contract.try_name()

  if (
    !nameBytes32.reverted &&
    nameBytes32.value.toHex() != '0x0000000000000000000000000000000000000000000000000000000000000001'
  ) {
    return { success: true, value: nameBytes32.value.toString() }
  }

  return { success: false, value: '???' }
}

class Decimal {
  success: boolean
  value: BigInt
}

function getTokenDecimals(contract: ERC20): Decimal {
  const decimals = contract.try_decimals()

  if (!decimals.reverted) {
    return { success: true, value: BigInt.fromI32(decimals.value) }
  }

  return { success: false, value: BigInt.fromI32(18) }
}

const BLACKLIST_EXCHANGE_VOLUME: string[] = [
  '0x9ea3b5b4ec044b70375236a281986106457b20ef', // DELTA
]

export function isBlacklistedToken(token: string): boolean {
  return BLACKLIST_EXCHANGE_VOLUME.includes(token)
}