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

    # Returns [<category> => [{'type' => <type>, 'posts' => [{},{},{},{}]},{}]
    def categories_by_attribute(attribute)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      self.categories.keys.each do |cat|
        type_hash = collect_by_attribute(attribute)
        type_array = make_iterable(type_hash, :index => 'name', :items => 'posts')
        hash[cat] << type_array
      end
      return hash
    end

    def attribute_by_category(attribute)
      puts attribute
    end
    
    def collect_by_attribute(attribute)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      self.posts.each do |post|
        hash[post.data[attribute]] << post
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| b.data[attribute] <=> a.data[attribute]}
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
      payload['site']['types'] = self.collect_by_attribute('type')
      payload['site']['categories_by_type'] = self.categories_by_attribute('type')
      self.tags.keys.each do |attribute|
        payload['site']['#{attribute}_by_category'] = self.attribute_by_category(attribute)
      end
      payload
    end

  end
end
