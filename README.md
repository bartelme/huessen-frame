# huessen-frame
configuration for self hosting images to huessen frame

using raspberry pi 3b

13 doesnt work.  12.12 64-bit lite

sudo nmcli con add type wifi ifname wlan0 con-name hot1 autoconnect yes ssid HotspotName
sudo nmcli con modify hot1 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
sudo nmcli con modify hot1 wifi-sec.key-mgmt wpa-psk
sudo nmcli con modify hot1 wifi-sec.psk Password123
sudo nmcli con up hot1

