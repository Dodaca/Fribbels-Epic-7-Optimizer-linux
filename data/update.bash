#!/bin/bash
mkdir $HOME/.cache/Fribbels
cd $HOME/.cache/Fribbels
wget -O ./PKGBUILD $1
for terminal in "$TERMINAL" x-terminal-emulator mate-terminal gnome-terminal terminator xfce4-terminal urxvt rxvt termit Eterm aterm uxterm xterm roxterm termite lxterminal terminology st qterminal lilyterm tilix terminix kitty konsole guake tilda alacritty hyper wezterm rio ghostty; do
    if command -v "$terminal" > /dev/null 2>&1; then
        exec -l "$terminal" -e makepkg -si --clean "$@" 
    fi
done



exit