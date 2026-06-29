const { ipcRenderer } = require('electron');
global.ipcRenderer = ipcRenderer;
const currentVersion = "1.12.0-offline-linux-test";

global.TEST = false;

/********************************************************************************************
    Release checklist:
    - update changelog
    - set TEST = false
    - package jar
    - update version here
    - update version in app package.json
    - update repo in project package.json
    - yarn package

    Patch update checklist
    - Update server temp unit ids
    - Update server temp items
    - Scan artifact ids, update artifact file
    - Download unit images
    - Upload herodata copy to server
    - Skill multipliers

*********************************************************************************************/

/********************************************************************************************
    TODO:
    - Update grid initialization with languages
*********************************************************************************************/

module.exports = {

    getCurrentVersion: () => {
        return currentVersion;
    },
    showNewFeatures: (text) => {
        Dialog.showNewFeatures(

`
<h2>
    New in v1.10.0
</h2>
<ul class="newFeatures">
    <li>Added new Riposte and Reversal Sets</li>
    <li>Added support for defense stat artifacts</li>
    <li>Fixed various bugs</li>
</ul>
`
        );
    },

    checkForUpdates: async () => {
        
         try {
             const latestData = await fetch('https://api.github.com/repos/Dodaca/Fribbels-Epic-7-Optimizer-linux/releases/latest')
             const latestDataText = await latestData.text();
             const latestDataJson = JSON.parse(latestDataText);
             const latestVersion = latestDataJson.tag_name;

             if (latestVersion != currentVersion) {
                 const shell = require('electron').shell;

                 // assuming $ is jQuery
                 $(document).on('click', 'a[href^="http"]', function(event) {
                     event.preventDefault();
                     shell.openExternal(this.href);
                 });

                 Dialog.htmlSuccessDisableOutsideClick(i18next.t("New version available: <a href='https://github.com/Dodaca/Fribbels-Epic-7-Optimizer-linux/releases/tag/v1.12.1-offline-linux'>") + latestVersion + "<a>");
             }

             // console.error(latestDataJson);
         } catch (e) {
             console.error(e)
         }
    }}
    