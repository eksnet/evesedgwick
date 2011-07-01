
require 'linguistics'
Linguistics::use( :en )         # extends Array, String, and Numeric
Linguistics::classical=true


module Jekyll

  # Adds some extra filters used during the tag creation process.
  module Filters

    # Outputs a list of tags as comma-separated <a> links. This is used
    # to output the tag list for each post on a tag page.
    #
    #  +tags+ is the list of tags to format.
    #
    # Returns string
    def tag_links(tags)
      tags = tags.sort!.map do |item|
        if item
          '<a href="/'+item+'/">'+item.upcase+'</a>'
        end
      end

      connector = " "
      case tags.length
      when 0
        ""
      when 1
        tags[0].to_s
      when 2
        "#{tags[0]},  #{tags[1]}"
      else
        "#{tags[0...-1].join(', ')}, #{connector} #{tags[-1]}"
      end
    end

    # Outputs a list of categories as comma-separated <a> links. This is used
    # to output the category list for each post on a category page.
    #
    #  +categories+ is the list of categories to format.
    #
    # Returns string
    def category_link(category)
      if category.respond_to?('each')
        categories = category.sort!.map do |item|
          '<a href="/'+item+'/">'+item.upcase+'</a>'
        end

        connector = "and"
        case categories.length
        when 0
          ""
        when 1
          categories[0].to_s
        when 2
          "#{categories[0]} #{connector} #{categories[1]}"
        else
          "#{categories[0...-1].join(', ')}, #{connector} #{categories[-1]}"
        end
      else
        item = category
        '<a href="/'+item+'/">'+item.upcase+'</a>'
      end  
    end

    def sub_category_link(sub_category, category)
      if category.respond_to?('each')
        category = category[0]
      end
      '<a href="/'+category+'/'+sub_category+'/">'+sub_category.upcase+'</a>'
    end
    
     def resource_link(category)
        if category.respond_to?('each')
          categories = category.sort!.map do |item|
            '<a href="/'+item+'/">'+item.upcase+'</a>'
          end

          connector = "and"
          case categories.length
          when 0
            ""
          when 1
            categories[0].to_s
          when 2
            "#{categories[0]} #{connector} #{categories[1]}"
          else
            "#{categories[0...-1].join(', ')}, #{connector} #{categories[-1]}"
          end
        else
          item = category
          '<a href="/'+item+'/'+item+'.html">'+item.upcase+'</a>'
        end  
      end

    # Returns string
    def meta_link(meta, tags)
      meta=meta.to_s
      meta_plural=meta.en.plural
      if tags
        tags = tags.keys.sort!.map do |item|
          item.downcase
        end
      end
      if tags.include?(meta.downcase)
        '<a href="/tag/'+meta.downcase+'/">'+meta+'</a>'
      elsif tags.include?(meta_plural.downcase)
        '<a href="/tag/'+meta_plural.downcase+'/">'+meta+'</a>'
      else
        meta
      end

    end

    # Outputs the post.date as formatted html, with hooks for CSS styling.
    #
    #  +date+ is the date object to format as HTML.
    #
    # Returns string
    def date_to_html_string(date)
      result = '<span class="month">' + date.strftime('%b').upcase + '</span> '
      result += date.strftime('<span class="day">%d</span> ')
      result += date.strftime('<span class="year">%Y</span> ')
      result
    end

    def no_date(input)
      if input
        if input == 'ND' or input == 'none'
          'DATE UNKNOWN'
        else
          input.to_s.upcase
        end
      end
    end
    def no_location(input)
      if input
        if input=='none'
          ''
        else
          input.upcase+', '
        end
      end
    end
    def no_with(input)
      if input
      if input == 'ND' or input == 'none'
        ''
      else
        ' (with '+input+')'
      end
    else
      ''
      end
    end

    def plural(input)
      input.dup.en.plural
    end
    
    def carousel_width(input)
      (input.to_i * 138) - 18
    end
  end

end