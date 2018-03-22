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
      if number < 10
        '%.1f%s' % [number.round(1), $unit[$iterations]]
      else
        '%d%s' % [number.round, $unit[$iterations]]
      end
    end

    # Adds thousands separator
    # https://codereview.stackexchange.com/a/28100
    def comma_number(number)
      unless number.is_a? Numeric or number.is_a? String
        return number
      end

      whole, decimal = number.to_s.split(".")
      whole_with_commas = whole.chars.to_a.reverse.each_slice(3).map(&:join).join(",").reverse
      [whole_with_commas, decimal].compact.join(".")
    end

    # Format as money with dollars and cents
    def money(number)
      unless number.is_a? Numeric
        return number
      end

      $is_negative = number < 0
      if $is_negative
        number *= -1
      end

      $money = '$%s' % comma_number(number.round(2))
      $is_negative ? '(%s)' % $money : $money
    end

    # Shortcut for number | floor | comma_number | prepend:'$'
    def dollars(number)
      unless number.is_a? Numeric
        return number
      end

      $is_negative = number < 0
      if $is_negative
        number *= -1
      end

      $money = '$%s' % comma_number(number.round)
      $is_negative ? '(%s)' % $money : $money
    end
  end
end

Liquid::Template.register_filter(Jekyll::FriendlyNumberFilter)
