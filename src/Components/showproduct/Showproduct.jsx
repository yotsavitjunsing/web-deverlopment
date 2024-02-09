import logo_img from '../Assets/picture/logo.png';

import { useNavigate } from 'react-router-dom';
import './Showproduct.css'
import { useEffect, useState  } from 'react';

import search_icon from '../Assets/picture/search-img.png';
import cart_icon from '../Assets/picture/cart.png'
import login_icon from '../Assets/picture/login-icon.png'

function Showproduct() {
    localStorage.setItem('product-one-show',10)
    localStorage.setItem('id_product',7);
    
    const [data_show,setdatashow]= useState(null);
    useEffect(() => {
        
        const getOnlyProduct = async () => {
            let product_id =localStorage.getItem('product-one-show');
            let show_item =localStorage.getItem('id_product');
            try {
                const result = await fetch(`http://localhost:3333/product-by-sub-id-and-index/${product_id}/${show_item}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === 'success') {
                    setdatashow(data.productData);
                    console.log(data.productData);
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching product data.');
            }
        }
    
        getOnlyProduct();
       
    }, []); 
    const routepage = useNavigate();
    const [amout, setAmout] = useState(1);
    const [numberupdown, setNumberupdown] = useState(true);
    const [inputValue, setInputValue] = useState("");
    
    const [data_item,setdate_item] =useState(null);
    const handleInputChange = (event) => {
        let value = event.target.value;
    
        // ลบทุกอักขระที่ไม่ใช่ตัวเลข
        value = value.replace(/[^0-9]/g, '');
    
        // แปลงเป็นจำนวนเต็ม
        const intValue = parseInt(value, 10);
    
        // กำหนดค่าให้ amout
        setAmout(intValue);
    
        // อัปเดต input value ให้ตรงกับค่าที่ถูกปรับ
        setInputValue(intValue.toString());
        setNumberupdown(true);
    };
    if(amout <=0 ){
        setAmout(1)
    }
   
    
    return(
        <>
            <header className='app-header'>
                <div className="header-bar">
                    <a href=''>
                        <img src={logo_img} alt='logo' className='logo-img'  onClick={() => routepage('/')}/>
                    </a>
                    <div className="menu-bar">
                        <ul>
                            <li><a href="">พรรณไม้</a></li>
                            <li><a href="">อุปกรณ์แต่งสวน</a></li>
                            <li><a href="">ปุ๋ย</a></li>
                            <li><a href="">สารเคมี</a></li>
                        </ul>
                    </div>
                    <div className="app-header-right">
                        {(localStorage.getItem('token')!=null)?(<img src={login_icon} alt="" className='login-icon' />):(<a href="" className='login-header'>Log in</a>)}
                        <img src={cart_icon} alt="cart-icon" className='cart-header'/>
                    </div>
                </div>
            </header>
            <div className="container-showproduct">
                <div className="showproduct">
                   
                    <img src={data_show?.map(item => require(`../Assets/picture/${item.picture}`))} className='picture-in-oneshowproduct' alt="" />
                   
                    <div className="showproduct-data">
                        <h3>ชื่อสินค้า:{data_show?.map(item => item.product_name)}</h3>
                        <p>คำอธิบายสินค้า:{data_show?.map(item => item.description_product)}</p>
                        <div>ราคาต้นละ:{data_show?.map(item => item.product_prices)} บาท</div>
                        
                        <div className="showproduct-data-bot">
                       
                            <div className="showproduct-updown">
                                <div className="showproductbox" onClick={() => { setAmout(amout - 1); setNumberupdown(true); }}>
                                    -
                                </div>
                                {numberupdown ? <div className="showproductbox" onClick={() => setNumberupdown(false)}>{amout}</div> : <input type="number" pattern="\d*" oninput="this.value = this.value.replace(/[^0-9]/g, '');" onChange={(e) => {setAmout(parseInt(e.target.value))}}></input>}
                                <div className="showproductbox" onClick={() => { setAmout(amout + 1); setNumberupdown(true); }}>
                                    +
                                </div>
                            </div>
                            
                            <div className="showproduct-addtocart">
                                <button>Add To Cart</button>
                            </div>
                            
                        </div>
                        <div>ราคารวม:{data_show?.map(item => item.product_prices)*amout} บาท</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showproduct;