export const setTrans = trans => ({
    type: 'SET_TRANSACTIONS',
    trans
  })

export const addConfig = (key, priceConfig) => ({
  type: 'ADD_CONFIG',
  priceConfig,
  key
})

export const replaceConfig = (key, priceConfig) => ({
  type: 'REPLACE_CONFIG',
  priceConfig,
  key
})

export const addToHistory = (key, transactions) => ({
  type: 'ADD_TO_HISTORY',
  key,
  transactions
})

export const popHistory = () => ({
  type: 'POP_HISTORY'
})