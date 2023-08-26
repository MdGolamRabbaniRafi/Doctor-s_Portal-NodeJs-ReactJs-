import React from 'react';

export default function DashBoard() {
  return (
    <><div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
              <img src="/notice.gif" className="w-full" alt="Item 1" />
          </div>
          <div id="item2" className="carousel-item w-full">
              <img src="/hospital.gif" className="w-full" alt="Item 2" />
          </div>
          <div id="item3" className="carousel-item w-full">
              <img src="/hospital2.gif" className="w-full" alt="Item 3" />
          </div>
          <div id="item4" className="carousel-item w-full">
              <img src="/hospital3.gif" className="w-full" alt="Item 4" />
          </div>
      </div><div className="flex justify-center w-full py-2 gap-2">
              <a href="#item1" className="btn btn-xs">1</a>
              <a href="#item2" className="btn btn-xs">2</a>
              <a href="#item3" className="btn btn-xs">3</a>
              <a href="#item4" className="btn btn-xs">4</a>
          </div></>
  );
}
