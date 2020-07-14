module Jekyll


  # The TypeIndex class creates a single category page for the specified type.
  class TypeIndex < Page
    # Initializes a new CategoryIndex.
    #
    #  +base+         is the String path to the <source>.
    #  +type_dir+     is the String path between <source> and the type folder.
    #  +type+         is the type currently being processed.
    def initialize(site, base, dir, type)
      @site = site
      @base = base
      @dir  = dir
      @name = 'index.html'
      self.process(@name)
      layout = "type_index.html"
      # Read the YAML data from the layout page.
      self.read_yaml(File.join(base, '_layouts'), layout)
      self.data['type']        = type
      # Set the title for this page.
      self.data['title']       = type.capitalize
      # Set the meta-description for this page.
      meta_description_prefix  = site.config['type_meta_description_prefix'] || ''
      self.data['description'] = "#{meta_description_prefix} #{type.capitalize}"
    end
  end

  # The Site class is a built-in Jekyll class with access to global site config information.
  class Site

    # Creates an instance of CategoryIndex for each category page, renders it, and
    # writes the output to a file.
    #
    #  +category_dir+ is the String path to the category folder.
    #  +category+     is the category currently being processed.
    def write_type_index(dir, type)
      index = TypeIndex.new(self, self.source, dir, type)
      index.render(self.layouts, site_payload)
      index.write(self.dest)
      # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
      self.pages << index
    end

    # Loops through the list of category pages and processes each one.
    def write_type_indexes
      dir = self.config['type_dir'] || '/types'
      type_hash = self.collect_by_attribute('type', self.posts.docs)
      type_hash.keys.each do |type|
        self.write_type_index(File.join(dir, type), type)
      end
    end
  end


  # Jekyll hook - the generate method is called by jekyll, and generates all of the category pages.
  class GenerateTypes < Generator
    safe true
    priority :low

    def generate(site)
      puts "entering generate TYPES with #{site}"
      site.write_type_indexes
    end

  end

end
