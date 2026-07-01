#!/bin/bash
mkdir -p $HOME/.cache/Fribbels
cd $HOME/.cache/Fribbels
wget -O ./PKGBUILD $2
makepkg -si --clean 
read -p "Update complete. Please restart Fribbles manually. Press enter to exit."
exit
