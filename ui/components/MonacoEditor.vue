<template>
  <div
    id="editor-container"
    ref="editorContainer"
    style="width: 800px; height: 600px"
    class="codeeditor"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      currentContent: "",
    };
  },
  mounted() {
    this.loadMonaco();
  },
  methods: {
    async loadMonaco() {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"
      );
      await loadScript("/monaco-editor/min/vs/loader.js");

      window.require.config({ paths: { vs: "/monaco-editor/min/vs" } });
      window.require(["vs/editor/editor.main"], () => {
        monaco.languages.register({ id: "solidity" });

        monaco.languages.setMonarchTokensProvider("solidity", {
          defaultToken: "invalid",
          keywords: [
            "abstract",
            "address",
            "as",
            "assembly",
            "async",
            "await",
            "bool",
            "break",
            "byte",
            "case",
            "catch",
            "constant",
            "constructor",
            "continue",
            "contract",
            "default",
            "delete",
            "do",
            "else",
            "emit",
            "enum",
            "event",
            "external",
            "fallback",
            "false",
            "final",
            "for",
            "from",
            "function",
            "if",
            "implements",
            "import",
            "in",
            "indexed",
            "inline",
            "interface",
            "internal",
            "is",
            "library",
            "mapping",
            "memory",
            "modifier",
            "new",
            "null",
            "override",
            "payable",
            "pragma",
            "private",
            "public",
            "pure",
            "receive",
            "return",
            "returns",
            "revert",
            "self",
            "storage",
            "struct",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "type",
            "typeof",
            "using",
            "var",
            "view",
            "virtual",
            "while",
          ],
          typeKeywords: [
            "int",
            "int8",
            "int16",
            "int24",
            "int32",
            "int40",
            "int48",
            "int56",
            "int64",
            "int72",
            "int80",
            "int88",
            "int96",
            "int104",
            "int112",
            "int120",
            "int128",
            "int136",
            "int144",
            "int152",
            "int160",
            "int168",
            "int176",
            "int184",
            "int192",
            "int200",
            "int208",
            "int216",
            "int224",
            "int232",
            "int240",
            "int248",
            "int256",
            "uint",
            "uint8",
            "uint16",
            "uint24",
            "uint32",
            "uint40",
            "uint48",
            "uint56",
            "uint64",
            "uint72",
            "uint80",
            "uint88",
            "uint96",
            "uint104",
            "uint112",
            "uint120",
            "uint128",
            "uint136",
            "uint144",
            "uint152",
            "uint160",
            "uint168",
            "uint176",
            "uint184",
            "uint192",
            "uint200",
            "uint208",
            "uint216",
            "uint224",
            "uint232",
            "uint240",
            "uint248",
            "uint256",
            "byte",
            "bytes",
            "bytes1",
            "bytes2",
            "bytes3",
            "bytes4",
            "bytes5",
            "bytes6",
            "bytes7",
            "bytes8",
            "bytes9",
            "bytes10",
            "bytes11",
            "bytes12",
            "bytes13",
            "bytes14",
            "bytes15",
            "bytes16",
            "bytes17",
            "bytes18",
            "bytes19",
            "bytes20",
            "bytes21",
            "bytes22",
            "bytes23",
            "bytes24",
            "bytes25",
            "bytes26",
            "bytes27",
            "bytes28",
            "bytes29",
            "bytes30",
            "bytes31",
            "bytes32",
            "string",
            "address",
            "bool",
            "fixed",
            "ufixed",
          ],
          operators: [
            "=",
            ">",
            "<",
            "!",
            "~",
            "?",
            ":",
            "==",
            "<=",
            ">=",
            "!=",
            "&&",
            "||",
            "++",
            "--",
            "+",
            "-",
            "*",
            "/",
            "&",
            "|",
            "^",
            "%",
            "<<",
            ">>",
            ">>>",
            "+=",
            "-=",
            "*=",
            "/=",
            "&=",
            "|=",
            "^=",
            "%=",
            "<<=",
            ">>=",
            ">>>=",
          ],
          symbols: /[=><!~?:&|+\-*\/\^%]+/,
          escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
          tokenizer: {
            root: [
              [
                /[a-z_$][\w$]*/,
                {
                  cases: {
                    "@typeKeywords": "type",
                    "@keywords": "keyword",
                    "@default": "identifier",
                  },
                },
              ],
              [/[A-Z][\w\$]*/, "type.identifier"],
              { include: "@whitespace" },
              [/[{}()\[\]]/, "@brackets"],
              [/[<>](?!@symbols)/, "@brackets"],
              [
                /@symbols/,
                {
                  cases: {
                    "@operators": "operator",
                    "@default": "",
                  },
                },
              ],
              [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
              [/0[xX][0-9a-fA-F]+/, "number.hex"],
              [/\d+/, "number"],
              [/[;,.]/, "delimiter"],
              [/"([^"\\]|\\.)*$/, "string.invalid"],
              [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],
              [/'[^\\']'/, "string"],
              [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
              [/'/, "string.invalid"],
            ],
            comment: [
              [/[^\/*]+/, "comment"],
              [/\/\*/, "comment", "@push"],
              ["\\*/", "comment", "@pop"],
              [/[\/*]/, "comment"],
            ],
            string: [
              [/[^\\"]+/, "string"],
              [/@escapes/, "string.escape"],
              [/\\./, "string.escape.invalid"],
              [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
            ],
            whitespace: [
              [/[ \t\r\n]+/, "white"],
              [/\/\*/, "comment", "@comment"],
              [/\/\/.*$/, "comment"],
            ],
          },
        });

        monaco.editor.defineTheme("highContrastSolidityTheme", {
          base: "vs-dark",
          inherit: false,
          rules: [
            { token: "keyword", foreground: "FF8C00", fontStyle: "bold" },
            { token: "type", foreground: "00FFFF", fontStyle: "bold" },
            { token: "type.identifier", foreground: "4EC9B0" },
            { token: "identifier", foreground: "DCDCAA" },
            { token: "number", foreground: "FFD700" },
            { token: "number.hex", foreground: "FFD700" },
            { token: "number.float", foreground: "FFD700" },
            { token: "string", foreground: "FF69B4" },
            { token: "string.invalid", foreground: "FF0000" },
            { token: "string.escape", foreground: "FF00FF" },
            { token: "string.escape.invalid", foreground: "FF0000" },
            { token: "comment", foreground: "32CD32", fontStyle: "italic" },
            { token: "operator", foreground: "FF4500" },
            { token: "delimiter", foreground: "FFFFFF" },
            { token: "brackets", foreground: "FFFFFF" },
          ],
          colors: {
            "editor.foreground": "#FFFFFF",
            "editor.background": "#000000",
            "editor.selectionBackground": "#0000FF",
            "editor.lineHighlightBackground": "#0C0C0C",
            "editorCursor.foreground": "#FFFFFF",
            "editorWhitespace.foreground": "#404040",
          },
        });

        var editor = monaco.editor.create(document.getElementById("editor-container"), {
          value: [
            `// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import {Ownable} from "./libs/Ownable.sol";
import {IERC20} from "./libs/IERC20.sol";
import {SafeMath} from "./libs/SafeMath.sol";

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import {ReentrancyGuard} from "./libs/ReentrancyGuard.sol";

interface IUniswapV2Pair {
    function balanceOf(address owner) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function burn(address to) external returns (uint amount0, uint amount1);
}

contract MudSlink is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IUniswapV2Router02 public immutable uniswapV2Router;
    IUniswapV2Pair public uniswapV2Pair;
    address public marketingWallet;

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) public _allowances;
    mapping(address => bool) public _isExempted;
    mapping(address => bool) private _automatedMarketMakerPairs;

    uint256 private _maxWalletHolding;
    uint256 private _totalSupply;

    uint256 private _feeForCommunity;
    uint256 private _feeForMarketing;
    uint256 private _feeForLiquidity;
    uint256 private _totalFees;
    uint256 private _swapAtAmount;

    bool public isTradable;
    bool private _isPaused;
    bool private _isTaxable;
    bool private _ascensionOn;
    bool private _swapping;

    string private _name;
    string private _symbol;

    IERC20 public token0;
    IERC20 public token1;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event SetAutomatedMarketMakerPair(address indexed pair, bool indexed value);
    event TokensBurned(address indexed account, uint256 value);
    event TokensMinted(address indexed recipient, uint256 amount);
    event LiquidityAdded(
        uint256 amountToken,
        uint256 amountETH,
        uint256 liquidity
    );
    event LiquidityAdditionFailed(
        string reason,
        uint256 attemptedTokenAmount,
        uint256 attemptedETHAmount
    );

    constructor(
        string memory name_,
        string memory symbol_,
        bytes memory initialEncrkeys
    ) Ownable(msg.sender, initialEncrkeys) {
        uint256 intitialSupply = 10_000_000_000 * (10 ** decimals());

        uniswapV2Router = IUniswapV2Router02(
            0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
        );
        _approve(address(this), address(uniswapV2Router), type(uint256).max);

        _name = name_;
        _symbol = symbol_;
        _totalSupply = intitialSupply;
        isTradable = false;
        _isTaxable = true;
        _isPaused = false;
        _ascensionOn = true;
        _isExempted[owner()] = true;
        _isExempted[address(this)] = true;
        _isExempted[address(uniswapV2Router)] = true;

        _maxWalletHolding = ((_totalSupply * 2) / 100);
        _swapAtAmount = ((_totalSupply * 10) / 100);

        _feeForCommunity = 0;
        _feeForMarketing = 0;
        _feeForLiquidity = 0;
        _totalFees = _feeForCommunity + _feeForMarketing + _feeForLiquidity;

        _mint(owner(), (_totalSupply * 10) / 100);
        _mint(address(this), (_totalSupply * 90) / 100);
    }

    receive() external payable {}

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        address owner = msg.sender;

        _transfer(owner, to, value);

        return true;
    }

    function setMarketingWallet(address _marketingWallet) public onlyOwner {
        require(
            _marketingWallet != address(0),
            "ERC 20: Address can't be 0 type"
        );

        marketingWallet = _marketingWallet;
    }

    function _setAutomatedMarketMakerPair(address pair, bool value) internal {
        _automatedMarketMakerPairs[pair] = value;

        emit SetAutomatedMarketMakerPair(pair, value);
    }

    function addLiquidity() public onlyOwner {
        if (isTradable) {
            revert("isTradable");
        }

        uniswapV2Pair = IUniswapV2Pair(IUniswapV2Factory(uniswapV2Router.factory()).createPair(
            address(this),
            uniswapV2Router.WETH()
        ));

        _isExempted[address(uniswapV2Pair)] = true;
        _setAutomatedMarketMakerPair(address(uniswapV2Pair), true);

        _approve(address(this), address(uniswapV2Pair), type(uint256).max);
        IERC20(address(uniswapV2Pair)).approve(
            address(uniswapV2Router),
            type(uint256).max
        );

        uniswapV2Router.addLiquidityETH{value: address(this).balance}(
            address(this),
            balanceOf(address(this)),
            0,
            0,
            _msgSender(),
            block.timestamp
        );
    }

    function removeLiquidity() public onlyOwner {
        uint liquidity = IERC20(address(uniswapV2Pair)).balanceOf(
            address(this)
        );

        IERC20(address(uniswapV2Pair)).approve(
            address(uniswapV2Router),
            liquidity
        );

        uniswapV2Router.removeLiquidityETH(
            address(this),
            liquidity,
            0,
            0,
            _msgSender(),
            block.timestamp + 15 minutes
        );
    }

    function swapFees() public onlyOwner {
        _swapFees();
    }

    function _swapFees() internal nonReentrant {
        uint256 tokenAmount = balanceOf(address(this));

        if (tokenAmount == 0) {
            return;
        }

        _swapForEth(tokenAmount);

        bool success;

        (success, ) = address(marketingWallet).call{
            value: address(this).balance
        }("");
    }

    function _swapForEth(uint256 tokenAmount) internal {
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapV2Router.WETH();

        if (allowance(address(this), address(uniswapV2Router)) < tokenAmount) {
            _approve(address(this), address(uniswapV2Router), tokenAmount);
        }

        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        address spender = _msgSender();

        _spendAllowance(from, spender, value);
        _transfer(from, to, value);

        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        if (_isPaused) {
            revert("Contract paused");
        }

        if (from == address(0) || to == address(0)) {
            revert("Invalid Address Error");
        }

        if (amount == 0) {
            _update(from, to, 0);
            return;
        }

        if (!isTradable) {
            if (!_isExempted[from] || !_isExempted[to]) {
                revert("Trading is inactive");
            }
        }

        if (_balances[to] + amount >= _maxWalletHolding) {
            if (!_isExempted[to]) {
                revert("Exceeds max wallet holding");
            }
        }

        uint256 feeRate = 0;
        uint256 fee = 0;

        if (_isTaxable) {
            if (_totalFees > 0) {
                if (
                    from != owner() &&
                    to != owner() &&
                    to != address(0) &&
                    to != address(this) &&
                    !_isExempted[from]
                ) {
                    feeRate =
                        _feeForCommunity +
                        _feeForMarketing +
                        _feeForLiquidity;
                    fee = amount.mul(feeRate).div(10000);

                    amount -= fee;
                }
            }
        }

        if (fee > 0) {
            _update(from, address(this), fee);
        }

        _update(from, to, amount);
    }

    function withdrawStuckTokens(address tkn) public onlyOwner {
        bool success;
        if (tkn == address(0))
            (success, ) = address(msg.sender).call{
                value: address(this).balance
            }("");
        else {
            require(IERC20(tkn).balanceOf(address(this)) > 0, "No tokens");
            uint256 amount = IERC20(tkn).balanceOf(address(this));
            IERC20(tkn).transfer(msg.sender, amount);
        }
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 value
    ) internal {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert("Invalid spend value");
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value);
            }
        }
    }

    function allowance(
        address owner,
        address spender
    ) public view returns (uint256) {
        if (owner == address(0) || spender == address(0))
            revert("invalid address error");
        return _allowances[owner][spender];
    }

    function setExempt(address account, bool value) public onlyOwner {
        require(account != address(0));
        _isExempted[account] = value;
    }

    function setFees(
        uint256 _communityFee,
        uint256 _marketerFee,
        uint256 _liquidityFee
    ) public onlyOwner {
        _feeForCommunity = _communityFee;
        _feeForMarketing = _marketerFee;
        _feeForLiquidity = _liquidityFee;

        _totalFees = _feeForCommunity + _feeForMarketing + _feeForLiquidity;
    }

    function mintTokens(address account, uint256 amount) public onlyOwner {
        require(account != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");

        _mint(account, amount);

        emit TokensMinted(account, amount);
    }

    function burnTokens(address account, uint256 value) public onlyOwner {
        require(balanceOf(account) >= value, "Insufficient balance to burn");
        _burn(account, value);
        emit TokensBurned(account, value);
    }

    function _update(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            uint256 newSupply = _totalSupply + value;

            if (newSupply < _totalSupply) {
                // Checking for underflow
                revert("invalid operation");
            }

            if (newSupply > type(uint256).max) {
                // Checking for overflow
                revert("invalid operation");
            }

            _totalSupply = newSupply;
        } else {
            uint256 fromBalance = _balances[from];

            if (fromBalance < value) {
                revert("Insufficient funds");
            }

            _balances[from] -= value;
        }

        if (to == address(0)) {
            uint256 newSupply = _totalSupply - value;

            if (newSupply == 0) {
                revert("Cannot burn all tokens");
            }

            _totalSupply = newSupply;
        } else {
            uint256 toBalance = _balances[to];

            if (toBalance + value > type(uint256).max) {
                revert("invalid Operation");
            }

            _balances[to] += value;
        }
    }

    function approve(
        address spender,
        uint256 value
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }

    function _approve(address owner, address spender, uint value) internal {
        if (owner == address(0)) {
            revert("Invalid address");
        }

        if (spender == address(0)) {
            revert("Invalid address");
        }

        _allowances[owner][spender] = value;
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert("Invalid Address");
        }

        _update(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        if (account == address(0)) {
            revert("invalid Address");
        }

        _update(account, address(0), value);
    }

    function pause() public onlyOwner returns (bool) {
        _isPaused = true;
        return _isPaused;
    }

    function play() public onlyOwner returns (bool) {
        _isPaused = false;
        return _isPaused;
    }

    function updateSwapAtAmount(
        uint256 percentage
    ) public onlyOwner returns (uint256) {
        require(percentage >= 10 && percentage <= 50, "Number out of range");
        _swapAtAmount = ((_totalSupply * percentage) / 100);

        return _swapAtAmount;
    }

    function disableTradable() public onlyOwner returns (bool) {
        isTradable = false;

        return isTradable;
    }

    function enableTradable() public onlyOwner returns (bool) {
        isTradable = true;

        return isTradable;
    }

    function disableTaxable() public onlyOwner returns (bool) {
        _isTaxable = false;

        return _isTaxable;
    }

    function enableTaxable() public onlyOwner returns (bool) {
        _isTaxable = true;

        return _isTaxable;
    }
}

          `,
          ].join("\n"),
          language: "solidity",
          theme: "highContrastSolidityTheme",
        });

        this.currentContent = editor.getValue();

        editor.getModel().onDidChangeContent((event) => {
          const currentContent = editor.getValue();

          this.currentContent = currentContent;

          //console.log("Change event:", event);
        });
      });
    },
  },
  watch: {
    currentContent(newValue, oldValue) {
      this.$store.dispatch("editor/updateContent", newValue);
    },
  },
};
</script>

<style scoped lang="scss">
.codeeditor {
  width: #{scaleValue(1400)} !important;
  height: #{scaleValue(760)} !important;
}

.monaco-editor {
  width: #{scaleValue(1400)} !important;
}
</style>
