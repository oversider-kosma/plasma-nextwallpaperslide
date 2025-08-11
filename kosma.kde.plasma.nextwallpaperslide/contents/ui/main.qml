/*
 * Copyright (C) 2020 by Kosma oversider.kosma@gmail.com>
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
import org.kde.plasma.core as PlasmaCore
import org.kde.plasma.plasma5support as Plasma5Support
import org.kde.plasma.plasmoid
import org.kde.kirigami as Kirigami
import "nextwp.js" as JS



PlasmoidItem {
    id: root
    width: 128
    height: 128
    implicitWidth: 128
    implicitHeight: 128

    preferredRepresentation: compactRepresentation

    Plasma5Support.DataSource {
        id: doexec
        engine: "executable"
        connectedSources: []
        onNewData: (source, data) => {
                var stdout = data["stdout"];
                exited(source, stdout);
                disconnectSource(source);
        }

        function exec(cmd) {
                connectSource(cmd);
        }
        signal exited(string sourceName, string stdout)
    }


    Kirigami.Icon {
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
