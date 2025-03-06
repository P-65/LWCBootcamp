public with sharing class CustomLookupApexController {
  @AuraEnabled(cacheable=true)
  public static List<sObject> getRecords(
    String objectApiName,
    String searchKey
  ) {
    List<sObject> sObjectsList = new List<sObject>();
    if (String.isNotBlank(searchKey)) {
      String key = '%' + searchKey + '%';
      String queryString =
        'Select Id,Name from ' +
        objectApiName +
        ' where name like : key';
      sObjectsList = Database.query(queryString, accessLevel.USER_MODE);
    }

    return sObjectsList;
  }
}
