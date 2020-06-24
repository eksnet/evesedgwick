local LrView = import 'LrView'
local LrDialogs = import 'LrDialogs'
local LrExportSession = import 'LrExportSession'
local bind = LrView.bind

local function chooseDir( title ) 
  return LrDialogs.runOpenPanel({
    title = title,
    prompt = 'Select',
    canChooseFiles = false,
    canChooseDirectories = true,
    canCreateDirectories = true,
    allowsMultipleSelection = false
  })[1]
end

local function updateFilterStatus( propertyTable, ... )
		propertyTable.message = nil
		propertyTable.hasError = false
		propertyTable.hasNoError = true
    
    propertyTable.LR_canExport = true
    propertyTable.LR_export_destinationPathPrefix = propertyTable.imageExportLocation
    propertyTable.LR_export_destinationPathSuffix = ""
    propertyTable.LR_export_destinationType = "specificFolder"
    propertyTable.LR_size_doConstrain = false
    propertyTable.LR_collisionHandling = "overwrite"
    propertyTable.LR_renamingTokensOn = true
    propertyTable.LR_tokens = "{{image_name}}"
end

local function startDialog( propertyTable )
	propertyTable:addObserver( 'metaExportLocation', updateFilterStatus )
	propertyTable:addObserver( 'imageExportLocation', updateFilterStatus )
  updateFilterStatus( propertyTable )
end

local function sectionsForTopOfDialog( f, propertyTable )
  value_width = 300
	return {
    {
      title = LOC "$$$/SDK/ExportEKSWebAlbum/SectionTitle=EKS Album Settings",
      f:row {
        spacing = f:control_spacing(),
        f:static_text {
          title = "Album Name",
          width = LrView.share "label_width"
        },
        spacing = f:control_spacing(),
        f:edit_field {
          value = bind 'albumName',
          width = value_width
        }
      },
      f:row {
        spacing = f:control_spacing(),
        f:static_text {
          title = "Image Export Location",
          width = LrView.share "label_width"
        },
        spacing = f:control_spacing(),
        f:edit_field {
          value = bind 'imageExportLocation',
          width = value_width
        },
        f:push_button {
          title = 'Choose',
          action = function ()
            propertyTable.imageExportLocation = chooseDir('Choose Image Export Location')
          end
        }
      },
      f:row {
        spacing = f:control_spacing(),
        f:static_text {
          title = 'Meta Export Location',
          width = LrView.share "label_width"
        },
        spacing = f:control_spacing(),
        f:edit_field {
          value = bind 'metaExportLocation',
          width = value_width
        },
        f:push_button {
          title = 'Choose',
          action = function ()
            propertyTable.metaExportLocation = chooseDir('Choose Meta Export Location')
          end
        }
      },
      f:row {
        spacing = f:control_spacing(),
        f:static_text {
          title = "Thumbnail Width",
          width = LrView.share "label_width"
        },
        f:edit_field {
          value = bind 'thumbWidth',
          width = value_width / 2
        },
        f:static_text {
          title = "Full Width",
        },
        f:edit_field {
          value = bind 'fullWidth',
          width = value_width / 2
        }
      }
    }
  }
end

local exportPresetFields = { 
  { key = 'imageExportLocation', default = 'src/images/archive' },
  { key = 'metaExportLocation', default = 'src/_posts/work/art' },
  { key = 'albumName', default = 'my_album' },
  { key = 'thumbWidth', default = 120 },
  { key = 'fullWidth', default = 2500 }
 }

 local hideSections = {
   'exportLocation',
   'fileNaming',
   --'fileSettings',
   'imageSettings',
   'video',
   'watermarking'
 }

local resizePhoto = function (photo, settings, width, slug)
  local resizeSession = LrExportSession({
    photosToExport = { photo },
    exportSettings = {
      LR_export_destinationPathPrefix = settings.imageExportLocation,
      LR_export_destinationPathSuffix = "",
      LR_collisionHandling = "overwrite",
      LR_size_doConstrain = true,
      LR_size_maxWidth = width,
      LR_size_maxHeight = width * 3,
		  LR_size_percentage = 100,
		  LR_size_resizeType = "dimensions",
		  LR_size_resolution = 72,
		  LR_size_resolutionUnits = "inch",
      LR_size_units = "pixels",
      LR_tokens = "{{image_name}}_" .. slug,
      LR_renamingTokensOn = true,
    }
  })
  resizeSession:doExportOnNewTask()
end

local renderPhoto = function (photo, settings)
  local exportSession = LrExportSession({
    photosToExport = { photo },
    exportSettings = settings
  })
  exportSession:doExportOnCurrentTask()
end

local processRenderedPhotos = function( functionContext, filterContext )
  local settings = filterContext.propertyTable
  updateFilterStatus(settings)
  for i, rendition in filterContext:renditions() do
    local success, pathOrMessage = rendition:waitForRender()
    if success then
      resizePhoto(rendition.photo, settings, settings.thumbWidth, "thumb")
      resizePhoto(rendition.photo, settings, settings.fullWidth, "full")
      renderPhoto(rendition.photo, settings)
    else
      LrDialogs.message(pathOrMessage)
    end
  end
end


return {
  canExportToTemporaryLocation = false,
  allowFileFormats = { 'JPEG' },
  allowColorSpaces = { 'sRGB' },
  startDialog = startDialog,
  exportPresetFields = exportPresetFields,
  shouldRenderPhoto = shouldRenderPhoto,
  sectionsForTopOfDialog = sectionsForTopOfDialog,
  hideSections = hideSections,
  processRenderedPhotos = processRenderedPhotos
}