<template>
  <div>
    <div class="contracts">
      <div class="contracts__container">
        <div class="contracts__list">
          <div
            class="contracts__listitem"
            v-for="(contract, index) in contracts"
            :key="index"
            @click.stop="selectContract(contract._id)"
          >
            <div class="contracts__listitem--content">
              <div class="contracts__listitem--name">
                <span>{{ contract.name }}</span>
                <span>{{ contract.symbol }}</span>
              </div>

              <div class="contracts__listitem--address">
                <span>{{ truncate(contract.address, 13) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="contracts__currentcontract">
          <div class="contracts__currentcontract--headertop">
            <div class="contracts__currentcontract--headerarea">
              <div class="contracts__currentcontract--header">
                <h3>{{ currentcontract.name }}</h3>
              </div>

              <div class="contracts__currentcontract--subheader">
                <span>{{ currentcontract.symbol }}</span>

                <span>{{ currentcontract.address }}</span>
              </div>
            </div>

            <div class="contracts__currentcontract--headerbtns">
              <button
                :class="{ active: currentView === 'inputwrite' }"
                @click.stop="setCurrentView('inputwrite')"
              >
                Inputs
              </button>

              <button
                :class="{ active: currentView === 'setters' }"
                @click.stop="setCurrentView('setters')"
              >
                Setters
              </button>

              <button
                :class="{ active: currentView === 'getters' }"
                @click.stop="setCurrentView('getters')"
              >
                Getters
              </button>
            </div>
          </div>

          <div class="contracts__functions">
            <div v-if="currentView === 'inputwrite'">
              <InputsView />
            </div>

            <div v-if="currentView === 'setters'">
              <SettersView />
            </div>

            <div v-if="currentView === 'getters'">
              <GettersView />
            </div>
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
  mixins: [globalMixin, contractMixin],
  data() {
    return {
      currentView: "inputwrite",
    };
  },
  mounted() {
    this.$store.dispatch("getContracts");
  },
  methods: {
    setCurrentView(view) {
      this.currentView = view;
    },
    async selectContract(contractid) {
      try {
        const currentcontract = this.contracts.find(
          (contract) => contract._id === contractid
        );

        this.$store.dispatch("setCurrentContract", currentcontract);

        this.initCurrentContract();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
