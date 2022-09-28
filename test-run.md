```
❯ npm test

> fractible-demo@1.0.0 test /Users/florianpautot/workspace/perso/fractible-demo
> ./run_test.sh



  Contracts deployment
Originate settings:
  network       : ghost
  contract      : royalties
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair None (Pair 10 (Pair 10000 (Pair {} (Pair {} {Elt "" 0x}))))))
  total cost    : 0.532242 ꜩ
Waiting for confirmation of origination for KT1DsJ4jZJ4hnUBUhoCfvFQGA4z45P24eJnH ...
Origination completed for KT1DsJ4jZJ4hnUBUhoCfvFQGA4z45P24eJnH named royalties.
https://better-call.dev/ghostnet/KT1DsJ4jZJ4hnUBUhoCfvFQGA4z45P24eJnH
    ✔ Royalties contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : users_storage
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair None (Pair {} (Pair {} {Elt "" 0x}))))
  total cost    : 0.452917 ꜩ
Waiting for confirmation of origination for KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ ...
Origination completed for KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ named users_storage.
https://better-call.dev/ghostnet/KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ
    ✔ Whitelist storage contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : sales_storage
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair None (Pair None (Pair None (Pair {} (Pair {} {Elt "" 0x}))))))
  total cost    : 1.333713 ꜩ
Waiting for confirmation of origination for KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT ...
Origination completed for KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT named sales_storage.
https://better-call.dev/ghostnet/KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT
    ✔ Sales storage contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : transfer_manager
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair "KT1DsJ4jZJ4hnUBUhoCfvFQGA4z45P24eJnH" (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair {} (Pair {} (Pair None {Elt "" 0x}))))))
  total cost    : 2.368936 ꜩ
Waiting for confirmation of origination for KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz ...
Origination completed for KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz named transfer_manager.
https://better-call.dev/ghostnet/KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz
    ✔ Transfer Manager contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : whitelist
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair "KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ" (Pair None (Pair False (Pair {} (Pair {} {}))))))
  total cost    : 1.33913 ꜩ
Waiting for confirmation of origination for KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A ...
Origination completed for KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A named whitelist.
https://better-call.dev/ghostnet/KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A
Originate settings:
  network       : ghost
  contract      : get_user_callback
  as            : alice
  send          : 0 ꜩ
  storage       : None
  total cost    : 0.079477 ꜩ
Waiting for confirmation of origination for KT1Sb5uHTk4yRQVLo4ziRzTjus1RuCFEcvhz ...
Origination completed for KT1Sb5uHTk4yRQVLo4ziRzTjus1RuCFEcvhz named get_user_callback.
https://better-call.dev/ghostnet/KT1Sb5uHTk4yRQVLo4ziRzTjus1RuCFEcvhz
    ✔ Whitelist contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : sales
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair 0 (Pair "KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz" (Pair "KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT" (Pair None (Pair 10 (Pair 10000 {Elt "" 0x})))))))
  total cost    : 1.942113 ꜩ
Waiting for confirmation of origination for KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2 ...
Origination completed for KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2 named sales.
https://better-call.dev/ghostnet/KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2
    ✔ Sales contract deployment should succeed
Originate settings:
  network       : ghost
  contract      : fa2
  as            : alice
  send          : 0 ꜩ
  storage       : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair "KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A" (Pair None (Pair False (Pair {Elt 0 (Pair 0 {Elt "" 0x697066733a2f2f516d645756794865776b6b316e387562356f594a39647850505234776a446f47747a68523556713246454a6f745a})} (Pair {} (Pair {} (Pair {} {Elt "" 0x697066733a2f2f516d515a75436e58653167325754767a505a58533135553567665a753865454d755065704d706141795550734171}))))))))
  total cost    : 1.44163 ꜩ
Waiting for confirmation of origination for KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN ...
Origination completed for KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN named fa2.
https://better-call.dev/ghostnet/KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN
Originate settings:
  network       : ghost
  contract      : balance_of_callback
  as            : alice
  send          : 0 ꜩ
  storage       : None
  total cost    : 0.107087 ꜩ
Waiting for confirmation of origination for KT1TdYwJ7m6SKKmj9mtx28KswfEjTxk6yTR8 ...
Origination completed for KT1TdYwJ7m6SKKmj9mtx28KswfEjTxk6yTR8 named balance_of_callback.
https://better-call.dev/ghostnet/KT1TdYwJ7m6SKKmj9mtx28KswfEjTxk6yTR8
    ✔ NFT contract deployment should succeed

  Set up
Call settings:
  network       : ghost
  contract      : KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A
  as            : alice
  send          : 0 ꜩ
  entrypoint    : update_transfer_list
  argument      : (Pair 0 (Some {True; {0}}))
  total cost    : 0.019679 ꜩ
Waiting for opUGobvtD5Xrm6vTAo8Lg1M9odTMAy9pFBtFQEsxfxVUFvkUNJM to be confirmed...
Operation injected: https://tzstats.com/opUGobvtD5Xrm6vTAo8Lg1M9odTMAy9pFBtFQEsxfxVUFvkUNJM
    ✔ Set up whitelist permission should succeed
Call settings:
  network       : ghost
  contract      : KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT
  as            : alice
  send          : 0 ꜩ
  entrypoint    : set_sales_contract
  argument      : "KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2"
  total cost    : 0.007417 ꜩ
Waiting for oorsJYAS9ARNDRJvNNaVDUqFnWvaMJG1Dd6jkjzgu8Rn7npQoDH to be confirmed...
Operation injected: https://tzstats.com/oorsJYAS9ARNDRJvNNaVDUqFnWvaMJG1Dd6jkjzgu8Rn7npQoDH
    ✔ Set sales contract in sales storage should succeed
Call settings:
  network       : ghost
  contract      : KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz
  as            : alice
  send          : 0 ꜩ
  entrypoint    : authorize_contract
  argument      : "KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2"
  total cost    : 0.007621 ꜩ
Waiting for ooWeBjw31FsMJDB12UT1T3n9pACrqjSeeGgdLcMXKMn5JR6RkMx to be confirmed...
Operation injected: https://tzstats.com/ooWeBjw31FsMJDB12UT1T3n9pACrqjSeeGgdLcMXKMn5JR6RkMx
Call settings:
  network       : ghost
  contract      : KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz
  as            : alice
  send          : 0 ꜩ
  entrypoint    : authorize_contract
  argument      : "KT1BTeCrJHRyQv4wex1gXg5HtM66t7AcxScT"
  total cost    : 0.007235 ꜩ
Waiting for opZvfDoZ583DGpDUvm5dC3NQtTZ5jGd2WxsvjrQoSJWBeF5D1wo to be confirmed...
Operation injected: https://tzstats.com/opZvfDoZ583DGpDUvm5dC3NQtTZ5jGd2WxsvjrQoSJWBeF5D1wo
    ✔ Authorize sales contracts in transfer manager should succeed
Call settings:
  network       : ghost
  contract      : KT1HgFgj3ESmunYAJp5KJDSBY1EgZptceDjJ
  as            : alice
  send          : 0 ꜩ
  entrypoint    : add_whitelister
  argument      : "KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A"
  total cost    : 0.007365 ꜩ
Waiting for op8gTZm4W2BRJ3ZZ3RbS9QPJbrX5wTB1MqrZGNaDC3RP4HiTAgt to be confirmed...
Operation injected: https://tzstats.com/op8gTZm4W2BRJ3ZZ3RbS9QPJbrX5wTB1MqrZGNaDC3RP4HiTAgt
Call settings:
  network       : ghost
  contract      : KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A
  as            : alice
  send          : 0 ꜩ
  entrypoint    : add_whitelister
  argument      : "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
  total cost    : 0.007232 ꜩ
Waiting for onn5TFaSF81w48YMUiqK91RbDi56sE5WrauH9wLVmPJkHBupsZ6 to be confirmed...
Operation injected: https://tzstats.com/onn5TFaSF81w48YMUiqK91RbDi56sE5WrauH9wLVmPJkHBupsZ6
Call settings:
  network       : ghost
  contract      : KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A
  as            : alice
  send          : 0 ꜩ
  entrypoint    : add_super_user
  argument      : "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
  total cost    : 0.007231 ꜩ
Waiting for oo3QSbgFCzAUK8B6yu3quN48KKQj1VGty47rfMJPqUSbuWYmcSd to be confirmed...
Operation injected: https://tzstats.com/oo3QSbgFCzAUK8B6yu3quN48KKQj1VGty47rfMJPqUSbuWYmcSd
    ✔ Add Alice as whitelister should succeed
Call settings:
  network       : ghost
  contract      : KT1Lp1fjXqFot2qNVFeJecSfqDNVUSYfwf9A
  as            : alice
  send          : 0 ꜩ
  entrypoint    : update_users
  argument      : {Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Some 0); Pair "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6" (Some 0); Pair "tz1aGDrJ58LbcnD47CkwSk3myfTxJxipYJyk" (Some 0)}
  total cost    : 0.051422 ꜩ
Waiting for opU4FTHRykPFhRvazZnyKGTsqYjgm73RzNyrD6BasNXqRmFtXTY to be confirmed...
Operation injected: https://tzstats.com/opU4FTHRykPFhRvazZnyKGTsqYjgm73RzNyrD6BasNXqRmFtXTY
    ✔ Add Alice, Bob and Carl to whitelist should succeed
Call settings:
  network       : ghost
  contract      : KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN
  as            : alice
  send          : 0 ꜩ
  entrypoint    : mint
  argument      : (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 0 3)
  total cost    : 0.017548 ꜩ
Waiting for ootVP1eCfJivxqpkuNnkWjinMfV3JzX8zRX42cJc7tWxqMXXS13 to be confirmed...
Operation injected: https://tzstats.com/ootVP1eCfJivxqpkuNnkWjinMfV3JzX8zRX42cJc7tWxqMXXS13
    ✔ Mint NFT
Call settings:
  network       : ghost
  contract      : KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN
  as            : alice
  send          : 0 ꜩ
  entrypoint    : update_operators
  argument      : {Left (Pair "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" (Pair "KT1Q9jZ5ZzRMwqq4UBbYySy8RCfmkJMJXCdz" 0))}
  total cost    : 0.017312 ꜩ
Waiting for onmfDVNZvDHRDoVMft17irAvtwezWD5JHYaikvmQb2d9omAwLSs to be confirmed...
Operation injected: https://tzstats.com/onmfDVNZvDHRDoVMft17irAvtwezWD5JHYaikvmQb2d9omAwLSs
    ✔ Update operator NFT

  Sell NFT
Call settings:
  network       : ghost
  contract      : KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2
  as            : alice
  send          : 0 ꜩ
  entrypoint    : sell
  argument      : (Pair "KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN" 0 0 0x (Pair {} (Pair {} (Pair 100000 (Pair 10 (Pair None (Pair None (Pair 10000 (Pair None None)))))))))
  total cost    : 0.025524 ꜩ
Waiting for ooKZfrNfhe19LHNpj5NT2xEmLRZ7yqXa1dg69LQ7DYxWDjb9dZH to be confirmed...
Operation injected: https://tzstats.com/ooKZfrNfhe19LHNpj5NT2xEmLRZ7yqXa1dg69LQ7DYxWDjb9dZH
    ✔ Sell NFT as Alice should succeed

  Buy NFT
    1) Buy NFT as User1 should fail
Call settings:
  network       : ghost
  contract      : KT1XqWrpTZ1DCN4u7ciFQ7fV9wRxoi2yxoq2
  as            : bob
  send          : 0.1 ꜩ
  entrypoint    : buy
  argument      : (Pair "KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN" 0 "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" 0 0x 1 {} {})
  total cost    : 0.01961 ꜩ
Waiting for ooEU56gtbLjujFxMrQNA6DNNc5FR24irJifEVPiQd6rqegrg4Uv to be confirmed...
Operation injected: https://tzstats.com/ooEU56gtbLjujFxMrQNA6DNNc5FR24irJifEVPiQd6rqegrg4Uv
    ✔ Buy NFT as Bob should succeed


  16 passing (7m)
  1 failing

  1) Buy NFT
       Buy NFT as User1 should fail:
     Error: Error from contract KT1CYte91EQcHzMX9vdTRUjyLycFQLiHSBWN (fa2):
failed at 100 with "TO_RESTRICTED"
      at callTransfer (node_modules/@completium/completium-cli/src/main.js:2332:15)
      at runMicrotasks (<anonymous>)
      at processTicksAndRejections (internal/process/task_queues.js:95:5)
      at async Object.callContract (node_modules/@completium/completium-cli/src/main.js:2728:15)
      at async Object.call (node_modules/@completium/completium-cli/src/completium.js:59:12)



npm ERR! Test failed.  See above for more details.
```