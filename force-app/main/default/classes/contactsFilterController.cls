public with sharing class contactsFilterController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactsList(
    String accountId,
    String industry
  ) {
    List<String> filters = new List<String>();
    String query = 'Select id,name,title,phone,email,photourl from Contact';
    if (String.isNotBlank(accountId)) {
      filters.add('AccountId = :accountId');
    }
    if (String.isNotBlank(industry)) {
      filters.add('Contact.Account.Industry = :industry');
    }
    if (!filters.isEmpty()) {
      query += ' where ' + String.join(filters, 'AND');
      query += ' With USER_MODE ';
      query += ' ORDER BY Name';
      System.debug('Query ' + query);
    }
    System.debug('Query ' + query);
    List<Contact> conList = Database.query(query);
    return conList;
  }
}
