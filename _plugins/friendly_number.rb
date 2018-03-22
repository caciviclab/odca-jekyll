$unit = ['', 'K', 'M', 'B', 'T']

module Jekyll
  module FriendlyNumberFilter
    # Formats a number with a unit 1750 => 1.7K
    def friendly_number(number)
      unless number.is_a? Numeric
        return number
      end

      $iterations = 0
      while number / 1000 >= 1 && $iterations < $unit.size do
        number = number / 1000.0
        $iterations += 1
      end

      # If number is less than 10, include a decimal
      $format = number < 10 ? '%.1f%s' : '%d%s'
      $format % [number, $unit[$iterations]]
    end

    # Adds thousands separator
    # https://codereview.stackexchange.com/a/28100
    def comma_number(number)
      unless number.is_a? Numeric
        return number
      end

      whole, decimal = number.to_s.split(".")
      whole_with_commas = whole.chars.to_a.reverse.each_slice(3).map(&:join).join(",").reverse
      [whole_with_commas, decimal].compact.join(".")
    end

    # Shortcut for number | floor | comma_number | prepend:'$'
    def dollars(number)
      unless number.is_a? Numeric
        return number
      end

      '$%s' % comma_number(number.floor)
    end
  end
end

Liquid::Template.register_filter(Jekyll::FriendlyNumberFilter)
