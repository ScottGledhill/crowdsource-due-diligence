doesItSuck.factory('presentationFactory', [ function() {
  var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
  var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};
  var SNARKY = [
                "Big fucking deal",
                "No shit",
                "Fuck-a-doodle-doo",
                "Who would have thought",
                "Amazing",
                "Who cares",
                "How surprising"
              ];

  var methods = {
    evaluateSearch: evaluateSearch,
    getFullColorScheme: getFullColorScheme,
    getColorScheme: getColorScheme,
    insertHTML: insertHTML,
    getFontColor: getFontColor,
    operator: operator,
    getOutcome: getOutcome,
    snarkyComment: snarkyComment
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

  function operator(comparison) {
    if (comparison[0].score > comparison[1].score) {
      return ">";
    } else if (comparison[0].score < comparison[1].score) {
      return "<";
    } else {
      return "=";
    }
  }

  function snarkyComment() {
    var index = Math.floor(Math.random()*SNARKY.length);
    return SNARKY[index];
  }

  function getOutcome(comparison) {
    var winner;
    var loser;
    if (comparison[0].score > comparison[1].score) {
      winner = comparison[0].search_term;
      loser = comparison[1].search_term;
    } else if (comparison[0].score < comparison[1].score) {
      winner = comparison[1].search_term;
      loser = comparison[0].search_term;
    } else {
      return comparison[0] + " and " + comparison[1] + " both suck equally hard.";
    }
    loser = loser.charAt(0).toUpperCase() + loser.slice(1);
    return loser + " sucks worse than " + winner;
  }

  function getFullColorScheme(search) {
    var evaluated = evaluateSearch(search);
    return COLORCHOICE[evaluated];
  }

  function getColorScheme(search){
    return (search.winner) ? COLORCHOICE['DOESN\'T SUCK'] : COLORCHOICE['SUCKS'];
  }

  function getFontColor(score) {
    if(score > 0){return "positive-word";}
    if(score === 0){return "neutral-word";}
    if(score < 0){return "negative-word";}
  }


  function insertHTML(messages){
    messages.forEach(function(msg){
      insertSentimentClass(msg);
      insertKeyWordClass(msg, 'posWords', 'positive');
      insertKeyWordClass(msg, 'negWords', 'negative');
    });
  }


  function insertKeyWordClass(msg, keyWords, sentiment){
    var re;
    msg[keyWords].forEach(function(word){
      re = new RegExp(word, "gi");
      msg.content = msg.content.replace(re,"<span class='" + sentiment + "-word big-font'>" + word + "</span>");
    });
  }

  function insertSentimentClass(msg){
    var sentiment = msg.sentiment;
    msg.content = "<span class='" + sentiment +"-message'>" + msg.content +"</span>";
  }

}]);
