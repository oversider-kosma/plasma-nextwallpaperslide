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
function doNextWp(plasmoid) {
    var current = plasmoid;
    while (true) {
        if (current.hasOwnProperty('containment'))
            break;
        else
            current = current.parent;
    }
    var wallpaper = current.containment.data[0].data[0].data[0];
    wallpaper.nextSlide();
}
