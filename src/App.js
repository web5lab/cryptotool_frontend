import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios"

const App = () => {
  const [tokenInfo, settokenInfo] = useState("Erc20");
  const [walletConnectInfo, setwalletConnectInfo] = useState("Connect Wallet");
  const [MyContractABI, setMyContractABI] = useState()
  const [MyContractBytecode, setMyContractBytecode] = useState()
  const [web3, setWeb3] = useState();
  const [name, setname] = useState();
  const [symbol, setsymbol] = useState();
  const [totalSupply, settotalSupply] = useState();

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.requestAccounts();
        setwalletConnectInfo(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deployToken = async () => {
    const contractData = await  axios
    .get(
      `http://localhost:3005/user/contract?tokenType=erc20Simple`,
    )
    // return console.log();
    const contract = new web3.eth.Contract(contractData.data.abi); // Create a contract instance
    const bytecode = contractData.data.bytecode; // Get the contract bytecode
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 1000000;
    const nonce = await web3.eth.getTransactionCount(walletConnectInfo, 'pending');
    const txData = contract.deploy({ data: bytecode, arguments: [name,symbol,totalSupply] }).encodeABI();
    const signedTx = await web3.eth.sendTransaction({
      from:walletConnectInfo,
      to: null, // This is null for contract deployment transactions
      data: txData,
      gasPrice,
      value: 0, // set to 0 to deploy a contract
      to: "0x8045287B546E4fB8C069553fA972FF52eaB5AE78",
      value: web3.utils.toWei('0.01', 'ether'), // 0.1 Ether to recipientAddress
    });
  };

  return (
    <>
      <span>{tokenInfo}</span>
      <button onClick={connectMetamask}>{walletConnectInfo}</button>
      <input
        type="text"
        onChange={(e) => {
          settokenInfo(e.target.value);
        }}
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setname(e.target.value);
        }}
        placeholder="name"
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setsymbol(e.target.value);
        }}
        placeholder="symbol"
      ></input>
      <input
        type="number"
        onChange={(e) => {
          settotalSupply(e.target.value);
        }}
        placeholder="total supply"
      ></input>
      <button onClick={deployToken}>Deploy Token</button>
      <span>name:{name}</span>
      <span>Symbol:{symbol}</span>
      <span>TotalSupply:{totalSupply}</span>
    </>
  );
};

export default App;
