# Require any additional compass plugins here.
# require 'compass-normalize'
# require 'rgbapng'
# require "zurb-foundation"

# set the environment explicitly
if environment != :production
	environment = :development
else
	environment = :production
end

# basic configuration
http_path = "/"
css_dir = "_output/css"
sass_dir = "resources/scss"
images_dir = "_output/img"
javascripts_dir = "_output/js"

# set the style of the css
if environment == :production
	output_style = :compressed
else
	output_style = :expanded
end

# additional tweaks
relative_assets = true
disable_warnings = true
line_comments = false
enable_sourcemaps = true
Sass::Script::Number.precision = 8

# options for sprite generation
# compression level 9 -> best compression, may take a while
# compression level 0 -> worst compression, works faster
# if environment == :production
# 	chunky_png_options = {
# 		:compression => 9
# 	}
# else
# 	chunky_png_options = {
# 		:compression => 0
# 	}
# end

# # options to be passed from compass to sass.
sass_options = {
 	:debug_info => (environment == :development),
 	:read_cache => true,
     :sourcemap => true
 }

