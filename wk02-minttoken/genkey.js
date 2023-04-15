const w3 = require('@solana/web3.js');

while (true){

  const keypair = w3.Keypair.generate();
  let addr = keypair.publicKey.toBase58();
  if (addr.match(/^WHC[1-9a-z]/)){
    console.log(keypair.publicKey.toBase58(), keypair.secretKey);
    break;
  }
}


