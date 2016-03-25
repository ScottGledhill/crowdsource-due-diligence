require_relative 'SentimentLibrary'

class SentimentAlgorithm

  include SentimentLibrary

  NEGATORS = ['not', 'isnt', 'arent', 'aint', 'hardly', 'un']

  def words msg
    msg.gsub("'", "").split(/[_\W]+/)
    # have to handle words with quotes and other chars
  end

  def search_term_match? msg, search_term
    msg = msg.downcase
    search_term = search_term.downcase
    if search_term.split(' ').length > 1
      msg.include? search_term
    else
      words(msg).any? { |word| search_term == word }
    end
  end

  def negated? word
    NEGATORS.include?(word)
  end

  def lookup library, msg
  # TBD if negation should result in opposite valence
    msg = words(msg)
    matches = []
    library.each {|word| matches << word if msg.include?(word)}
    msg.each.with_index do |word, ind|
      return true if matches.include?(word) unless negated?(msg[ind-1])
    end
    false
  end

  def compute_sentiment msgs, search_term
    results = { positive: 0, neutral: 0, negative: 0, search_term: search_term}
    msgs.each do |msg|
      # extract separate method for calculating absolute sentiment for each msg
      msg = msg[:content]
      if search_term_match?(msg, search_term)
        valence = false
        (results[:positive] += 1) && (valence = true) if lookup(positive_library, msg)
        (results[:negative] += 1) && (valence = true) if lookup(negative_library, msg)
        results[:neutral] += 1 unless valence
        # use control flow to remove valence once msgs to have only one sentiment
        # also rename lookup to something more semantic
      end
    end
    results
  end
end
