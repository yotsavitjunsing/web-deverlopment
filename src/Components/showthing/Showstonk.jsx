import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Showstonk.css'
import logo1 from '../Assets/picture/2YRONOBGshop.png';

const Showstonk = () => {
    const categories = [
        { id: 1, name: 'ไม้ยืนต้น' },
        { id: 2, name: 'ไม้พุ่ม' },
        { id: 3, name: 'ไม้คลุมดิน' },
        { id: 4, name: 'ไม้ประดับ' },
        { id: 5, name: 'ไม้เลื้อย' },
        { id: 6, name: 'ไม้น้ำ' },
        { id: 7, name: 'พืชสวนครัว' },
        { id: 8, name: 'พืชสมุนไพร' },
        { id: 9, name: 'ไม้ดอก' },
        // { id: 10, name: 'ไม้มงคล' },
        
       
    ];

    

    const [dataShows, setDataShows] = useState([]);

    useEffect(() => {
        

        //ดึงค่า สินค้าข้างในมาแสดง
        const fetchDataForCategory = async (categoryId) => {
            try {
                const result = await fetch(`http://localhost:3333/products-by-sub-id/${categoryId}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                const data = await result.json();
                if (data.status === 'success') {
                    return data.productData;
                } else {
                    alert(data.message);
                    return [];
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error fetching product data.');
                
            }
        }

        const fetchDataForAllCategories = async () => {
            const promises = categories.map(category => fetchDataForCategory(category.id));
            const data = await Promise.all(promises);
            setDataShows(data);
        }

        fetchDataForAllCategories();
    }, []);

    return (
        <div className="Show-headers">
            {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="header-all-product" id="yourId">
                    <div className="header-name-product">{category.name}</div>
                    <div className="product-row">
                        {dataShows[categoryIndex] && dataShows[categoryIndex].map((product, index) => (
                            <div key={index} className="product-row-box">
                                <p>{product.product_name}</p>
                                <img src={require(`../Assets/picture/${product.picture}`)} className='picture-in-oneshowproduct' alt="" />
                                <p>คงเหลือ:{product.remaining}</p>
                                <p>ราคา:{product.product_prices} บาท</p>
                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Showstonk;
