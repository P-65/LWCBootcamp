public with sharing class AccountHelper {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [
      SELECT id, name, industry, rating
      FROM account
      WITH USER_MODE
    ];
  }
}
