# FX-PORTAL-SCRIPTS

FX-PORTAL-SCRIPTS is a showcase consisting of sample scripts to perform operations on FX bridge like deposit, map, withdraw, withdrawExit, withdrawExitTo etc.
## Getting started
- Clone this repository
```sh
git clone https://github.com/integrations-Polygon/FX-PORTAL-SCRIPTS.git
```
- Navigate to `FX-PORTAL-SCRIPTS`
```sh
cd FX-PORTAL-SCRIPTS
```
- Install dependencies
```sh
npm install
```
- Create `.env` file
```sh
cp .example.env .env
```
- Configure environment variables in `.env`
```
PUBLIC_KEY=<public_key>
PRIVATE_KEY_POLYGON=<private_key_polygon>
PRIVATE_KEY_GOERLI=<private_key_goerli>
INFURA_PROJECT_ID=<infura_polygon_id>
POLYGON_EXPLORER_API_KEY=<polygon_explorer_api_key>
ETHEREUM_EXPLORER_API_KEY=<ethereum_explorer_api_key>
```

## Usage
Start the Main script by running this command
```javascript
npx hardhat run ./scripts/startTransaction.js

```
After that you will be presented with multiple options.

### Option 1: Simple Message Transfer Operations

### Option 2: ERC20 Token Operations
### Option 3: ERC721 Token Operations

### Option 4: ERC1155 Token Operations
### Option 5: Submit burn txn proof using withdrawExit Operation
