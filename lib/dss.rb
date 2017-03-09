class DSS
  def initialize
    def default_parser(output)
      output[:line][:contents]
    end

    def state_parser(output)
      state = output[:line][:contents].split(' - ');
      [{
        name: (state[0]) ? trim_whitespace(state[0]) : '',
        escaped: (state[0]) ? trim_whitespace(state[0].gsub('.', ' ').gsub(':', ' pseudo-class-')) : '',
        description: (state[1]) ? trim_whitespace(state[1]) : ''
      }];
    end

    def markup_parser(output)
      [{
        example: output[:line][:contents],
        escaped: output[:line][:contents].gsub(/</, '&lt;').gsub(/>/, '&gt;')
      }]
    end

    @parsers = {
      name: method(:default_parser),
      description: method(:default_parser),
      state: method(:state_parser),
      markup: method(:markup_parser)
    }
  end

  def detect(line)
    if !line.is_a?(String)
      false
    end
    reference = line.split("\n\n").pop
    !!(/.*@/).match(reference)
  end

  def detector(callback)
    # TODO: Figure out how to do this, or why it's even necessary
    # DSS.class_eval do
    #   %Q{def detect(args) #{callback}.call(args) end}
    # end
  end

  def parser(name, callback)
    @parsers[name.to_sym] = callback
  end

  def alias(newName, oldName)
    @parsers[newName.to_sym] = @parsers[oldName.to_sym]
  end

  def parse_line(_temp, line, block, file, from, to, options)
    temp = _temp
    parts = line.gsub(/.*@/, '')
    index = parts.index(' ') || parts.index(/\n/) || parts.index(/\r/) || parts.length
    name = trim_whitespace(parts[0..index]).to_sym
    output = {
      options: options,
      file: file,
      name: name,
      line: {
        contents: nil,
        from: block.index(line),
        to: block.index(line)
      },
      block: {
        contents: block,
        from: from,
        to: to
      }
    }

    next_parser_index = block.index('@', output[:line][:from] + 1)
    markup_length = !next_parser_index.nil? ? next_parser_index - output[:line][:from] : block.length
    parser_marker = "@#{name}"
    contents = block.split('').slice(output[:line][:from], markup_length).join('').gsub(parser_marker, '')
    output[:line][:contents] = trim_whitespace(normalize(contents))

    new_line = {}
    new_line[name] = !@parsers[name.to_sym].nil? ? @parsers[name.to_sym].call(output) : ''

    if (temp[name])
      if !temp[name].is_a?(Array)
        temp[name] = [temp[name]]
      end
      if !new_line[name].is_a?(Array)
        temp[name].push(new_line[name])
      else
        temp[name].push(new_line[name][0])
      end
    else
      temp = temp.merge(new_line)
    end
    temp
  end

  def parse(lines, options = {})
    current_block = ''
    inside_single_line_block = false
    inside_multi_line_block = false
    unparsed_blocks = []
    trimmed = ''
    parsed_blocks = []
    temp = {}
    line_num = 0
    from = 0
    to = 0

    lines.to_s.split(/\n/).each do |line|
      line_num += 1

      if single_line_comment(line) || start_multi_line_comment(line)
        from = line_num
      end

      if single_line_comment(line)
        trimmed = trim_single_line(line)
        if inside_single_line_block
          current_block += "\n#{trimmed}"
        else
          current_block = trimmed
          inside_single_line_block = true
        end
      end

      if start_multi_line_comment(line) || inside_multi_line_block
        trimmed = trim_multi_line(line)
        if inside_multi_line_block
          current_block += "\n#{trimmed}"
        else
          current_block += trimmed
          inside_multi_line_block = true
        end
      end

      if end_multi_line_comment(line)
        inside_multi_line_block = false
      end

      if !single_line_comment(line) && !inside_multi_line_block
        if current_block
          unparsed_blocks.push({ text: normalize(current_block), from: from, to: line_num })
        end
        inside_single_line_block = false
        current_block = ''
      end
    end

    unparsed_blocks.each do |_block|
      from = _block[:from]
      to = _block[:to]
      block = _block[:text].split(/\n/).select do |line|
        line.length > 0
      end
      block = block.join("\n")

      block.split(/\n/).each do |line|
        if detect(line)
          temp = parse_line(temp, normalize(line), block, lines, from, to, options)
        end
      end

      if temp.length > 0
        parsed_blocks.push(temp)
      end
      temp = {}
    end
    { blocks: parsed_blocks }
  end

  private

  def trim_whitespace(str)
    patterns = [/\A\s\s*/, /\s\s*\z/]
    trimmed_str = str
    patterns.each do |regEx|
      trimmed_str = trimmed_str.gsub(regEx, '')
    end
    trimmed_str
  end

  def single_line_comment(line)
    !!(/\A\s*\/\//).match(line)
  end

  def start_multi_line_comment(line)
    !!(/\A\s*\/\*/).match(line)
  end

  def trim_single_line(line)
    line.gsub(/\s*\/\//, '')
  end

  def trim_multi_line(line)
    line.gsub(/\A.*(\/\*|\*\/|\*)+/, '')
  end

  def end_multi_line_comment(line)
    if single_line_comment(line)
      false
    end
    !!(/.*\*\//).match(line)
  end

  def normalize(text_block)
    indent_size = nil
    normalized = text_block.split(/\n/).map do |line|
      preceding_whitespace = (/\A\s*/).match(line)[0].length
      indent_size = preceding_whitespace unless indent_size
      if line === ''
        ''
      elsif (indent_size <= preceding_whitespace) && (indent_size > 0)
        line[indent_size..line.length]
      else
        line
      end
    end
    normalized.join("\n")
  end
end
