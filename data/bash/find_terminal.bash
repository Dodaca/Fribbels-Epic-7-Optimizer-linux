#!/bin/bash
if command -v pacman > /dev/null 2>&1; then
   FILE=arch_update.bash
else 
    FILE=inplace.bash
fi

for terminal in "$TERMINAL" x-terminal-emulator mate-terminal gnome-terminal terminator xfce4-terminal urxvt rxvt termit Eterm aterm uxterm xterm roxterm termite lxterminal terminology st qterminal lilyterm tilix terminix kitty konsole guake tilda alacritty hyper wezterm rio ghostty; do
    if command -v "$terminal" > /dev/null 2>&1; then
        "$terminal" -e "$1/data/bash/$FILE" "$1" $2 $3
        break 
    fi
done
exit