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
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>owner</a-typography-text>
                        <span v-if='store'>: {{ store.owner }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>whitelist</a-typography-text>
                        <span v-if='store'>: {{ store.whitelist }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text code>?</a-typography-text><a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>owner_candidate</a-typography-text>
                        <span v-if='store'>: {{ (store.owner_candidate == null) ? 'null' : store.owner_candidate }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>bool</a-typography-text> <a-typography-text strong>paused</a-typography-text>
                        <span v-if='store'>: {{ store.paused }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>nat</a-typography-text>
, <a-typography-text type='success' code>record</a-typography-text>
&gt;
<a-typography-text strong>token_metadata</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.token_metadata.value" target='_blank'>
ID : {{ store.token_metadata.value }}
</a-typography-link>
</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>pair</a-typography-text>&lt;<a-typography-text type='warning' code>address</a-typography-text>
,<a-typography-text type='warning' code>nat</a-typography-text>
&gt;
, <a-typography-text type='warning' code>nat</a-typography-text>
&gt;
<a-typography-text strong>ledger</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.ledger.value" target='_blank'>
ID : {{ store.ledger.value }}
</a-typography-link>
</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>pair</a-typography-text>&lt;<a-typography-text type='warning' code>address</a-typography-text>
,<a-typography-text type='warning' code>pair</a-typography-text>&lt;<a-typography-text type='warning' code>nat</a-typography-text>
,<a-typography-text type='warning' code>address</a-typography-text>
&gt;
&gt;
, <a-typography-text type='warning' code>unit</a-typography-text>
&gt;
<a-typography-text strong>operator</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.operator.value" target='_blank'>
ID : {{ store.operator.value }}
</a-typography-link>
</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>pair</a-typography-text>&lt;<a-typography-text type='warning' code>address</a-typography-text>
,<a-typography-text type='warning' code>address</a-typography-text>
&gt;
, <a-typography-text type='warning' code>unit</a-typography-text>
&gt;
<a-typography-text strong>operator_for_all</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.operator_for_all.value" target='_blank'>
ID : {{ store.operator_for_all.value }}
</a-typography-link>
</a-list-item>
<a-list-item>
<a-typography-text type='warning' code>big_map</a-typography-text>&lt; <a-typography-text type='warning' code>string</a-typography-text>
, <a-typography-text type='warning' code>byte</a-typography-text>
&gt;
<a-typography-text strong>metadata</a-typography-text> : <a-typography-link v-if='store' :href="'https://' + network + '.tzkt.io/' + kt1 + '/storage/' + store.metadata.value" target='_blank'>
ID : {{ store.metadata.value }}
</a-typography-link>
</a-list-item>
</a-list></a-card>
              </a-card>
<a-divider>Entrypoints</a-divider>
          <a-collapse>
<a-collapse-panel header='Entrypoint: update_operators_for_all'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-select v-model:value='ep.param_update_operators_for_all[0].kind' placeholder='Select a value from the list below' style='width: 100%' >
<a-select-option value='Add_for_all_constructor'>Add_for_all</a-select-option>
<a-select-option value='Remove_for_all_constructor'>Remove_for_all</a-select-option>
</a-select>
</a-form-item>
<template v-if='ep.param_update_operators_for_all[0].kind == ""'>
<a-empty />
</template>
<template v-else-if='ep.param_update_operators_for_all[0].kind == "Add_for_all_constructor"'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                              <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators_for_all[0].Add_for_all_element' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

</template>
<template v-else-if='ep.param_update_operators_for_all[0].kind == "Remove_for_all_constructor"'>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                              <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators_for_all[0].Remove_for_all_element' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

</template>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_update_operators_for_all' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='update_operators_for_allCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: update_operators'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-select v-model:value='ep.param_update_operators[0].kind' placeholder='Select a value from the list below' style='width: 100%' >
<a-select-option value='Add_operator_constructor'>Add_operator</a-select-option>
<a-select-option value='Remove_operator_constructor'>Remove_operator</a-select-option>
</a-select>
</a-form-item>
<template v-if='ep.param_update_operators[0].kind == ""'>
<a-empty />
</template>
<template v-else-if='ep.param_update_operators[0].kind == "Add_operator_constructor"'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                          <a-typography-text strong>owner</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators[0].Add_operator_element.owner' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                          <a-typography-text strong>operator</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators[0].Add_operator_element.operator' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                          <a-typography-text strong>token_id</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='number' v-model:value='ep.param_update_operators[0].Add_operator_element.token_id' min='0' placeholder='Positive number: 9344' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</template>
<template v-else-if='ep.param_update_operators[0].kind == "Remove_operator_constructor"'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                          <a-typography-text strong>owner</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators[0].Remove_operator_element.owner' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                          <a-typography-text strong>operator</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_update_operators[0].Remove_operator_element.operator' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                          <a-typography-text strong>token_id</a-typography-text>
</a-col>
                                          <a-col :span='19'><a-input type='number' v-model:value='ep.param_update_operators[0].Remove_operator_element.token_id' min='0' placeholder='Positive number: 26685' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</template>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_update_operators' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='update_operatorsCall' block :disabled='ep.disabled'>Call</a-button>
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
<a-collapse-panel header='Entrypoint: transfer'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text></a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>from_</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_transfer[0].from_' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>txs</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                  <a-typography-text strong>to_</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_transfer[0].txs[0].to_' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>token_id</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_transfer[0].txs[0].token_id' min='0' placeholder='Positive number: 80182' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>amount</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_transfer[0].txs[0].amount' min='0' placeholder='Positive number: 31641' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_transfer' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='transferCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_whitelist'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_whitelist' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_whitelist' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_whitelistCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_token_metadata'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>tid</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_set_token_metadata.tid' min='0' placeholder='Positive number: 80439' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='error' message='Map not supported yet' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_token_metadata' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_token_metadataCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_metadata'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>string</a-typography-text>
                                      <a-typography-text strong>k</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input v-model:value='ep.param_set_metadata.k' placeholder='abc...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_metadata.d' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_metadata' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_metadataCall' block :disabled='ep.disabled'>Call</a-button>
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
<a-collapse-panel header='Entrypoint: mint'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>tow</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_mint.tow' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>tid</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_mint.tid' min='0' placeholder='Positive number: 7500' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>nbt</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_mint.nbt' min='0' placeholder='Positive number: 44104' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_mint' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='mintCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: declare_ownership'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_declare_ownership' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_declare_ownership' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='declare_ownershipCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: claim_ownership'>
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
                        <a-input type='number' min='0' v-model:value='senders.amount_claim_ownership' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='claim_ownershipCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: burn'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>tid</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_burn.tid' min='0' placeholder='Positive number: 7020' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>nbt</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_burn.nbt' min='0' placeholder='Positive number: 19921' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_burn' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='burnCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: balance_of'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>requests</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                  <a-typography-text strong>owner</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_balance_of.requests[0].owner' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>token_id</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_balance_of.requests[0].token_id' min='0' placeholder='Positive number: 78370' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-alert type='error' message='Contract not supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_balance_of' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='balance_ofCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
          </a-collapse>
</template>
<script>
import { TezosToolkit } from '@taquito/taquito'
import * as functolib from '../functolib'
import * as nft from '../nft_interface'
import { BeaconWallet } from '@taquito/beacon-wallet'
export default {
  props: ['factori'],
  name: 'nft',
  data: function(){
    return {
      storage_disabled: false,
      tz1: 'Connect wallet',
      network: 'ghostnet',
      kt1: 'KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN',
      store : null,
      ep :{
        disabled: false,
        param_update_operators_for_all: [{ kind: '', Add_for_all_element: '',Remove_for_all_element: '',}
],
        param_update_operators: [{ kind: '', Add_operator_element: { owner : '',operator : '',token_id : 0 },Remove_operator_element: { owner : '',operator : '',token_id : 0 },}
],
        param_unpause: null,
        param_transfer: [{ from_ : '',txs : [{ to_ : '',token_id : 0,amount : 0 }] }],
        param_set_whitelist: '',
        param_set_token_metadata: { tid : 0,tdata : [] },
        param_set_metadata: { k : '',d : '' },
        param_pause: null,
        param_mint: { tow : '',tid : 0,nbt : 0 },
        param_declare_ownership: '',
        param_claim_ownership: null,
        param_burn: { tid : 0,nbt : 0 },
        param_balance_of: { requests : [{ owner : '',token_id : 0 }],callback : { prim: 'unit' } }
      },
      senders :{
        amount_update_operators_for_all:0,
        amount_update_operators:0,
        amount_unpause:0,
        amount_transfer:0,
        amount_set_whitelist:0,
        amount_set_token_metadata:0,
        amount_set_metadata:0,
        amount_pause:0,
        amount_mint:0,
        amount_declare_ownership:0,
        amount_claim_ownership:0,
        amount_burn:0,
        amount_balance_of:0
      }
    }
  },
  async created(){
    this.storage_disabled = true;
    this.store = nft.Storage_type_decode(await this.get_storage())
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
    update_operators_for_allCall: async function(){
      console.log('Entrypoint : update_operators_for_all called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_update_operators_for_all,
        to: this.kt1,
        parameter: { entrypoint:'update_operators_for_all', value: nft.update_operators_for_all_encode(this.ep.param_update_operators_for_all) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    update_operatorsCall: async function(){
      console.log('Entrypoint : update_operators called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_update_operators,
        to: this.kt1,
        parameter: { entrypoint:'update_operators', value: nft.update_operators_encode(this.ep.param_update_operators) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
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
        parameter: { entrypoint:'unpause', value: nft.unpause_encode(this.ep.param_unpause) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    transferCall: async function(){
      console.log('Entrypoint : transfer called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_transfer,
        to: this.kt1,
        parameter: { entrypoint:'transfer', value: nft.transfer_encode(this.ep.param_transfer) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_whitelistCall: async function(){
      console.log('Entrypoint : set_whitelist called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_whitelist,
        to: this.kt1,
        parameter: { entrypoint:'set_whitelist', value: nft.set_whitelist_encode(this.ep.param_set_whitelist) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_token_metadataCall: async function(){
      console.log('Entrypoint : set_token_metadata called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_token_metadata,
        to: this.kt1,
        parameter: { entrypoint:'set_token_metadata', value: nft.set_token_metadata_encode(this.ep.param_set_token_metadata) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_metadataCall: async function(){
      console.log('Entrypoint : set_metadata called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_metadata,
        to: this.kt1,
        parameter: { entrypoint:'set_metadata', value: nft.set_metadata_encode(this.ep.param_set_metadata) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
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
        parameter: { entrypoint:'pause', value: nft.pause_encode(this.ep.param_pause) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    mintCall: async function(){
      console.log('Entrypoint : mint called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_mint,
        to: this.kt1,
        parameter: { entrypoint:'mint', value: nft.mint_encode(this.ep.param_mint) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    declare_ownershipCall: async function(){
      console.log('Entrypoint : declare_ownership called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_declare_ownership,
        to: this.kt1,
        parameter: { entrypoint:'declare_ownership', value: nft.declare_ownership_encode(this.ep.param_declare_ownership) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    claim_ownershipCall: async function(){
      console.log('Entrypoint : claim_ownership called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_claim_ownership,
        to: this.kt1,
        parameter: { entrypoint:'claim_ownership', value: nft.claim_ownership_encode(this.ep.param_claim_ownership) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    burnCall: async function(){
      console.log('Entrypoint : burn called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_burn,
        to: this.kt1,
        parameter: { entrypoint:'burn', value: nft.burn_encode(this.ep.param_burn) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    balance_ofCall: async function(){
      console.log('Entrypoint : balance_of called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_balance_of,
        to: this.kt1,
        parameter: { entrypoint:'balance_of', value: nft.balance_of_encode(this.ep.param_balance_of) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = nft.Storage_type_decode(await this.get_storage())
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
