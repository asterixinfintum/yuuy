// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import {Context} from "./Context.sol";
import {LockGuardEncrypt} from "./LockGuardEncrypt.sol";

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
