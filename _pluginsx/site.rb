=begin

This module allows you to define a type of posts. Enabling this for a
post allows you to easily get the related posts so that you can show the
user "previous" and "next" links, a table of contents, etc.

To enable this for a post, add the following in the posts YAML front
matter. The name attribute is an arbitrary string to group posts into a
type. The index attribute describes where the current post lives in
relation to its siblings.

type: 
  name:  The Name of the Series
  index: 1

=end

module Jekyll

    class Post
   
      attr_accessor :type

      alias type_initialize initialize
      def initialize(site, source, dir, name)      
        type_initialize site, source, dir, name
        #self.type = { :name => self.data['type']['name'], :index => self.data['type']['index'].to_i } if self.data['type']
        self.type = self.data['type'] if self.data['type']
      end

      alias type_to_liquid to_liquid
      def to_liquid
        if self.type
          type_to_liquid.deep_merge({ "types" => self.types })
        else
          type_to_liquid
        end
      end

      def types
        posts = self.site.posts.select { |p| p.type && p.type == self.type }
        posts.sort_by { |p| p.type }
      end


   end
 
  class TypesTag < Liquid::Tag
    safe = true
    
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      html = ""
      tags = context.registers[:site].tags
      avg = tags.inject(0.0) {|memo, tag| memo += tag[1].length} / tags.length
      weights = Hash.new
      tags.each {|tag| weights[tag[0]] = tag[1].length/avg}
      tags.each do |tag, posts|
        html << "<span style='font-size: #{sprintf("%d", weights[tag] * 100)}%'><a href='/tags/#{tag}/'>#{tag}</a></span>\n"
      end
      html
    end
  end
end

Liquid::Template.register_tag('typesett', Jekyll::TypesTag)