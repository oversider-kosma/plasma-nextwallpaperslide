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
function doNextWp() {
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
