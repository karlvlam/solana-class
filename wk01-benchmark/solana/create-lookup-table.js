const w3 = require('@solana/web3.js');
const fs = require('fs');

const SOL_NETWORK = 'devnet';

const SENDER_WALLET = JSON.parse(fs.readFileSync('wallet.json', {encoding:'utf8'}));

const SENDER_PUBKEY='GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i';


async function main(){
  let conn = new w3.Connection(w3.clusterApiUrl(SOL_NETWORK));
  let sendWallet = w3.Keypair.fromSecretKey(Buffer.from(SENDER_WALLET));

    
  let { blockhash } = await conn.getLatestBlockhash();
  let slot = await conn.getSlot();

  const [lookupTableInst, lookupTableAddress] = w3.AddressLookupTableProgram.createLookupTable({
    authority: sendWallet.publicKey,
    payer: sendWallet.publicKey,
    recentSlot: slot-100, // the most recent slot may not ready yet, -100 to play safe

  });

  console.log(lookupTableAddress);
  

  let message = new w3.TransactionMessage({
    payerKey: sendWallet.publicKey,
    recentBlockhash: blockhash,
    instructions: [lookupTableInst],
  }).compileToV0Message();
  let txn = new w3.VersionedTransaction(message);
  txn.sign([sendWallet]);
  let txnId = await conn.sendTransaction(txn);

  console.log(txnId);
}
  
main();


/*
  *  2sqiDzoKDuDJQTFQF9oZfopi8kP372d2EsDEzXsBfPnCKpcyHwTWRbrf7RznkUtHDF9rjXf5AKter8pAHxS9DKtx
  *  9VESjwXmqMuaduWSt1y5RfFXW1DUHSN4JKqBmrCK63zn
  *
  *
  * */
