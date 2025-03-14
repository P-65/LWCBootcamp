public with sharing class AccountHelper {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [
      SELECT id, name, industry, rating
      FROM account
      WITH USER_MODE
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Account> getParentAccounts() {
    return [
      SELECT id, name, industry, rating
      FROM account
      WHERE AnnualRevenue != NULL
      WITH USER_MODE
    ];
  }
}
