"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require('dotenv').config();
var generateDeterministicRandomString = require('./geneString');
var hardhat = require('hardhat');
var _require = require('ethers'),
  utils = _require.utils;
var _require2 = require('./constants'),
  CONTRACTS = _require2.CONTRACTS;
var _require3 = require("hardhat/config"),
  types = _require3.types,
  task = _require3.task;
function deployContract(name, symbol) {
  task('deploy', 'Deploy Context').addParam('name', 'The name of the token').addParam('symbol', 'The symbol of the token').setAction( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(taskArgs, _ref) {
      var ethers, accounts, signer, initialEncrkeys;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            ethers = _ref.ethers;
            _context.next = 3;
            return ethers.getSigners();
          case 3:
            accounts = _context.sent;
            signer = accounts[0];
            initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());
            console.log('check:', signer, initialEncrkeys);

            /*const contract = await ethers.deployContract(CONTRACTS.BRX, [
                name, symbol, signer, initialEncrkeys
            ]);
              console.log(`tokenaddress: ${contract.target}`);
            console.log('initialEncrkeys:', initialEncrkeys);*/
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

/*task('deploy', 'Deploy Context')
    .addParam('name', 'The name of the token')
    .addParam('symbol', 'The symbol of the token')
    .setAction(async (taskArgs, { ethers }) => {
        const accounts = await ethers.getSigners();
        const signer = accounts[0];

        const initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());

        const MyContract = await ethers.getContractFactory('Contract');

        console.log(MyContract);

        /*const contract = await ethers.deployContract(CONTRACTS.CONTRACT, [
            taskArgs.name, taskArgs.symbol, initialEncrkeys
        ]);

        console.log(`tokenaddress: ${contract.target}`);
        console.log('initialEncrkeys:', initialEncrkeys);
    })*/

//"ethers": "^6.12.1",

//console.log(MyContract.bytecode);
// console.log(CONTRACTS.CONTRACT)
/*const unsignedTx = await MyContract.getDeployTransaction(taskArgs.name, taskArgs.symbol, initialEncrkeys);
      const serializedTx = {
    to: null, // 'to' should be null for contract deployment
    data: unsignedTx.data,
    gasPrice: '0', // Placeholder, will be set on the server
    gasLimit: '0', // Placeholder, will be set on the server
    value: '0', // Assuming no ETH is being sent with the transaction
    nonce: null, // Placeholder, will be set on the server
    chainId: null // Placeholder, will be set on the server
};
      return { unsignedTx: serializedTx, initialEncrkeys };
      /*const initialEncrkeys = ethers.encodeBytes32String(generateDeterministicRandomString());
      const MyContract = await ethers.getContractFactory('Contract');
const unsignedTx = await MyContract.getDeployTransaction(taskArgs.name, taskArgs.symbol, initialEncrkeys);
      console.log(ethers)
// const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_ETH_URL);
            /*const serializedTx = {
    to: unsignedTx.to || null,
    data: unsignedTx.data || null,
    gasPrice: unsignedTx.gasPrice ? unsignedTx.gasPrice.toString() : '0',
    gasLimit: unsignedTx.gasLimit ? unsignedTx.gasLimit.toString() : '0',
    value: unsignedTx.value ? unsignedTx.value.toString() : '0',
    nonce: unsignedTx.nonce !== undefined ? unsignedTx.nonce : null,
    chainId: unsignedTx.chainId !== undefined ? unsignedTx.chainId : null
};
      console.log(unsignedTx.gasPrice, unsignedTx.chainId, unsignedTx.nonce, unsignedTx.value, unsignedTx.gasLimit);
      //return { unsignedTx, initialEncrkeys };
      /*const contract = await ethers.deployContract(CONTRACTS.CONTRACT, [
    taskArgs.name, taskArgs.symbol, initialEncrkeys
]);
      console.log(`tokenaddress: ${contract.target}`);
console.log('initialEncrkeys:', initialEncrkeys);*/

/*fs.readdir(basePath, (err, files) => {
if (err) {
return console.error('Unable to scan directory:', err);
}
files.forEach(file => {
if (file.endsWith('.sol')) {
console.log(removeExtension(file));
const contractName = removeExtension(file);
artifactPath = path.resolve(__dirname, `../../serverf/artifacts/contracts/${contractName}.sol/${contractName}.json`);
}
});
});*/

/*function removeExtension(filename) {
    if (filename.endsWith('.sol')) {
        return filename.slice(0, -4);
    }
    return filename;
}

let artifactPath;

async function getArtifactPath(basePath) {
    try {
        const files = fs.readdir(basePath);
        
        files.forEach(file => {
            if (file.endsWith('.sol')) {
                console.log(removeExtension(file));
                const contractName = removeExtension(file);
                artifactPath = path.resolve(__dirname, `../../serverf/artifacts/contracts/${contractName}.sol/${contractName}.json`);

                console.log(artifactPath)
            }
        });
        return artifactPath;
    } catch (err) {
        console.error('Unable to scan directory:', err);
    }
}

(async () => {
    await getArtifactPath(basePath);
})()


/*(async () => {
    artifactPath = await getArtifactPath(basePath);
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    const abi = artifact.abi;
    const bytecode = artifact.bytecode;

    task('deploy', 'Deploy Context')
        .addParam('name', 'The name of the token')
        .addParam('symbol', 'The symbol of the token')
        .setAction(async (taskArgs, { ethers }) => {
            const accounts = await ethers.getSigners();
            const signer = accounts[0];

            const initialEncrkeys = ethers.AbiCoder.defaultAbiCoder().encode(['bytes32'], [ethers.keccak256(ethers.toUtf8Bytes(generateDeterministicRandomString()))]);

            const MyContract = await ethers.getContractFactory('Contract');

            console.log('ABI:', JSON.stringify(abi, null, 2));
            console.log('Bytecode:', bytecode);

            return { initialEncrkeys, abi: JSON.stringify(abi, null, 2), bytecode }
        });


    function generateDeterministicRandomString(length = 10, seed = 42) {
        function seedRandom(seed) {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            seed = seedRandom(seed);
            const randomIndex = Math.floor(seed * characters.length);
            randomString += characters[randomIndex];
            seed++;
        }

        return randomString;
    }


})();*/