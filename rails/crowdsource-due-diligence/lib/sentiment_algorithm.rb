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

  def is_tricky? word, lib
    lib.include?(word)
  end

  def get_sentiment valence, msg
  # TBD if negation should result in opposite valence
    msg = words(msg)
    libs = get_libs(valence)
    matches = []
    libs[:lookup].each {|word| matches << word if msg.include?(word)}
    msg.each.with_index do |word, ind|
      if matches.include?(word)
        edge_cases = [
                      negated?(msg[ind-1]),
                      is_tricky?(msg[ind+1], libs[:reject])
                     ]
        return true unless edge_cases.any? {|edge_case| edge_case == true }
      end
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
        (results[:positive] += 1) && (valence = true) if get_sentiment(:positive, msg)
        (results[:negative] += 1) && (valence = true) if get_sentiment(:negative, msg)
        results[:neutral] += 1 unless valence
        # use control flow to remove valence once msgs to have only one sentiment
        # also rename lookup to something more semantic
      end
    end
    results
  end
end
