for (List<Contact> conList : [
  SELECT id, name, title, Picture__c, Rank__c
  FROM Contact
  LIMIT 10
]) {
  for (Contact con : conList) {
    con.Picture__c = 'https://yt3.googleusercontent.com/y9piLaXzea8Z805cDMdh2yjRdxRiWJ0w_wTrtFjiPhA8P9iKN4L8IOW1DFFlZY8hNFSouTKvv7c=s900-c-k-c0x00ffffff-no-rj';

    if (String.isBlank(con.Title)) {
      con.Rank__c = 3;
    } else {
      con.rank__c = 8;
    }
  }
  update conList;
}
