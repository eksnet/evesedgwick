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
        "blog" => "BlogPosting",
        "books authored" => "Book",
        "books and journals edited" => "Book",
        "conferences" => "LiteraryEvent",
        "courses" => "Course",
        "exhibitions" => "ExhibitionEvent",
        "images" => "ImageObject",
        "teaching" => "Course",
      }
      key = ['category', 'sub-category'].select{ |key| @page.data.key?(key) }.last
      categories_types.key?(@page.data[key]) && categories_types[@page.data[key]]
    end

    
    # return a schema.org type in order of preference:
    # 1: user-specified schema_type
    # 2: mapped entity type based on category or sub-category
    # 3: entity based on layout
    def type
      @page.data['schema_type'] || category_type || case @page.data['layout']
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
      if @page.data.key?('index_img')
        "#{baseurl}/images/#{@page.data['index_img']}.jpg"
      elsif @page.data.key?('related-images')
        fname = @page.data['related-images'][0]
        "#{baseurl}/images/#{fname}.jpg"
      elsif @page.data.key?('related_media')
        album_name = @page.data['related_media'].select{|item| item['type'] == 'album'}.first
        album = @site.albums[album_name]
        "#{baseurl}/images/archive/#{album.first.src}"
      end
    end

    def data
      {
        "@context" => "http://schema.org",
        "@type" => type,
        "@id" => "#{baseurl}/#{@page.url.gsub('index.html', '')}" ,
        "image" => image,
        "name" => @page.data['title']
      }
    end

    def json
      JSON.generate(data)
    end
  end
  # The StructuredData class parses front matter for each page and adds a 
  # json_ld attribute on each page that can be used to populate 
  # the json-ld tag in a corresponding liquid template.
  class StructuredData < Generator
    safe true
    priority :low

    def generate(site)
      site.pages.each do |page|
        page.data['json_ld'] = JsonLdItem.new(page, site).json
      end
    end
  end

end