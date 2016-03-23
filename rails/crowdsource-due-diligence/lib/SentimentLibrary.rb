module SentimentLibrary

  def negative_library
    file='lib/opinion_lexicon_english/negative_words.txt'
    File.readlines(file).collect{|line| line.chomp}
  end

  def positive_library
    file='lib/opinion_lexicon_english/positive_words.txt'
    File.readlines(file).collect{|line| line.chomp}
  end
end
