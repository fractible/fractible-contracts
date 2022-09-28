
<template>
    <div class="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
       <div class="card flex-fill w-100">
         <div class="card-header">
           <h2 class="card-title mb-0">Wallet</h2>
         </div>
         <div class="card-body px-4">
<button @click='connectWallet' class='btn btn-success'>Connect Your Wallet</button>
</div></div></div>
</template>

<script>
export default {
  name: 'factoriwallet',
  props: ['factori'],
  methods:{
    connectWallet: async function () {
        console.log('Connect Wallet Clicked')
        this.factori.wallet
        .requestPermissions({
            network: {
                type: "ghostnet"
            }
        })
        .then((_) => this.factori.wallet.getPKH())
        .then((address) => console.log(address))
        .then(() => this.factori.tezos.setWalletProvider(this.factori.wallet));
}
  }
}
</script>
