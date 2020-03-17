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
import QtQuick 2.5
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import "nextwp.js" as JS

Item {
    id: root

    Plasmoid.preferredRepresentation: Plasmoid.compactRepresentation

    PlasmaCore.DataSource {
        id: doexec
        engine: "executable"
        connectedSources: []
        onNewData: {
                var stdout = data["stdout"];
                exited(sourceName, stdout);
                disconnectSource(sourceName);
        }

        function exec(cmd) {
                connectSource(cmd);
        }
        signal exited(string sourceName, string stdout)
    }

    Plasmoid.compactRepresentation: Item {
        id: mainItem
        Layout.minimumWidth: units.iconSizes.small
        Layout.minimumHeight: units.iconSizes.small

        readonly property int minButtonSize: units.iconSizes.small

        PlasmaCore.IconItem {
            id: icon
            width: parent.height
            height: parent.height
            source: "preferences-desktop-wallpaper"
            anchors.centerIn: parent
            scale: mouseArea.pressed ? 0.85 : 1.05
            active: mouseArea.containsMouse

            MouseArea {
                id: mouseArea
                anchors.fill: parent
                hoverEnabled: true
                onReleased: {
                    JS.doNextWp(plasmoid);
                }

                PlasmaCore.ToolTipArea {
                    anchors.fill: parent
                    mainText: i18nd("plasma_wallpaper_org.kde.image", "Next Wallpaper Image")
                    icon: "preferences-desktop-wallpaper"
                }
            }
        }
    }
}
