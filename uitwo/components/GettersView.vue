<template>
  <div>
    <div class="contracts__contractwrite">
      <div class="contract-functions">
        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Get Community Fee</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input v-model="feeForCommunity" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="getFeeForCommunity">Get</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Get Marketing Fee</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input v-model="feeForMarketing" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="getFeeForMarketing">Get</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Get Liquidity Fee</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input v-model="feeforLiquidity" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="getFeeForLiquidity">Get</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Get Total Fees</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input v-model="totalFees" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="getTotalFees">Get</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import contractMixin from "@/mixins/contract";
import globalMixin from "@/mixins/global";

export default {
  props: [],
  data() {
    return {
      feeForCommunity: 0,
      feeForMarketing: 0,
      feeforLiquidity: 0,
      totalFees: 0,
    };
  },
  mixins: [globalMixin, contractMixin],
  methods: {
    async getFeeForCommunity() {
      try {
        const contract = await this.createContractCaller();

        const fee = await contract.getFeeForCommunity();
        //console.log("Community Fee:", ethers.utils.formatUnits(fee, "ether"));
        this.feeForCommunity = ethers.utils.formatUnits(fee, "ether");
        return fee;
      } catch (error) {
        console.error("Error fetching community fee:", error);
      }
    },
    async getFeeForMarketing() {
      try {
        const contract = await this.createContractCaller();

        const fee = await contract.getFeeForMarketing();

        this.feeForMarketing = ethers.utils.formatUnits(fee, "ether");
        return fee;
      } catch (error) {
        console.error("Error fetching marketing fee:", error);
      }
    },
    async getFeeForLiquidity() {
      try {
        const contract = await this.createContractCaller();

        const fee = await contract.getFeeForLiquidity();

        this.feeforLiquidity = ethers.utils.formatUnits(fee, "ether");
        return fee;
      } catch (error) {
        console.error("Error fetching liquidity fee:", error);
      }
    },
    async getTotalFees() {
      try {
        const contract = await this.createContractCaller();

        const fees = await contract.getTotalFees();

        this.totalFees = ethers.utils.formatUnits(fees, "ether");
        return fees;
      } catch (error) {
        console.error("Error fetching total fees:", error);
      }
    },
  },
};
</script>
