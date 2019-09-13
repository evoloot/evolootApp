import React, { Component } from 'react';

import ButtonReturn from '../../../../components/Navigation/buttonReturn';
import NavMenu from '../../../../components/Navigation/navMenu';
import HorizontalList from '../../../../components/UI/HorizontalButtonList/horizontalList';

import nintendoLogo from "../../../../assets/images/isometrics/nintendo/Nintendo_Company.png";
import sonyLogo from "../../../../assets/images/isometrics/sony/Sony_Company.png";
import microsoftLogo from "../../../../assets/images/isometrics/microsoft/Microsoft_Company.png";
import segaLogo from "../../../../assets/images/isometrics/sega/SEGA_Company.png";
import atariLogo from "../../../../assets/images/isometrics/atari/Atari_Company.png";
import desktopLogo from "../../../../assets/images/isometrics/DESKTOP+MAC_Logo.png";
import othersImage from "../../../../assets/images/isometrics/Menu_Other.png";
import importsImage from "../../../../assets/images/isometrics/Imports_Logo.png";

import nintendoSwitchImage from '../../../../assets/images/isometrics/nintendo/Nintendo_Switch.png';
import nintendoWiiUImage from '../../../../assets/images/isometrics/nintendo/Nintendo_Wii-U.png';
import nintendoWiiImage from '../../../../assets/images/isometrics/nintendo/Nintendo_Wii.png';
import nintendoN64Image from '../../../../assets/images/isometrics/nintendo/Nintendo_N64.png';
import nintendoSNESImage from '../../../../assets/images/isometrics/nintendo/Nintendo_SNES.png';
import nintendoNESImage from '../../../../assets/images/isometrics/nintendo/Nintendo_NES.png';
import nintendoVirtualBoyImage from '../../../../assets/images/isometrics/nintendo/Nintendo_VirtualBoy.png';
import nintendo3DSImage from '../../../../assets/images/isometrics/nintendo/Nintendo_3DS.png';
import nintendoDSImage from '../../../../assets/images/isometrics/nintendo/Nintendo_DS.png';
import nintendoGBAImage from '../../../../assets/images/isometrics/nintendo/Nintendo_GBA.png';
import nintendoGBCImage from '../../../../assets/images/isometrics/nintendo/Nintendo_GBC.png';
import nintendoGBImage from '../../../../assets/images/isometrics/nintendo/Nintendo_GB.png';
import nintendoGameCubeImage from '../../../../assets/images/isometrics/nintendo/Nintendo_GameCube.png';

import atari2600Image from '../../../../assets/images/isometrics/atari/Atari_2600.png';
import atari5200Image from '../../../../assets/images/isometrics/atari/Atari_5200.png';
import atari7800Image from '../../../../assets/images/isometrics/atari/Atari_7800.png';
import atariJaguarImage from '../../../../assets/images/isometrics/atari/Atari_Jaguar.png';
import atariLynxImage from '../../../../assets/images/isometrics/atari/Atari_Lynx.png';

import microsoftXBoxImage from '../../../../assets/images/isometrics/microsoft/Microsoft_Xbox.png';
import microsoftXBox360Image from '../../../../assets/images/isometrics/microsoft/Microsoft_Xbox-360.png';
import microsoftXboxOneImage from '../../../../assets/images/isometrics/microsoft/Microsoft_Xbox-ONE.png';

import segaMasterSystemImage from '../../../../assets/images/isometrics/sega/SEGA_MasterSystem.png';
import segaGenesisImage from '../../../../assets/images/isometrics/sega/SEGA_Genesis.png';
import sega32XImage from '../../../../assets/images/isometrics/sega/SEGA_32X.png';
import segaCDImage from '../../../../assets/images/isometrics/sega/SEGA_CD.png';
import segaSaturnImage from '../../../../assets/images/isometrics/sega/SEGA_Saturn.png';
import segaGameGearImage from '../../../../assets/images/isometrics/sega/SEGA_GameGear.png';
import segaNomadImage from '../../../../assets/images/isometrics/sega/SEGA_Nomad.png';

import sonyPS1Image from '../../../../assets/images/isometrics/sony/Sony_PS1.png';
import sonyPS2Image from '../../../../assets/images/isometrics/sony/Sony_PS2.png';
import sonyPS3Image from '../../../../assets/images/isometrics/sony/Sony_PS3.png';
import sonyPS4Image from '../../../../assets/images/isometrics/sony/Sony_PS4.png';
import sonyPSPImage from '../../../../assets/images/isometrics/sony/Sony_PSP.png';
import sonyPSVitaImage from '../../../../assets/images/isometrics/sony/Sony_PS-Vita.png';

class Part02 extends Component {

    state = {
       sellParams: [

        ],
        companyProducts: null
    }

    componentDidMount() {
        if (this.props.location.sellParams !== undefined)
            this.state.sellParams.push(...this.props.location.sellParams);
            
    }

    companyClickHandler = event => {
         if (this.state.sellParams.find(el => el.sellCompany) === undefined)
            this.state.sellParams.push({ sellCompany: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellCompany), 1);
            this.state.sellParams.push({ sellCompany: event.currentTarget.id });
        }

        let companyProductsList;

        switch (event.currentTarget.id) {

            case ('nintendo'):
                companyProductsList = [
                    { id: 'Nintendo-Switch', src: nintendoSwitchImage, alt: 'Nintendo Switch' },
                    { id: 'Nintendo-Wii-U', src: nintendoWiiUImage, alt: 'Wii U' },
                    { id: 'Nintendo-Wii', src: nintendoWiiImage, alt: 'Wii' },
                    { id: 'Nintendo-Gamecube', src: nintendoGameCubeImage, alt: 'GameCube' },
                    { id: 'Nintendo-64', src: nintendoN64Image, alt: 'Nintendo 64' },
                    { id: 'Nintendo-SNES', src: nintendoSNESImage, alt: 'Super Nintendo' },
                    { id: 'Nintendo-NES', src: nintendoNESImage, alt: 'Nintendo' },
                    { id: 'Nintendo-VirtualBoy', src: nintendoVirtualBoyImage, alt: 'Virtual Boy' },
                    { id: 'Nintendo-3DS', src: nintendo3DSImage, alt: 'Nintendo 3DS' },
                    { id: 'Nintendo-DS', src: nintendoDSImage, alt: 'Nintendo DS' },
                    { id: 'Nintendo-GameboyADVANCE', src: nintendoGBAImage, alt: 'Gameboy Advance' },
                    { id: 'Nintendo-GameboyCOLOUR', src: nintendoGBCImage, alt: 'Gameboy Color' },
                    { id: 'Nintendo-GameboyPOCKET', src: nintendoGBImage, alt: 'Gameboy' }
                ];
                break;

            case ('atari'):
                companyProductsList = [
                    { id: 'Atari-2600', src: atari2600Image, alt: 'Atari 2600' },
                    { id: 'Atari-5200', src: atari5200Image, alt: 'Atari 5200' },
                    { id: 'Atari-7800', src: atari7800Image, alt: 'Atari 7800' },
                    { id: 'Atari-JAGUAR', src: atariJaguarImage, alt: 'Atari Jaguar' },
                    { id: 'Atari-LYNX', src: atariLynxImage, alt: 'Lynx' }
                ];
                break;

            case ('microsoft'):
                companyProductsList = [
                    { id: 'Microsoft-XBOX', src: microsoftXBoxImage, alt: 'XBOX' },
                    { id: 'Microsoft-XBOX360', src: microsoftXBox360Image, alt: 'XBOX 360' },
                    { id: 'Microsoft-XBONE', src: microsoftXboxOneImage, alt: 'XBOX ONE' }
                ];
                break;

            case ('sega'):
                companyProductsList = [
                    { id: 'SEGA-MasterSystem', src: segaMasterSystemImage, alt: 'Master System' },
                    { id: 'SEGA-Genesis', src: segaGenesisImage, alt: 'Genesis' },
                    { id: 'SEGA-32X', src: sega32XImage, alt: '32X' },
                    { id: 'SEGA-CD', src: segaCDImage, alt: 'SEGA CD' },
                    { id: 'SEGA-Saturn', src: segaSaturnImage, alt: 'Sega Saturn' },
                    { id: 'SEGA-GameGEAR', src: segaGameGearImage, alt: 'Game Gear' },
                    { id: 'SEGA-NOMAD', src: segaNomadImage, alt: 'Nomad' }
                ];
                break;

            case ('sony'):
                companyProductsList = [
                    { id: 'Sony-PS1', src: sonyPS1Image, alt: 'PlayStation' },
                    { id: 'Sony-PS2', src: sonyPS2Image, alt: 'PlayStation 2' },
                    { id: 'Sony-PS3', src: sonyPS3Image, alt: 'PlayStation 3' },
                    { id: 'Sony-PS4', src: sonyPS4Image, alt: 'PlayStation 4' },
                    { id: 'Sony-PSP', src: sonyPSPImage, alt: 'PSP' },
                    { id: 'Sony-PSVita', src: sonyPSVitaImage, alt: 'PSVita' }
                ];
                break;
            default:
                companyProductsList = [];
        }


        this.setState({
            companyProducts: (
                <HorizontalList
                    list={companyProductsList}
                    clickHandler={this.companyProductClickHandler} />
            )
        });
    }

    companyProductClickHandler = event => {
        if (this.state.sellParams.find(el => el.sellProduct) === undefined)
            this.state.sellParams.push({ sellProduct: event.currentTarget.id });
        else {
            this.state.sellParams.splice(this.state.sellParams.findIndex(el => el.sellProduct), 1);
            this.state.sellParams.push({ sellProduct: event.currentTarget.id });
        }
        
        this.props.history.push({
            pathname: '/evolootApp/auction/sell/part07',
            sellParams: this.state.sellParams
        }); 
    }

    render() {
        let elementList = [
            { id: 'nintendo', src: nintendoLogo, alt: 'Nintendo Logo' },
            { id: 'sony', src: sonyLogo, alt: 'Sony Logo' },
            { id: 'microsoft', src: microsoftLogo, alt: 'Microsoft Logo' },
            { id: 'sega', src: segaLogo, alt: 'Sega Logo' },
            { id: 'atari', src: atariLogo, alt: 'Atari Logo' },
            { id: 'winmac', src: desktopLogo, alt: 'Desktop' },
            { id: 'other', src: othersImage, alt: 'Others' },
            { id: 'imports', src: importsImage, alt: 'Imports' },
        ]

        return (
            <div className="arena" id="modal">
                <header className="header" id="header">

                    <ButtonReturn history={this.props.history}
                        data={{
                            pathname: '/evolootApp/auction/sell/part01',
                            sellParams: this.state.sellParams
                        }} />

                    <h1 className="header__header header-primary" id="headerTitle">The Arena</h1>

                    <NavMenu />

                    &nbsp;
                </header>
                <main className="arena__content-grid" id="content-box">
                    <HorizontalList
                        list={elementList}
                        clickHandler={this.companyClickHandler} />
                    {this.state.companyProducts}
                </main>

                <footer className="footer" id="footer">
                    {/*<SellDotSteps />*/}
                    </footer>
                    </div>
                );
            }
        }
        
        export default Part02;
 