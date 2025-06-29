"use client";
import { LibraryBig, LineChart, MessageSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
function SideNav() {
  const menuList = [
    { id: 1, name: "My Forms", icon: LibraryBig, path: '/dashboard' },
    
  ];

  const path = usePathname();

  return (
    <div
      className="d-flex flex-column justify-content-between bg-light border-end p-3"
      style={{ width: '220px', height: '89.75vh' }} // ensures full height sidebar
    >
      {/* Top menu items */}
      <div>
        {menuList.map(menu => {
          const isActive = path === menu.path;
          return (
           <Link href={menu.path} key={menu.id} className="text-decoration-none">
  <div
    className={`d-flex align-items-center mb-3 p-2 rounded ${
      isActive ? 'bg-primary text-white' : 'text-secondary'
    }`}
    style={{ cursor: 'pointer' }}
  >
    <menu.icon
      size={22}
      className={`me-3 ${isActive ? 'text-white' : 'text-primary'}`}
    />
    <span className="fw-semibold">{menu.name}</span>
  </div>
</Link>

          );
        })}
      </div>

      {/* Bottom button */}
      
    </div>
  );
}

export default SideNav;
