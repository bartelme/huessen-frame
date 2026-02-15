# huessen-frame
configuration for self hosting images to huessen frame

using raspberry pi 3b

13 doesnt work.  12.12 64-bit lite

sudo nmcli con add type wifi ifname wlan0 con-name hot1 autoconnect yes ssid HotspotName
sudo nmcli con modify hot1 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
sudo nmcli con modify hot1 wifi-sec.key-mgmt wpa-psk
sudo nmcli con modify hot1 wifi-sec.psk Password123
sudo nmcli con up hot1

conecting internal usb port to computer

3 buttons 3 closest to usb port
1 short: power off
2 short: NO-OP
3 short: switch photo
1 long: reset wifi(only restarts wifi)
2 long: deinit (will erase wifi config)
3 long: White test

App needed for bluetooth connection to initialize wifi
