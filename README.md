# [evekosofskysedgwick.net](http://evekosofskysedgwick.net)

This is the source code for the Jekyll project that generates the EKS website. If you are not familiar with how Jekyll works, you can find documentation on [the project website](https://jekyllrb.com/docs/home/).

## Table of Contents
 1. [Environment](#environment)
 2. [Usage](#usage)
 3. [Editing](#editing)
 4. [Deployment](#deployment)

## Environment
Seeing as Jekyll runs on Ruby, you will have to install Ruby before working with this repo. Currently, we are using version `2.5.1` and cannot guarantee compatibility with other versions.

If you don't already have `rvm` on your system, it is highly recommended that you install it to manage your rubies. Find instructions at <https://rvm.io/rvm/install>.

#### Install `ruby-2.5.1`

```
rvm install ruby-2.5.1
rvm use 2.5.1
```

#### Clone the repo

```
git clone https://github.com/eksnet/evesedgwick.git
cd evesedgwick
```

#### Install dependencies

```
bundle install
```

## Usage
You can run Jekyll locally as a development server. Which is what you'll want to do 99% of the time.

```
jekyll serve
## wait a few seconds, then check out your dev site at http://localhost:4000
```

You can also ask Jekyll to generate static assets. This happens automatically during deployment, so you really only need to do this if you are debugging a broken build.

```
jekyll build
```

## Editing
Contents for the site exist mostly as `.textile` or files in the `src/_posts` directory. See [One-off-pages](#one-off-pages) for exceptions to this.

*N.B.:* Files within the `_posts` directory are loosely organized in hierarchical directories, however this is purely for convenience and code hygeine. The location of content files does not affect how the corresponding documents are categorized in the site.

#### Format
Post filenames must fit the format `YYYY-MM-DD-description.textile`, per Jekyll conventions. More info on posts [here](https://jekyllrb.com/docs/posts/). Newer versions of Jekyll support a "Collections" format which is more flexible, but seeing as most of the content on this site predates this feature and the custom plugins assume everything is a 'post', we should continue to follow the post filename convention.

All documents must include a [front matter](https://jekyllrb.com/docs/frontmatter/) section at the top, signified by two lines of `---`. Jekyll will ignore files without this. This is where you specify metadata for the post. Front matter should be well-formatted [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

In addition to the built-in attributes, such as `title`, `permalink`, `category` and `layout`, the custom plugins add a number of additional properties:

These properties are available on all layouts:

```yaml
---
layout: post                    # select which of the layouts in `src/_layouts` will be used
published: true                 # (optional) set to false to mark as a draft
permalink: /my-great-post.html  # (optional, discouraged) force jekyll to use this as page url
nav: blog                       # the high-level section for this post. Corresponds to the top nav bar.
category: blog                  # level of organization, this will be listed on the top-level page for each nav

tags:                           # (optional) used to group items across
  - events
  - lecture

title: "March 29, 2018: Dean Spade will present the Eighth Annual Eve Kosofsky Sedgwick Memorial Lecture at Boston University"
---
```

The following properties are used by layouts: `image`, `resource`, `work`:

```yaml
---
with: Michael Moon (first author), Benjamin Gianni, and Scott Weir
index_img: pic000136-01_thumb.jpg       # (optional) filename of image
                                        # in src/images. Will appear
                                        # in the margin of item listing
related_media:                          # (optional) names of albums to include
    - { type: album, name: alb000102 }  # See "Albums" for more information.
---
```

The following properties are used exclusively in the blog (`post` layout):

```yaml
---
meta: # (optional) provide structured metadata, to be displayed by the template
  - { key: location, value : Boston University }
  - { key: creation-date, value: 2018 }
  - { key: with, value: Dean Spade }
related-images:                # (optional) filenames (excluding .jpg)
    - dean-spade-2015          # of one or more images saved in `src/images/blog`
---
```

The following properties are specific to work items (`work` layout):

```yaml
---
sub-category: artworks  # determines which 'bucket' to place the work in on the category listing page
sub-title: "Adjective Game"
role: artist
type: "artist's book"           # further organizational device, allows content within a sub-category to be grouped
catalog-number: "000025-01"     # (optional)

# Used mostly by Artworks
medium: "book board, fabric"
dims: {width: 11, height: 8.5, depth: 0}
year: ND                        
description: "Passage from Proust on three hinged boards with orange and green handmade papers, and repositionable, velcro-backed adjectives."
# (description is optional)

# Used mostly by Exhibitions
exhibition-location: "Cedar Creek Gallery, Durham, NC"    # (optional)
exhibition-date: 2000                                     # (optional)

# Used mostly by Articles
pub-date: 1997
in:
    - description:  journal
      publication:  Social Text
      issue:        52/53, Vol. 15, Nos. 3 and 4
      location:     Durham, NC
      date:         Autumn-Winter, 1997
      editors:
        - Phillip Brian Harper
        - Anne McClintock,
        - José Esteban Muñoz
        - Trish Rosen
index-desc: 'Response to C. Jacob Hale's "Leatherdyke Boys and Their Daddies - How to Have Sex Without Women or Men," published in the same special issue of <i>Social Text</i>. Sedgwick writes that Hale's paper begins "the project of articulating subjectivities that purposefully move across the boundaries of gender.''
# (index-desc is optional.) appears on category listing page if defined)
---
```

#### One-off Pages
It doesn't make sense to build a template for information pages that don't need to be listed or categorized. In these cases, prefer to add a `.textile` or `.html` file directly in the `src` dir. See `index.html` `about.textile`, or `foundation.textile` for working examples. Pages added in this way will have a default url generated based on their filename. Note that these pages should *not* use the timestamp-title filename format described above for posts. Use `layout: base` to ensure the page is styled correctly.


### Layouts
Layouts are standardized templates used to render a number of visually/semantically grouped items. These templates live in `src/_layouts` and are referenced by the same name as their filename. They can inherit each other. All templates in this site should inherit `_layouts/base`, which includes html boilerplate as well as various wrapper styles common to the whole site. Therefore, changes made to the base layout (such as modifying the navbar) propagate out to all pages. Pages, posts, and other templates must specify a layout using the following front matter:

```yaml
---
layout: base
---
```

Some layouts, such as `category_listing` and `category_posts`, are used exclusively by the plugins to generate listing pages during the build process.

### Search
Search has been added to the site using lunr.js in the client and an index constructed at build time. The following fields are indexed:

```
body, title, sub-title, url, date, category, sub-category, tags, type, index_img
```

The index takes a while to build (about 15s on my machine) which considerably slows down auto-rebuild in development. Therefore, the env variable `BUILD_SEARCH_INDEX` must be set or else index generation will be skipped during build.

This flag is set automatically when building the site with `scripts/build.sh`. When running jekyll locally with the `jekyll` command, search generation is disabled by default and the search function will be broken.

### Albums
In most cases, images appear as part of albums, which are shown in a carousel and can be inspected in a FancyBox modal. Images are defined by an image metadata file such as `src/_posts/life/images/2011-4-25-0518.textile`. Each of these corresponds to one image file, specified as `src`. Each image can belong to one or more albums, as specified on the `albums` property. Other metadata can be added as follows:

```yaml
---
layout: image
published: true
category: images
type: image

title: Childhood 1

src: childhood01                   # filename of image in `src/images/archive`

caption-title: "The Kosofsky Family, Dayton, c. 1955"
caption: "Back row (L to R): Rita and Leon Kosofsky, holding David. Front row (L to R): Nina and Eve."

more-link: '/biography/biography.html' # (optional) url to a page, will be
                                       # rendered as a link labelled "SEE MORE"

albums:
    - childhood
---
```

#### Rendering albums
Albums can be shown on a page with two mechanisms. Most layouts support a `related_media` param, which accepts an array of albums, as follows:

```yaml
related_media:
    - {type: album, name: childhood}
```

Albums can also be added inline to anywhere in the body of a post using a the following include statement.

```
{% include album.liquid album_name='childhood' %}
```


## Deployment
The `master` branch is automatically built and deployed to production by Netlify. Check the build status in [branches](https://github.com/eksnet/evesedgwick/branches) or by logging into <http://netlify.com>.

The `_site` directory, where compiled assets stored after building the site, is intentionally ignored by version control. Never commit built assets.


## Plugins
The organization functions of this site rely on a series of custom plugins that live in `src/_plugins`.
