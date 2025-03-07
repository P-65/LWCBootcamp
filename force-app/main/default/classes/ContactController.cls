public with sharing class ContactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactsList() {
    List<Contact> conList = [
      SELECT id, name, title, phone, email, PhotoUrl
      FROM contact
      WHERE PhotoUrl != NULL
      WITH USER_MODE
      LIMIT 10
    ];
    return conList;
  }
}
