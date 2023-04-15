const w3 = require('@solana/web3.js');
const SPL_TOKEN = require('@solana/spl-token');
const MPL_TOKEN_METADATA = require('@metaplex-foundation/mpl-token-metadata');
const MPL_JS = require('@metaplex-foundation/js');
const fs = require('fs');
const { connect } = require('http2');

const SOL_NETWORK = 'devnet';

// private key
const SENDER_WALLET = JSON.parse(fs.readFileSync('wallet.json', {encoding:'utf8'}));
const MINT_WALLET = JSON.parse(fs.readFileSync('mint-wallet.json', {encoding:'utf8'}));


const MINT_CONFIG = {
  numDecimals: 6,
  numberTokens: 10000,
}

const ON_CHAIN_METADATA = {
    name: 'WhiteCard', 
    symbol: 'WHC',
    uri: 'https://shdw-drive.genesysgo.net/3LHSXgy6PKo1md3YeyMGDc19sMyeejE3ENzWQbb2YW9F/whc.json',
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
}

async function createNewMintTransaction(connection, payer, mintKeypair, destinationWallet, mintAuthority, freezeAuthority){
    //Get the minimum lamport balance to create a new account and avoid rent payments
    const requiredBalance = await SPL_TOKEN.getMinimumBalanceForRentExemptMint(connection);
    //metadata account associated with mint
    const metadataPDA = await MPL_JS.findMetadataPda(mintKeypair.publicKey);
    //get associated token account of your wallet
    const tokenATA = await SPL_TOKEN.getAssociatedTokenAddress(mintKeypair.publicKey, destinationWallet);   
    

    const createNewTokenTransaction = new w3.Transaction().add(
        w3.SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: SPL_TOKEN.MINT_SIZE,
            lamports: requiredBalance,
            programId: SPL_TOKEN.TOKEN_PROGRAM_ID,
        }),
        SPL_TOKEN.createInitializeMintInstruction(
          mintKeypair.publicKey, //Mint Address
          MINT_CONFIG.numDecimals, //Number of Decimals of New mint
          mintAuthority, //Mint Authority
          freezeAuthority, //Freeze Authority
          SPL_TOKEN.TOKEN_PROGRAM_ID),
        SPL_TOKEN.createAssociatedTokenAccountInstruction(
          payer.publicKey, //Payer 
          tokenATA, //Associated token account 
          payer.publicKey, //token owner
          mintKeypair.publicKey, //Mint
        ),
        SPL_TOKEN.createMintToInstruction(
          mintKeypair.publicKey, //Mint
          tokenATA, //Destination Token Account
          mintAuthority, //Authority
          MINT_CONFIG.numberTokens * Math.pow(10, MINT_CONFIG.numDecimals),//number of tokens
        ),
        MPL_TOKEN_METADATA.createCreateMetadataAccountV2Instruction({
            metadata: metadataPDA, 
            mint: mintKeypair.publicKey, 
            mintAuthority: mintAuthority,
            payer: payer.publicKey,
            updateAuthority: mintAuthority,
          },
          { createMetadataAccountArgsV2: 
            { 
              data: ON_CHAIN_METADATA, 
              isMutable: true 
            } 
          }
        )
    );

    return createNewTokenTransaction;
}


async function main(){
  let conn = new w3.Connection(w3.clusterApiUrl(SOL_NETWORK));
  let wallet = w3.Keypair.fromSecretKey(Buffer.from(SENDER_WALLET));
  let mintWallet = w3.Keypair.fromSecretKey(Buffer.from(MINT_WALLET));
  console.log('Sender Wallet: ', wallet.publicKey.toString());
  console.log('Mint Wallet: ', mintWallet.publicKey.toString());

  const txn = await createNewMintTransaction(
    conn,
    wallet,
    mintWallet,
    wallet.publicKey,
    wallet.publicKey,
    wallet.publicKey,
  );
  const txnId = await conn.sendTransaction(txn, [wallet, mintWallet]);
  console.log(`Transaction ID: `, txnId);

}

main();
