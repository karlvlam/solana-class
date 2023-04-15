# Mintint Token 

## Solana (devnet)

### Test
The script use account GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i to 100 addresses by:

Update Authority: GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i
Token account: WHCyPDBcWCR7AUm7yByXnMPFeL2zZnBDgUbbbBmBrtU 

#### Step 1

Create shadow drive storage account, and upload the token picture and metadata json to it
```
shdw-drive create-storage-account -kp ./key-shadow.json -n "whitecard" -s 1M
```


#### Step 2

Get a beautiful keypair with pubkey starting with "WHC" as the token symbol
```
node genkey.js
```

#### Step 3

Prepair transaction to mint the token, and sign it with the update authorit and token private key. Then run it.
```
node mint-token.js
```

#### Step 4

Try to mint more token
```
node mint-more.js
```

#### Step 5

Try to burn some token. You can burn any tokens you owned.
```
node burn-token.js
```

#### Step 6

If we want to fix the supply, just set the MintToken Authority to null. Then no body can mint new tokens.

```javascript
SPL_TOKEN.createSetAuthorityInstruction(    
  mintKeypair.publicKey,    
  payer.publicKey,    
  SPL_TOKEN.AuthorityType.MintTokens,    
  null    
)
```

```
node fix-supply.js
```




