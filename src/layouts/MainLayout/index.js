import './styles.scss';

const MainLayout = ({children}) => {
    return (
        <div id="wrapper">
            <div id="top">
                {/* <DashboardNav /> */}
            </div>

            <div id="bottom">
                <div id="side-nav">
                        <ul>
                            <li>Listings</li>
                            <li>Propspects</li>
                            <li>Analytics</li>
                            <li>Settings</li>
                        </ul>
                </div>

                <div id="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout;