# huessen-frame
configuration for self hosting images to huessen frame

13 doesnt work.  12.12 64-bit lite

`nmcli device wifi hotspot ifname wlan0 ssid picture-frame password huessen4933`
nmcli connection add type wifi ifname wlan0 con-name testhotspot autoconnect yes ssid testhotspot 
   50  nmcli connection modify testhotspot 802-11-wireless.mode ap 802-11-wireless.band a ipv4.method shared
   51  nmcli connection modify testhotspot wifi-sec.psk 12345678
   52  nmcli connection modify testhotspot wifi-sec.key-mgmt wpa-psk
   53  nmcli connection modify testhotspot wifi-sec.psk 12345678
