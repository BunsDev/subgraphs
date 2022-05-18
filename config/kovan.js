module.exports = {
  network: 'kovan',
  native: { address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c' },
  sushi: { address: '0x0769fd68dfb93167989c6f7254cd0d766fb2841f', startBlock: 23647594 },
  weth: { address: '0xd0a1e359811322d97991e03f863a0c30c2cf029c' },
  wbtc: { address: '0xd3a691c852cdb01e281545a27064741f0b7f6825' },
  bentobox: { address: '0xc381a85ed7c7448da073b7d6c9d4cbf1cbf576f0', startBlock: 27205233 },
  masterDeployer: { address: '0x8e475036e47df445e7b83375158344916f606971', startBlock: 30331575 },
  concentratedLiquidityPoolFactory: { address: '0x0000000000000000000000000000000000000000' },
  constantProductPoolFactory: { address: '0x64115b851540a9fda206495cd22b01d8ddb39d69' },
  hybridPoolFactory: { address: '0x0000000000000000000000000000000000000000' },
  indexPoolFactory: { address: '0x0000000000000000000000000000000000000000' },
  whitelistedTokenAddresses: [
    // WETH
    '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    // USDC
    '0xb7a4f3e9097c08da09517b5ab877f7a917224ede',
    // USDT
    '0x07de306ff27a2b630b1141956844eb1552b956b5',
    // DAI
    '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
  ],
  stableTokenAddresses: [
    // USDC
    '0xb7a4f3e9097c08da09517b5ab877f7a917224ede',
    // USDT
    '0x07de306ff27a2b630b1141956844eb1552b956b5',
    // DAI
    '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
  ],
  // List of STABLE/NATIVE pools to use to price NATIVE in USD
  stablePoolAddresses: [
    // USDC/WETH
    '0x1877ab2b1befdfb76091e602497887af0c5604e0',
    // USDT/WETH
    '0x5ef5910bc0312b077ddcea111f7e46566977e498',
    // DAI/WETH
    '0x1d56ed2fe715d287fabd122423bac57126d6f1c9',
  ],
  miso: {
    accessControls: { address: '0x1B0449d235b02C1773f391f500dCC3f8EbEaEff9', startBlock: 29430407 },
    market: { address: '0x2a4E1AA493a1a31ACB5EAc419c809D69A2c62058', startBlock: 29836253 },
  },
  staking: { address: '0x1CeD9B90aa573849b42ADAC7204860823c290dAc', startBlock: 30184681 },
  legacy: {
    factory: {
      address: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
      startBlock: '23647588',
    },
  },
  furo: {
    stream: { address: '0xD178A02b5A31BC44C3e2CBf4bB252C7D03FAf3Fe', startBlock: 31672155 },
    vesting: { address: '0x00e9eb7743aa4a79a804363ae2afa308feff70c3', startBlock: 31658619 },
  },
  auctionMaker: { address: '0x0000000000000000000000000000000000000000', startBlock: 0 },
  staking: { address: '0x0000000000000000000000000000000000000000', startBlock: 0 },
  blocks: {
    address: '0x0000000000000000000000000000000000000000',
    startBlock: 0,
  },
}
