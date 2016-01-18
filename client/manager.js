var Firebase = require("firebase");
var _        = require("lodash");
var firebaseSettlementsRef = new Firebase("https://settlement.firebaseio.com/settlements");
var firebaseEnteringSettlementRef = new Firebase("https://settlement.firebaseio.com/entering_settlements");
var firebaseLeavingSettlementsRef = new Firebase("https://settlement.firebaseio.com/leaving_settlements");
var firebaseJoinSettlementsRef = new Firebase("https://settlement.firebaseio.com/join_requests");

firebaseEnteringSettlementRef.on("value", (dataSnapshot)=>{
  console.log(dataSnapshot.val());
  _.each(dataSnapshot.val(), function(data, key){ 
    firebaseSettlementsRef.transaction(function(currentData){
      var newData = currentData;
      _.each(currentData, function(value, key){
        console.log("checking users for", value.name)
        if(value.name == data.name){
          // add me if im not already there
          var me = _.find(value.people_in_town, function(person, pKey){
            return (person.uid == data.uid)
          });
          if(!me){
            value.people_in_town = value.people_in_town || {};
            value.people_in_town[data.uid] = data;
            value.people_count += 1;
          }
        } else {
          // remove me
          var me = _.find(value.people_in_town, function(person, pKey){
            return (person.uid == data.uid );
          });
          if(me){
            delete value.people_in_town[me.uid];
            value.people_count -= 1;
          }
        }
      });
      return newData;
    }, function(error, commited, snapShot){
      console.log("transaction finished");
    });
    var removeEnterRef = new Firebase("https://settlement.firebaseio.com/entering_settlements/" + key);
    removeEnterRef.remove();   
  }); 
});