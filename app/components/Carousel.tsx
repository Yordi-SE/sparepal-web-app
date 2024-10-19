// "use client";
// import React, { useState, useRef } from "react";
// import FrontPage from "./FrontPage";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const slides = [{ id: 2, content: data }];
//   const sliderRef = useRef(null);

//   const goToNextSlide = () => {
//     if (currentIndex < slides.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0); // Loop back to the first slide
//     }
//   };

//   const goToPrevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else {
//       setCurrentIndex(slides.length - 1); // Loop back to the last slide
//     }
//   };

//   // Swipe functionality
//   const startX = useRef(0);

//   const handleTouchStart = (e: any) => {
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e: any) => {
//     const endX = e.changedTouches[0].clientX;
//     if (startX.current > endX + 50) {
//       // Swipe left
//       goToNextSlide();
//     } else if (startX.current < endX - 50) {
//       // Swipe right
//       goToPrevSlide();
//     }
//   };

//   return (
//     <div className="relative overflow-hidden w-full h-fit">
//       {/* Slider container */}
//       <div
//         // ref={sliderRef}
//         className="flex transition-transform duration-500"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         {slides.map((slide, index) => (
//           <div key={index}>
//             <FrontPage data={slide.content} />
//           </div>
//         ))}
//       </div>

//       {/* Navigation buttons */}
//     </div>
//   );
// };

// export default Carousel;
