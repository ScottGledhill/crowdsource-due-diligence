doesItSuck.factory('presentationFactory', [ function() {
  var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
  var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

  var chart =  {colors: ['#02D606', '#FFC400', '#FF2626'],
               series:  ['Positive', 'Neutral', 'Negative'],
               labels:  ['7 days ago', '4 days ago', 'Yesterday']};

  var methods = {
    evaluateSearch:evaluateSearch,
    getFullColorScheme: getFullColorScheme,
    getColorScheme: getColorScheme,
    insertHTML: insertHTML,
    getChart: getChart
  };

  return methods;

  function getChart() {
    return chart;
  }

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
