## generic-solution

The purpose of this repo is to create generic component files and libraries that can be re-used more easily in other SPFx projects.



### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

## Installation steps
```
yo @microsoft/sharepoint --skip-install
npm install
npm install @pnp/sp @pnp/graph --save
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/spfx-property-controls
npm install --save office-ui-fabric-react
npm install webpack-bundle-analyzer --save-dev


This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
