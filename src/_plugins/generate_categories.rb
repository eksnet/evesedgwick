# Jekyll category page generator.
# http://recursive-design.com/projects/jekyll-plugins/
#
# Version: 0.1.3 (201101061053)
#
# Copyright (c) 2010 Dave Perrett, http://recursive-design.com/
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
#
# A generator that creates category pages for jekyll sites.
#
# To use it, simply drop this script into the _plugins directory of your Jekyll site. You should
# also create a file called 'category_index.html' in the _layouts directory of your jekyll site
# with the following contents (note: you should remove the leading '# ' characters):
#
# ================================== COPY BELOW THIS LINE ==================================
# ---
# layout: default
# ---
#
# <h1 class="category">{{ page.title }}</h1>
# <ul class="posts">
# {% for post in site.categories[page.category] %}
#     <div>{{ post.date | date_to_html_string }}</div>
#     <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
#     <div class="categories">Filed under {{ post.categories | category_links }}</div>
# {% endfor %}
# </ul>
# ================================== COPY ABOVE THIS LINE ==================================
#
# You can alter the _layout_ setting if you wish to use an alternate layout, and obviously you
# can change the HTML above as you see fit.
#
# When you compile your jekyll site, this plugin will loop through the list of categories in your
# site, and use the layout above to generate a page for each one with a list of links to the
# individual posts.
#
# Included filters :
# - category_links:      Outputs the list of categories as comma-separated <a> links.
# - date_to_html_string: Outputs the post.date as formatted html, with hooks for CSS styling.
#
# Available _config.yml settings :
# - category_dir:          The subfolder to build category pages in (default is 'categories').
# - category_title_prefix: The string used before the category name in the page title (default is
#                          'Category: ').
module Jekyll


  # The CategoryIndex class creates a single category page for the specified category.
  class CategoryIndex < Page

    # Initializes a new CategoryIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +category_dir+ is the String path between <source> and the category folder.
    #  +category+     is the category currently being processed.
    def initialize(site, base, category_dir, nav, category, sub)
      @site = site
      @base = base
      @dir  = category_dir
      @name = 'index.html'
      self.process(@name)
      layout = "category_posts.html"
      title = "#{category.capitalize} - #{sub.capitalize}"
      description = "#{nav} - #{category}#{sub != 'all' ? ' - ' + sub : ''}"
      if category == 'all' and sub == 'all'
        title = nil
        layout = "category_listing.html"
      elsif sub == 'all'
        title = category.capitalize
        layout = "sub_category_listing.html"
      end
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), layout)
      self.data['nav']         = nav
      self.data['category']    = category
      self.data['sub']         = sub
      # Set the title for this page.
      self.data['title']       = title
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['category_meta_description_prefix'] || ''
      self.data['description'] = "#{meta_description_prefix} #{description}"
    end

  end

  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site

    # Creates an instance of CategoryIndex for each category page, renders it, and
    # writes the output to a file.
    #
    #  +category_dir+ is the String path to the category folder.
    #  +category+     is the category currently being processed.
    def write_category_index(category_dir, nav, category, sub)
      index = CategoryIndex.new(self, self.source, category_dir, nav, category, sub)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index
    end

    # Loops through the list of category pages and processes each one.
    def write_category_indexes
      dir = self.config['category_dir'] || ''
      nav_hash = self.collect_by_attribute('nav', self.posts.docs)
      nav_by_cat = self.collection_by_attribute(nav_hash, 'category')
      cat_by_sub = self.collection_by_attribute(self.categories, 'sub-category')
      nav_hash.keys.each do |nav|
        self.write_category_index(File.join(dir, nav), nav, 'all', 'all')
        nav_by_cat[nav].each do |category|
          self.write_category_index(File.join(dir, category['name']), nav, category['name'], 'all')
          cat_by_sub[category['name']].each do |sub|
            self.write_category_index(File.join(dir, category['name'], sub['name']), nav, category['name'],  sub['name'])
          end
        end
      end
    end
  end


  # Jekyll hook - the generate method is called by jekyll, and generates all of the category pages.
  class GenerateCategories < Generator
    safe true
    priority :low

    def generate(site)
      puts "entering generate TYPES with #{site}"
      site.write_category_indexes
    end

  end

end
