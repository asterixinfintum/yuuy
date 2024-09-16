<template>
  <div>
    <div class="contracts__contractwrite">
      <div class="contract-functions">
        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Pause Contract</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="pauseContract">Write</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Play Contract</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="playContract">Write</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Disable Trade</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="disableTradable">Write</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Enable Trade</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="enableTradable">Write</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Disable Taxable</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="disableTaxable">Write</button>
          </div>
        </div>

        <div class="contracts__inputs grid grid-2">
          <div class="contracts__inputs--inputarea grid">
            <label class="contracts__inputs--inputlabel">
              <span class="margin-10">Enable Taxable</span>
            </label>
            <div class="contracts__inputs--inputparent">
              <div class="contracts__inputs--input">
                <input :placeholder="`Paused`" disabled />
              </div>
            </div>
          </div>
          <div class="contracts__inputs--button grid">
            <span></span>
            <button @click.stop="enableTaxable">Write</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contractMixin from "@/mixins/contract";
import globalMixin from "@/mixins/global";

export default {
  props: [],
  mixins: [globalMixin, contractMixin],
  methods: {
    async playContract() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.play();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },

    async pauseContract() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.pause();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },

    async disableTradable() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.disableTradable();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },

    async enableTradable() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.enableTradable();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },

    async disableTaxable() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.disableTaxable();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },

    async enableTaxable() {
      try {
        const contract = await this.createContractCaller();
        const tx = await contract.enableTaxable();
        await tx.wait();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
