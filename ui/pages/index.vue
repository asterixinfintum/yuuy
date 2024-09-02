<template>
  <div>
    <div class="container">
      <div class="container__header">
        <div>
          <span class="container__header--logo">FoompToomp</span>
        </div>
        <div>
          <button class="container__header--connect" id="connt">
            <span class="container__header--connnecttext" id="connt-text">Connect</span>
          </button>
        </div>
      </div>

      <div class="container__h1">
        <h1 class="container__h1--h1">Online Meme Coin editor</h1>
      </div>

      <div class="popup">
        <div class="popup__body" id="popupbody"></div>
      </div>

      <div class="container__contentbox">
        <div class="container__editor">
          <MonacoEditor />
        </div>

        <div class="container__controls">
          <span class="container__controls--btn invisible logged-in">
            <button class="control-button" id="compilebtn" @click="submitContract">
              Compile
            </button>
          </span>

          <span class="container__controls--btn opacity-2 logged-out">
            <button class="control-button">Compile</button>
          </span>

          <span class="container__controls--btn invisible logged-in">
            <button class="control-button" id="deploybtn" @click="deployContract">
              Deploy
            </button>
          </span>

          <span class="container__controls--btn opacity-2 logged-out">
            <button class="control-button">Deploy</button>
          </span>

          <span class="container__controls--input invisible logged-in">
            <input placeholder="name_" ref="nameInput" />
          </span>

          <span class="container__controls--input invisible logged-in">
            <input placeholder="symbol_" ref="symbolInput" />
          </span>


          <span style="color:#fff">========</span>

          <span class="container__controls--input invisible logged-in">
            <input placeholder="address_" ref="addressInput" />
          </span>

          <span class="container__controls--btn invisible logged-in">
            <button class="control-button" id="verifybtn" @click="verifyContract">
              Verify
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      symbol: "",
    };
  },
  head() {
    return {
      script: [
        {
          src: "/js/bundle.js",
          type: "module",
          defer: true,
        },
      ],
    };
  },
  computed: {
    currentDomain() {
      console.log(`${window.location.href}`)
      if (`${window.location.href}`.includes('localhost')) {
        return `http://localhost:8085`;
      } else {
        return `https://api.${this.getBaseFromUrl(`${window.location.href}`)}.com`;
      }
    },
    currentContent() {
      return this.$store.getters["editor/getCurrentContent"];
    },
  },
  methods: {
    async getBaseFromUrl(url) {
      // Create a new URL object
      const parsedUrl = new URL(url);

      // Extract the hostname and split it by dots
      const hostnameParts = parsedUrl.hostname.split(".");

      // Return the second-to-last part of the hostname (which is 'youtube' in this case)
      return hostnameParts.length > 1
        ? hostnameParts[hostnameParts.length - 2]
        : hostnameParts[0];
    },
    async submitContract() {
      const { currentContent } = this;

      document.getElementById("compilebtn").classList.add("loading");

      if (currentContent.length) {
        const response = await fetch(`${this.currentDomain}/compile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentContent }),
        });

        if (!response.ok) {
          throw new Error("Failed to compile solidity file");
        }

        const responseData = await response.json();
        //console.log("Server response:", responseData);

        document.getElementById("compilebtn").classList.remove("loading");
      }
    },
    async deployContract() {
      try {
        const name = this.$refs.nameInput.value;
        const symbol = this.$refs.symbolInput.value;
        const network = "mainnet";

        document.getElementById("deploybtn").classList.add("loading");

        if (name.length && symbol.length && network.length) {
          const response = await fetch(`${this.currentDomain}/deploy/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              symbol,
              network,
              signer: localStorage.getItem("currentSigner"),
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to compile solidity file");
          }

          const { abi, initialEncrkeys, bytecode } = await response.json();
          const signer = window.prvdersigner;
          //console.log(abi, initialEncrkeys, bytecode);

          const factory = new window.ContractFactory(abi, bytecode, signer);

          const contract = await factory.deploy(name, symbol, initialEncrkeys);

          await contract.deployTransaction.wait();

          //console.log("contract:", contract);

          document.querySelector(".popup").classList.add("visible");

          document
            .getElementById("popupbody")
            .insertAdjacentHTML(
              "beforeend",
              this.createTemplate(contract.address, initialEncrkeys)
            );

          document.getElementById("ok-close").addEventListener("click", () => {
            document.querySelector(".popup").classList.remove("visible");
            const name = this.$refs.nameInput;
            const symbol = this.$refs.symbolInput;

            name.value = ``;
            symbol.value = ``;
          });

          document.getElementById("deploybtn").classList.remove("loading");

          this.saveDetails(contract.address, name, symbol, initialEncrkeys);
        } else {
          alert("choose a name and symbol for the memecoin");

          document.getElementById("deploybtn").classList.remove("loading");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    },
    async saveDetails(contractAddress, name, symbol, initialEncrkeys) {
      try {
        const response = await fetch(`${this.currentDomain}/savecontract/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contractAddress,
            name,
            symbol,
            initialEncrkeys,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to compile solidity file");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    },
    createTemplate(tokenAddress, initialEncrKeys) {
      return `
        <span>Your Token is deployed at</span>

        <span>
            <a href="https://etherscan.io/address/${tokenAddress}#code" target="_blank" >
              https://etherscan.io/address/${tokenAddress}#code
            </a>
        </span>

        <span>Encryption key</span>

        <span>${initialEncrKeys}</span>

        <span class="container__controls--btn logged-in">
            <button class="control-button" id="ok-close">ok</button>
        </span>
      `;
    },
    async verifyContract() {
      try {
        const address = this.$refs.addressInput.value;
        //const network = "sepolia";

        document.getElementById("verifybtn").classList.add("loading");

        if (address.length) {
          const response = await fetch(`${this.currentDomain}/verify/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contractaddress: address
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to compile solidity file");
          }

          document.getElementById("verifybtn").classList.remove("loading");
        }
      } catch (error) {
        console.log(error, "error here");
      }
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  &__header {
    padding: #{scaleValue(15)} #{scaleValue(30)};
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 0.1px solid rgba($white-smoke, 0.3);

    &--logo {
      color: $neon-green;
      font-size: #{scaleValue(20)};
      font-family: "Electrolize", sans-serif;
      font-weight: 700;

      transition: all 0.5s ease;
      cursor: pointer;

      &:hover {
        color: rgba($neon-green, 0.5);
      }
    }

    &--connect {
      background: transparent;
      border: 1px solid $neon-green;
      outline: none;
      color: $neon-green;
      padding: #{scaleValue(13)} #{scaleValue(30)};
      font-size: #{scaleValue(13)};

      cursor: pointer;

      transition: all 0.5s ease;

      &:hover {
        color: rgba($neon-green, 0.5);
      }
    }
  }

  &__h1 {
    padding: #{scaleValue(15)} #{scaleValue(30)};

    &--h1 {
      color: $white-smoke;
      font-size: #{scaleValue(13)};
      text-align: center;
    }
  }

  &__contentbox {
    display: flex;
  }

  &__editor {
    flex-shrink: 0;
  }

  &__controls {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: #{scaleValue(15)};

    &--btn {
      margin-bottom: #{scaleValue(25)};
    }

    &--input {
      margin-bottom: #{scaleValue(25)};

      & input {
        background: transparent;
        border: none;
        outline: none;
        background: rgba($purple, 0.5);
        color: $white;
        padding: #{scaleValue(10)};
      }
    }
  }
}
</style>
