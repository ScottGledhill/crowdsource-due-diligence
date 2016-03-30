doesItSuck.factory('presentationFactory', [ function() {
  var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
  var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

  var methods = {
    evaluateSearch:evaluateSearch,
    getFullColorScheme: getFullColorScheme,
    getColorScheme: getColorScheme,
    insertHTML: insertHTML
  };

  return methods;

  function evaluateSearch(search) {
    if( search.positive > 1.5 * search.negative) {
      return RESULT_TERMS.positive;
    } else if( search.negative > 1.5 * search.positive) {
      return RESULT_TERMS.negative;
    } else {
      return RESULT_TERMS.neutral;
    }
  }

  function getFullColorScheme(search) {
    var evaluated = evaluateSearch(search);
    return COLORCHOICE[evaluated];
  }

  function getColorScheme(search){
    return (search.winner) ? COLORCHOICE['DOESN\'T SUCK'] : COLORCHOICE['SUCKS'];
  }


  function insertHTML(messages){
    messages.forEach(function(msg){
      insertSentimentClass(msg);
      insertKeyWordClass(msg);
    });
  }

  function insertPositiveWordClass(msg){
    var re;
    msg.posWords.forEach(function(pos){
      re = new RegExp(pos, "gi");
      msg.content = msg.content.replace(re,"<span class='positive-word big-font'>"+pos+"</span>");
    });
  }

  function insertKeyWordClass(msg){
    var re;

  function insertNegativeWordClass(msg){
    var re;
    msg.negWords.forEach(function(neg){
      re = new RegExp(neg, "gi");
      msg.content = msg.content.replace(re,"<span class='negative-word big-font'>"+neg+"</span>");
    });
  }

  function insertSentimentClass(msg){
    var sentiment = msg.sentiment;
    msg.content = "<span class='" + sentiment +"-message'>" + msg.content +"</span>";
  }

}]);
