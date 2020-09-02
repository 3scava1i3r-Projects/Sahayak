import  { SkynetClient }  from "./skynet-js";
import CryptoJS from "./crypto-js";
import Web3 from 'web3';
//import detectEthereumProvider from '@metamask/detect-provider';
//import Sahayak from "./abis/Sahayak.json";
//import webpack from 'webpack';
//import '@babel/polyfill/noConflict';


const Sahayakabi = [  {
    "constant": true,
    "inputs": [],
    "name": "skylink",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_skylink",
        "type": "string"
      }
    ],
    "name": "store",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }];
//window.global = window;

const SahayakAddress = '0x2e5a135b7D8c0f09fC14052D414dFA3Efdb44dfD';
const web3 = new Web3('http://127.0.0.1:7545');
const sahayak = new web3.eth.Contract(Sahayakabi, SahayakAddress);


var file;
let accounts = [];
const HiddenInput = document.getElementById("inputGroupFile02");
const Txndetails = document.getElementById("button-addon1");
const Account_details = document.getElementById("acc");
const Final_Upload = document.getElementById("inputGroupFileAddon02");
const Txn_Hash = document.getElementById("Txnhash");
const Search_button = document.getElementById("button-addon2");
//const Timeline_button = document.getElementById("timeline");




const initBrowse = () => {
  HiddenInput.addEventListener("change",  () => {
       file = HiddenInput.files[0];
      // console.log(file);
  });
};




const initUpload = () => {
  Final_Upload.addEventListener("click", async () => {
     try {
       if(Account_details.value){
         const client = new SkynetClient("https://siasky.net/");
         const { skylink } = await client.upload(file);
        // console.log(skylink);
        accounts = await web3.eth.getAccounts();
        const l = await sahayak.methods
        .store(skylink)
        .send({from: Account_details.value});
        const n = l.transactionHash;
        //console.log();

         swal("Please save this skylink and transaction hash respectivesly", skylink + "   and  " + n , "info");

       }
       else{
         swal ( "Oops" ,  "Something went wrong!" ,  "error" );
       }

    //   const hash = CryptoJS.SHA256(skylink).toString();
     } catch (error) {
       console.log(error);
     }
   });
};


const initSearch = () => {
  Search_button.addEventListener("click", async () => {

      try {
      const client = new SkynetClient("https://siasky.net/");
      client.open(Txn_Hash.value);

    } catch (error) {
      console.log(error)
    }
   });
};



const initTimeline = () => {
  Txndetails.addEventListener("click", async () => {

    const a = await web3.eth.getTransaction(Txn_Hash.value);
    const b = await web3.eth.getBlock(a.blockHash);
    //const h = b.timestamp;
    //if(Account_details )
    if(Account_details.value == a.from){
    //console.log(b.timestamp);
    //swal("unix timestamp!", h , "info");
    alert( "here is the timestamp  " + b.timestamp );
    }
    else{
      swal ( "Oops" ,  "Something went wrong!" ,  "error" );
  }
    //console.log(a);
    //console.log(a.blockHash);


    //console.log(b.timestamp)
  });
};


document.addEventListener('DOMContentLoaded', async () => {
  try {



   initBrowse();
   initUpload();
   initSearch();
   initTimeline();

  }
 catch (e){
   console.log(e.message);
 }
});
