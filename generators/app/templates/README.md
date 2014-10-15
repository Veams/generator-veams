## README: <%= _.slugify(projectName) %> | version="0.1.0"

---------------------------------------------------
## Requirements for FE

* NodeJS (<= 0.10.26)
* Grunt
<% if (modules && modules.length > 0 && modules.indexOf('grunt-responsive-images') != -1) { %>
### Responsive Images
If you want to use an automated task to create responsive images you need to make sure that you have installed GraphicsMagick.

To build responsive images just start the task `pictures`.
<% } %>
---------------------------------------------------
## Frontend Methodology
<% if(features.indexOf("PGFM") != -1) { %>
We build <%= _.slugify(projectName) %> with the PG Frontend Methodology: 
* http://www.prototype-generator.com/pg-methodology/pg-methodology-overview.html
<% } %>
---------------------------------------------------
## Setup

This project builds on following setup (please read requirements and getting started):

* PG Website: http://prototype-generator.com/
* PG Github: https://github.com/Prototype-Group/generator-prototype

- We use [Grunt](http://gruntjs.com/) as our task runner and [Assemble](http://assemble.io/) as our static site generator.
- We use [Git](#).
- The folder __node_modules__ won't be comitted into GIT. Use ```.gitignore``` to ignore folders or files.
- Git-commit-messages in english please.
- All issues are recorded in [Jira](#).
- Jira-Issues are commented in german/english.

---------------------------------------------------
## Browser-Support

- all modern desktop browsers: Firefox, Chrome, IE and Safari/Mac latest version
- also: IE 10, 9 and 8
- all modern mobile browsers: iOS and Android latest two versions

---------------------------------------------------
## Responsive-Webdesign-Support

- Desktop
- Tablet
- Phone
<% if (modules && modules.length > 0 && modules.indexOf('grunt-responsive-images') != -1) { %>
### Responsive Images

**Example**
``` js
sizes: [
	{
		name: "mobile",
		width: 480
	},
	{
		name: "mobile_2x",
		width: 960,
		quality: 50
	},
	{
		name: "desktop",
		width: 972,
		quality: 80
	},
	{
		name: "desktop_2x",
		width: 1920,
		quality: 50
	}
]
```
<% } %>
### Breakpoints
- $small-range: (0, 640px); // smartphone portrait and smartphone landscape
- $medium-range: (641px, 768px); // between smartphone landscape and tablet portrait
- $large-range: (769px, 1022px); // only desktop
- $xlarge-range: (1023px, 1279px); // desktop and tablet landscape
- $xxlarge-range: (1280px); // desktop

---------------------------------------------------
## Team

- TPM/PM:
- Frontend:
- Backend: