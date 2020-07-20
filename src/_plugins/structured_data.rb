require 'json'

module Jekyll

  class JsonLdItem
    def initialize(page, site)
      @page = page
      @site = site
    end

    def baseurl
      @site.config['canonical_url']
    end

    def category_type
      categories_types = {
        "art" => "VisualArtwork",
        "articles" => "ScholarlyArticle",
        "artworks" => "VisualArtwork",
        "biography" => "Article",
        "blog" => "BlogPosting",
        "books authored" => "Book",
        "books and journals edited" => "Book",
        "conferences" => "LiteraryEvent",
        "courses" => "Course",
        "exhibitions" => "ExhibitionEvent",
        "images" => "ImageObject",
        "teaching" => "Course",
      }
      key = ['category', 'sub-category'].select{ |key| @page.key?(key) }.last
      categories_types.key?(@page[key]) && categories_types[@page[key]]
    end

    
    # return a schema.org type in order of preference:
    # 1: user-specified schema_type
    # 2: mapped entity type based on category or sub-category
    # 3: entity based on layout
    def type
      @page['schema_type'] || category_type || case @page['layout']
        when "post"
          "BlogPosting"
        when "image"
          "ImageObject"
        when "resource"
          "ScholarlyArticle"
        when "work"
          "CreativeWork"
        else 
          "Article"
      end
    end

    def image
      if @page.key?('index_img')
        "#{baseurl}/images/#{@page['index_img']}"
      elsif @page.key?('related-images')
        fname = @page['related-images'][0]
        "#{baseurl}/images/#{fname}.jpg"
      elsif @page.key?('related_media')
        album = @page['related_media'].select{|item| item['type'] == 'album'}
        if album.size > 0
          album_items = @site.config['albums'][album[0]['name']]
          album_items.size > 0 && "#{baseurl}/images/archive/#{album_items.first.data['src']}"
        end
      end
    end

    def data
      {
        "@context" => "http://schema.org",
        "@type" => type,
        "@id" => "#{baseurl}#{@page['url']}" ,
        "image" => image,
        "name" => @page['title']
      }
    end

    def json
      JSON.generate(data)
    end
  end
  
  class JsonLdTag < Liquid::Tag
    def initialize(tag_name, page, tokens)
      super
      @page = page
    end

    def render(context)
      JsonLdItem.new(context.registers[:page], context.registers[:site]).json
    end
  end
end

Liquid::Template.register_tag('json_ld', Jekyll::JsonLdTag)