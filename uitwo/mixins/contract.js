import { ethers } from "ethers";
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState({
            userAddress: state => state.useraddress,
            contracts: state => state.contracts,
            currentcontract: state => state.currentcontract,
            currentcontractcaller: state => state.currentcontractcaller,
            contractSigner: state => state.contractSigner,
            signer: state => state.signer,
            provider: state => state.provider,
            contractEthBalance: state => state.contractEthBalance,
            contractabi: state => state.contractabi,
            v2PairAbi: state => state.v2PairAbi,
            V2PairBalance: state => state.V2PairBalance
        }),
    },
    methods: {
        async createProvider() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);

                return provider;
            } catch (error) {
                console.log(error);
            }
        },
        async returnSigner(provider) {
            try {
                const signer = provider.getSigner();

                return signer;
            } catch (error) {
                console.log(error);
            }
        },
        async returnUserAddress(provider) {
            try {
                const signer = provider.getSigner();
                const userAddress = await signer.getAddress();

                return userAddress;
            } catch (error) {
                console.log(error);
            }
        },
        async returnContractBalance(provider) {
            const balanceBigNumber = await provider.getBalance(this.currentcontract.address);

            const balanceEther = ethers.utils.formatEther(balanceBigNumber);

            return balanceEther;
        },
        async getV2Pair() {
            try {
                const provider = await this.createProvider();
                const signer = await this.returnSigner(provider);

                const contractSigner = new ethers.Contract(
                    this.currentcontract.address,
                    this.contractabi,
                    signer
                );

                const v2Pair = await contractSigner.uniswapV2Pair();

                return v2Pair;
            } catch (error) {
                console.error("Error adding liquidity:", error);
            }
        },
        async getV2Router() {
            try {
                const provider = await this.createProvider();
                const signer = await this.returnSigner(provider);

                const contractSigner = new ethers.Contract(
                    this.currentcontract.address,
                    this.contractabi,
                    signer
                );

                const v2Router = await contractSigner.uniswapV2Router();

                return v2Router;
            } catch (error) {
                console.error("Error adding liquidity:", error);
            }
        },
        async getV2PairAllowance(pairaddress, routeraddress) {
            try {
                const provider = await this.createProvider();

                const v2PairContract = new ethers.Contract(
                    pairaddress,
                    this.v2PairAbi,
                    provider
                );

                const allowance = await v2PairContract.allowance(this.currentcontract.address, routeraddress);

                const bigNumber = ethers.BigNumber.from(`${allowance}`);

                const etherValue = ethers.utils.formatUnits(bigNumber, 18);
                console.log(etherValue)
            } catch (error) {
                console.log(error, 'error getting allowance')
            }
        },
        async getV2PairBalance(pairaddress) {
            try {
                const provider = await this.createProvider();

                const v2PairContract = new ethers.Contract(
                    pairaddress,
                    this.v2PairAbi,
                    provider
                );

                const balance = await v2PairContract.balanceOf(this.currentcontract.address);

                const bigNumber = ethers.BigNumber.from(`${balance}`);

                const etherValue = ethers.utils.formatUnits(bigNumber, 18);

                this.$store.dispatch("setV2PairBalance", etherValue);
            } catch (error) {
                console.log(error, 'error getting allowance')
            }
        },
        async createContractCaller() {
            try {
                const provider = await this.createProvider();

                const signer = await this.returnSigner(provider);

                const contractcaller = new ethers.Contract(
                    this.currentcontract.address,
                    this.contractabi,
                    signer
                );

                return contractcaller;
            } catch (error) {
                console.log(error);
            }
        },
        async initCurrentContract() {
            try {
                const provider = await this.createProvider();

                const balanceEther = await this.returnContractBalance(provider);

                console.log('balanceEther', balanceEther)

                this.$store.dispatch("setContractEthBalance", balanceEther);

                const v2Pair = await this.getV2Pair();

                const V2Router = await this.getV2Router();

                this.getV2PairAllowance(v2Pair, V2Router);

                this.getV2PairBalance(v2Pair);
            } catch (error) {
                console.loh = g(error)
            }
        },
        async connect() { 
            try {
                const provider = await this.createProvider();

                const userAddress = await this.returnUserAddress(provider);

                this.$store.dispatch("setUserAddress", userAddress);

                this.initCurrentContract();

                /*const contractSigner = new ethers.Contract(
                    this.currentcontract.address,
                    this.contractabi,
                    signer
                );

                /*const balanceEther = await this.returnContractBalance(provider);

                this.$store.dispatch("setContractEthBalance", balanceEther);

                const v2Pair = await this.getV2Pair();

                const V2Router = await this.getV2Router();

                this.getV2PairAllowance(v2Pair, V2Router);

                this.getV2PairBalance(v2Pair);*/
            } catch (error) {
                console.log(error);
            }
        },
    },
}