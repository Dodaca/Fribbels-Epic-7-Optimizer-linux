var childProcess = require('child_process')
const path = require('path');
const { stdout } = require('process');
const { ipcRenderer } = require('electron');
const { marked } = require('marked');
global.ipcRenderer = ipcRenderer;
const currentVersion = "1.12.1-offline-linux";
global.marked = marked;

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
        Dialog.showNewFeatures(marked.parse(

`
# New in v1.12.1-offline-linux

  - Added all new Heroes up to **Eye of the Abyss Fumyr**
  
# Notes
  - Other packing Methods for Debian and Ubuntu may be added upon request
  - Load heroes and artifacts from offline cache by default
  - Updated heroes up to **Eye of the Abyss Fumyr** with all previous hero changes adjusted
  - Updated Chinese and Traditional Chinese translations for heroes and artifacts
  - This version has not been thoroughly tested
  - Note that the Auto updated WON'T update to this version and a manual reinstall is required.

# Contributions

This version will follow RexQians offline version at https://github.com/RexQian/Fribbels-Epic-7-Optimizer and possible Fribbles version if it is ever ahead of time. I will continue to only do minor work trying to have these versions work under Linux.
Thanks to these two for making this possible.
`
        ));
    },


   

    checkForUpdates: async () => {
        
         async function runUpdate () {
                 try {
             const latestData = await fetch('https://api.github.com/repos/Dodaca/Fribbels-Epic-7-Optimizer-linux/releases/latest')
             const latestDataText = await latestData.text();
             const latestDataJson = JSON.parse(latestDataText);
             const latestVersion = latestDataJson.tag_name;
             const latestBody = latestDataJson.body;
                console.log("Current Version: "+ currentVersion)
                console.log("Latest Version : " + latestVersion)
             if (latestVersion != "v"+currentVersion) {
                 Notifier.info(i18next.t("Update found!"));
                 const shell = require('electron').shell;

                 // assuming $ is jQuery
                 $(document).on('click', 'a[href^="http"]', function(event) {
                     event.preventDefault();
                     shell.openExternal(this.href);
                 });

                 await Dialog.htmlSuccessDisableOutsideClick(i18next.t(

                    "New version available: <a href='https://github.com/Dodaca/Fribbels-Epic-7-Optimizer-linux/releases/latest'>") + latestVersion + '</a>' + marked.parse(latestBody));
                    var response = await Dialog.updatePrompt("Run Update?(Requires Arch Based Distro/ Pacman package manager)")
                    

                    if (response == 'restart') {
                        console.log("Starting update scricpt:")
                        childProcess.spawn(path.join(Files.getDataPath(), 'update.bash'), [latestDataJson.assets[2].browser_download_url], {detached:true} )
                    }
             
                }
             else(
                 Notifier.info(i18next.t("Already on the latest Version."))
             )

             // console.error(latestDataJson);
         } catch (e) {
             console.error(e)
         }

    }
        const version = document.getElementById('version');
        version.innerText = ": v" + currentVersion;

        ipcRenderer.on('update_available', () => {
            Notifier.info(i18next.t("New version available, downloading now"));
        });
        ipcRenderer.on('update-not-available', () => {
        });
        ipcRenderer.on('test', (arg1, arg2) => {
            console.log("test", arg1, arg2)
        });
        ipcRenderer.on('check', (arg1, arg2) => {
            runUpdate();
        });
        ipcRenderer.on('update_downloaded', async (arg1, arg2) => {
            console.log("update_downloaded", arg1, arg2)
            var response = await Dialog.updatePrompt("Update downloaded. It will be installed on restart. Restart app now?")

            if (response == 'restart') {
                await Subprocess.kill();
                restartApp();
            }
        });

        function restartApp() {
            ipcRenderer.send('restart_app');
        }


        document.getElementById('checkForUpdatesSubmit').addEventListener("click", async () => {
            Notifier.info(i18next.t("Checking for updates"));

            try {
                await HeroData.initialize();
            } catch (e) {
                console.error("Error refreshing hero data " + e)
            }

            ipcRenderer.send('check');
        });
        runUpdate()
    }
}
