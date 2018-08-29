# [evekosofskysedgwick.net](evekosofskysedgwick.net)

This is the source code for the Jekyll project that generates the EKS website. If you are not familiar with how Jekyll works, it would be a good idea to familiarize yourself with the [docs](https://jekyllrb.com/docs/home/).

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
https://github.com/eksnet/evesedgwick.git
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
Contents for the site exist mostly as `.textile` or files in the `src/_posts` directory. `.html` files may also be added directly in the `src` dir. (See `index.html` or `search.html` for working examples.)

*N.B.:* Files within the `_posts` directory are loosely organized in hierarchical directories, however this is purely for convenience and code hygeine. The location of content files does not affect how the corresponding documents are categorized in the site.

#### Format
Post filenames must fit the format `YYYY-MM-DD-description.textile`, per Jekyll conventions. More info on posts [here](https://jekyllrb.com/docs/posts/). Note that this constrain applies to items in `_posts` but not pages nested directly under `src`. Newer versions of Jekyll support a "Collections" format which is more flexible, but seeing as most of the content on this site predates this feature and the custom plugins assume everything is a 'post', we should continue to follow the post filename convention.

All documents must include a [front matter](https://jekyllrb.com/docs/frontmatter/) section at the top, signified by two lines of `---`. Jekyll will ignore files without this. This is where you specify metadata for the post. Front matter should be well-formatted [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

In addition to the built-in attributes, such as `title`, `permalink`, `category` and `layout`, the custom plugins add a number of additional properties:

```yaml
---
title: Book/Triptych
sub-title: Adjective game       # (optional) will be rendered below main title, if set
layout: artwork                 # select which of the layouts in `src/_layouts` will be used
permalink: /my-great-post.html  # (optional) prefer to omit this
published: true                 # (optional) set to false to mark as a draft
nav: work                       # the high-level section for this post. Corresponds to the top nav bar.
category: art                   # level of organization, this will be listed on the top-level page for each nav
sub-category: artworks          # (optional, but must be used/left out consistently for each nav)
tags:                           # (optional) used to group items across category/nav/type boundaries
  - proust
  - triptych
type: "artist's book"           # further organizational device, allows content within a sub-category to be grouped
year: ND                        # (optional) only used in certain templates
medium: "book board, fabric"    # only "artwork"
dims: {width: 11, height: 8.5, depth: 0} # only "artwork"
catalog-number: "000025-01"     # (optional)
index_img: adjective-game.jpg   # displayed next to this post on index pages
description: "Passage from Proust on three hinged boards with orange and green handmade papers, and repositionable, velcro-backed adjectives." # (optional)
related_media:                  # optional, see [Albums](#albums)
    - {type: album, name: "000025-01"}
---

# In this case we do not need to include content, because the artworks template draws from front matter.
```








