# Jekyll sub page generator.
# http://recursive-design.com/projects/jekyll-plugins/
#
# Version: 0.1.3 (201101061053)
#
# Copyright (c) 2010 Dave Perrett, http://recursive-design.com/
# Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
#
# A generator that creates sub pages for jekyll sites. 
#
# To use it, simply drop this script into the _plugins directory of your Jekyll site. You should 
# also create a file called 'sub_index.html' in the _layouts directory of your jekyll site 
# with the following contents (note: you should remove the leading '# ' characters):
#
# ================================== COPY BELOW THIS LINE ==================================
# ---
# layout: default
# ---
# 
# <h1 class="sub">{{ page.title }}</h1>
# <ul class="posts">
# {% for post in site.categories[page.sub] %}
#     <div>{{ post.date | date_to_html_string }}</div>
#     <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
#     <div class="categories">Filed under {{ post.categories | sub_links }}</div>
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
# - sub_links:      Outputs the list of categories as comma-separated <a> links.
# - date_to_html_string: Outputs the post.date as formatted html, with hooks for CSS styling.
#
# Available _config.yml settings :
# - sub_dir:          The subfolder to build sub pages in (default is 'categories').
# - sub_title_prefix: The string used before the sub name in the page title (default is 
#                          'Sub: ').
module Jekyll
  
  
  # The SubIndex class creates a single sub page for the specified sub.
  class SubIndex < Page
    
    # Initializes a new SubIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +sub_dir+ is the String path between <source> and the sub folder.
    #  +sub+     is the sub currently being processed.
    def initialize(site, base, sub_dir, sub)
      @site = site
      @base = base
      @dir  = sub_dir
      @name = 'index.html'
      self.process(@name)
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), 'sub_index.html')
      self.data['sub']         = sub
      # Set the title for this page.
      title_prefix             = site.config['sub_title_prefix'] || 'Sub: '
      self.data['title']       = "#{title_prefix}#{sub}"
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['sub_meta_description_prefix'] || 'Sub: '
      self.data['description'] = "#{meta_description_prefix}#{sub}"
    end
    
  end
  
  
  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site
    
    # Creates an instance of SubIndex for each sub page, renders it, and 
    # writes the output to a file.
    #
    #  +sub_dir+ is the String path to the sub folder.
    #  +sub+     is the sub currently being processed.
    def write_sub_index(sub_dir, sub)
      index = SubIndex.new(self, self.source, sub_dir, sub)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index
    end
    
    # Loops through the list of sub pages and processes each one.
    def write_sub_indexes
      if self.layouts.key? 'sub_index'
        dir = self.config['sub_dir'] || 'sub'
        self.collect_by_attribute('sub-category', self.posts).keys.each do |sub|
          puts sub
          self.write_sub_index(File.join(dir, sub), sub)
        end
        
      # Throw an exception if the layout couldn't be found.
      else
        throw "No 'sub_index' layout found."
      end
    end
    
  end
  
  
  # Jekyll hook - the generate method is called by jekyll, and generates all of the sub pages.
  class GenerateSub < Generator
    safe true
    priority :low

    def generate(site)
      puts "entering generate sub with #{site}"
      site.write_sub_indexes
    end

  end
  
end