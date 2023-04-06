const w3 = require('@solana/web3.js');
const fs = require('fs');

const SOL_NETWORK = 'devnet';

// private key
const SENDER_WALLET = JSON.parse(fs.readFileSync('wallet.json', {encoding:'utf8'}));
const SENDER_PUBKEY='GHUmnYKusfr8Y9W3t3NcckZsEatZkLqZMsTdpsScrw3i';

// if the target address don't have any SOL, set it to 0.001 to make sure it contains enough rent
const SEND_SOL_AMOUNT = 0.000001;

const ACCOUNT_ADDRESSES = JSON.parse(fs.readFileSync('accounts.json', {encoding:'utf8'}));
// just lazy to send to the original address :p
const RECIPTENTS = ACCOUNT_ADDRESSES.map(addr => {
  let o = {address: addr, amount: SEND_SOL_AMOUNT}
  return o;
});

const TXN_SIZE = 57;

const LOOKUP_TABLE_ADDRESS='9VESjwXmqMuaduWSt1y5RfFXW1DUHSN4JKqBmrCK63zn';

async function main(){
  let conn = new w3.Connection(w3.clusterApiUrl(SOL_NETWORK));
  let sendWallet = w3.Keypair.fromSecretKey(Buffer.from(SENDER_WALLET));
  // create correct data type for RECIPTENTS
  const lamportsToSend = [];

  while (RECIPTENTS.length != 0){
    let out = [];
    for (let i=0; i < TXN_SIZE && RECIPTENTS.length !=0 ; i++){
      let r = RECIPTENTS.shift();
      let send = { 
        recipient: new w3.PublicKey(r.address), 
        lamports: w3.LAMPORTS_PER_SOL * r.amount,
      }
      out.push(send);
    }
    lamportsToSend.push(out);

  }



  //let txn = new w3.Transaction();
  let instructions = []

  for (let i=0; i < lamportsToSend.length; i++){
    let send = lamportsToSend[i];
    let insts = [];
    for (const r of send){
      insts.push(
        w3.SystemProgram.transfer({
          fromPubkey: sendWallet.publicKey,
          toPubkey: r.recipient,
          lamports: r.lamports,
        })
      );
    }

    // for every txn, replica 10 with some instrucations reordered to make it "unique"
    for (let i=0;i < 10; i++){
      let list = insts.map(o => { return o;});
      let t = list[i];
      list[i] = list[i+1];
      list[i+1] = t;
      instructions.push(list);
    }

  }


  let lookupTableAccount = await conn.getAddressLookupTable(new w3.PublicKey(LOOKUP_TABLE_ADDRESS));
  // the txn needs the recent blockhash
  let { blockhash } = await conn.getLatestBlockhash();

  let txns = [];

  for (let i=0; i < instructions.length; i++){
    let inst = instructions[i];

    let messageV0 = new w3.TransactionMessage({
      payerKey: sendWallet.publicKey,
      recentBlockhash: blockhash,
      instructions: inst,
    }).compileToV0Message([lookupTableAccount.value]);
    let txn = new w3.VersionedTransaction(messageV0);
    // sign the txn with sender's private key
    txn.sign([sendWallet]);
    txns.push(txn)
  }

  let t1 = new Date();
  // run!
    let results = [];
  for (let i=0; i < txns.length;i++){
    let txn = txns[i];
    results.push(conn.sendTransaction(txn));
  }
  let r = await Promise.all(results);
  //console.log(await a);
  let t2 = new Date();
  // should the result
  console.log(r); // txn hash
  console.log(t1); // start time
  console.log(t2); // end time
  console.log(t2-t1); // time used (ms)

}

main();
