/*
 * Copyright (C) 2020 by Kosma oversider_kosma@mail.ru>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation;
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>
 */



function find_req(object, name, type, depth=0, maxDepth=30, seen=[]) {
    var current = object;

    if (! depth) {
        seen = [];
        // going up
        while (current.parent != null) {
            current = current.parent;
        }
    }

    if (seen.indexOf(current) != -1)  {
        return false;
    }
    seen.push(current);

    for (var prop in current) {
        if (prop != 'parent'){
            if (prop == name && typeof current[prop] == type) {
                return current[prop];
            }
            if (typeof current[prop] == 'object') {
                if (depth < maxDepth) {
                    var res = find_req(current[prop], name, type, depth+1, maxDepth, seen);
                    if (res)  {
                        return res;
                    }
                }
            }
        }
    }
    return false;
}

var cache = {};
function doNextWp(plasmoid) {
    if (cache[plasmoid] != undefined) {
        var nextSlide = cache[plasmoid];
    }
    else {
        var nextSlide = find_req(plasmoid, "nextSlide", 'function');
        cache[plasmoid] = nextSlide;

    }

    if (nextSlide) {
        nextSlide();
    }
    else { // method not found, fallback; TODO: find normal way to do this
        var command = `qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript '
        function get_value(valueName) {
            d = desktops()[0];
            d.currentConfigGroup = Array("Wallpaper", "org.kde.slideshow", "General");
            return d.readConfig(valueName);
        }
        function set_value(valueName, value) {
            d = desktops()[0];
            d.currentConfigGroup = Array("Wallpaper", "org.kde.slideshow", "General");
            d.writeConfig(valueName, value);
        }
        orig_paths = get_value("SlidePaths");
        fake_paths = Array("/"+ Math.floor(Math.random() * (Math.pow(10, 16) + 1)));
        set_value("SlidePaths", fake_paths);
        set_value("SlidePaths", orig_paths.split(","));'`;
        doexec.exec(command);
    }
}
