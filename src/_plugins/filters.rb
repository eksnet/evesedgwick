#############################
# filters.rb
#
# Filters are helper functions used in the templates to add functionality
# that would be difficult or cumbersome to achieve within the liquid language
# https://help.shopify.com/en/themes/liquid/filters
# These filters are added specifically to support the EKS site.
#############################


require 'linguistics'
Linguistics::use( :en, :classical => true )         # extends Array, String, and Numeric


module Jekyll
  # Adds some extra filters used during the tag creation process.
  module EKSFilters

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
          if item == 'blog'
            '<a href="/'+item+'/page1">'+item.upcase+'</a>'
          else
            '<a href="/'+item+'/">'+item.upcase+'</a>'
          end
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
        if item == 'blog'
          '<a href="/'+item+'/page1">'+item.upcase+'</a>'
        else
          '<a href="/'+item+'/">'+item.upcase+'</a>'
        end
      end
    end

    # outputs a link tag for a given sub-category
    def sub_category_link(sub_category, category)
      if category.respond_to?('each')
        category = category[0]
      end
      '<a href="/'+category+'/'+sub_category+'/">'+sub_category.upcase+'</a>'
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

    # Outputs the prettified date if provided, or formats a nil.
    def no_date(input)
      if input
        if input == 'ND' or input == 'none'
          'DATE UNKNOWN'
        else
          input.to_s.upcase
        end
      end
    end

    # Outputs the prettified location if provided, or formats a nil.
    def no_location(input)
      if input
        if input=='none'
          ''
        else
          input.upcase+', '
        end
      end
    end

    # Outputs the prettified 'with' if provided, or formats a nil.
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

    # Outputs the plural form of a provided word
    def plural(input)
      input.dup.en.plural
    end

    # Outputs the input if provided, or empty string for nil
    def none(input)
      if input == 'none'
        ''
      else
        input
      end
    end

    # Outputs the appropriate "width" of a carousel for `input` number of images
    # N.B.: "width" is the size of the scrollable area, not the visible width.
    def carousel_width(input)
      width = (input.to_i * 138) - 18
      if width < 622
        622
      else
        width
      end
    end

    def thumb_count(input)
      input.to_i
    end

    # Outputs the html-ified version of the provided textile string.
    def textilize(input)
      RedCloth.new(input).to_html
    end

  end
end

Liquid::Template.register_filter(Jekyll::EKSFilters)
