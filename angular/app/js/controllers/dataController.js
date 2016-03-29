doesItSuck.controller('dataController',['sentimentTrendsFactory', function(sentimentTrendsFactory){
  var self = this;

  getSearchResult();

  function getSearchResult(){
    var results = sentimentTrendsFactory.getSearchResult();
    angular.extend(self, results);
    insertHTML(self.messages);
  }

  function insertHTML(messages){
    messages.forEach(function(msg){
      insertSentimentClass(msg);
      insertPositiveWordClass(msg);
      insertNegativeWordClass(msg);
    });
  }

  function insertPositiveWordClass(msg){
    var re;
    msg.posWords.forEach(function(pos){
      re = new RegExp(pos, "gi");
      msg.content = msg.content.replace(re,"<span class='positive-word'>"+pos+"</span>");
    });
  }

  function insertNegativeWordClass(msg){
    var re;
    msg.negWords.forEach(function(neg){
      re = new RegExp(neg, "gi");
      msg.content = msg.content.replace(re,"<span class='negative-word'>"+neg+"</span>");
    });
  }

  function insertSentimentClass(msg){
    var sentiment = msg.sentiment;
    msg.content = "<span class='" + sentiment +"-message'>" + msg.content +"</span>";
  }

}]);
