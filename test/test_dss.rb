require 'minitest/autorun'
require 'dss'

class DssTest < Minitest::Test
  def test_parse
    css = File.read('test/data/button.css')
    dss = DSS.new()
    block = dss.parse(css)[:blocks][0]
    assert_equal 'Button', block[:name]
    assert_equal 'Your standard form button.', block[:description]

    assert_equal 2, block[:state].length
    assert_equal ':hover', block[:state][0][:name]
    assert_equal 'Highlights when hovering.', block[:state][0][:description]

    assert_equal '.smaller', block[:state][1][:name]
    assert_equal 'A smaller button', block[:state][1][:description]

    assert_equal 1, block[:markup].length
    assert_equal '<button>This is a button</button>', block[:markup][0][:example]
    assert_equal '&lt;button&gt;This is a button&lt;/button&gt;', block[:markup][0][:escaped]
  end
end
