import React from "react";
import "../css/Roomlist.css";

const rooms = [
  {
    title: "Anchorage To Santiago",
    price: "$40.00 / Night",
    img: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg"
  },
  {
    title: "Classic Room",
    price: "$80.00 / Night",
    img: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg"
  },
  {
    title: "Delux Room",
    price: "$62.00 / Night",
    img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
  },
  {
    title: "Ocean View Seagull",
    price: "$64.00 / Night",
    img: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
  },
  {
    title: "Presidential Stay",
    price: "$78.00 / Night",
    img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
  }
];

const Balcony = () => {
  return (
    <div className="balcony-page">
      <h1 className="title">Balcony</h1>

      <div className="container2">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Arrival Date</h3>
          <input type="date" />
          <input type="date" />

          <h4>Adults</h4>
          <input type="number" placeholder="0" />

          <h4>Children</h4>
          <input type="number" placeholder="0" />

          <h4>Hotel Types</h4>
          <label><input type="checkbox" /> Balcony</label>
          <label><input type="checkbox" /> Lake view</label>

          <h4>Rating</h4>
          <label><input type="radio" name="rating" /> ⭐⭐⭐⭐⭐</label>
          <label><input type="radio" name="rating" /> ⭐⭐⭐⭐</label>

          <h4>Price</h4>
          <input type="range" min="40" max="345" />

          <button className="find-btn">Find Hotels</button>
        </div>

        {/* Room List */}
        <div className="room-list">
          {rooms.map((room, i) => (
            <div className="room-card" key={i}>
              <img src={room.img} alt={room.title} />
              <div className="room-info">
                <h3>{room.title}</h3>
                <p>2 Adults • 2 Children</p>
                <span className="price">{room.price}</span>
                <button>View Detail</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Balcony;