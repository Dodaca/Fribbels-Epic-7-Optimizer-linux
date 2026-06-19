# Maintainer: Dominik Lampl <lampl.dominik@web.de>
pkgname=fribbles-e7-offline
pkgver=1.12.0-offline-linux
pkgrel=1
pkgdesc="An modified version of Fribbles Epic 7 Optimizer to run under Linux."
arch=(x86_64)
url=https://github.com/Dodaca/Fribbels-Epic-7-Optimizer-linux
license=('unknown')
options=('!strip' '!debug')
depends=(jre8-openjdk)
makedepends=(unzip)
optdepends=("python: Required for the automatic Importer")
provides=(fribbles-e7-optimizer)
conflicts=()
replaces=()

source=("FribbelsE7Optimizer-$pkgver.zip"
		)
noextract=(
"FribbelsE7Optimizer-$pkgver.zip"	
)
#sha256sums=(b29d59426ca3869a696ada605a37645b6b08cb0791331b2d04a97da5bf67bebe)
#validpgpkeys=()

package() {
	install -d "${pkgdir}/usr/bin/"
    install -d "${pkgdir}/usr/share/applications/"
	install -d "${pkgdir}/opt/${pkgname}/"

	unzip "FribbelsE7Optimizer-$pkgver.zip" -d "${pkgdir}/opt/${pkgname}/"
	chmod 755 "${pkgdir}/opt/${pkgname}/fribbelse7optimizer"
	ln -s "/opt/${pkgname}/fribbelse7optimizer" "${pkgdir}/usr/bin/fribbelse7optimizer"
	install -D "${pkgdir}/opt/${pkgname}/resources/resources/icon.png" "${pkgdir}/usr/share/icons/hicolor/256x256/apps/fribbelse7optimizer.png"

	cat > ${pkgdir}/usr/share/applications/fribbelse7optimizer.desktop << EOF
[Desktop Entry]
Name=FribbelsE7Optimizer
Exec=fribbelse7optimizer
Terminal=false
Type=Application
Icon=fribbelse7optimizer
Comment=Fribbles Epic 7 Unit Optimizer
Categories=Game;
EOF
}	
