module Jekyll

  class Site
    def types

      # Create a tree of the posts by year and then month
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      self.posts.each do |post|
        puts post.data['type']
        hash[post.data['type']] << post
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| b.data['type'] <=> a.data['type']}
      end
      return hash
      
    end

    # Redefine site_payload to include our new method.
    alias_method :orig_site_payload, :site_payload
    def site_payload
      payload = orig_site_payload
      payload['site']['types'] = self.types
      payload
    end

  end
end
