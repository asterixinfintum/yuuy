import modal from './walletconnect.js';
import { BrowserProvider, Contract, formatUnits, parseEther, ContractFactory, ethers } from 'ethers';

let signer;
let contract;
let balanceFormatted;
let ethersProvider;

function shortenString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }

    const partLength = Math.floor((maxLength - 3) / 2);
    const start = str.substring(0, partLength);
    const end = str.substring(str.length - partLength);

    return `${start}...${end}`;
}

async function handleChange({ provider, providerType, address, error, chainId, isConnected }) {
    try {
        if (isConnected && address) {
            const conntText = document.getElementById('connt-text');
            conntText.innerText = ``;
            conntText.innerText = `${shortenString(address, 10)}`;

            Array.from(document.querySelectorAll('.logged-in')).forEach(elem => {
                elem.classList.add('visible');
                elem.classList.remove('invisible');
            });

            Array.from(document.querySelectorAll('.logged-out')).forEach(elem => {
                elem.classList.add('invisible');
                elem.classList.remove('visible');
            });

            localStorage.setItem('currentSigner', address);

            ethersProvider = new ethers.BrowserProvider(provider);
            signer = await ethersProvider.getSigner();

            console.log('check here:', ethersProvider, signer, ContractFactory);

            window.prvder = signer;
            window.providr = ethersProvider;
            window.ContractFactory = ContractFactory;
        } else {
            const conntText = document.getElementById('connt-text');
            conntText.innerText = ``;
            conntText.innerText = `Connect`;

            Array.from(document.querySelectorAll('.logged-out')).forEach(btn => {
                btn.classList.add('visible');
                btn.classList.remove('invisible');
            });

            Array.from(document.querySelectorAll('.logged-in')).forEach(btn => {
                btn.classList.add('invisible');
                btn.classList.remove('visible');
            });

            localStorage.removeItem('currentSigner');
        }
    } catch (error) {
        console.log(error)
    }
}

modal.subscribeProvider(handleChange);

const connt = document.getElementById('connt');

connt.addEventListener('click', () => modal.open());