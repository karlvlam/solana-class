// https://mumbai.polygonscan.com/
  //
const {use, POSClient} = require('@maticnetwork/maticjs');
const {Web3ClientPlugin} = require('@maticnetwork/maticjs-web3');
const {} = require('@maticnetwork/maticjs-ethers');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');

// Please put your seed phrase in wallet.txt
const SEED_PHRASE = fs.readFileSync('wallet.txt', {encoding:'utf8'}).trim();

console.log(SEED_PHRASE);

const POLYGON_RPC = 'https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78';
const ETHER_RPC = 'https://eth-goerli.api.onfinality.io/public';

const SENDER_ADDRESS = '0xbeb6cb23a776f4fbc592a45c06d6069a696cdfd5';


use(Web3ClientPlugin);

async function main(){

  
  let providerParent= null;
  let providerChild = null;
  try{
   providerParent= new HDWalletProvider({
      mnemonic: {
        phrase: SEED_PHRASE,
      },
      //providerOrUrl: 'https://rpc-mumbai.matic.today',
      providerOrUrl: ETHER_RPC,
      pollingInterval: 4000,
    });

    providerChild = new HDWalletProvider({
      mnemonic: {
        phrase: SEED_PHRASE,
      },
      //providerOrUrl: 'https://rpc-mumbai.matic.today',
      providerOrUrl: POLYGON_RPC,
      pollingInterval: 4000,
    });
  }catch(e){
    console.log(e);
  }



  let config = {
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: providerParent,
      defaultConfig: {
        from : providerParent.getAddress() 
      }
    },
    child: {
      provider: providerChild,
      defaultConfig: {
        from : providerChild.getAddress() 
      }
    }
  };
  const posClient = new POSClient();
  await posClient.init(config);
  // MATIC contract address
  const erc20ChildToken = posClient.erc20('0x0000000000000000000000000000000000001010');
  let bal = await erc20ChildToken.getBalance(providerChild.getAddress());
  console.log('MATIC balance:', bal);
  //let result = await erc20ChildToken.transfer(1000, SENDER_ADDRESS);
  let tasks = [];
  let t1 = new Date();
  for (let i=0; i < 10; i++){
    try{
      let opt = {
        spenderAddress: SENDER_ADDRESS,
        to: '0x1e84370dcb272d0ab9854c8536c44d86306372bc',
        value: 1000,
      }
      let result = await erc20ChildToken.transfer(1000,'0x1e84370dcb272d0ab9854c8536c44d86306372bc', opt);
      console.log(await result.getTransactionHash());
      //tasks.push(result);
    }catch(e){
      console.log(e);
    }
  }

  let t2 = new Date();
  console.log(t1);
  console.log(t2);
  console.log(t2-t1);
  
  

}



main();


