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
                      <a-typography-text type='warning' code>nat</a-typography-text> <a-typography-text strong>protocol_fee</a-typography-text>
                        <span v-if='store'>: {{ store.protocol_fee }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>transfer_manager</a-typography-text>
                        <span v-if='store'>: {{ store.transfer_manager }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>address</a-typography-text> <a-typography-text strong>sales_storage</a-typography-text>
                        <span v-if='store'>: {{ store.sales_storage }}</span>
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
                      <a-typography-text type='warning' code>nat</a-typography-text> <a-typography-text strong>max_bundle_items</a-typography-text>
                        <span v-if='store'>: {{ store.max_bundle_items }}</span>
                      </a-space>

</a-list-item>
<a-list-item>
                      <a-space>
                      <a-typography-text type='warning' code>nat</a-typography-text> <a-typography-text strong>max_fees_limit</a-typography-text>
                        <span v-if='store'>: {{ store.max_fees_limit }}</span>
                      </a-space>

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
<a-collapse-panel header='Entrypoint: set_transfer_manager'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_transfer_manager' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_transfer_manager' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_transfer_managerCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_sales_storage_contract'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_sales_storage_contract' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_sales_storage_contract' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_sales_storage_contractCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_sales_storage'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='text' v-model:value='ep.param_set_sales_storage' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_sales_storage' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_sales_storageCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_protocol_fee'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='number' v-model:value='ep.param_set_protocol_fee' min='0' placeholder='Positive number: 9344' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_protocol_fee' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_protocol_feeCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_max_bundle_items'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='number' v-model:value='ep.param_set_max_bundle_items' min='0' placeholder='Positive number: 26685' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_max_bundle_items' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_max_bundle_itemsCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: set_fees_limit'>
<a-form>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
</a-col>
                          <a-col :span='19'><a-input type='number' v-model:value='ep.param_set_fees_limit' min='0' placeholder='Positive number: 80182' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_set_fees_limit' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='set_fees_limitCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: sell'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>s_asset_contract</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_asset_contract' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>s_asset_token_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_asset_token_id' min='0' placeholder='Positive number: 31641' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>int</a-typography-text>
                                      <a-typography-text strong>s_sale_type</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale_type' placeholder='Integer number: 30439' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
                                      <a-typography-text strong>s_sale_asset</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_sale_asset' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-card title='s_sale object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>sale_origin_fees</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                              <a-typography-text strong>part_account</a-typography-text>
</a-col>
                                                              <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_sale.sale_origin_fees[0].part_account' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                              <a-typography-text strong>part_value</a-typography-text>
</a-col>
                                                              <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale.sale_origin_fees[0].part_value' min='0' placeholder='Positive number: 7500' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>sale_payouts</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                              <a-typography-text strong>part_account</a-typography-text>
</a-col>
                                                              <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_sale.sale_payouts[0].part_account' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                              <a-typography-text strong>part_value</a-typography-text>
</a-col>
                                                              <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale.sale_payouts[0].part_value' min='0' placeholder='Positive number: 44104' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>sale_amount</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale.sale_amount' min='0' placeholder='Positive number: 7020' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>sale_asset_qty</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale.sale_asset_qty' min='0' placeholder='Positive number: 19921' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>timestamp</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='time' v-model:value='ep.param_sell.s_sale.sale_start' step='1' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>timestamp</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='time' v-model:value='ep.param_sell.s_sale.sale_end' step='1' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>sale_max_fees_base_boint</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_sell.s_sale.sale_max_fees_base_boint' min='0' placeholder='Positive number: 78370' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_sale.sale_data_type' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_sell.s_sale.sale_data' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

<a-alert type='warning' message='Option are not fully supported yet.' closable show-icon />

</a-list></a-card>
</a-form-item>

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_sell' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='sellCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: default'>
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
                        <a-input type='number' min='0' v-model:value='senders.amount__default' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='_defaultCall' block :disabled='ep.disabled'>Call</a-button>
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
<a-collapse-panel header='Entrypoint: cancel_sale'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>cs_asset_contract</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_cancel_sale.cs_asset_contract' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>cs_asset_token_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_cancel_sale.cs_asset_token_id' min='0' placeholder='Positive number: 55217' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>int</a-typography-text>
                                      <a-typography-text strong>cs_sale_type</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_cancel_sale.cs_sale_type' placeholder='Integer number: -23115' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
                                      <a-typography-text strong>cs_sale_asset</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_cancel_sale.cs_sale_asset' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_cancel_sale' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='cancel_saleCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
<a-collapse-panel header='Entrypoint: buy'>
<a-form>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>b_asset_contract</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_buy.b_asset_contract' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>b_asset_token_id</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_buy.b_asset_token_id' min='0' placeholder='Positive number: 95949' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                      <a-typography-text strong>b_seller</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_buy.b_seller' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>int</a-typography-text>
                                      <a-typography-text strong>b_sale_type</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_buy.b_sale_type' placeholder='Integer number: 48678' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>byte</a-typography-text>
                                      <a-typography-text strong>b_sale_asset</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='text' v-model:value='ep.param_buy.b_sale_asset' placeholder='Bytes: f456afe90fb6...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                      <a-typography-text strong>b_amount</a-typography-text>
</a-col>
                                      <a-col :span='19'><a-input type='number' v-model:value='ep.param_buy.b_amount' min='0' placeholder='Positive number: 3615' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>b_origin_fees</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                  <a-typography-text strong>part_account</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_buy.b_origin_fees[0].part_account' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>part_value</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_buy.b_origin_fees[0].part_value' min='0' placeholder='Positive number: 44412' />
</a-col>
</a-row>
</a-form-item>

</a-list></a-card>
</a-form-item>

</a-col>
</a-row>
</a-form-item>
<a-alert type='warning' message='You can only send one element (should be fixed soon).' closable show-icon />

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>list</a-typography-text><a-typography-text strong>b_payouts</a-typography-text>
</a-col>
<a-col :span='19'>
<a-form-item>
<a-card title=' object'>
<a-list>
<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>address</a-typography-text>
                                                  <a-typography-text strong>part_account</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='text' v-model:value='ep.param_buy.b_payouts[0].part_account' placeholder='Address: tz1xxx...' />
</a-col>
</a-row>
</a-form-item>

<a-form-item>
<a-row>
<a-col :span='5'>
<a-typography-text type='warning' code>nat</a-typography-text>
                                                  <a-typography-text strong>part_value</a-typography-text>
</a-col>
                                                  <a-col :span='19'><a-input type='number' v-model:value='ep.param_buy.b_payouts[0].part_value' min='0' placeholder='Positive number: 62401' />
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

<a-form-item>
<a-row>
<a-col :span='12'>
                        <a-input type='number' min='0' v-model:value='senders.amount_buy' placeholder='Default: 0'>
<template #prefix>
<a-typography-text type='warning'>Amount</a-typography-text>
</template>
<template #suffix>
&#42793;</template>
</a-input>
</a-col>
<a-col :span='12'>
                        <a-button type='primary' @click='buyCall' block :disabled='ep.disabled'>Call</a-button>
</a-col>
</a-row>
</a-form-item></a-form>
              </a-collapse-panel>
          </a-collapse>
</template>
<script>
import { TezosToolkit } from '@taquito/taquito'
import * as functolib from '../functolib'
import * as sales from '../sales_interface'
import { BeaconWallet } from '@taquito/beacon-wallet'
export default {
  props: ['factori'],
  name: 'sales',
  data: function(){
    return {
      storage_disabled: false,
      tz1: 'Connect wallet',
      network: 'ghostnet',
      kt1: 'KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2',
      store : null,
      ep :{
        disabled: false,
        param_set_transfer_manager: '',
        param_set_sales_storage_contract: '',
        param_set_sales_storage: '',
        param_set_protocol_fee: 0,
        param_set_max_bundle_items: 0,
        param_set_fees_limit: 0,
        param_sell: { s_asset_contract : '',s_asset_token_id : 0,s_sale_type : 0,s_sale_asset : '',s_sale : { sale_origin_fees : [{ part_account : '',part_value : 0 }],sale_payouts : [{ part_account : '',part_value : 0 }],sale_amount : 0,sale_asset_qty : 0,sale_start : '',sale_end : '',sale_max_fees_base_boint : 0,sale_data_type : '',sale_data : '' } },
        param__default: null,
        param_declare_ownership: '',
        param_claim_ownership: null,
        param_cancel_sale: { cs_asset_contract : '',cs_asset_token_id : 0,cs_sale_type : 0,cs_sale_asset : '' },
        param_buy: { b_asset_contract : '',b_asset_token_id : 0,b_seller : '',b_sale_type : 0,b_sale_asset : '',b_amount : 0,b_origin_fees : [{ part_account : '',part_value : 0 }],b_payouts : [{ part_account : '',part_value : 0 }] }
      },
      senders :{
        amount_set_transfer_manager:0,
        amount_set_sales_storage_contract:0,
        amount_set_sales_storage:0,
        amount_set_protocol_fee:0,
        amount_set_max_bundle_items:0,
        amount_set_fees_limit:0,
        amount_sell:0,
        amount__default:0,
        amount_declare_ownership:0,
        amount_claim_ownership:0,
        amount_cancel_sale:0,
        amount_buy:0
      }
    }
  },
  async created(){
    this.storage_disabled = true;
    this.store = sales.Storage_type_decode(await this.get_storage())
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
    set_transfer_managerCall: async function(){
      console.log('Entrypoint : set_transfer_manager called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_transfer_manager,
        to: this.kt1,
        parameter: { entrypoint:'set_transfer_manager', value: sales.set_transfer_manager_encode(this.ep.param_set_transfer_manager) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_sales_storage_contractCall: async function(){
      console.log('Entrypoint : set_sales_storage_contract called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_sales_storage_contract,
        to: this.kt1,
        parameter: { entrypoint:'set_sales_storage_contract', value: sales.set_sales_storage_contract_encode(this.ep.param_set_sales_storage_contract) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_sales_storageCall: async function(){
      console.log('Entrypoint : set_sales_storage called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_sales_storage,
        to: this.kt1,
        parameter: { entrypoint:'set_sales_storage', value: sales.set_sales_storage_encode(this.ep.param_set_sales_storage) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_protocol_feeCall: async function(){
      console.log('Entrypoint : set_protocol_fee called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_protocol_fee,
        to: this.kt1,
        parameter: { entrypoint:'set_protocol_fee', value: sales.set_protocol_fee_encode(this.ep.param_set_protocol_fee) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_max_bundle_itemsCall: async function(){
      console.log('Entrypoint : set_max_bundle_items called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_max_bundle_items,
        to: this.kt1,
        parameter: { entrypoint:'set_max_bundle_items', value: sales.set_max_bundle_items_encode(this.ep.param_set_max_bundle_items) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    set_fees_limitCall: async function(){
      console.log('Entrypoint : set_fees_limit called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_set_fees_limit,
        to: this.kt1,
        parameter: { entrypoint:'set_fees_limit', value: sales.set_fees_limit_encode(this.ep.param_set_fees_limit) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    sellCall: async function(){
      console.log('Entrypoint : sell called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_sell,
        to: this.kt1,
        parameter: { entrypoint:'sell', value: sales.sell_encode(this.ep.param_sell) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    _defaultCall: async function(){
      console.log('Entrypoint : _default called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount__default,
        to: this.kt1,
        parameter: { entrypoint:'_default', value: sales._default_encode(this.ep.param__default) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
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
        parameter: { entrypoint:'declare_ownership', value: sales.declare_ownership_encode(this.ep.param_declare_ownership) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
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
        parameter: { entrypoint:'claim_ownership', value: sales.claim_ownership_encode(this.ep.param_claim_ownership) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    cancel_saleCall: async function(){
      console.log('Entrypoint : cancel_sale called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_cancel_sale,
        to: this.kt1,
        parameter: { entrypoint:'cancel_sale', value: sales.cancel_sale_encode(this.ep.param_cancel_sale) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
      }
      catch(error){
        console.log(error)
      }
        this.ep.disabled = false;
        this.storage_disabled = false;
    },
    buyCall: async function(){
      console.log('Entrypoint : buy called')
      this.ep.disabled = true;
            this.storage_disabled = true;
      this.factori.tezos.setWalletProvider(this.factori.wallet)
      let arg = {
        amount: this.senders.amount_buy,
        to: this.kt1,
        parameter: { entrypoint:'buy', value: sales.buy_encode(this.ep.param_buy) }
      }
      try{
        const op = await this.factori.tezos.wallet.transfer(arg).send()
        await op.confirmation();
        this.store = sales.Storage_type_decode(await this.get_storage())
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
