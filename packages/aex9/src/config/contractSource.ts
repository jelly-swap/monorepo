export default `
include "List.aes"
@compiler >= 4

contract AEX9Token =
  record meta_info =
    { name : string
    , symbol : string
    , decimals : int }

  record allowance_accounts = { from_account : address, for_account : address }
  type allowances = map(allowance_accounts, int)

  datatype event =
    Transfer(address, address, int)
    | Allowance(address, address, int)
    | Burn(address, int)
    | Mint(address, int)
    | Swap(address, int)

  entrypoint aex9_extensions      : ()                      => list(string)
  entrypoint meta_info            : ()                      => meta_info
  entrypoint total_supply         : ()                      => int
  entrypoint owner                : ()                      => address
  entrypoint balances             : ()                      => map(address, int)
  entrypoint balance              : (address)               => option(int)
  entrypoint transfer             : (address, int)          => unit
  entrypoint allowances           : ()                      => allowances
  entrypoint allowance            : (allowance_accounts)    => option(int)
  entrypoint allowance_for_caller : (address)               => option(int)
  entrypoint transfer_allowance   : (address, address, int) => unit
  entrypoint create_allowance     : (address, int)          => unit
  entrypoint change_allowance     : (address, int)          => unit
  entrypoint reset_allowance      : (address)               => unit
  entrypoint burn                 : (int)                   => unit
  entrypoint mint                 : (address, int)          => unit
  entrypoint swap                 : ()                      => unit
  entrypoint check_swap           : (address)               => int
  entrypoint swapped              : ()                      => map(address, int)

contract HashTimeLock =
  datatype status = INVALID | ACTIVE | REFUNDED | WITHDRAWN | EXPIRED

  datatype event =
    Withdraw(hash, address, address, string)
    | Refund(hash, address, address, string)
    | New_contract(hash, address, address, string)

  stateful entrypoint new_contract     : (int, int, int, hash, address, AEX9Token, string, string)  => unit
  stateful entrypoint withdraw         : (hash, hash, AEX9Token)                                    => unit
  stateful entrypoint refund           : (hash, AEX9Token)                                          => unit
  entrypoint get_one_status            : (hash)                                                     => status
  entrypoint get_many_status           : (list(hash))                                               => list(status)
  entrypoint generate_id               : (address, address, int, hash, int)                         => hash
`;
