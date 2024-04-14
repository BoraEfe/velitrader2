import './Settings.css';
const Settings =() => {

    return(
        <div className='Settings'>
            <div className='Settings-title'>
                Settings
            </div>
            <div className='settings-container'>
                <div className='settings-item'>
                    verander themakleur
                    <input type='checkbox' id='lightmode-toggle'/>
                    <label for='lightmode-toggle'></label>
                </div>
            </div>
        </div>
    )
}
export default Settings;