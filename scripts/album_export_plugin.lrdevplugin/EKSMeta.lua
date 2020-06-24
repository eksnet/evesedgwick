function interp(s, tab)
  return (s:gsub('($%b{})', function(w) return tab[w:sub(3, -2)] or w end))
end

local function generateMeta (data)
  return interp([[---
layout: image
published: true
category: images
type: image

title: ${title}

src: ${src}

caption-title: ${title}
caption: ${caption}

albums:
  - "${album}"
---
  ]], { 
  title = data.title,
  src = data.src,
  caption = data.caption,
  album = data.album
})

end

local function saveMeta (meta, path)
  file = io.open(path, 'w')
  file:write(meta)
  file:close()
end

return {
  saveMeta = saveMeta,
  generateMeta = generateMeta
}