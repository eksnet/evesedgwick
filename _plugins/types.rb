module Jekyll

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
      payload
    end

  end
end
