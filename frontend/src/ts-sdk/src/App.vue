
<template>
  <a-back-top />
  <a-layout>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <br />
      <br />
      <div :style="{ padding: '24px', minHeight: '600px' }">
        <router-view :factori='factori'></router-view>
      </div>
      </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Factori by Functori
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import { ref } from 'vue';

export default {
  name: 'app',
  data: function(){
    return {
      factori:{
        tezos: new TezosToolkit('https://ithacanet.tezos.marigold.dev'),
        wallet: new BeaconWallet({ name: 'Factori App' })
        }
      }
    }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
* {
  font-family: 'Ubuntu', sans-serif;
}
</style>
