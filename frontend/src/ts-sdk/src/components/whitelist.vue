<template>
<a-affix :offset-top='50'><router-link to='/'>
<a-button type='primary' shape='round'>Back to contracts</a-button></router-link>
<a-button @click='connectWallet' type='primary' shape='round' style='position: fixed; right: 70px'>{{ tz1 }}</a-button>
</a-affix><a-divider>Storage</a-divider>
              <a-card :loading='storage_disabled'>
<a-card title=' object'>
<a-list>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>admin</a-typography-text>
                        <span v-if='store'>: {{ store.admin }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>users</a-typography-text>
                        <span v-if='store'>: {{ store.users }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text code>?</a-typography-text><a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>admin_candidate</a-typography-text>
                        <span v-if='store'>: {{ (store.admin_candidate == null) ? 'null' : store.admin_candidate }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>bool</a-typography-text> <a-typography-text strong>paused</a-typography-text>
                        <span v-if='store'>: {{ store.paused }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
<a-space align='start'>
<a-typography-text type='warning' code>set</a-typography-text>&lt; <a-typography-text type='warning' code>address</a-typography-text>
&gt;
:
<a-collapse>
<a-collapse-panel header='super_users'>
<a-list>
<a-list-item v-if='store' v-for='(item, index) in store.super_users'>
<div class='space-align-block'>
<a-space align-start>
[{{ index }}]
<span class='material-symbols-outlined'>chevron_right</span>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text>
                        <span v-if='store'>: {{ item }}</span>
                      </a-space>


</a-space>
</div>
</a-list-item>
</a-list>
</a-collapse-panel>
</a-collapse>
</a-space>
</a-list-item>
<a-list-item>
<a-space align='start'>
<a-typography-text type='warning' code>set</a-typography-text>&lt; <a-typography-text type='warning' code>address</a-typography-text>
&gt;
:
<a-collapse>
<a-collapse-panel header='whitelister'>
<a-list>
<a-list-item v-if='store' v-for='(item, index) in store.whitelister'>
<div class='space-align-block'>
<a-space align-start>
[{{ index }}]
<span class='material-symbols-outlined'>chevron_right</span>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text>
                        <span v-if='store'>: {{ item }}</span>
                      </a-space>


</a-space>
</div>
</a-list-item>
</a-list>
</a-collapse-panel>
</a-collapse>
</a-space>
</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>nat</a-typography-text>
, <a-typography-text type='success' code>record</a-typography-text>
&gt;
<a-typography-text strong>transfer_lists</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.transfer_lists.value" target='_blank'>
ID : {{ store.transfer_lists.value }}
</a-typography-link>
</a-list-item>
</a-list></a-card>
              </a-card>
<a-divider>Entrypoints</a-divider>
          <a-collapse>
<a-collapse-panel header='Entrypoint: update_users'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                        <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_users[0][0]' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
</a-col>
                        <a-col :span='19'><a-input type='number' v-model:value='ep.param_update_users[0][1]' min='0' placeholder='Positive number: 9344' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_update_users' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='update_usersCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: update_user'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>user</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_user.user' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_update_user.transfer_list_id' min='0' placeholder='Positive number: 26685' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_update_user' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='update_userCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: update_transfer_list'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>transfer_list_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_update_transfer_list.transfer_list_id' min='0' placeholder='Positive number: 80182' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>bool</a-typography-text>
</a-col>
                                        <a-col :span='19'><a-switch v-model:checked='ep.param_update_transfer_list.u[0]' /> {{ ep.param_update_transfer_list.u[0] }}
</a-col>
</a-row>
</a-form-item>
<a-alert type='error' message='Set not supported yet' closable show-icon />

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_update_transfer_list' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='update_transfer_listCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: unpause'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>unit</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' placeholder='Unit: ()' disabled/>
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_unpause' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='unpauseCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_users_contract'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_users_contract' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_users_contract' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_users_contractCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: remove_whitelister'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_remove_whitelister' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_remove_whitelister' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='remove_whitelisterCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: remove_super_user'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_remove_super_user' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_remove_super_user' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='remove_super_userCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: pause'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>unit</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' placeholder='Unit: ()' disabled/>
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_pause' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='pauseCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: get_user'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>user</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_get_user.user' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='error' message='Contract not supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_get_user' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='get_userCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: declare_admin'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_declare_admin' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_declare_admin' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='declare_adminCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: claim_admin'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>unit</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' placeholder='Unit: ()' disabled/>
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_claim_admin' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='claim_adminCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: assert_transfers'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                            <a-col :span='19'><a-input type='text' v-model:value='ep.param_assert_transfers[0][0]' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                            <a-col :span='19'><a-input type='text' v-model:value='ep.param_assert_transfers[0][1][0]' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_assert_transfers' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='assert_transfersCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: assert_transfer_list'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>from_transfer_list_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_assert_transfer_list.from_transfer_list_id' min='0' placeholder='Positive number: 31641' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>to_transfer_list_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_assert_transfer_list.to_transfer_list_id' min='0' placeholder='Positive number: 80439' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_assert_transfer_list' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='assert_transfer_listCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: assert_receivers'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_assert_receivers[0]' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_assert_receivers' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='assert_receiversCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: add_whitelister'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_add_whitelister' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_add_whitelister' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='add_whitelisterCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: add_super_user'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_add_super_user' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_add_super_user' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='add_super_userCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
          </a-collapse>
</template>
<script>
import { TezosToolkit } from '@taquito/taquito'
import * as functolib from '../functolib'
import * as whitelist from '../whitelist_interface'
import { BeaconWallet } from '@taquito/beacon-wallet'
export default {
  props: ['factori'],
  name: 'whitelist',
  data: function(){
    return {
      storage_disabled: false,
      tz1: 'Connect wallet',
      network: 'ghostnet',
      kt1: 'KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A',
      store : null,
      ep :{
        disabled: false,
        param_update_users: [['',0]],
        param_update_user: { user : '',transfer_list_id : 0 },
        param_update_transfer_list: { transfer_list_id : 0,u : [true,[]] },
        param_unpause: null,
        param_set_users_contract: '',
        param_remove_whitelister: '',
        param_remove_super_user: '',
        param_pause: null,
        param_get_user: { user : '',callback : { prim: 'unit' } },
        param_declare_admin: '',
        param_claim_admin: null,
        param_assert_transfers: [['',['']]],
        param_assert_transfer_list: { from_transfer_list_id : 0,to_transfer_list_id : 0 },
        param_assert_receivers: [''],
        param_add_whitelister: '',
        param_add_super_user: ''
      },
      senders :{
        amount_update_users:0,
        amount_update_user:0,
        amount_update_transfer_list:0,
        amount_unpause:0,
        amount_set_users_contract:0,
        amount_remove_whitelister:0,
        amount_remove_super_user:0,
        amount_pause:0,
        amount_get_user:0,
        amount_declare_admin:0,
        amount_claim_admin:0,
        amount_assert_transfers:0,
        amount_assert_transfer_list:0,
        amount_assert_receivers:0,
        amount_add_whitelister:0,
        amount_add_super_user:0
      }
    }
  },
  async created(){
    this.storage_disabled = true;
    this.store = whitelist.Storage_type_decode(await this.get_storage())
      this.storage_disabled = false;
      const activeAccount = await this.factori.wallet.client.getActiveAccount();
      if(activeAccount)
        this.tz1 = 'Connected: ' + activeAccount.address;
      else
        this.tz1 = 'Connect wallet';
  },
  methods:{
    connectWallet: async function(){
      this.factori.wallet
      .requestPermissions({
        network: {
          type: 'ghostnet'
        }
      })
      .then((_) => this.factori.wallet.getPKH())
      .then((address) => this.tz1 = 'Connected: ' + address)
      .then(() => this.factori.tezos.setWalletProvider(this.factori.wallet));
    },
    get_storage: async function(){
      this.factori.tezos = new TezosToolkit(functolib.ghostnet_config.node_addr)
      const contract = await this.factori.tezos.contract.at(this.kt1)
      return contract.script.storage
    },
    update_usersCall: async function(){
      console.log('Entrypoint : update_users called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_update_users,
        to: this.kt1,
        parameter: { entrypoint:'update_users', value: whitelist.update_users_encode(this.ep.param_update_users) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    update_userCall: async function(){
      console.log('Entrypoint : update_user called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_update_user,
        to: this.kt1,
        parameter: { entrypoint:'update_user', value: whitelist.update_user_encode(this.ep.param_update_user) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    update_transfer_listCall: async function(){
      console.log('Entrypoint : update_transfer_list called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_update_transfer_list,
        to: this.kt1,
        parameter: { entrypoint:'update_transfer_list', value: whitelist.update_transfer_list_encode(this.ep.param_update_transfer_list) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    unpauseCall: async function(){
      console.log('Entrypoint : unpause called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_unpause,
        to: this.kt1,
        parameter: { entrypoint:'unpause', value: whitelist.unpause_encode(this.ep.param_unpause) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_users_contractCall: async function(){
      console.log('Entrypoint : set_users_contract called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_users_contract,
        to: this.kt1,
        parameter: { entrypoint:'set_users_contract', value: whitelist.set_users_contract_encode(this.ep.param_set_users_contract) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    remove_whitelisterCall: async function(){
      console.log('Entrypoint : remove_whitelister called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_remove_whitelister,
        to: this.kt1,
        parameter: { entrypoint:'remove_whitelister', value: whitelist.remove_whitelister_encode(this.ep.param_remove_whitelister) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    remove_super_userCall: async function(){
      console.log('Entrypoint : remove_super_user called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_remove_super_user,
        to: this.kt1,
        parameter: { entrypoint:'remove_super_user', value: whitelist.remove_super_user_encode(this.ep.param_remove_super_user) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    pauseCall: async function(){
      console.log('Entrypoint : pause called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_pause,
        to: this.kt1,
        parameter: { entrypoint:'pause', value: whitelist.pause_encode(this.ep.param_pause) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    get_userCall: async function(){
      console.log('Entrypoint : get_user called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_get_user,
        to: this.kt1,
        parameter: { entrypoint:'get_user', value: whitelist.get_user_encode(this.ep.param_get_user) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    declare_adminCall: async function(){
      console.log('Entrypoint : declare_admin called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_declare_admin,
        to: this.kt1,
        parameter: { entrypoint:'declare_admin', value: whitelist.declare_admin_encode(this.ep.param_declare_admin) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    claim_adminCall: async function(){
      console.log('Entrypoint : claim_admin called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_claim_admin,
        to: this.kt1,
        parameter: { entrypoint:'claim_admin', value: whitelist.claim_admin_encode(this.ep.param_claim_admin) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    assert_transfersCall: async function(){
      console.log('Entrypoint : assert_transfers called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_assert_transfers,
        to: this.kt1,
        parameter: { entrypoint:'assert_transfers', value: whitelist.assert_transfers_encode(this.ep.param_assert_transfers) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    assert_transfer_listCall: async function(){
      console.log('Entrypoint : assert_transfer_list called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_assert_transfer_list,
        to: this.kt1,
        parameter: { entrypoint:'assert_transfer_list', value: whitelist.assert_transfer_list_encode(this.ep.param_assert_transfer_list) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    assert_receiversCall: async function(){
      console.log('Entrypoint : assert_receivers called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_assert_receivers,
        to: this.kt1,
        parameter: { entrypoint:'assert_receivers', value: whitelist.assert_receivers_encode(this.ep.param_assert_receivers) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    add_whitelisterCall: async function(){
      console.log('Entrypoint : add_whitelister called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_add_whitelister,
        to: this.kt1,
        parameter: { entrypoint:'add_whitelister', value: whitelist.add_whitelister_encode(this.ep.param_add_whitelister) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    add_super_userCall: async function(){
      console.log('Entrypoint : add_super_user called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_add_super_user,
        to: this.kt1,
        parameter: { entrypoint:'add_super_user', value: whitelist.add_super_user_encode(this.ep.param_add_super_user) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = whitelist.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
  }
}
</script>
