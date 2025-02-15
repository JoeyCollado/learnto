import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Vertical Sidebar */}
      <div 
        className={`h-screen bg-slate-700 text-white transition-all duration-300 ${isOpen ? 'w-60' : 'w-20'} rounded-r-xl flex flex-col py-5 relative hidden md:flex`}
      >
        <div className='flex items-center justify-between px-4'>
          <span className={`text-4xl font-bold transition-all duration-300 ${!isOpen && 'hidden'}`}>Library</span>
          <button onClick={() => setIsOpen(!isOpen)} className='p-2 rounded-lg hover:bg-slate-600'>
            {isOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        
        <ul className='mt-20 space-y-20 px-4'>
          <li><Link href="#" className='flex items-center gap-3'><Menu size={20} /><span className={`${!isOpen && 'hidden'}`}>Published</span></Link></li>
          <li><Link href="#" className='flex items-center gap-3'><Menu size={20} /><span className={`${!isOpen && 'hidden'}`}>Drafts</span></Link></li>
          <li><Link href="#" className='flex items-center gap-3'><Menu size={20} /><span className={`${!isOpen && 'hidden'}`}>Archived</span></Link></li>
          <li><Link href="#" className='flex items-center gap-3'><Menu size={20} /><span className={`${!isOpen && 'hidden'}`}>Collections</span></Link></li>
        </ul>
      </div>

      {/* Bottom Horizontal Sidebar (for small screens) */}
      <div className='fixed bottom-0 left-0 w-full bg-slate-700 text-white flex justify-around py-3 md:hidden'>
        <Link href="#" className='flex flex-col items-center'><Menu size={20} /><span>Published</span></Link>
        <Link href="#" className='flex flex-col items-center'><Menu size={20} /><span>Drafts</span></Link>
        <Link href="#" className='flex flex-col items-center'><Menu size={20} /><span>Archived</span></Link>
        <Link href="#" className='flex flex-col items-center'><Menu size={20} /><span>Collections</span></Link>
      </div>
    </>
  );
};

export default Sidebar;
