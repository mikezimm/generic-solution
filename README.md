## generic-solution

The purpose of this repo is to create generic component files and libraries that can be re-used more easily in other SPFx projects.

## React - Steps to re-use the code
10. Copy/Update Props
20. Copy/Update State
30. Copy/Update IReUsableInterfaces.ts
40. Replace All with case:  'GenericWebpartWebPart' with 'YourWebPart'
50. Replace All with case:  'genericWebpartWebPart' with 'yourWebPart'
60. Replace All with case:  'GenericWebpartWebpart' with 'YourWebpart' (lower case 'part')
70. Replace All with case:  'genericWebpartWebpart' with 'yourWebpart' (lower case 'part')


## List Provisioning - Steps to reuse code
05. GenericWebpart call in main webpart.ts, be sure to always pass a valid webURL for lists down to react component!
10. protected getPropertyPaneConfiguration(:  Only include lists to be provisioned
20. protected onPropertyPaneFieldChanged(:  update updateOnThese
30. private CreateChildList: update ChildListTitle value
40. private CreateParentList: update ParentListTitle value
50. export async function provisionTheList(:  update ChildListTitle & ParentListTitle value
60. columnsWebPart.ts:  Update list columns
70. viewsParentList.ts:  Update list views
80. viewsChildList.ts:  Update list views
90. ItemsWebPart.ts:  Update list items
100. IntroPage.ts:  Comment out the lists you don't need.
110. IntroPage.ts:  Replace Parent and Child Labels where required


## Installation steps
```
yo @microsoft/sharepoint --skip-install
npm install
npm install @pnp/sp @pnp/graph --save
npm install @pnp/spfx-controls-react --save --save-exact
npm install @pnp/spfx-property-controls
npm install --save office-ui-fabric-react
npm install webpack-bundle-analyzer --save-dev
```

After installing webpack analyzer, be sure to update the gulpfile.js so it actually builds the map.

### Building the code
```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

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
