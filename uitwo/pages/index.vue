<template>
  <div>
    <div class="contracts__header">
      <h2>Contracts</h2>

      <div class="contracts__header--menu">
        <span>Deploy</span>

        <span class="current">Contracts</span>

        <span class="connect" @click.stop="connect">{{
          userAddress ? truncate(userAddress, 9) : "Connect"
        }}</span>
      </div>
    </div>

    <div>
      <Contracts />
    </div>
  </div>
</template>

<script>
import contractMixin from "@/mixins/contract";
import globalMixin from "@/mixins/global";

export default {
  name: "IndexPage",
  data() {
    return {};
  },
  watch: {},
  mixins: [contractMixin, globalMixin],
};
</script>
