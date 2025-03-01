
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './style.css';
import { getUserId } from '../../../lib/Router'
import Menu from './menu';
import { closeSession } from '../../../lib/Router'
import Tooltip from '../tooltip';

const Sidebar = (props) => {
    let user = getUserId();


    const onClick = (i) => {

    }

    const Item = (e, i, drop = false) => {
        return <Tooltip text={e.title} position="right" className="item-sidebar">
            <Link key={i} to={e.path} onClick={() => onClick(e.pos)} className={`bg-main-item`} style={{ textDecoration: 'none' }}>
                <div className="icon-box-menu">
                    {e.icon}
                </div>
            </Link>
        </Tooltip>
    }


    return (
        <div className="bg-main border-main" id="sidebar-wrapper" style={{ borderRight: "1px solid #F4F7FE" }}>
            <div style={{
                background: "#fff",
                height: 90,
                display: 'flex',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <svg width="45" height="39" viewBox="0 0 45 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6897 22.555C16.6897 19.3383 19.291 16.7306 22.4998 16.7306C25.7087 16.7306 28.31 19.3383 28.31 22.555C28.31 25.7717 25.7087 28.3793 22.4998 28.3793C19.291 28.3793 16.6897 25.7717 16.6897 22.555Z" fill="var(--main-color)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4998 11.4358C20.306 11.4358 18.1615 12.0879 16.3374 13.3097C14.5133 14.5315 13.0916 16.2681 12.2521 18.2999C11.4126 20.3316 11.1929 22.5673 11.6209 24.7242C12.0489 26.8812 13.1053 28.8624 14.6566 30.4175C15.2754 31.0378 15.2754 32.0435 14.6566 32.6639C14.0377 33.2842 13.0344 33.2842 12.4156 32.6639C10.4211 30.6645 9.0629 28.1172 8.51262 25.344C7.96235 22.5708 8.24477 19.6964 9.32417 17.0841C10.4036 14.4718 12.2315 12.2391 14.5767 10.6682C16.922 9.09732 19.6792 8.25887 22.4998 8.25887C25.3204 8.25887 28.0777 9.09732 30.423 10.6682C32.7682 12.2391 34.5961 14.4718 35.6755 17.0841C36.7549 19.6964 37.0373 22.5708 36.4871 25.344C35.9368 28.1172 34.5785 30.6645 32.5841 32.6639C31.9652 33.2842 30.9619 33.2842 30.3431 32.6639C29.7243 32.0435 29.7243 31.0378 30.3431 30.4175C31.8944 28.8624 32.9508 26.8812 33.3788 24.7242C33.8068 22.5673 33.5871 20.3316 32.7476 18.2999C31.9081 16.2681 30.4863 14.5315 28.6623 13.3097C26.8382 12.0879 24.6936 11.4358 22.4998 11.4358Z" fill="var(--main-color)" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 3.17692C18.6767 3.17692 14.9393 4.31342 11.7604 6.44272C8.58143 8.57201 6.10375 11.5985 4.64064 15.1393C3.17754 18.6802 2.79473 22.5765 3.54061 26.3355C4.28649 30.0945 6.12758 33.5473 8.83104 36.2574C9.44986 36.8777 9.44986 37.8835 8.83104 38.5038C8.21222 39.1242 7.20892 39.1242 6.5901 38.5038C3.44342 35.3494 1.30051 31.3305 0.432341 26.9553C-0.435824 22.58 0.00974701 18.045 1.71272 13.9236C3.41569 9.80219 6.29957 6.27958 9.99967 3.80121C13.6998 1.32283 18.0499 3.78718e-07 22.5 0C26.9501 -3.78718e-07 31.3002 1.32283 35.0003 3.80121C38.7004 6.27958 41.5843 9.8022 43.2873 13.9236C44.9902 18.045 45.4358 22.58 44.5677 26.9553C43.6995 31.3305 41.5566 35.3494 38.4099 38.5038C37.7911 39.1242 36.7878 39.1242 36.169 38.5038C35.5501 37.8835 35.5501 36.8777 36.169 36.2574C38.8724 33.5473 40.7135 30.0945 41.4594 26.3355C42.2053 22.5765 41.8225 18.6802 40.3594 15.1393C38.8962 11.5985 36.4186 8.57201 33.2396 6.44272C30.0607 4.31342 26.3233 3.17691 22.5 3.17692Z" fill="var(--main-color)" />
                </svg>
            </div>
            <div className="list-group list-group-flush">
                {Menu.map((e, i) => Item(e, i))}
            </div>

            {Item({
                icon: <img src={user.avatar} style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 100 }} />,
                title: "Mi perfil",
                pos: 100,
                path: "/admin/perfil"
            }, 100)}
        </div>
    )
}

export default Sidebar;


