public with sharing class AccountHelper {
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts(String industryInput) {
    return [
      SELECT id, name, industry, rating
      FROM account
      WHERE industry = :industryInput
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

  @AuraEnabled
  public static String updateTicker(String recordId, String tickerValue) {
    Account acc = new Account();
    acc.Id = recordId;
    acc.TickerSymbol = tickerValue;
    try {
      update acc;
      return 'SUCCESS';
    } catch (Exception e) {
      return e.getMessage();
    }
  }
}
