const w3 = require('@solana/web3.js');
const fs = require('fs');

const SOL_NETWORK = 'devnet';

const SENDER_WALLET = JSON.parse(fs.readFileSync('wallet.json', {encoding:'utf8'}));
const SENDER_PUBKEY='GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i';

const LOOKUP_TABLE_ADDRESS='9VESjwXmqMuaduWSt1y5RfFXW1DUHSN4JKqBmrCK63zn';

const ACCOUNT_ADDRESSES = JSON.parse(fs.readFileSync('accounts.json', {encoding:'utf8'}));

const TXN_SIZE = 21;

async function main(){
  let conn = new w3.Connection(w3.clusterApiUrl(SOL_NETWORK));
  let sendWallet = w3.Keypair.fromSecretKey(Buffer.from(SENDER_WALLET));
    

  //let txn = new w3.Transaction();
  let instructions = []

  let pages = Math.ceil(ACCOUNT_ADDRESSES.length/TXN_SIZE);
  for (let i=0; i < pages; i++){
    let addresses = [];
    for (let j=0; j < TXN_SIZE && ACCOUNT_ADDRESSES.length != 0; j++){
      addresses.push(new w3.PublicKey(ACCOUNT_ADDRESSES.shift()));
    }

    let inst = w3.AddressLookupTableProgram.extendLookupTable({
      payer: sendWallet.publicKey,
      authority: sendWallet.publicKey,
      lookupTable: new w3.PublicKey(LOOKUP_TABLE_ADDRESS),
      addresses: addresses,
    });
    instructions.push([inst]);

  }

  console.log(instructions.length);

  

  let { blockhash } = await conn.getLatestBlockhash();


  for (let i=0; i < instructions.length; i++){
    let inst = instructions[i];

    let messageV0 = new w3.TransactionMessage({
      payerKey: sendWallet.publicKey,
      recentBlockhash: blockhash,
      instructions: inst,
    }).compileToV0Message();

    let txn = new w3.VersionedTransaction(messageV0);
    txn.sign([sendWallet]);
    let txnId = await conn.sendTransaction(txn);
    console.log(txnId);
  }
  
}

main();
