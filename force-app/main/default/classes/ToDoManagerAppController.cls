public with sharing class ToDoManagerAppController {
  @AuraEnabled(cacheable=true)
  public static List<Task_Manager__c> loadAllIncompleteTasks() {
    return [
      SELECT id, name, Task_Date__c
      FROM Task_Manager__c
      WHERE Is_Completed__c = FALSE AND ownerid = :UserInfo.getUserId()
      ORDER BY Task_Date__c ASC
    ];
  }

  @AuraEnabled(cacheable=true)
  public static List<Task_Manager__c> loadAllCompleteTasks() {
    return [
      SELECT id, name, Completed_Date__c
      FROM Task_Manager__c
      WHERE Is_Completed__c = TRUE AND ownerid = :UserInfo.getUserId()
      ORDER BY Completed_Date__c DESC
    ];
  }
}
