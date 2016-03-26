module SentimentLibrary

  def negative_library
    file='lib/opinion_lexicon_english/negative_words.txt'
    File.readlines(file).collect{|line| line.chomp}
  end

  def positive_library
    file='lib/opinion_lexicon_english/positive_words.txt'
    File.readlines(file).collect{|line| line.chomp}
  end

  def get_libs valence
    if valence == :positive
      { lookup: positive_library, reject: negative_library }
    elsif valence == :negative
      { lookup: negative_library, reject: positive_library }
    end
  end

end
