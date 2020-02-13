#############################
# types.rb
#
# This plugin generates a variety of listings that are added to the Jekyll
# `site` variable at build time. These lists/schema are used by templates
# e.g. to retrieve all posts in a given category, or find all tags belonging
# to posts in a particular sub-category.
#############################


module Jekyll

  class Post

    alias_method :orig_initialize, :initialize
    # Removes blank or duplicate tags from a post
    def initialize(site, source, dir, name)
      orig_initialize(site, source, dir, name)
      self.tags.compact!
      self.tags.uniq!
    end

  end

  class Site

    # 2nd-order classifier used to categorize the list values
    # within a hash of shape { key: [{},{}], key2: [{}, {}]}
    # returns {"blog"=>[{"name"=>"blog", "posts"=>[, , , , , , , , , ]}]], "archive"=>[[{"name"=>"art", "posts"=>[, , , , , , , ]}, {"name"=>"teaching", "posts"=>[, , , , , ]}] }
    def collection_by_attribute(collection, attribute)
      hash = Hash.new { |hash, key| hash[key] = [] }
      collection.keys.each do |item|
        attribute_hash = collect_by_attribute(attribute, collection[item])

        type_array = make_iterable(attribute_hash, :index => 'name', :items => 'posts')
        hash[item] = type_array
      end
      return hash
    end

    # Categorizes an array of items (collection) by the provided attibute.
    # e.g: collect_by_attribute('category', self.posts.docs)
    # Returns { 'blog' => [{},{},{},{}], 'work' => [{},{},{}], ... }
    def collect_by_attribute(attribute, posts)
      hash = Hash.new { |hash, key| hash[key] = [] }
      posts.each do |post|
        if post.data[attribute]
          if post.data[attribute].respond_to?('each')
            post.data[attribute].each do |att|
              hash[att] << post
            end
          else
            hash[post.data[attribute]] << post
          end
        end
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| a.data['slug'] <=> b.data['slug']}
      end
      return hash
    end

    # Returns {"name"=>"000025-01", "images"=>[, ]}{"name"=>"bodhi", "images"=>[, , , , , ]}{"name"=>"cedar-creek", "images"=>[, , , , ]}}
    def make_iterable(kv_hash, options)
      options = {:index => 'name', :items => 'items'}.merge(options)
      result = []
      kv_hash.sort.each do |key, value|
        result << { options[:index] => key, options[:items] => value }
      end
      result
    end

    def collect_albums(posts)
      hash = Hash.new { |hash, key| hash[key] = [] }
      posts.each do |post|
        if post.data['type'] == 'image'
          post.data['albums'].each do |album|
              hash[album] << post
          end
        end
      end
      hash.values.map do |sort|
        sort.sort! {|a, b| a.data['slug'] <=> b.data['slug'] }
      end
      return hash
    end

    def collect_bibliography(posts)
      bib=posts['writing']
      bib.each do |p|
        p['posts'].sort! {|a, b| b.data['pub-date'] <=> a.data['pub-date']}
      end
      return bib
    end

    def collect_tags(posts)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      posts.each do |post|
        if post.data['tags'].respond_to?('each')
          post.data['tags'].each do |att|
            hash[att] << post
          end
        else
          hash[post.data['tags']] << post
        end
      end
      return hash
    end

    def collect_blogposts(posts)
      hash = Hash.new { |hash, key| hash[key] = Array.new }
      blogposts=posts['blog']
      i=0
      page=1
      pagelimit=self.config['posts_per_page']
      blogposts.sort! {|a, b| b.date <=> a.date}
      blogposts.each do |p|
        if i<pagelimit
          i+=1
        else
          page+=1
          i=1
        end
        hash['Page '+page.to_s] << p
      end

      return hash
    end

    # Redefine site_payload to include our new method.
    alias_method :orig_site_payload, :site_payload

    # Note about "x_by_y" collections: The nomenclature here is opposite of what
    # one might expect. For instance, when using 'categories_by_sub', usage is
    # categories_by_sub['art'], which returns a hash of subs: { "artwork" => [posts], ... }
    # in other words, use categories_by_sub['category']['sub-category'] to retrieve posts for that sub
    def site_payload
      payload = orig_site_payload
      # Custom collections
      payload['site']['sub-categories'] = self.collect_by_attribute('sub-category', self.posts.docs)
      payload['site']['types'] = self.collect_by_attribute('type', self.posts.docs)
      payload['site']['navs'] = self.collect_by_attribute('nav', self.posts.docs)
      payload['site']['navs_by_tag'] = self.collect_by_attribute('nav', self.posts.docs).inject({}) { |m, (sub, posts)| m[sub] = self.collect_tags(posts); m }
      payload['site']['albums'] = self.collect_albums(self.posts.docs)
      payload['site']['bibliography'] = self.collect_bibliography(self.collection_by_attribute(self.categories, 'sub-category'))
      payload['site']['blog-pages'] = self.collect_blogposts(self.categories)
      payload['site']['categories_by_tag'] = self.collect_by_attribute('category', self.posts.docs).inject({}) { |m, (sub, posts)| m[sub] = self.collect_tags(posts); m }

      # Usage: site.categories_by_sub['art']['artwork'] => [{}, {}, {}]
      payload['site']['categories_by_sub'] = self.collection_by_attribute(self.categories, 'sub-category')
      # sort 'writing' by pub-date
      payload['site']['categories_by_sub']['writing'].each {|cat|
        cat['posts'].sort! {|a, b| a.data['pub-date'] <=> b.data['pub-date']}
      }

      # Usage: site.subs_by_tag['artwork'] => [ 'proust': [{}, {}], 'calendars': [{}, {}]]
      payload['site']['subs_by_tag'] = self.collect_by_attribute('sub-category', self.posts.docs).inject({}) { |m, (sub, posts)| m[sub] = self.collect_tags(posts); m }
      payload['site']['subs_by_type'] = self.collect_by_attribute('sub-category', self.posts.docs).inject({}) { |m, (sub, posts)| m[sub] = self.collect_by_attribute('type', posts); m }

      # sort 'exhibitions' by exhibition-date
      payload['site']['categories_by_sub']['art'].each {|sub|
        if sub['name'] == 'exhibitions'
          sub['posts'].sort! {|a, b| a.data['exhibition-date'] <=> b.data['exhibition-date']}
        end
      }
      payload['site']['tags_by_category'] = self.collection_by_attribute(self.tags, 'category')
      payload['site']['navs_by_category'] = self.collection_by_attribute(payload['site']['navs'], 'category')
      payload['site']['sub-categories_by_tag'] = self.collection_by_attribute(payload['site']['sub-categories'], 'tags')
      payload
    end

  end
end
