import React, { useState } from 'react';
import './Collapsible.css'; 

const Collapsible = ({ title, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <button className={`collapsible ${isActive ? 'active' : ''}`} onClick={() => setIsActive(!isActive)}>
        {title}
      </button>
      <div className={`content ${isActive ? 'show' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <h1>ศูนย์ความเป็นส่วนตัว</h1>
      <h2>นโยบายความเป็นส่วนตัว</h2>
      <Collapsible title="นโยบายความเป็นส่วนตัวคืออะไรและครอบคลุมสิ่งใดบ้าง?">
        <p> • นโยบายความเป็นส่วนตัวอธิบายถึงวิธีที่เราเก็บข้อมูลของคุณรวมถึงวิธีรักษาความปลอดภัย.</p>
        <p> • นโยบายความเป็นส่วนตัวยังช่วยให้ทราบถึงสิทธิ์ต่างๆที่คุณมี.</p>
        <p> • นโยบายนี้ยังมีผลกับการเข้าสู่ระบบของคุณด้วย.</p>
      </Collapsible>
      <Collapsible title="เราเก็บข้อมูลอะไรบ้าง?">
        <p> • ข้อมูลที่คุณให้เราเมื่อสมัครใช้งานผลิตภัณฑ์ของเราและสร้างโปรไฟล์ เช่น อีเมลหรือหมายเลขโทรศัพท์.</p>
      </Collapsible>
    </div>
  );
};

export default PrivacyPolicy;