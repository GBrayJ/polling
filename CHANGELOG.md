# Changelog

## 0.0.1.2
* Admin page is now working. Added `TailwindCSS` to project and added template `hero` component to admin page 

## 0.0.1.1

* Fixed `Failed to lookup view` error by providing an absolute path to the `admin.handlebars` template in `polls.js`.

## 0.0.1.0

* Passed `pluginName` variable to `admin.handlebars` template in `polls.js`.

## 0.0.0.9

* Updated `views/admin.handlebars` to use `card` and `card-header` classes for styling, similar to `MeshCentral-EventLog/admin.handlebars`.

## 0.0.0.8

* Changed `polls.js` to use `res.render` to match `MeshCentral-EventLog/admin.js`.

## 0.0.0.7

* Attempted fix for `TypeError: Cannot read properties of undefined (reading 'render')` by using `res.sendFile` to serve `admin.handlebars` directly.

## 0.0.0.6

* Fixed `TypeError: Cannot read properties of undefined (reading 'render')` by reverting to `obj.meshserver.app.render` for Handlebars template rendering. -- DID NOT WORK! THIS CHANGE BROKE THINGS!

## 0.0.0.5

* Incremented version number.
* Refactored `polls.js` to match `eventlog.js` structure.
* Moved `admin.html` to `views/admin.handlebars`.
* Updated `polls.js` to use `res.render` for Handlebars templates.