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
              tag=tag.en.plural
            end
            unless tag == 'none'
              self.tags << tag
            end
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
      # Custom collections
      payload['site']['sub-categories'] = self.collect_by_attribute('sub-category', self.posts)
      payload['site']['navs'] = self.collect_by_attribute('nav', self.posts)
      # Collections by attribute
      payload['site']['categories_by_sub'] = self.collection_by_attribute(self.categories, 'sub-category')
      payload['site']['tags_by_category'] = self.collection_by_attribute(self.tags, 'category')
      payload['site']['navs_by_category'] = self.collection_by_attribute(payload['site']['navs'], 'category')
      # Iterable collections
      payload['site']['iterable_categories'] = self.make_iterable(self.categories, :index => 'name', :items => 'posts')
      payload['site']['iterable_navs'] = self.make_iterable(payload['site']['navs'], :index => 'name', :items => 'posts')
      payload
    end

  end
end
