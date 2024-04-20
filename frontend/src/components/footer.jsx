import React from 'react';

const Footer = () => {
  return (
    <footer className='w-[100%] bg-primary p-2 flex justify-center text-white'>
        <div>
            <p>&copy; {new Date().getFullYear()} SG SneakerStore</p>
        </div>
    </footer>
  );
}

export default Footer;
