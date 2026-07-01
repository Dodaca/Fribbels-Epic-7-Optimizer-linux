#!/bin/bash
echo "Pacman wasn't found so we update in place."
echo "The scrip will try to delete everything within this path:"
echo "$1"
echo "Please make sure the path is actually correct and points to the directory of your fribbels install."
echo "Continue?"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) break;;
        No ) exit;;
    esac
done
cd "$1"
rm Fribbels*.zip chrome-sandbox chrome_100_percent.pak chrome_200_percent.pak chrome_crashpad_handler fribbelse7optimizer icudtl.dat libEGL.so libffmpeg.so libGLESv2.so libvk_swiftshader.so libvulkan.so.1 LICENSE.electron.txt LICENSES.chromium.html resources.pak snapshot_blob.bin v8_context_snapshot.bin vk_swiftshader_icd.json
rm -rf swiftshader resources locales data
wget -O ./Fribbels_inplace.zip $3
unzip *.zip
rm Fribbels_inplace.zip
read -p "Update complete! Press Enter to close Script and start Fribbles manually."
exit