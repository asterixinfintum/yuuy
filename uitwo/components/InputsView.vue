<template>
  <div class="contracts__contractwrite">
    <div class="contract-functions">
      <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">
            <span class="margin-10">Add Liquidity</span>
            <span class="margin-10 font-12">Contract Eth Balance:</span>
            <span class="margin-10 font-12"> {{ contractEthBalance }}</span>
          </label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input
                :placeholder="`to: ${currentcontract.name}`"
                v-model="contractEthBalance"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click="addLiquidity" :class="{ active: contractEthBalance > 0 }">
            Write
          </button>
        </div>
      </div>
    </div>

    <div class="contract-functions">
      <!--<div class="contracts__inputs grid grid-3">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Transfer</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="to" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="value" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>-->

      <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Set Marketing Wallet</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="marketing wallet address" v-model="newWalletAddress" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click.stop="setMarketingWallet">Write</button>
        </div>
      </div>

      <!--<div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Set LP Allowance</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="liquidity amount" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click.stop="setLPAllowanceOnRouter">Write</button>
        </div>
      </div>-->

      <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">
            <span class="margin-10">Remove Liquidity</span>
            <span class="margin-10 font-12">Total Liquidity:</span>
            <span class="margin-10 font-12"> {{ V2PairBalance }}</span>

            <span class="margin-10 font-12">Remove:</span>
            <span class="margin-10 font-12"> {{ removeliquidityRange }}</span>
          </label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <div class="contracts__range">
                <input
                  type="range"
                  min="0"
                  :max="totalLiquidity"
                  v-model="removeliquidityRange"
                  class="contracts__range--input"
                />
              </div>

              <div class="contracts__range--length">
                <span class="contracts__range-value">0</span>
                <span class="contracts__range-value">100%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button
            :class="{ active: removeliquidityRange > 0 }"
            @click.stop="removeLiquidity"
          >
            Write
          </button>
        </div>
      </div>

      <!-- <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Check LP Token Balance</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="account address" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-4">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Transfer From</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="from" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="to" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="value" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>-->

      <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Withdraw Stuck Tokens</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="token address" v-model="tkn" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click.stop="withdrawStuckTokens">Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-3">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Set Exempt</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="account address" v-model="exemptAddress" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="exempt (true/false)" v-model="exemptBool" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click.stop="setExempt">Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-4">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Set Fees</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="community fee" v-model="communityFee" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="marketer fee" v-model="marketerFee" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="liquidity fee" v-model="liquidityFee" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button @click.stop="setFees">Write</button>
        </div>
      </div>

      <!--<div class="contracts__inputs grid grid-3">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Mint Tokens</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="account address" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="amount" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-3">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Burn Tokens</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="account address" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="value" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-3">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Approve</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="spender address" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel"></label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="value" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>

      <div class="contracts__inputs grid grid-2">
        <div class="contracts__inputs--inputarea grid">
          <label class="contracts__inputs--inputlabel">Update Swap At Amount</label>
          <div class="contracts__inputs--inputparent">
            <div class="contracts__inputs--input">
              <input placeholder="percentage" />
            </div>
          </div>
        </div>
        <div class="contracts__inputs--button grid">
          <span></span>
          <button>Write</button>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";

import contractMixin from "@/mixins/contract";
import globalMixin from "@/mixins/global";

export default {
  props: [],
  mixins: [globalMixin, contractMixin],
  data() {
    return {
      removeliquidityRange: 0,
      totalLiquidity: 100,
      newWalletAddress: "",
      liquidityAmount: 0,
      tkn: 0,
      exemptAddress: "",
      exemptBool: null,
      communityFee: 0,
      marketerFee: 0,
      liquidityFee: 0,
    };
  },
  watch: {
    V2PairBalance(newval, oldval) {
      if (newval !== oldval) {
        this.totalLiquidity = newval;
      }
    },
  },
  methods: {
    async removeLiquidity() {
      try {
        const { removeliquidityRange } = this;

        if (!removeliquidityRange > 0) {
          return;
        }

        const contract = await this.createContractCaller();
        const tokenDecimals = 18;

        const amountInWei = ethers.utils.parseUnits(removeliquidityRange, tokenDecimals);

        const tx = await contract.removeLiquidity(amountInWei);

        await tx.wait();

        console.log("Liquidity removed successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async addLiquidity() {
      if (!contractEthBalance > 0) {
        return;
      }

      try {
        const contract = await this.createContractCaller();

        const tx = await contract.addLiquidity();

        await tx.wait();

        this.setContractEthBalance();

        console.log("Liquidity added successfully");
      } catch (error) {
        console.error("Error adding liquidity:", error);
      }
    },
    async setMarketingWallet() {
      try {
        const { newWalletAddress } = this;

        if (newWalletAddress.length !== 42) {
          return;
        }

        const contract = await this.createContractCaller();
        const tx = await contract.setMarketingWallet(newWalletAddress);
        await tx.wait();
        console.log("Marketing wallet updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async setLPAllowanceOnRouter() {
      try {
        const { liquidityAmount } = this;

        if (liquidityAmount <= 0) {
          return;
        }

        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(
          liquidityAmount.toString(),
          this.tokenDecimals
        );
        const tx = await contract.setLPAllowanceOnRouter(amountInWei);
        await tx.wait();
        console.log("LP allowance set successfully");
      } catch (error) {
        console.log(error);
      }
    },
    /*async swapFees() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.swapFees();
        await tx.wait();
        console.log("Fees swapped successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async transfer(to, value) {
      try {
        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(value.toString(), this.tokenDecimals);
        const tx = await contract.transfer(to, amountInWei);
        await tx.wait();
        console.log("Transfer completed successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async transferFrom(from, to, value) {
      try {
        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(value.toString(), this.tokenDecimals);
        const tx = await contract.transferFrom(from, to, amountInWei);
        await tx.wait();
        console.log("TransferFrom completed successfully");
      } catch (error) {
        console.log(error);
      }
    },*/
    async withdrawStuckTokens() {
      try {
        const { tkn } = this;

        if (tkn.length < 42) {
          return;
        }

        const contract = await this.createContractCaller();
        const tx = await contract.withdrawStuckTokens(tkn);
        await tx.wait();
        console.log("Stuck tokens withdrawn successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async setExempt() {
      try {
        const { exemptAddress, exemptBool } = this;

        if (exemptAddress.length < 42) {
          return;
        }

        if (typeof this.stringToBoolean(exemptBool) !== "boolean") {
          return;
        }

        const contract = await this.createContractCaller();
        const tx = await contract.setExempt(exemptAddress, exemptBool);
        await tx.wait();
        console.log("Exemption status updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async setFees() {
      try {
        const { communityFee, marketerFee, liquidityFee } = this;

        if (communityFee < 0 || marketerFee < 0 || liquidityFee < 0) {
          return;
        }

        const communityFeeParseUnits = ethers.utils.parseUnits(communityFee, "ether"); // Adjust the units as needed
        const marketerFeeParseUnits = ethers.utils.parseUnits(marketerFee, "ether");
        const liquidityFeeParseUnits = ethers.utils.parseUnits(liquidityFee, "ether");

        console.log(
          communityFeeParseUnits,
          marketerFeeParseUnits,
          liquidityFeeParseUnits
        );

        const contract = await this.createContractCaller();
        const tx = await contract.setFees(
          communityFeeParseUnits,
          marketerFeeParseUnits,
          liquidityFeeParseUnits
        );
        await tx.wait();
        console.log("Fees updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async mintTokens(account, amount) {
      try {
        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(
          amount.toString(),
          this.tokenDecimals
        );
        const tx = await contract.mintTokens(account, amountInWei);
        await tx.wait();
        console.log("Tokens minted successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async burnTokens(account, value) {
      try {
        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(value.toString(), this.tokenDecimals);
        const tx = await contract.burnTokens(account, amountInWei);
        await tx.wait();
        console.log("Tokens burned successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async approve(spender, value) {
      try {
        const contract = await this.createContractCaller();
        const amountInWei = ethers.utils.parseUnits(value.toString(), this.tokenDecimals);
        const tx = await contract.approve(spender, amountInWei);
        await tx.wait();
        console.log("Approval set successfully");
      } catch (error) {
        console.log(error);
      }
    },
    async updateSwapAtAmount(percentage) {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.updateSwapAtAmount(percentage);
        await tx.wait();
        console.log("Swap at amount updated successfully");
      } catch (error) {
        console.log(error);
      }
    },
    stringToBoolean(value) {
      if (typeof value === "string") {
        return value.toLowerCase() === "true";
      }
      return Boolean(value);
    },
  },
};
</script>
