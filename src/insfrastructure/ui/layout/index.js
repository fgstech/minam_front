import React, { useState, useEffect } from 'react';
import NavigationService from '../../../utils/history';
import './Layout.css';
import Points from '../points';
import ToolbarComponent from '../section';
import AvatarDropdown from '../avatarDropdown';
import { closeSession } from '../../../lib/Router';

const Brand = ({ widget = null, openSidebar, setOpenSidebar }) => {
    return (
        <div className="layout-logo">
            <div className="button-menu">
                <button onClick={() => setOpenSidebar(!openSidebar)}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6.3252H20M4 12.3252H20M4 18.3252H20" stroke="#354052" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="logo-menu">
                <svg width="113" height="44" viewBox="0 0 113 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.0089 44H40.2535V0H41.0089V44Z" fill="#E9531E" />
                    <path d="M66.1461 30.4466C66.1454 30.3458 66.1454 30.2549 66.1468 30.1647C66.1567 29.4309 66.1686 28.6971 66.1806 27.9634C66.2104 26.1535 66.2409 24.2819 66.2422 22.4409C66.2428 21.5015 66.164 20.6211 66.007 19.825C65.6458 17.9939 64.6446 16.7565 63.0312 16.1482C62.1128 15.8019 61.1109 15.6731 60.0561 15.7674C57.7668 15.9697 56.0599 17.0106 54.9831 18.8603C54.9765 18.8723 54.9692 18.8842 54.9626 18.8961C55.0746 18.0423 55.1773 17.1626 55.0951 16.2749L55.0839 16.1548H49.6332V18.3992H52.2505L52.118 30.513H50.0454V32.7441H57.3824V30.499H55.0189V30.4891C55.0183 30.3995 55.0183 30.3219 55.0196 30.2443L55.0454 28.5041C55.0679 26.8952 55.0918 25.232 55.1302 23.5959C55.1448 22.9597 55.2038 22.4117 55.3085 21.9201C55.6716 20.2217 56.5164 19.1131 57.8907 18.5293C58.6904 18.1896 59.5724 18.0887 60.5895 18.2221C61.965 18.4019 62.8119 19.1735 63.1054 20.5149C63.283 21.325 63.3731 22.137 63.3744 22.9265C63.3771 24.7012 63.3446 26.5065 63.3135 28.252C63.3022 28.8948 63.2909 29.5384 63.2803 30.1819C63.279 30.2708 63.271 30.3597 63.2624 30.4612L63.2585 30.513H61.2017V32.7448H68.5123V30.4884H66.1461V30.4466Z" fill="#E9531E" />
                    <path d="M55.3518 11.9842C55.4154 11.8834 55.4718 11.7932 55.5307 11.7043C56.2172 10.658 56.9739 10.4802 58.0592 11.1072C58.1792 11.1768 58.2985 11.2478 58.4171 11.3188C58.7451 11.5152 59.0843 11.7182 59.4395 11.8794C60.0802 12.17 60.6958 12.3159 61.2822 12.3159C61.6758 12.3159 62.0554 12.2503 62.4205 12.1189C63.4164 11.7606 64.0413 10.9519 64.6449 10.1697L64.9199 9.81611L63.2044 8.60201L63.1262 8.69025C63.0487 8.7765 62.9758 8.86075 62.9042 8.94368C62.7552 9.11551 62.614 9.27806 62.4643 9.42799C61.7692 10.122 61.2703 10.1956 60.4062 9.73384C60.2478 9.64892 60.0915 9.56002 59.9344 9.47045C59.6701 9.32052 59.3971 9.16461 59.1154 9.03126C57.8015 8.40829 56.5538 8.29086 55.5075 8.69357C54.5289 9.0704 53.7755 9.88112 53.2666 11.1045L53.2209 11.2153L55.1762 12.2629L55.3518 11.9842Z" fill="#E9531E" />
                    <path d="M78.0799 29.7643C76.9375 30.8875 74.8357 31.2285 73.4906 30.508C72.5935 30.0276 72.1442 29.2388 72.1568 28.164C72.1687 27.147 72.6147 26.4424 73.5198 26.0079C74.2699 25.6483 75.1101 25.4406 76.0881 25.3723C76.9349 25.3132 77.7724 25.2794 78.6583 25.2436C78.991 25.2303 79.3276 25.217 79.6688 25.2018C79.6171 26.8279 79.3713 28.4944 78.0799 29.7643ZM110.613 30.4814V30.4615C110.613 30.37 110.613 30.293 110.614 30.2167C110.624 29.6521 110.634 29.0875 110.646 28.523C110.671 27.2525 110.696 25.9813 110.707 24.7108C110.711 24.3818 110.719 24.0534 110.728 23.7243C110.757 22.554 110.788 21.3432 110.57 20.1557C110.241 18.3624 109.444 17.1417 108.135 16.4245C107.245 15.9369 106.234 15.7206 104.859 15.7358C102.304 15.7571 100.486 16.9572 99.4576 19.3031C99.4477 19.3257 99.4371 19.3476 99.4251 19.3708C99.4218 19.3582 99.4185 19.3456 99.4145 19.333C99.117 18.2377 98.5936 17.409 97.815 16.8C96.786 15.9952 95.5482 15.6423 94.1309 15.7518C91.6521 15.9435 89.8683 17.0395 88.8207 19.0106C88.9751 18.0718 89.0858 17.1669 88.9838 16.2493L88.9705 16.1312H83.5477V18.3936H86.1471L86.0279 30.498L84.5575 30.4927H82.2238V30.4768C82.2232 30.3932 82.2232 30.3249 82.2245 30.2559C82.2357 29.7238 82.249 29.1917 82.2622 28.6596C82.2907 27.4953 82.3206 26.2918 82.3298 25.1069C82.3325 24.7473 82.3391 24.3864 82.3444 24.0255C82.3656 22.7822 82.3868 21.4958 82.2715 20.2406C82.0814 18.1594 80.9384 16.7529 78.9671 16.1737C78.2694 15.9687 77.4689 15.8373 76.5188 15.7723C74.6058 15.6416 72.6193 16.0052 70.2651 16.9174C70.0166 17.013 69.9119 17.1682 69.9139 17.4356C69.9165 17.754 69.9152 18.0718 69.9165 18.3896H69.9152V21.2503H72.5497V18.6981C72.567 18.6364 72.6067 18.6039 72.6929 18.574C74.0724 18.1023 75.4486 17.9245 76.7838 18.0486C78.1031 18.17 78.9373 18.7571 79.3329 19.8445C79.6966 20.845 79.6807 21.8879 79.6642 22.9912L79.6608 23.1902C79.5071 23.1896 79.3574 23.1889 79.2089 23.1876C78.8028 23.1843 78.4138 23.1816 78.0255 23.1929C76.1881 23.2466 74.2374 23.3561 72.3622 24.0454C70.5679 24.7049 69.5859 25.8141 69.3599 27.4362C69.2937 27.9126 69.2824 28.4142 69.3268 28.9263C69.4832 30.7574 70.3386 32.0073 71.8686 32.6409C72.7379 33.0005 73.6205 33.1803 74.5097 33.1803C75.3307 33.1803 76.1576 33.0271 76.9846 32.7199C78.1971 32.2701 79.0917 31.3771 79.7834 29.9202L79.5509 32.7431L91.2737 32.7232V30.4735H88.9341L88.9553 28.5296C88.9738 26.8644 88.993 25.1427 89.0301 23.4503C89.0401 22.9627 89.109 22.424 89.2342 21.8488C89.7636 19.4166 91.4692 18.0738 93.9262 18.1627C95.3819 18.2164 96.3261 18.9568 96.6561 20.3043C96.8549 21.115 96.9609 21.9828 96.9629 22.8147C96.9669 24.6233 96.9311 26.463 96.8966 28.2423C96.884 28.9111 96.8708 29.5792 96.8602 30.2472C96.8589 30.3142 96.8522 30.3799 96.8443 30.4648L96.841 30.504H94.7783V32.7298H102.136V30.4848H99.8313L99.83 30.4668C99.8247 30.3872 99.8207 30.3209 99.8214 30.2545L99.8326 28.6663C99.8432 27.066 99.8545 25.4121 99.8817 23.7853C99.891 23.24 99.9479 22.6741 100.053 22.1035C100.522 19.5314 102.305 18.0592 104.834 18.164C106.312 18.2257 107.227 18.9469 107.555 20.3089C107.753 21.1342 107.859 22.0398 107.86 22.9268C107.863 24.7327 107.823 26.5691 107.785 28.3452C107.771 29.0046 107.757 29.6641 107.744 30.3242C107.744 30.3773 107.734 30.4304 107.725 30.4901L107.385 30.4894C107.257 30.4894 107.132 30.492 107.005 30.492H105.652V32.1725C105.652 32.1885 105.652 32.2057 105.652 32.2216L105.652 32.5514V32.7113L105.653 32.7285H113V30.4814H110.613Z" fill="#E9531E" />
                    <path d="M18.7775 16.9078C22.1667 16.9078 24.326 19.234 24.326 22.7095V29.9344C24.326 30.5365 23.998 30.9196 23.3694 30.9196H22.0028C21.3741 30.9196 21.0461 30.5365 21.0461 29.9344V22.9832C21.0461 21.0128 19.9528 19.7266 18.0942 19.7266C16.2629 19.7266 14.9509 21.0128 14.9509 22.9832V29.9344C14.9509 30.5365 14.5956 30.9196 13.9943 30.9196H12.6003C11.999 30.9196 11.6437 30.5365 11.6437 29.9344V22.9832C11.6437 21.0128 10.5777 19.7266 8.69177 19.7266C6.86049 19.7266 5.54852 21.0128 5.54852 22.9832V29.9344C5.54852 30.5365 5.1932 30.9196 4.59188 30.9196H3.19792C2.5966 30.9196 2.24127 30.5365 2.24127 29.9344V20.2465C2.24127 19.9455 2.13194 19.7813 1.88595 19.7813C1.63996 19.7813 1.36663 19.9181 1.12064 19.9729C0.792646 20.1097 0.491987 19.9455 0.327991 19.4255L0.10933 18.495C-0.10933 17.9203 -2.96209e-08 17.5919 0.437322 17.3456C1.01131 17.0172 1.74929 16.9078 2.29594 16.9078C3.66257 16.9078 4.81054 17.5646 5.05653 19.1792C5.95851 17.8109 7.43447 16.9078 9.48442 16.9078C11.5344 16.9078 13.0923 17.7561 14.0216 19.2066C15.0329 17.8382 16.6456 16.9078 18.7775 16.9078Z" fill="#E9531E" />
                    <path d="M29.5969 14.8279C28.3943 14.8279 27.4103 13.8427 27.4103 12.6385C27.4103 11.4344 28.3943 10.4492 29.5969 10.4492C30.7996 10.4492 31.7836 11.4344 31.7836 12.6385C31.7836 13.8427 30.7996 14.8279 29.5969 14.8279ZM28.9136 30.9196C28.285 30.9196 27.957 30.5365 27.957 29.9344V18.0845C27.957 17.4825 28.285 17.0993 28.9136 17.0993H30.2803C30.9089 17.0993 31.2369 17.4825 31.2369 18.0845V29.9344C31.2369 30.5365 30.9089 30.9196 30.2803 30.9196H28.9136Z" fill="#E9531E" />
                </svg>
            </div>
            <div className="widget-menu">
                {widget}
            </div>
        </div>
    )
}

const LayoutNav = ({ sidebarMenus, isActive, handleNavigate, toggleSubMenu, openSubMenu, openSidebar }) => {
    return (
        <nav className={`layout-nav ${openSidebar ? "active" : ""}`}>
            {sidebarMenus.map((menu) => {
                return (
                    <div key={menu.key}>
                        <div
                            className={`layout-menu-item ${isActive(menu.path) ? 'active' : ''
                                }`}
                            onClick={() => {
                                menu.subMenus
                                    ? toggleSubMenu(menu.key)
                                    : handleNavigate(menu.path);
                            }}
                        >
                            {menu.icon}
                            {menu.label}
                        </div>
                        {menu.subMenus && openSubMenu === menu.key && (
                            <div className="layout-sub-menu">
                                {menu.subMenus.map((subMenu) => (
                                    <div
                                        key={subMenu.key}
                                        className={`layout-sub-menu-item ${isActive(subMenu.path) ? 'active' : ''
                                            }`}
                                        onClick={() => handleNavigate(subMenu.path)}
                                    >
                                        {subMenu.icon}
                                        {subMenu.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}

const Navbar = ({ navbarMenus, isActive, handleNavigate, userName = '' }) => {
    const menuItems = [
        { label: "Cerrar sesión", action: () => closeSession() },
    ];
    return (
        <header className="layout-navbar">

            <div className="items-nav">
                {navbarMenus.map((menu) => (
                    <div
                        key={menu.key}
                        className={`layout-navbar-item ${isActive(menu.path) ? 'active' : ''
                            }`}
                        onClick={() => handleNavigate(menu.path)}
                    >
                        {menu.label}
                    </div>
                ))}
                <Points />
                <AvatarDropdown name={userName} menuItems={menuItems} />
            </div>
        </header>
    )
}

const Layout = ({
    sidebarMenus,
    navbarMenus,
    userName,
    children,
}) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Establecer la ruta actual desde NavigationService
        if (NavigationService.history) {
            setCurrentPath(NavigationService.history.location.pathname);

            // Escuchar cambios en la ruta
            const unlisten = NavigationService.history.listen(({ pathname }) => {
                setCurrentPath(pathname);
            });

            return () => unlisten();
        }
    }, []);

    const toggleSubMenu = (menuKey) => {
        setOpenSubMenu(openSubMenu === menuKey ? null : menuKey);
    };

    const handleNavigate = (path) => {
        if (path) {
            NavigationService.navigateTo(path);
        }
    };

    const toggleRightSidebar = () => {
        setIsRightSidebarOpen(!isRightSidebarOpen);
    };

    const isActive = (path) => path === currentPath;

    const getNameMenu = () => {
        const menus = []
        sidebarMenus.map(e => {
            if (e.subMenus) {
                e.subMenus.map(c => menus.push(c))
            } else {
                menus.push(e);
            }
        })
        const menu = menus.find(c => c.path === currentPath);
        return menu?.label;
    }

    return (
        <div className="layout-container">
            {/* Left Sidebar */}
            <aside className={`layout-sidebar`}>
                <Brand openSidebar={open} setOpenSidebar={setOpen} widget={<Points />} />
                <LayoutNav openSidebar={open} sidebarMenus={sidebarMenus} openSubMenu={openSubMenu} isActive={isActive} handleNavigate={handleNavigate} toggleSubMenu={toggleSubMenu} />
            </aside>

            {/* Main Content */}
            <div className="layout-main">
                <ToolbarComponent
                    label={getNameMenu(currentPath)}
                    removeTitleContainer={true}
                    extraElements={<Navbar userName={userName} openSidebar={setOpen} isOpenSidebar={open} navbarMenus={navbarMenus} isActive={isActive} handleNavigate={handleNavigate} />}>
                    <main className="layout-content">{children}</main>
                </ToolbarComponent>
            </div>
        </div>
    );
};

export default Layout;