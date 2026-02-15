# huessen-frame
configuration for self hosting images to huessen frame

using raspberry pi 3b

13 doesnt work.  12.12 64-bit lite\
brcm80211 firmaware with bookworm(12) doesnt work for wpa2. Update to bookwork-backport https://packages.debian.org/bookworm-backports/all/firmware-brcm80211/download (firmware-brcm80211_20250410-2~bpo12+1_all.deb)

sudo nmcli con add type wifi ifname wlan0 con-name hot1 autoconnect yes ssid HotspotName\
sudo nmcli con modify hot1 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared\
sudo nmcli con modify hot1 wifi-sec.key-mgmt wpa-psk\
sudo nmcli con modify hot1 wifi-sec.psk Password123\
//force wpa2. frame cant work with wpa\
sudo nmcli con modify hot1 wifi-sec.proto rsn wifi-sec.pairwise ccmp\
sudo nmcli con up hot1

conecting internal usb port to computer

3 buttons 3 closest to usb port\
1 short(power symbol): power off\
2 short(reset): NO-OP\
3 short(Next): switch photo\
1 long: reset wifi(only restarts wifi)\
2 long: deinit (will erase wifi config)\
3 long: White test

App needed for bluetooth connection to initialize wifi


echo "address=/us.xiaowooya.eframe.sungale.com.cn/10.42.0.1" > /etc/NetworkManager/dnsmasq-shared.d/huessen.conf
systemctl restart NetworkManager


apt-get install nodejs
apt-get install npm

cp 99-disable-ip-forward /etc/NetworkManager/dispatcher.d/
chmod 755 /etc/NetworkManager/dispatcher.d/99-disable-ip-forward

cp /home/xive/huessen-frame/huessen-frame.service /etc/systemd/system/
systemctl daemon-reload
systemctl start huessen-frame

**Understanding of program flow
Frame will generally be asleep but while wakeup on button press or scheduled wakeup period
While awake it will request status every 10 seconds.  This is how the frame is controlled remotely
That status response will indicate the picture to show as well as an action code and next time to wake up in time from now in seconds
Action can be known to be 0,2,3. 0 is no-op, 2 update to a new image by way of having the frame access playlist/detail for image to download. 3 change further frame settings like landscape portrait by way of setting/detail.  After none 0 actions the frame will call callback/action_status to ensure the action is done.  Will also send action status when status message changes firstImageToDisplay
