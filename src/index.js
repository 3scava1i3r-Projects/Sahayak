import  { SkynetClient }  from "./skynet-js";
import CryptoJS from "./crypto-js";
import Portis from '@portis/web3';
import Web3 from 'web3';
//import detectEthereumProvider from '@metamask/detect-provider';
import Sahayak from "./abis/Sahayak.json";
//import webpack from 'webpack';
//import '@babel/polyfill/noConflict';

var file;
var file2;
let accounts = [];
let sahayak;


const Imglink = document.getElementById("img_link");
const Imgbtn = document.getElementById("button-addon2");
const Browse2up = document.getElementById("inputGroupFile02");
const Upload2up = document.getElementById("inputGroupFileAddon02");
const Browse2ver = document.getElementById("inputGroupFile03");
const Txn_Hash = document.getElementById("Txn_Hash");
const Timeline2ver = document.getElementById("Timeline2ver");



const initimglink = () => {
  Imgbtn.addEventListener("click",  () => {
    try {
    const client = new SkynetClient("https://siasky.net/");
    client.open(Imglink.value);
    }
    catch (error) {
    console.log(error)
  }
  });
};


const initBrowse = () => {
  Browse2up.addEventListener("change",  () => {
       file = Browse2up.files[0];
      // console.log(file);
  });
  Browse2ver.addEventListener("change",  () => {
       file2 = Browse2ver.files[0];
      // console.log(file);
  });
};



const initUpload = () => {
  Upload2up.addEventListener("click", async () => {
     try {

         const client = new SkynetClient("https://siasky.net/");
         const { skylink } = await client.upload(file);
         const hash = CryptoJS.SHA256(skylink).toString();
         //console.log(hash);
        // console.log(skylink);
        accounts = await web3.eth.getAccounts();
        const l = await sahayak.methods
        .store(hash)
        .send({from: accounts[0]});
        const n = l.transactionHash;
        //console.log();

        swal("Please save this skylink and transaction hash respectivesly", skylink + "   and  " + n , "info");

       //   swal ( "Oops" ,  "Something went wrong!" ,  "error" );
    //   const hash = CryptoJS.SHA256(skylink).toString();

     } catch (error) {
       console.log(error);
     }
   });
 };

  const initVerUpload = () => {
      Ver2ver.addEventListener("click",  async () => {

        const q = await web3.eth.getTransaction(Txn_Hash.value);

        const client = new SkynetClient("https://siasky.net/");
        const { skylink } = await client.upload(file2);
        // console.log(skylink);
        const hash = CryptoJS.SHA256(skylink).toString();
        //console.log(hash);
        accounts = await web3.eth.getAccounts();
        const l = await sahayak.methods
        .store(hash)
        .send({from: accounts[0]});
        //const n = l.transactionHash;

        const p = await web3.eth.getTransaction(l.transactionHash);

      //  console.log(q.input);

        if(q.input == p.input){
         swal("Verified", "Authentic file!" , "info");
        }
        else{
          swal ( "Oops" ,  "Not the same file!" ,  "error" );
        }
      });
  };


  const initTimeline = () => {
    Timeline2ver.addEventListener("click", async () => {

        const a = await web3.eth.getTransaction(Txn_Hash.value);
        const b = await web3.eth.getBlock(a.blockHash);

        swal("Timestamp for you file is!", timeConverter(b.timestamp) , "info");
          //if(Account_details.value == a.from){
          //console.log(b.timestamp);

          //alert( "here is the timestamp  " + timeConverter(b.timestamp) );
      //    }
        //  else{
      //      swal ( "Oops" ,  "Something went wrong!" ,  "error" );
      ///  }
          //console.log(a);
          //console.log(a.blockHash);

          //console.log(b.timestamp)
        });
      };


// const HiddenInput = document.getElementById("inputGroupFile02");
// const Txndetails = document.getElementById("button-addon1");
// const Account_details = document.getElementById("acc");
// const Final_Upload = document.getElementById("inputGroupFileAddon02");
//
// const Search_button = document.getElementById("button-addon2");


//window.global = window;
const portis = new Portis('fe65b869-2038-4e66-8773-5665dd1ec182', 'maticMumbai');
const web3 = new Web3(portis.provider);

const initContract = () => {
  const deploymentKey = Object.keys(Sahayak.networks)[1];
  return new web3.eth.Contract(
    Sahayak.abi,
    Sahayak
      .networks[deploymentKey]
      .address
  );
};
//const SahayakAddress = '';
//const web3 = new Web3('http://127.0.0.1:7545');
//const sahayak = new web3.eth.Contract(Sahayakabi, SahayakAddress);
//const Timeline_button = document.getElementById("timeline");


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


// const initBrowse = () => {
//   HiddenInput.addEventListener("change",  () => {
//        file = HiddenInput.files[0];
//       // console.log(file);
//   });
// };
//
//
//
// const initUpload = () => {
//   Final_Upload.addEventListener("click", async () => {
//      try {
//
//          const client = new SkynetClient("https://siasky.net/");
//          const { skylink } = await client.upload(file);
//         // console.log(skylink);
//         accounts = await web3.eth.getAccounts();
//         const l = await sahayak.methods
//         .store(skylink)
//         .send({from: accounts[0]});
//         const n = l.transactionHash;
//         //console.log();
//
//
//
//         swal("Please save this skylink and transaction hash respectivesly", skylink + "   and  " + n , "info");
//
//        //   swal ( "Oops" ,  "Something went wrong!" ,  "error" );
//
//
//     //   const hash = CryptoJS.SHA256(skylink).toString();
//      } catch (error) {
//        console.log(error);
//      }
//    });
// };
//
//
// const initSearch = () => {
//   Search_button.addEventListener("click", async () => {
//
//       try {
//       const client = new SkynetClient("https://siasky.net/");
//       client.open(Txn_Hash.value);
//
//     } catch (error) {
//       console.log(error)
//     }
//    });
// };


//
// const initTimeline = () => {
//   Txndetails.addEventListener("click", async () => {
//
//     const a = await web3.eth.getTransaction(Txn_Hash.value);
//     const b = await web3.eth.getBlock(a.blockHash);
//     //const h = b.timestamp;
//     //if(Account_details )
//
//     if(Account_details.value == a.from){
//     //console.log(b.timestamp);
//     swal("unix timestamp!", timeConverter(b.timestamp) , "info");
//     //alert( "here is the timestamp  " + timeConverter(b.timestamp) );
//     }
//     else{
//       swal ( "Oops" ,  "Something went wrong!" ,  "error" );
//   }
//     //console.log(a);
//     //console.log(a.blockHash);
//
//
//     //console.log(b.timestamp)
//   });
// };



//const w = await web3.eth.getBlock(q.input);

//////////////////////////////////////////////////////////////logic for validation


//  const q = await web3.eth.getTransaction(Txn_Hash.value);
//
// const client = new SkynetClient("https://siasky.net/");
// const { skylink } = await client.upload(file);
// // console.log(skylink);
// accounts = await web3.eth.getAccounts();
// const l = await sahayak.methods
// .store(skylink)
// .send({from: accounts[0]});
// //const n = l.transactionHash;
//
//
// const p = await web3.eth.getTransaction(l.transactionHash);
//
//
//
//
// console.log(q.input);
//
// if(q.input == p.input){
//   alert("1");
// }
// else{
//   alert("0");
// }

////////////////////////////////////////////////////////////////////////////////////



document.addEventListener('DOMContentLoaded', async () => {
  try {

     sahayak = initContract();
     initimglink();
     initBrowse();
     initUpload();
     initVerUpload();
     initTimeline();

  }
 catch (e){
   console.log(e.message);
 }
});
