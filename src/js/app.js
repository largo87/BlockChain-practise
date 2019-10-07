App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    contractInstance: null,
    blockNumber: null,

    init: async() => {
        await App.initWeb3()
        await App.initContracts()
        await App.render()
    },

    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    initWeb3: async() => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)

        } else {
            window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                    // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    initContracts: async() => {
        const contract = await $.getJSON('Premium.json')
        App.contracts.Premium = TruffleContract(contract)
        App.contracts.Premium.setProvider(App.web3Provider)

        return App.render();
    },
    render: async() => {
        // Prevent double render
        if (App.loading) {
            return
        }

        // Update app loading state
        App.setLoading(true)

        // Set the current blockchain account
        App.account = web3.eth.accounts[0]

        $('#account').html(App.account)

        // Load smart contract
        const contract = await App.contracts.Premium.deployed()
        App.contractInstance = contract

        const value = await App.contractInstance.get()

        $('#value').html(value);
        $('#value-row').html(value);


        // get number of total block on your network
        web3.eth.getTransactionCount(App.account, function(error, result) {
            if (!error) {
                console.log(JSON.stringify(result));
                $('#transaction-count').html(result);
            } else {
                console.log(error);
            }
        });
        var timeStamp = web3.eth.getBlock(web3.eth.getBlockNumber(function(error, result) {
            if (!error) {
                console.log("getBlockNumber()", result);
                $('#last-block-transaction').html(result);


            }
        }), function(error, result) {

            if (!error) {
                /*  console.log(JSON.stringify(result));
                 $('#json-stringify').html(JSON.stringify(result, null, 2)) */
                var obj = $.parseJSON(JSON.stringify(result));
                console.log(JSON.stringify(result))
                var numberblock = obj['number'];
                console.log(numberblock)
                    //time stamp dell'ultima transazione
                timeStamp = obj['timestamp'];
                console.log(timeStamp)
                var dateObj = new Date(obj['timestamp'] * 1000);
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var hours = dateObj.getUTCHours() + 2;
                var minutes = dateObj.getUTCMinutes();
                var second = dateObj.getUTCSeconds();

                newdate = day + "/" + month + "/" + year + "-" + hours + ":" + minutes + ":" + second;
                $('#date-transaction').html(newdate);

            } else {
                console.log(error)
            }
        })

        /* <td> <a><span id="value-row"></span></a></td>
                            <td><a><span id="date-transaction"></span></a></td>
                            <td><a><span id="last-block-transaction"></span></a></td>  */





        App.setLoading(false)
    },
    set: async() => {
        App.setLoading(true)

        let newValue = $('#newValue').val()
        await App.contractInstance.set(newValue);

        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    },

    //La logica di consumi premi
    myButtonCard100: async() => {
        App.setLoading(true)
        let saldo = await App.contractInstance.get();

        let newValue100 = document.getElementById('card100Selected').value;
        console.log('Value of Button', newValue100);

        saldo = parseInt(saldo) - parseInt(newValue100);
        await App.contractInstance.set(saldo.toString());

        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')




    },
    myButtonCard200: async() => {
        App.setLoading(true)

        let saldo = await App.contractInstance.get();

        let newValue200 = document.getElementById('card200Selected').value;
        console.log('Value of Button', newValue200);

        saldo = parseInt(saldo) - parseInt(newValue200);
        await App.contractInstance.set(saldo.toString());
        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    },
    myButtonCard300: async() => {
        App.setLoading(true)

        let saldo = await App.contractInstance.get();

        let newValue300 = document.getElementById('card300Selected').value;
        console.log('Value of Button', newValue300);

        saldo = parseInt(saldo) - parseInt(newValue300);
        await App.contractInstance.set(saldo.toString());
        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    },

    //La logica del acquisto prodotti
    myButtonProdotto1: async() => {
        App.setLoading(true)
        let saldo = await App.contractInstance.get();

        let newValue100 = document.getElementById('prodotto1Selected').value;
        console.log('Value of Button', newValue100);

        saldo = parseInt(saldo) + parseInt(newValue100);
        await App.contractInstance.set(saldo.toString());
        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')


    },
    myButtonProdotto2: async() => {
        App.setLoading(true)

        let saldo = await App.contractInstance.get();

        let newValue200 = document.getElementById('prodotto2Selected').value;
        console.log('Value of Button', newValue200);

        saldo = parseInt(saldo) + parseInt(newValue200);
        await App.contractInstance.set(saldo.toString());
        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    },
    myButtonProdotto3: async() => {
        App.setLoading(true)

        let saldo = await App.contractInstance.get();

        let newValue300 = document.getElementById('prodotto3Selected').value;
        console.log('Value of Button', newValue300);

        saldo = parseInt(saldo) + parseInt(newValue300);
        await App.contractInstance.set(saldo.toString());
        window.alert('Value updated! Refresh this page to see the new value (it might take a few seconds).')
    },
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()

        } else {
            loader.hide()
            content.show()
        }
    }
}

function acquistaProdotti() {

    window.location = "premium.html";

}

$(() => {
    $(window).load(() => {
        App.init()
    })
})