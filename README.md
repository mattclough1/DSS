![DSS](http://cl.ly/image/2p0C122U0N32/logo.png)
- **[Official Logo](http://cl.ly/image/2p0C122U0N32/logo.png)**

**DSS**, Documented Style Sheets is a comment guide and parser for CSS, LESS, STYLUS, SASS and SCSS code. This project does static file analysis and parsing to generate an object to be used for generating styleguides.


##### Table of Contents

- [Parsing a File](#parsing-a-file)
  - ~~dss.detector~~ (Removed in this version of the Ruby port)
  - [`dss.parser`](#dssparser-name-callback-)
- [Other Projects](#other-projects)

### Parsing a File

##### Example Comment Block Format


```scss
//
// @name Button
// @description Your standard form button.
//
// @state :hover - Highlights when hovering.
// @state :disabled - Dims the button when disabled.
// @state .primary - Indicates button is the primary action.
// @state .smaller - A smaller button
//
// @markup
//   <button>This is a button</button>
//
````

##### Example Usage

```ruby
# Requirements
require 'dss'

# Get file contents
css = File.read('path/to/styles.css')

# Run the DSS Parser on the file contents
parsed = dss.parse(fileContents);
````

##### Example Output
```ruby
{
  :name => "Button",
  :description => "Your standard form button.",
  :state => [
    {
      :name => ":hover",
      :escaped => "pseudo-class-hover",
      :description => "Highlights when hovering."
    },
    {
      :name => ":disabled",
      :escaped => "pseudo-class-disabled",
      :description => "Dims the button when disabled."
    },
    {
      :name => ".primary",
      :escaped => "primary",
      :description => "Indicates button is the primary action."
    },
    {
      :name => ".smaller",
      :escaped => "smaller",
      :description => "A smaller button"
    }
  ],
  :markup => {
    :example => "<button>This is a button</button>",
    :escaped => "&lt;button&gt;This is a button&lt;/button&gt;"
  }
}
````

#### DSS.parser(name, callback(output))

**DSS**, by default, includes 4 parsers for the `name`, `description`, `state` and `markup` of a comment block. You can add to, or override, these defaults by registering a new parser. These defaults also follow a pattern which uses the `@` decorator to identify them. You can modify this behaivour providing a different callback function to `dss.detector()`.

`dss.parser` expects the name of the variable you're looking for and a callback function to manipulate the contents. Whatever is returned by that callback function is what is used in the generated hash.

##### Callback `output`:

- `output[:file]`: The current file
- `output[:name]`: The name of the parser
- `output[:options]`: The options that were passed to `dss.parse()` initially
- `output[:line]`:
  - `output[:line][:contents]`: The content associated with this variable
  - `output[:line][:from]`: The line number where this variable was found
  - `output[:line][:to]`: The line number where this variable's contents ended
- `output[:block]`:
  - `output[:block][:contents]`: The content associated with this variable's comment block
  - `output[:block][:from]`: The line number where this variable's comment block starts
  - `output[:block][:to]`: The line number where this variable's comment block ends


##### Custom Parser Examples:

```ruby
# Matches @version
def version_parser(output)
  # Just returns the line's contents
  output[:line][:contents]
end
dss.parser(:version, method(:version_parser))
````

```ruby
def link_parser(output)
  exp = /(b(https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/i
  new_output = output
  new_output[:line][:contents].gsub(exp, "<a href='$1'>\\1</a>")
  new_output
end
dss.parser(:link, method(:link_parser));
````
