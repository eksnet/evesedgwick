module Jekyll

  class Site

    def types
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      self.posts.each do |post|
        hash[post.data['type']] << post
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| b.data['type'] <=> a.data['type']}
      end
      return hash
    end

    def categories_by_type
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      self.categories.keys.each do |cat|
        type_h = Hash.new { |hash, key| hash[key] = Array.new }
        self.categories[cat].each do |post|
          type_h['type'] << post.data['type']
          type_h['posts'] << post 
        end
        hash[cat] << type_h
      end
      return hash
    end

    # Redefine site_payload to include our new method.
    alias_method :orig_site_payload, :site_payload
    def site_payload
      payload = orig_site_payload
      payload['site']['types'] = self.types
      payload['site']['categories_by_type'] = self.categories_by_type
      payload
    end

  end
end
