// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

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