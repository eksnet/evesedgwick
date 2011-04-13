module Jekyll

  class Post

    alias_method :orig_initialize, :initialize
    def initialize(site, source, dir, name)
      orig_initialize(site, source, dir, name)
      self.tags ||= []
      if self.data['meta']
        self.data['meta'].each do |d|
          if d['sort']
            tag = d['value'].to_s.downcase
            if d['key'] == 'type'
              puts "KEY: #{d['key']}"
              tag=tag.en.plural
              puts "TAG: #{tag}"
            end
            self.tags << tag
          end
        end
      end
    end

  end

  class Site

    # Returns [{<collection.title> => [{'name' => <attribute>, 'posts' => [{},{},{},{}]}]
    def collection_by_attribute(collection, attribute)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      collection.keys.each do |item|
        attribute_hash = collect_by_attribute(attribute, collection[item])
        type_array = make_iterable(attribute_hash, :index => 'name', :items => 'posts')
        hash[item] << type_array
      end
      return hash
    end
    
    def collect_by_attribute(attribute, posts)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      posts.each do |post|
        if post.data[attribute]
          hash[post.data[attribute]] << post
        end  
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| a.slug <=> b.slug}
      end
      return hash
    end
    
    def make_iterable(kv_hash, options)
      options = {:index => 'name', :items => 'items'}.merge(options)
      result = []
      kv_hash.sort.each do |key, value|
        result << { options[:index] => key, options[:items] => value }
      end
      result
    end

    # Redefine site_payload to include our new method.
    alias_method :orig_site_payload, :site_payload
    def site_payload
      payload = orig_site_payload
      payload['site']['types'] = self.collect_by_attribute('type', self.posts)
      payload['site']['categories_by_type'] = self.collection_by_attribute(self.categories, 'type')
      payload['site']['tags_by_category'] = self.collection_by_attribute(self.tags, 'category')
      payload
    end

  end
end
