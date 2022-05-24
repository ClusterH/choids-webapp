export const BASE_IPFS_URL = 'https://ipfs.io/ipfs/'

export const SIGNATURE_RELAY_API_URL = 'https://us-central1-patchwork-canteen.cloudfunctions.net/app/signature'

export const API_URL =
  process.env.REACT_APP_ENVIRONMENT === 'prod'
    ? 'https://ura-creator-backend-prod-iw2xtmvktq-uc.a.run.app/'
    : 'https://ura-creator-backend-dev-iw2xtmvktq-uc.a.run.app/'

export const OPENSEA_LINK = {}
