import { ethers } from 'ethers';

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

            ethersProvider = new ethers.providers.Web3Provider(provider);
            signer = ethersProvider.getSigner();

            //console.log('check here:', ethersProvider, signer, ethers.ContractFactory);

            window.prvdersigner = signer;
            window.providr = ethersProvider;
            window.ContractFactory = ethers.ContractFactory;
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
        console.log(error);
    }
}

const connt = document.getElementById('connt');

connt.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = window.ethereum;
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
        const userAddress = await signer.getAddress();

        window.provider = provider;
        window.signer = signer;
        window.userAddress = userAddress;

        handleChange({ provider, address: userAddress, isConnected: true });
    }
})