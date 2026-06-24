import React from 'react';
import managerStyles from './Manager.module.css';

function GalleryManager() {
  const images = [
    { id: 1, src: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Ocean View', category: 'Exterior' },
    { id: 2, src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Deluxe Room', category: 'Rooms' },
    { id: 3, src: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Infinity Pool', category: 'Amenities' },
    { id: 4, src: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Restaurant', category: 'Dining' },
    { id: 5, src: 'https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Spa Center', category: 'Amenities' },
    { id: 6, src: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=400', title: 'Lobby', category: 'Interior' },
  ];

  return (
    <div>
      <div className={managerStyles.header}>
        <h1 className={managerStyles.title}>Gallery Manager</h1>
        <button className={managerStyles.addBtn}>+ Add Image</button>
      </div>
      <div className={managerStyles.galleryGrid}>
        {images.map(img => (
          <div className={managerStyles.galleryCard} key={img.id}>
            <img src={img.src} alt={img.title} className={managerStyles.galleryImg} />
            <div className={managerStyles.galleryInfo}>
              <h4>{img.title}</h4>
              <span className={managerStyles.galleryCategory}>{img.category}</span>
              <div className={managerStyles.galleryActions}>
                <button className={managerStyles.editSmBtn}>Edit</button>
                <button className={managerStyles.deleteSmBtn}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryManager;
