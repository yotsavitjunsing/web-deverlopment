import './App.css';
import logo_img from './Components/Assets/picture/logo.png';
import vegetation from './Components/Assets/picture/vegetation.png';
import cultivation_equipment from './Components/Assets/picture/cultivation-equipment.png';
import garden_accessories from './Components/Assets/picture/garden-accessories.png';
import fertilizer from './Components/Assets/picture/fertilizer.png';
import cart_icon from './Components/Assets/picture/cart.png'
import login_icon from './Components/Assets/picture/login-icon.png'
import { useNavigate } from 'react-router-dom'

function App() {
    
    const routepage = useNavigate();
    const gogo=(number)=>
        {
            localStorage.setItem('product-one-show',number);
            routepage('/shop');
        }

    return (
        <div className="App">
            <header className='app-header'>
                <div className="header-bar">
                    <a href=''>
                        <img src={logo_img} alt='logo' className='logo-img'  onClick={() => routepage('/')}/>
                    </a>
                    <div className="menu-bar">
                        <ul>
                            <li><a href="" onClick={()=>gogo(1)}>พรรณไม้</a></li>
                            <li><a href="" onClick={()=>gogo(2)}>อุปกรณ์แต่งสวน</a></li>
                            <li><a href="" onClick={()=>gogo(3)}>ปุ๋ย</a></li>
                            <li><a href="" onClick={()=>gogo(4)}>สารเคมี</a></li>
                        </ul>
                    </div>
                    <div className="app-header-right">
                        {(localStorage.getItem('token')!=null)?(<img src={login_icon} alt="" className='login-icon' />):(<a href="" className='login-header' onClick={()=>routepage('/login')}>Log in</a>)}
                        <img src={cart_icon} alt="cart-icon" className='cart-header'/>
                        
                    </div>
                    {localStorage.getItem('token')==null?<div></div>:(<div className="show-user-menu">
                            <div className="show-route-profile" onClick={()=>{routepage('/profile')}}>โปรไฟล์</div>
                            <div className="show-route-profile" onClick={()=>{localStorage.removeItem('token');localStorage.removeItem('Id');localStorage.removeItem('Addressshow'); window.location.reload();}}>ออกจากระบบ</div>
                    </div>)}
                </div>
            </header>
            <main class="app-main">
                <div class="main-product" onClick={()=>gogo(1)}>
                    <img src={vegetation} alt="" />
                    <p>พรรณไม้</p>
                </div>
                <div class="main-product" onClick={()=>gogo(2)}>
                    <img src={cultivation_equipment} alt="" />
                    <p>อุปกรณ์แต่งสวน</p>
                </div>
                <div class="main-product" onClick={()=>gogo(3)}>
                    <img src={garden_accessories} alt="" />
                    <p>ปุ๋ย</p>
                </div>
                <div class="main-product" onClick={()=>gogo(4)}>
                    <img src={fertilizer} alt="" />
                    <p>สารเคมี</p>
                </div>
            </main>
            <footer>
                <div>
                    <a href="">ติดต่อ</a>
                    <a href="">ศูนย์ความช่วยเหลือ</a>
                </div>
            </footer>
        </div>
    );
}

export default App;