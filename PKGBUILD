#This is the PKGBUILD to build from GIT rather than use Prepacked .tar
# Maintainer: Dominik Lampl <lampl.dominik@web.de>
pkgname=fribbles-e7-offline
pkgver=1.12.0
_origver=1.12.0-offline-linux
pkgrel=1
pkgdesc="An modified version of Fribbles Epic 7 Optimizer to run under Linux."
arch=(x86_64)
url=https://github.com/Dodaca/Fribbels-Epic-7-Optimizer-linux
license=('unknown')
options=('!strip' '!debug')
depends=(jdk25-openjdk unzip)
makedepends=(unzip)
optdepends=('python: Required for the automatic Importer' 'libpcap: Required for the automatic Importer')
provides=(fribbles-e7-optimizer)
conflicts=()
replaces=()

source=("https://github.com/Dodaca/Fribbels-Epic-7-Optimizer-linux/releases/download/v$_origver/FribbelsE7Optimizer-$_origver.zip"
		)
noextract=(
"FribbelsE7Optimizer-$_origver.zip"	
)
sha256sums=(nonesense)
#validpgpkeys=()

package() {
	install -d "${pkgdir}/usr/bin/"
    install -d "${pkgdir}/usr/share/applications/"
	install -d "${pkgdir}/opt/${pkgname}/"

	unzip "FribbelsE7Optimizer-$_origver.zip" -d "${pkgdir}/opt/${pkgname}/"
	chmod 755 "${pkgdir}/opt/${pkgname}/fribbelse7optimizer"
	chmod -R 755 "${pkgdir}/opt/${pkgname}/data/bash/"
	ln -s "/opt/${pkgname}/fribbelse7optimizer" "${pkgdir}/usr/bin/fribbelse7optimizer"
	install -D "${pkgdir}/opt/${pkgname}/resources/resources/icon.png" "${pkgdir}/usr/share/icons/hicolor/256x256/apps/fribbelse7optimizer.png"

	cat > ${pkgdir}/usr/share/applications/fribbelse7optimizer.desktop << EOF
[Desktop Entry]
Name=FribbelsE7Optimizer
Exec=sh -c 'export PATH="/usr/lib/jvm/java-25-openjdk/bin/:$PATH"; fribbelse7optimizer'
Terminal=false
Type=Application
Icon=fribbelse7optimizer
Comment=Fribbles Epic 7 Unit Optimizer
Categories=Game;
EOF
}	
