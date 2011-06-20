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
  
  
  # The BlogIndex class creates a single category page for the specified category.
  class BlogIndex < Page
    
    # Initializes a new BlogIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +category_dir+ is the String path between <source> and the category folder.
    #  +category+     is the category currently being processed.
    def initialize(site, base, page_dir, page, pages)
      @site = site
      @base = base
      @dir  = page_dir
      @name = 'index.html'
      self.process(@name)
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), 'blog_index.html')
      # Set the title for this page.
      title_prefix             = site.config['category_title_prefix'] || ''
      self.data['title']       = "#{title_prefix}page#{page}"
      self.data['page']        = page
      self.data['previous']    = page - 1
      self.data['next']        = page + 1
      self.data['pages']       = pages
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['category_meta_description_prefix'] || ''
      self.data['description'] = "#{meta_description_prefix}#{page}"
    end
    
  end
  
  
  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site
    
    # Creates an instance of BlogIndex for each category page, renders it, and 
    # writes the output to a file.
    #
    #  +category_dir+ is the String path to the category folder.
    #  +category+     is the category currently being processed.
    def write_blog_page(page_dir, page, pages)
      index = BlogIndex.new(self, self.source, page_dir, page, pages)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index
    end
    
    # Loops through the list of category pages and processes each one.
    def write_blog_pages
      if self.layouts.key? 'blog_index'
        dir = self.config['blog_dir'] || ''
        bposts = self.categories['blog']
        i=0
        page=1
        pages=self.categories['blog'].length/self.config['posts_per_page']
        while i<pages
          self.write_blog_page(File.join(dir, 'blog', 'page'+page.to_s), page, pages)
          page+=1
          i+=1
        end
      # Throw an exception if the layout couldn't be found.
      else
        throw "No 'category_index' layout found."
      end
    end
    
  end
  
  
  # Jekyll hook - the generate method is called by jekyll, and generates all of the category pages.
  class GenerateBlog < Generator
    safe true
    priority :low

    def generate(site)
      puts "entering generate with #{site}"
      site.write_blog_pages
    end

  end
  
end